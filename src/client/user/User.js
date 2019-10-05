export default class User {
  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }
}
