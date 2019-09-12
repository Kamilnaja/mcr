const Room = require('./Room');
const { idMaker } = require('../utils/Utils');

class RoomList {
  constructor() {
    this._rooms = [];
  }

  addRoom(newRoom) {
    this._rooms.push(newRoom);
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
}

module.exports = RoomList;
