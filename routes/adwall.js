const path = require('path');
const { BasicStrategy } = require('passport-http');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const { User } = require('../models/usermodel.js');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const app = express();

router.use(jsonParser);
router.use(passport.initialize());

app.use(express.static('public'));

const basicStrategy = new BasicStrategy((username, password, callback) => {
    let user;
    User
        .findOne({ username: username })
        .exec()
        .then(_user => {
            user = _user;
            if (!user) {
                return callback(null, false);
            }
            return user.validatePassword(password);
        })
        .then(isValid => {
            if (!isValid) {
                return callback(null, false);
            }
            else {
                return callback(null, user);
            }
        })
        .catch(err => callback(err));
});

passport.use(basicStrategy);

router.get('/',
    passport.authenticate('basic', { session: true }), function (req, res) {
        res.sendFile(path.resolve('./public/adwall.html'));
        // res.json({ user: req.user.apiRepr() });
    });
router.get('/logout', (req, res) => {
    req.logout();
    res.sendFile(path.resolve('./public/logout.html'));
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



module.exports = router;