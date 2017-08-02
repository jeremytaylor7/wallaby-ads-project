const express = require('express');
const browserSync = require('browser-sync');
const app = express();
const dashRouter = require('./routes/dashboard');
const adwallRouter = require('./routes/adwall');
const postRouter = require('./routes/post');
const dirRouter = require('./routes/directory');
const myadsRouter = require('./routes/myads');
const bodyParser = require('body-parser');
const passport = require('passport');
const port = 9777;
const isProduction = 'production' === process.env.NODE_ENV;

app.use(express.static('public'));
app.listen(process.env.PORT || port, listening);
app.use(passport.initialize());

app.use('/dashboard', dashRouter);
app.use('/adwall', adwallRouter);
app.use('/posts', postRouter);
app.use('/directory', dirRouter);
app.use('/myads', myadsRouter);

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


module.exports = app;