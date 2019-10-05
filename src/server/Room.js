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
    this._usersIds.push('hello');
    console.log('adding ');
    console.log(id);

    if (this.checkIfUserIsAlreadyAdded()) {
      return;
    }
  }

  checkIfUserIsAlreadyAdded() {
    if (this._usersIds.some(utils.findById)) {
      console.warn('User with this id is currently in given room');
      return true;
    }
    // ok
    return false;
  }

  removeUser(id) {
    console.log('removing');
    this.usersIds = this._usersIds.filter(item => !item === id);
  }
}

module.exports = Room;
