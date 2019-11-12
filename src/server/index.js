const app = require('express')();
const server = require('http').Server(app);
const morgan = require('morgan');
const passport = require('passport');
const mysql = require('mysql');
const io = require('socket.io')(server);
const FacebookTokenStrategy = require('passport-facebook-token');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config');

const RoomList = require('./RoomList');
require('./passport');
const { utils } = require('../utils/Utils');

const pool = mysql.createPool({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});

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

passport.use(new FacebookStrategy({
  clientID: config.facebookAuth.clientID,
  clientSecret: config.facebookAuth.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    if (config.use_database) {
      console.log('use db');

      pool.query(`SELECT * from user_info where user_id=${profile.id}`, (err, rows) => {
        if (err) throw err;
        if (rows && rows.length === 0) {
          console.log('There is no such user, adding now');
          pool.query(`INSERT into user_info(user_id,user_name) VALUES('${profile.id}','${profile.username}')`);
        } else {
          console.log('User already exists in database');
        }
      });
    }
    return done(null, profile);
  });
}));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.use(morgan('combined'));

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
