const RoomList = require('../RoomList');
const { utils } = require('../../utils/Utils');

module.exports = io => {
  const roomList = new RoomList();

  const getRooms = socket => {
    socket.on(utils.getRooms, () => {
      console.log('conn');

      socket.emit(utils.getRooms, { roomList: roomList.rooms });
    });
  };

  const handleCreateNewUser = socket => {
    socket.on(utils.createdNewUser, data => {
      io.sockets.emit(utils.getNewUser, { data });
      socket.emit(utils.getNewUser, { data });
    });
  };

  const watchNewRoomEnter = socket => {
    socket.on(utils.roomEnter, data => {
      roomList.addUserToRoom(data);
      io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
    });
  };

  const listenRoomLeave = socket => {
    socket.on(utils.roomLeave, data => {
      roomList.removeUserFromRoom(data);
      io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
    });
  };

  io.on('connection', socket => {
    handleCreateNewUser(socket);
    getRooms(socket);
    watchNewRoomEnter(socket);
    listenRoomLeave(socket);
  });
};
