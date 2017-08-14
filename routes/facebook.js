const express = require('express');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const router = express.Router();


passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'http://localhost:8080/facebook/auth/cb'
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


var app = express();

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


app.use(passport.initialize());
app.use(passport.session());


//changed to app instead of router
app.get('/logout', (req, res) => {
    req.logout();
    res.end();
})
app.get('/auth', passport.authenticate('facebook'));
app.get('/auth/cb',
    passport.authenticate('facebook', {
        successRedirect: '/adwall/public',
        failureRedirect: '/login'
    }));

module.exports = router;
