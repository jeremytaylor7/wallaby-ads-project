const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

router.get('/', function (req, res) {
    console.log('register request sent')
    res.sendFile(path.resolve('./public/register.html'));
})


module.exports = router;