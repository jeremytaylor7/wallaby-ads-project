const express = require('express');
const router = express.Router();
const app = express();

router.get('/', function (req, res) {
    res.sendFile('/Users/jeremy/projects/thinkful_capstone_2/public/dashboard.html');
})


module.exports = router;