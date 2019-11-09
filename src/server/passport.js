const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./config');

passport.use(new FacebookTokenStrategy({
  clientId: config.facebookAuth.clientId,
  clientSecret: config.facebookAuth.clientSecret
}));
