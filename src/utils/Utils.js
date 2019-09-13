const utils = {
  createdNewUser: 'createdNewUser',
  getRooms: 'getRooms',
  alert: 'alert',
  roomEnter: 'roomEnter'
};


const idMaker = function* idMaker() {
  let idx = 0;
  while (true) {
    yield idx++;
  }
};

module.exports = { utils, idMaker };
