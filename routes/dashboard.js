const express = require('express');
const router = express.Router();
const app = express();

router.get('/', function (req, res) {
    res.sendFile('dashboard.html', { root: '/public/' });
})


module.exports = router;