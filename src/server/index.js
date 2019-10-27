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
    socket.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

function handleCreateNewUser(socket) {
  socket.on(utils.createdNewUser, (data) => {
    io.sockets.emit('getNewUser', { data });
    socket.emit('getNewUser', { data });
  });
}

function watchNewRoomEnter(socket) {
  socket.on(utils.roomEnter, (data) => {
    roomList.addUserToRoom(data);
    io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

function listenRoomLeave(socket) {
  socket.on(utils.roomLeave, (data) => {
    console.log(data);

    roomList.removeUserFromRoom(data);
    io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

io.on('connection', (socket) => {
  handleCreateNewUser(socket);
  getRooms(socket);
  watchNewRoomEnter(socket);
  listenRoomLeave(socket);
});
