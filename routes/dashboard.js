const express = require('express');
const router = express.Router();
const app = express();

router.get('/', function (req, res) {
    res.sendFile(path.resolve('./public/dashboard.html'));
})


module.exports = router;