const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { utils } = require('../utils/Utils');
const RoomList = require('./RoomList');

const roomList = new RoomList();

server.listen(8080);

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

function getRooms(socket) {
  socket.on(utils.getRooms, () => {
    console.log('emitting rooms');
    socket.emit(utils.getRooms, { roomList: roomList.createRooms() });
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
    roomList.addUserToRoom(data);
    io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

function handleRoomLeave(socket) {
  socket.on(utils.roomLeave, (data) => {
    roomList.removeUserFromRoom(data);
    io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

io.on('connection', (socket) => {
  roomList.createRooms();
  handleCreateNewUser(socket);
  getRooms(socket);
  handleNewRoomEnter(socket);
  handleRoomLeave(socket);
});
