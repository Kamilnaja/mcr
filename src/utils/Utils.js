const utils = {
  createdNewUser: 'createdNewUser',
  getRooms: 'getRooms',
  alert: 'alert',
  roomEnter: 'roomEnter',
  roomLeave: 'roomLeave'
};


const idMaker = function* idMaker() {
  let idx = 0;
  while (true) {
    yield idx++;
  }
};

const findById = id => item => item === id;
const negFindById = id => item => !item === id;

module.exports = {
  utils, idMaker, findById, negFindById
};
