const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory');
const config = require('./config/config');
const { utils } = require('../utils/Utils');
const RoomList = require('./RoomList');

const roomList = new RoomList();
const port = 8080;

require('./routes/auth')(app, passport);
require('./routes/base/base')(app);
require('./config')(app, passport);

server.listen(port);

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

// db
// const pool = mysql.createPool({

// })

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS user_info (user_id STRING, user_name STRING)');
  const statement = db.prepare('INSERT INTO user_info VALUES ("2", "Niesamowity janusz, szkoda słow")');
  statement.run();
  statement.finalize();
  db.each('SELECT * FROM user_info', (err, row) => {
    console.log(row.user_id, row.user_name);
  });
  db.close();
});


db.serialize();
// passport

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: config.facebook_api_key,
  clientSecret: config.facebook_api_secret,
  callbackURL: config.callback_url
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    if (config.use_database) {
      pool.query('SELECT * from user_info where user_id =' + profile.id, (err, rows) => {

      })
      return done(null, profile);
    }
  });
}));

io.on('connection', (socket) => {
  handleCreateNewUser(socket);
  getRooms(socket);
  watchNewRoomEnter(socket);
  listenRoomLeave(socket);
});
