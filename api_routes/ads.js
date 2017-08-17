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

    return Post
        .findByIdAndUpdate(req.params.id,
        {
            $set: {
                "title": req.body.title,
                "link": req.body.link,
                "description": req.body.description
            }
        }, function (err, post) {
            if (err) { console.error(err) }
            res.status(204).json({ post });
        });
});

router.delete('/:id', (req, res) => {
    return Post
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(() => {
            res.status(204).json({ message: "item deleted successfully" });
        })
        .catch(err => {
            console.log(err);
        })

})

module.exports = router;