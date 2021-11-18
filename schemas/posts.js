const mongoose = require("mongoose");

const { Schema } = mongoose;
const postsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  pw: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true

  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Posts", postsSchema);