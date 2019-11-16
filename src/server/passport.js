const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mysql = require('mysql');
const config = require('./config');

const pool = mysql.createPool({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
});


passport.use(new FacebookStrategy({
  clientID: config.facebookAuth.clientID,
  clientSecret: config.facebookAuth.clientSecret,
  callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));
