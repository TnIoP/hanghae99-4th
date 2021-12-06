const mongoose = require('mongoose');

const JoinSchema = new mongoose.Schema({
    postId : Number,
    userId : String,
    joinCheck : Boolean,
});
module.exports = mongoose.model('Join', JoinSchema);
