const express = require('express');
const app = express();
const dashRouter = require('./routes/dashboard');


app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

app.use('/dashboard', dashRouter);

console.log('listening on port 8080');

module.exports = app;