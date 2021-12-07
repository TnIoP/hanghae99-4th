const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: Number,
  userEmail: String,
  userName: String,
  password: String,
});
module.exports = mongoose.model('User', UserSchema);
