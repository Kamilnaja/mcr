const Room = require('./Room');
const { idMaker } = require('../utils/Utils');

const userAction = {
  removeUser: 'removeUser',
  addUser: 'addUser'
};

class RoomList {
  constructor() {
    this._rooms = [];
  }

  get rooms() {
    return this._rooms;
  }

  createRooms() {
    const idx = idMaker();
    this._rooms = [];
    this._rooms.push(new Room('Hrubieszów', idx.next().value));
    this._rooms.push(new Room('Zosin', idx.next().value));
    this._rooms.push(new Room('Lublin', idx.next().value));
    return this._rooms;
  }

  removeUserFromRoom(user) {

  }

  addUserToRoom(data) {
    const { user, room } = data;
    this.removeUserFromOtherRooms(user);
    const roomIdx = this.rooms.findIndex(item => item._id === room.id);
    this.rooms[roomIdx].addUser(user);
  }

  removeUserFromOtherRooms(user) {
    this.rooms.map((uRoom) => {
      const userIdxToDelete = uRoom._usersIds.findIndex(id => id._id === user._id);
      // eslint-disable-next-line no-param-reassign
      uRoom._usersIds = uRoom._usersIds.splice(userIdxToDelete, 0);
      return uRoom;
    });
  }
}

RoomList.findUserById = user => item => Number(item._id) === Number(user._id);
RoomList.findRoomWithGivenUserId = data => this.rooms.findIndex(RoomList.findUserById(data));

module.exports = RoomList;
