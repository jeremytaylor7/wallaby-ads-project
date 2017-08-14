const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    "title": String,
    "link": String,
    "description": String
})
const Post = mongoose.model('post', postSchema);

module.exports = { Post };
