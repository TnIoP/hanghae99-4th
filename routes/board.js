var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('board');
});

router.get('/post', function(req, res, next) {
    res.render('post');
});

router.get('/view', function(req, res, next) {
  res.send('Router 게시글 조회 페이지')
});
  
router.get('/modify', function(req, res, next) {
    res.send('Router 게시글 수정 페이지')
  });

module.exports = router;