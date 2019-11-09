const app = require('express')();
const server = require('http').Server(app);
const morgan = require('morgan');
const passport = require('passport');
const io = require('socket.io')(server);
const RoomList = require('./RoomList');
require('./passport');
const { utils } = require('../utils/Utils');

const roomList = new RoomList();
const port = 8080;

server.listen(port);

// Passport session setup.
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.json({
    message: 'welcome in main'
  });
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/account', ensureAuthenticated, (req, res) => {
  res.send('account');
});

function getRooms(socket) {
  socket.on(utils.getRooms, () => {
    socket.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

function handleCreateNewUser(socket) {
  socket.on(utils.createdNewUser, (data) => {
    io.sockets.emit('getNewUser', { data });
    socket.emit('getNewUser', { data });
  });
}

function watchNewRoomEnter(socket) {
  socket.on(utils.roomEnter, (data) => {
    roomList.addUserToRoom(data);
    io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

function listenRoomLeave(socket) {
  socket.on(utils.roomLeave, (data) => {
    console.log(data);

    roomList.removeUserFromRoom(data);
    io.sockets.emit(utils.getRooms, { roomList: roomList.rooms });
  });
}

io.on('connection', (socket) => {
  handleCreateNewUser(socket);
  getRooms(socket);
  watchNewRoomEnter(socket);
  listenRoomLeave(socket);
});
