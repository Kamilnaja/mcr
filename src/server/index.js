const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const utils = require('../utils/Utils');

server.listen(8080);

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));
const rooms = [ 'hello', 'world' ];

function getRooms(socket) {
  socket.on(utils.getRooms, () => {
    console.log('emitting rooms');
    socket.emit(utils.getRooms, { rooms });
  });
}

function handleNewRoom(socket) {
  socket.on(utils.createRoom, (data) => {
    console.log(`${data} creates new Room`);
    if (rooms.find(item => item === data)) {
      io.sockets.emit('alert', { info: 'alreadyExists' });
      console.log('already exists');
    } else {
      rooms.push(data);
      io.sockets.emit(utils.getRooms, { rooms });
    }
  });
}

function handleCreateNewUser(socket) {
  socket.on(utils.createdNewUser, (data) => {
    console.log(`${data} is new User. Maybe should we play?`);
    io.sockets.emit('getNewUser', { data });
    socket.emit('getNewUser', { data });
  });
}

io.on('connection', (socket) => {
  handleNewRoom(socket);

  handleCreateNewUser(socket);

  getRooms(socket);
});
