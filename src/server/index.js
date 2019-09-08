const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const utils = require('../utils/Utils');
const RoomList = require('./RoomList');
const Room = require('./Room');

server.listen(8080);

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

function createRooms() {
  const roomList = new RoomList();
  roomList.addRoom(new Room('Hrubieszów'));
  roomList.addRoom(new Room('Zosin'));
  roomList.addRoom(new Room('Lublin'));
  return roomList.rooms;
}

function getRooms(socket) {
  socket.on(utils.getRooms, () => {
    console.log('emitting rooms');
    socket.emit(utils.getRooms, { roomList: createRooms() });
  });
}

function handleCreateNewUser(socket) {
  socket.on(utils.createdNewUser, (data) => {
    console.log(`${data} is new User. Maybe should we play?`);
    io.sockets.emit('getNewUser', { data });
    socket.emit('getNewUser', { data });
  });
}

function handleNewRoomEnter(socket) {
  socket.on(utils.roomEnter, (data) => {
    console.log(data);
  });
}

io.on('connection', (socket) => {
  createRooms();
  handleCreateNewUser(socket);
  getRooms(socket);
  handleNewRoomEnter(socket);
});
