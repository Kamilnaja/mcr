const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateToken = require('./../utils/token.utils').generateToken;
const sendToken = require('./../utils/token.utils').sendToken;

router.route('/auth/facebook')
    .post(passport.authenticate('facebook-token', { session: false })
        , (req, res, next) => {
            if (!req.user) {
                res.send(401, 'User not auth')
            }
            req.auth = {
                id: req.user.id
            }
            return next();
        }, generateToken, sendToken)


module.exports = router;