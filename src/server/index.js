const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(80);

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));
const rooms = [];

io.on('connection', (socket) => {
  socket.on('createNewRoom', (data) => {
    console.log(`${data} creates new Room`);
    rooms.push(data);
    console.log(rooms);

  });

  socket.on('mount', (data) => {
    console.log(`${data} + emitted`);
  });

  socket.on('createdNewUser', (data) => {
    console.log(`${data} is new User. Maybe should we play?`);
  });

  socket.on('requestRoomsList', (data) => {
    io.emit(rooms);
  });
});
