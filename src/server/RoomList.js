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

  removeUserFromRoom() {

  }

  addUserToRoom(data) {
    const { user, room } = data;
    this.removeUserFromOtherRooms(user);
    const roomIdx = this.rooms.findIndex(item => item._id === room.id);
    this._rooms[roomIdx]._usersIds.push(user);
  }

  removeUserFromOtherRooms(user) {
    console.log(user);

    this._rooms.forEach((uRoom) => {
      try {
        const userIdxToDelete = uRoom._usersIds.findIndex(id => id._id === user._id);
        if (userIdxToDelete !== -1) {
          // eslint-disable-next-line no-param-reassign
          uRoom._usersIds = uRoom._usersIds.splice(userIdxToDelete, 0);
        }
      } catch (e) {
        throw Error(e);
      }
    });
  }
}

RoomList.findUserById = user => item => Number(item._id) === Number(user._id);
RoomList.findRoomWithGivenUserId = data => this.rooms.findIndex(RoomList.findUserById(data));

module.exports = RoomList;
