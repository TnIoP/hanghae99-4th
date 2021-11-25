const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  createdAt: String,
  nickname: String,
  password: String,
  userId: Number,
});
UserSchema.virtual('userId').get(function () {
  return this._id.toHexString();
});
UserSchema.set('toJSON', {
  virtuals: true,
});
module.exports = mongoose.model('User', UserSchema);
