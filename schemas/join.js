const mongoose = require('mongoose');

const JoinSchema = new mongoose.Schema({
  postId: Number,
  userId: Number,
  joinCheck: Boolean,
});


module.exports = mongoose.model('Join', JoinSchema);
