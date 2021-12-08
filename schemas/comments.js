const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
  postId: Number,
  userId: Number,
  userName:String,
  commentId: Number,
  content: String,
});
module.exports = mongoose.model('Comments', CommentsSchema);
