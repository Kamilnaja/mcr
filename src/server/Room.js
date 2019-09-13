class Room {
  constructor(name, id) {
    this._id = id;
    this._name = name;
    this._usersIds = [];
  }

  get usersIds() {
    return this._usersIds();
  }

  addUser(id) {
    if (this._usersIds.some(item => item === id)) {
      console.log('should not add');
      return;
    }
    this._usersIds.push(id);
  }
}

module.exports = Room;
