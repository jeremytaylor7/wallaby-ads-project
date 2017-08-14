const path = require('path');
const { BasicStrategy } = require('passport-http');
const Strategy = require('passport-facebook').Strategy;
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const { User } = require('../models/usermodel.js');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const app = express();

// router.use(jsonParser);
// router.use(passport.initialize());

router.use(express.static('public'));
passport.use(new Strategy({
    clientID: '472280536469569',
    clientSecret: '7d851fff7f9ca432d04716834afa1ca7',
    callbackURL: 'http://localhost:8080/adwall/facebook/auth/cb'
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

router.get('/', function (req, res) {
    console.log('request made for adwall');
    res.sendFile(path.resolve('./public/adwall.html'));
});

router.get('/facebook/auth', passport.authenticate('facebook'));
router.get('/facebook/auth/cb',
    passport.authenticate('facebook', {
        successRedirect: '/register',
        failureRedirect: '/login'
    }));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



module.exports = router;