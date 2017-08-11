const path = require('path');
// const Strategy = require('passport-facebook').Strategy;
const bodyParser = require('body-parser');
const passport = require('passport');
// const { User } = require('../models/usermodel.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express();

app.use(cookieParser());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



router.get('/', passport.authenticate('facebook'), function (req, res) {
    console.log(req.isAuthenticated());
    console.log(req.user);
    res.sendFile(path.resolve('./public/adwall.html'));
});


module.exports = router;