const utils = require('../utils/Utils');

class Room {
  constructor(name, id) {
    this._id = id;
    this._name = name;
    this._usersIds = [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get usersIds() {
    return this._usersIds();
  }

  addUser(id) {
    if (this._usersIds.some(utils.findById)) {
      console.log('should not add');
      return;
    }
    this._usersIds.push(id);
  }

  removeUser(id) {
    console.log('removing');
    this.usersIds = this._usersIds.filter(item => !item === id);
  }
}

module.exports = Room;
