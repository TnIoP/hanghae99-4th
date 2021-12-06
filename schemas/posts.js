const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
  postId: Number,
  title: String,
  subject: String,
  userId: String,
  userName: String,
  content: String,
  deadline_date: String,
  currentState: Number,
  state: Number,
});
module.exports = mongoose.model('Posts', PostsSchema);
