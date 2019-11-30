const express = require('express');

const router = express.Router();
const passport = require('passport');
const { generateToken, sendToken } = require('../utils/token.utils');

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }),
  (req, res) => {
    console.log('req', req.user);
    res.json({
      status: 'ok'
    });
  }
);

router.route('/auth/facebook').post(
  passport.authenticate('facebook-token', {
    session: false
  }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User not authenticated');
    }
    req.auth = {
      id: req.user.id
    };
    next();
  },
  generateToken,
  sendToken
);

module.exports = router;
