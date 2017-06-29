const express = require('express');
const app = express();
const dashRouter = require('./routes/dashboard');
const adwallRouter = require('./routes/adwall');
const postRouter = require('./routes/post');
const dirRouter = require('./routes/directory');
const myadsRouter = require('./routes/myads');

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

app.use('/dashboard', dashRouter);
app.use('/adwall', adwallRouter);
app.use('/post', postRouter);
app.use('/directory', dirRouter);
app.use('/myads', myadsRouter);
console.log('listening on port 8080');

module.exports = app;