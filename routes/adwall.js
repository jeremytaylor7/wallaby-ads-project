const path = require('path');
const Strategy = require('passport-facebook').Strategy;
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const { User } = require('../models/usermodel.js');
const router = express.Router();
const app = express();
app.use(bodyParser);

router.use(express.static('public'));

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'http://localhost:8080/adwall/facebook/auth/cb',
    profileFields: ['id', 'displayName', 'photos', 'email']

},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }

));

router.get('/public', passport.authenticate('facebook'), function (req, res) {
    console.log(req.isAuthenticated());
    res.sendFile(path.resolve('./public/adwall.html'));
});

router.get('/facebook/logout', (req, res) => {
    req.logout();
    res.end();
})
router.get('/facebook/auth', passport.authenticate('facebook'));
router.get('/facebook/auth/cb',
    passport.authenticate('facebook', {
        successRedirect: '/adwall/public',
        failureRedirect: '/login'
    }));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



module.exports = router;