#!/usr/bin/env node
const http = require('http');
const { normalizePort } = require('../../utils/Utils');
const app = require('../app');
const { utils } = require('../../utils/Utils');
const RoomList = require('./../RoomList');

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);
const expressServerUtils = require('express-server-utils')(server, port);

const roomList = new RoomList();

function getRooms(socket) {
  socket.on(utils.getRooms, () => {
    socket.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

function handleCreateNewUser(socket) {
  socket.on(utils.createdNewUser, data => {
    io.sockets.emit('getNewUser', { data });
    socket.emit('getNewUser', { data });
  });
}

function watchNewRoomEnter(socket) {
  socket.on(utils.roomEnter, data => {
    roomList.addUserToRoom(data);
    io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

function listenRoomLeave(socket) {
  socket.on(utils.roomLeave, data => {
    console.log(data);

    roomList.removeUserFromRoom(data);
    io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

io.on('connection', socket => {
  handleCreateNewUser(socket);
  getRooms(socket);
  watchNewRoomEnter(socket);
  listenRoomLeave(socket);
});

expressServerUtils.listen();
expressServerUtils.handleOnError();
expressServerUtils.handleOnListening();

const exitActions = [server.close];
expressServerUtils.handleShutDown(exitActions);
