const express = require('express');
const router = express.Router();
const app = express();

router.get('/', function (req, res) {
    res.sendFile(path.resolve('./public/post.html'));
})


module.exports = router;