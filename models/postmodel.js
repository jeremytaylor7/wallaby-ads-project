const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: String,
  link: String,
  description: String,
  adCode: String,
});
const Post = mongoose.model('post', postSchema);

module.exports = { Post };
