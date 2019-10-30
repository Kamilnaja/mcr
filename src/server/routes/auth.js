module.exports = (app, passport) => {
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
  app.get('/facebook', (req, res) => res.send('hello world'));
  app.get('/logout', (req, res) => { })

  app.get('/account', ensureAuthenticated, (req, res) => {
    res.render('account', { user: req.user });
  });
};
