require('./mongoose')();
const passport = require('passport');
const User = require('mongoose').model('User');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./config/config');

module.exports = () => {
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret
      },
      (accessToken, refreshToken, profile, done) => {
        User.upsertFbUser(accessToken, refreshToken, profile, (err, user) => done(err, user));
      }
    )
  );
};
