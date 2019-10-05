export class LocalStorageService {
  get name() {
    return JSON.parse(localStorage.getItem('user'))._name;
  }
}
