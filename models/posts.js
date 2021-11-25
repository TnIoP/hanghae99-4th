const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
  content: String,
  createdAt: String,
  nickname: String,
  postId: Number,
  title: String,
  updatedAt: String,
  userId: Number,
});
PostsSchema.virtual('postsId').get(function () {
  return this._id.toHexString();
});
PostsSchema.set('toJSON', {
  virtuals: true,
});
module.exports = mongoose.model('Posts', PostsSchema);
