var express = require('express');
var router = express.Router();

router.get('/board/post', function (req, res, next) {
  res.render('post');
});

router.get('/detail', function (req, res, next) {
  res.render('detail');
});

router.get('/modify', function (req, res, next) {
  res.render('modify');
});

module.exports = router;