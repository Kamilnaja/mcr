let id = 0;

class Room {
  constructor(name) {
    this.id = id++;
    this.name = name;
  }
}

module.exports = Room;
