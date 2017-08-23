const express = require('express');
const mongoose = require('mongoose');
const browserSync = require('browser-sync');
const app = express();
const adsRouter = require('./api_routes/ads');
const adwallRouter = require('./routes/adwall');
const bodyParser = require('body-parser');
const port = 9777;
const isProduction = 'production' === process.env.NODE_ENV;
const { PORT, DATABASE_URL } = require('./config');
app.use(bodyParser.json());

app.use(express.static('public'));
// app.listen(process.env.PORT || port, listening);

app.use('/adwall', adwallRouter);
app.use('/api/ads', adsRouter);


app.use(bodyParser.json());
mongoose.Promise = global.Promise;

// function listening() {
//     if (!isProduction) {
//         console.log('listening on port' + port);
//         // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
//         browserSync({
//             files: ['src/**/*.{html,js,css}'],
//             online: false,
//             open: false,
//             port: port + 1,
//             proxy: 'localhost:' + port,
//             ui: false
//         });
//     }
// }
let server;

function runServer(databaseUrl, port) {

    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            };
            console.log('Connected to DB!');
        })
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
        }).on('error', err => {
            reject(err)
        });
    });
};
function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};



if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };

