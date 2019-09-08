const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const utils = require('../utils/Utils');
const RoomList = require('./RoomList');
const Room = require('./Room');

server.listen(8080);

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

const roomList = new RoomList();
roomList.addRoom(new Room('Hrubieszów'));
roomList.addRoom(new Room('Zosin'));
roomList.addRoom(new Room('Lublin'));

function getRooms(socket) {
  socket.on(utils.getRooms, () => {
    console.log('emitting rooms');
    socket.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

function handleCreateNewUser(socket) {
  socket.on(utils.createdNewUser, (data) => {
    console.log(`${data} is new User. Maybe should we play?`);
    io.sockets.emit('getNewUser', { data });
    socket.emit('getNewUser', { data });
  });
}

io.on('connection', (socket) => {
  handleCreateNewUser(socket);
  getRooms(socket);
});
