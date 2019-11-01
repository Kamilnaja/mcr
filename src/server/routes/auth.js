module.exports = (app, passport) => {
  // eslint-disable-next-line consistent-return
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

  app.get('/', (req, res) => {
    res.json({ name: 'hello world' });
  });

  app.get('/account', ensureAuthenticated, (req, res) => {
    res.send('Login successful');
  });

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  app.get('auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/', failureRedirect: '/login'
  }), (req, res) => res.send('hello world'));

  app.get('/login', (req, res) => {
    res.send('Welcome in login page');
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


};
