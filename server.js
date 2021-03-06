const express = require('express');
const mongoose = require('mongoose');

const app = express();
const adsRouter = require('./api_routes/ads');
const adwallRouter = require('./routes/adwall');
const bodyParser = require('body-parser');

const { PORT, DATABASE_URL } = require('./config');

app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/adwall', adwallRouter);
app.use('/api/ads', adsRouter);


app.use(bodyParser.json());
mongoose.Promise = global.Promise;


let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  console.log(databaseUrl, 'This is my  db URL');
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        reject(err);
      }
      console.log('Connected to DB!');
    });
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve();
    }).on('error', (err) => {
      reject(err);
    });
  });
}
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

