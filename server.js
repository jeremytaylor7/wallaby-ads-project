const express = require('express');
const browserSync = require('browser-sync');
const app = express();
const mongoose = require('mongoose');
const dashRouter = require('./routes/dashboard');
const adwallRouter = require('./routes/adwall');
const loginRouter = require('./routes/login');
const postRouter = require('./routes/post');
const registerRouter = require('./routes/register');
const dirRouter = require('./routes/directory');
const userRouter = require('./routes/users');
const myadsRouter = require('./routes/myads');
const bodyParser = require('body-parser');
const passport = require('passport');
const logoutRouter = require('./routes/logout')
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

app.use(bodyParser.json());

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

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };
