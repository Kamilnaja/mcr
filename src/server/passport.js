const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});

passport.use(new FacebookTokenStrategy({
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
