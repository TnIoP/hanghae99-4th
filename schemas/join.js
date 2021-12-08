const mongoose = require('mongoose');

const JoinSchema = new mongoose.Schema({
  postId: Number,
  userId: Number,
});


module.exports = mongoose.model('Join', JoinSchema);
