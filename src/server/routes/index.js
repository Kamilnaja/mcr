const express = require('express');
const passport = require('passport');

const router = express.Router();
const { generateToken, sendToken } = require('../../utils/token.utils');
require('../passport')();

router.route('/auth/facebook').post(
  passport.authenticate('facebook-token', { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
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
