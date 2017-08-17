const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const random = require('../library/random');
const { Post } = require('../models/postmodel');


router.get('/', (req, res) => {
    return Post
        .find()
        .exec()
        .then(posts => {
            console.log(posts);
            res.status(200).json(posts);
        })
        .catch(
        err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
})

router.post('/', (req, res) => {
    return Post
        .create(req.body)
        .then(user => {
            console.log(user);
            res.status(200).json(user);
        })
        .catch(
        err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
})

router.put('/:id', (req, res) => {
    res.send('put request api');
});

router.delete('/:id', (req, res) => {
    res.send('delete request api');
})

module.exports = router;