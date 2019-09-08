let id = 0;

class Room {
  constructor(name) {
    this.id = id++;
    this.name = name;
    this.numberOfUsers = 0;
  }
}

module.exports = Room;
