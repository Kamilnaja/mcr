export class LocalStorageService {
  get name() {
    return JSON.parse(localStorage.getItem('user'))._name;
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }

  get isFormVisible() {
    return !localStorage.getItem('user');
  }
}
