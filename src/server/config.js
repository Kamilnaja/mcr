const morgan = require('morgan');

module.exports = (app, passport) => {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(morgan('dev'));
};
