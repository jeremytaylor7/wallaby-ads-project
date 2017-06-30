const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

app.use(express.static('public'));
router.get('/', function (req, res) {
    res.sendFile(path.resolve('./public/adwall.html'));

})


module.exports = router;