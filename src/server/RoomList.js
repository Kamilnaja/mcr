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

  removeUserFromRoom(data) {
    this.handleRoomAction(userAction.removeUser, data);
  }

  addUserToRoom(data) {
    const { user, room } = data;
    const roomIdx = this.rooms.findIndex(item => item._id === room.id);
    this._rooms[roomIdx].addUser(user);
  }
}

RoomList.findUserById = user => item => Number(item._id) === Number(user._id);
RoomList.findRoomWithGivenUserId = data => this.rooms.findIndex(RoomList.findUserById(data));

module.exports = RoomList;
