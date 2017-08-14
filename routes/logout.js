const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const passport = require('passport');
const passportHttp = require('passport-http');
const logout = require('express-passport-logout');


router.get('/', function (req, res) {
    logout();
    console.log('logged out');
    res.sendFile(path.resolve('./public/logout.html'));
})


module.exports = router;