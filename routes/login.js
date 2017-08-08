const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const passport = require('passport');
router.get('/', function (req, res) {
    res.sendFile(path.resolve('./public/login.html'));
})



router.post('/',
    passport.authenticate('local'),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/users/' + req.user.username);
    });

module.exports = router;
