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

  handleRoomAction(action, data) {
    console.log(`data ${Object.keys(data)}`);

    const idx = this.rooms.findIndex(RoomList.findUserById(data));
    console.log(`idx ${idx}`);

    if (idx !== -1) {
      this._rooms[idx][action](data);
    } else {
      throw new RangeError('User with given id not found');
    }
  }

  removeUserFromRoom(data) {
    this.handleRoomAction(userAction.removeUser, data);
  }

  addUserToRoom(data) {
    this.handleRoomAction(userAction.addUser, data);
  }
}

RoomList.findUserById = data => item => Number(item._id) === Number(data._id);
RoomList.findRoomWithGivenUserId = data => this.rooms.findIndex(RoomList.findUserById(data));

module.exports = RoomList;
