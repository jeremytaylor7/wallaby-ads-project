const express = require('express');
const router = express.Router();
const app = express();

app.use(express.static('public'));
router.get('/', function (req, res) {
    res.sendFile('/Users/jeremy/projects/thinkful_capstone_2/public/adwall.html');

})


module.exports = router;