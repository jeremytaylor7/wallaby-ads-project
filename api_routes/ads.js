const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const express = require('express');

const router = express.Router();
const { Post } = require('../models/postmodel');


router.get('/', (req, res) => Post
  .find()
  .exec()
  .then((posts) => {
    res.status(200).json(posts);
  })
  .catch(
  (err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }));

router.get('/:id', (req, res) => Post
  .findById(req.params.id)
  .exec()
  .then((post) => {
    res.status(200).json(post);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }));

router.post('/', (req, res) => Post
  .create(req.body)
  .then((user) => {
    console.log(user);
    res.status(201).json(user);
  })
  .catch(
  (err) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }));

router.put('/:id', (req, res) => Post
  .findByIdAndUpdate(req.params.id,
  {
    $set: {
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
    },
  }, (err, post) => {
    if (err) { console.error(err); }
    res.status(200).json(post);
  }));

router.delete('/:id', (req, res) => Post
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(() => {
    res.status(200).json({ message: 'item deleted successfully' });
  })
  .catch((err) => {
    console.log(err);
  }));

module.exports = router;

