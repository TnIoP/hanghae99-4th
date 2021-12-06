const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Posts = require('./models/posts');
const Comments = require('./models/comments');
const Join = require('./models/join');
const authMiddleware = require('./middlewares/auth-middleware');

mongoose.connect('mongodb://localhost/post', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
const router = express.Router();










app.use('/api', express.urlencoded({ extended: false }), router);
app.use(express.static('assets'));

app.listen(8080, () => {
  console.log('서버가 요청을 받을 준비가 됐어요');
});
