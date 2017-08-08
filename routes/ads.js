const express = require('express');
const mongoose = require('mongoose');
const { BasicStrategy } = require('passport-http');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const Post = require('../models/postmodel.js');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const app = express();

router.use(bodyParser.json());

router.get('/', (req, res) => {
    console.log('getting ads');
    return Post
        .find()
        .exec()
        .then(users => res.json(users.map(user => user.apiRepr())))
        .catch(err => console.log(err) && res.status(500).json({ message: 'Internal server error' }));
});

router.post('/', (req, res) => {
    console.log('posting ad!');
    return User
});

router.put('/:id', (req, res) => {
    console.log('updating user');
    return User
        .find({ id: req.params.id })
        .exec()
        .then(user => { })
        .catch(err => console.log(err) && res.status(500).json({ message: 'Internal server error' }));
    res.end();
})


router.delete('/:id', (req, res) => {
    return User
        .findByIdAndRemove({ id: req.params.id })
        .then(() => { console.log('item successfully removed') })
        .catch(err => { console.log(err) && res.status(500).json({ message: 'Internal server error' }) });
    console.log('deleting user');
    res.end();
})

module.exports = router;

