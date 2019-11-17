const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    console.log('req', req.user);
    res.json({
      status: 'ok'
    });
  }
);

module.exports = router;
