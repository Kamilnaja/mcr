const Room = require('./Room');
const { idMaker, findByObjectId } = require('../utils/Utils');

class RoomList {
  constructor() {
    this._rooms = [];
    this.createRooms();
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
  }

  addUserToRoom(data) {
    const { user, room } = data;
    this.removeUserFromRoom(user);
    const roomIdx = this.rooms.findIndex(findByObjectId(room));
    this._rooms[roomIdx]._usersIds.push(user);
  }

  removeUserFromRoom(user) {
    this._rooms.forEach((userRoom) => {
      try {
        const givenRoom = this._rooms.find(findByObjectId(userRoom));
        givenRoom._usersIds = givenRoom._usersIds.filter(item => item !== user);
      } catch (e) {
        throw new Error(e);
      }
    });
  }
}

module.exports = RoomList;
