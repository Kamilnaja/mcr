module.exports = (app, passport) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
