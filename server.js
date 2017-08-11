const express = require('express');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const browserSync = require('browser-sync');
const app = express();
const mongoose = require('mongoose');
const dashRouter = require('./routes/dashboard');
const adwallRouter = require('./routes/adwall');
const loginRouter = require('./routes/login');
const postRouter = require('./routes/post');
const registerRouter = require('./routes/register');
const dirRouter = require('./routes/directory');
const adsRouter = require('./routes/ads');
const userRouter = require('./routes/users');
const myadsRouter = require('./routes/myads');
const bodyParser = require('body-parser');
const logoutRouter = require('./routes/logout')
const successRouter = require('./routes/success');
const { DATABASE_URL, PORT } = require('./config.js');
const port = 9777;
const isProduction = 'production' === process.env.NODE_ENV;

app.use(express.static('public'));
app.listen(process.env.PORT || port, listening);
app.use(passport.initialize());
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashRouter);
app.use('/adwall', adwallRouter);
app.use('/posts', postRouter);
app.use('/directory', dirRouter);
app.use('/myads', myadsRouter);
app.use('/users', userRouter);
app.use('/logout', logoutRouter);
app.use('/register-success', successRouter);
app.use('/api/ads', adsRouter);
// app.use(bodyParser.json());
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport());


function listening() {
    if (!isProduction) {
        console.log('listening on port' + port);
        // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
        browserSync({
            files: ['src/**/*.{html,js,css}'],
            online: false,
            open: false,
            port: port + 1,
            proxy: 'localhost:' + port,
            ui: false
        });
    }
}
let server;

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(PORT, () => {
                console.log(`Your app is listening on port ${PORT}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

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


app.use(passport.initialize());
app.use(passport.session());

app.get('/facebook/logout', (req, res) => {
    req.logout();
    res.end();
})
app.get('/facebook/auth', passport.authenticate('facebook'));
app.get('/facebook/auth/cb',
    passport.authenticate('facebook', {
        successRedirect: '/adwall',
        failureRedirect: '/login'
    }));
// public router
//cannot use passport.auth on other links
// //add this router back to adwall.js
// app.get('/adwall', function (req, res) {
//     console.log(req.isAuthenticated());
//     console.log(req.user);
//     res.sendFile(path.resolve('./public/adwall.html'));
// });

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };
