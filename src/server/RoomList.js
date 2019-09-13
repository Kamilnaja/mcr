const Room = require('./Room');
const { idMaker } = require('../utils/Utils');

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

  addUserToRoom(data) {
    console.log(data);

    const idx = this.rooms.findIndex(item => Number(item._id) === Number(data._id));
    if (idx !== -1) {
      this._rooms[idx].addUser(data.userName);
    } else {
      console.log('room not found');
    }
  }
}

module.exports = RoomList;
