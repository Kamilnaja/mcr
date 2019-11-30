export class StorageService {
  get name() {
    return JSON.parse(localStorage.getItem('user'))._name;
  }

  get user() {
    return sessionStorage.getItem('user');
  }

  get isFormVisible() {
    return !localStorage.getItem('user');
  }
}
