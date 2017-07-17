const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

router.get('/new', function (req, res) {
    res.sendFile(path.resolve('./public/post.html'));
})


router.post('/', urlencodedParser, function (req, res) {
    createAd(req.body);
    console.log('post was submitted');
    console.log(req.body);
})


module.exports = router;