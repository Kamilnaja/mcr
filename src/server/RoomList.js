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
}

module.exports = RoomList;
