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

const findByObjectId = (data, positive = true) => {
  if (positive) {
    if ('_id' in data) {
      return item => Number(item._id) === Number(data._id);
    }
    return item => Number(item._id) === Number(data.id);
  }
  if ('_id' in data) {
    return item => Number(item._id) !== Number(data._id);
  }
  return item => Number(item._id) !== Number(data.id);
};

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

module.exports = {
  utils, idMaker, findById, negFindById, findByObjectId, normalizePort
};
