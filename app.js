const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Posts = require('./models/posts');
const Comments = require('./models/comments');
const authMiddleware = require('./middlewares/auth-middleware');

mongoose.connect('mongodb://localhost/post', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
const router = express.Router();

const postUsersSchema = Joi.object({
  nickname: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,}$')),
  password: Joi.string().required(),
});

router.post('/users', async (req, res) => {
  // 회원가입
  try {
    const { nickname, password } = await postUsersSchema.validateAsync(
      req.body
    );

    const existUsers = await User.find({
      nickname,
    });
    if (existUsers.length) {
      res.status(400).send({
        errorMessage: '이미 가입된 닉네임이 있습니다.',
      });
      return; // 에러가 났으면 이미 끝난 것 (위와 같이 예외처리)
    }

    if (password.search(nickname) > -1) {
      res.status(400).send({
        errorMessage: '비밀번호에 닉네임이 포함되었습니다.',
      });
      return;
    }

    if (password.length < 4) {
      res.status(400).send({
        errorMessage: '비밀번호는 4자이상 입력해주세요.',
      });
      return;
    }

    const recentUserId = await User.find().sort('-userId').limit(1);
    let userId = 1;
    if (recentUserId.length !== 0) {
      userId = recentUserId[0]['userId'] + 1; // 새로 작성된 Id의 key값+1 (중복제거를 위함)
    }

    let createdAt = new Date();

    const user = new User({ createdAt, nickname, password, userId });
    await user.save();

    res.status(201).send({}); // 응답값이 없어도 되지만, restAPI원칙에 따르면 created라는 201 status코드가 있음
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
    });
  }
});

const postAuthSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});
router.post('/auth', async (req, res) => {
  // 로그인 (토큰발급)
  try {
    const { nickname, password } = await postAuthSchema.validateAsync(req.body);

    const user = await User.findOne({ nickname, password }).exec();

    if (!user) {
      res.status(400).send({
        errorMessage: '닉네임 또는 패스워드가 잘못됐습니다.',
      });
      return;
    }

    const token = jwt.sign({ userId: user.userId }, 'my-secret-key');
    res.send({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: '요청한 데이터 형식이 올바르지 않습니다.',
    });
  }
});

router.get('/users/me', authMiddleware, async (req, res) => {
  // 이 미들웨어를 사용하면 res.locals에 접근하면 항상 사용자정보가 들어있는 상태로 api를 구현하면 된다. 엄청쉬워짐
  const { user } = res.locals;
  res.send({
    // 기본 status 코드는 200
    user, // 현재 패스워드값이 포함되어있는데 원래는 이렇게 하면 안된다. 패스워드는 암호화 되어있어도 로그를 남기면 안됨
  });
});

router.get('/posts', async (req, res) => {
  // 전체 게시글 목록 조회
  const post = await Posts.find({}).sort('-postId'); // 게시글을 작성 날짜 기준으로 내림차순 정렬
  res.json(post);
});

router.post('/posts', authMiddleware, async (req, res) => {
  // 게시글 등록
  const { nickname, userId } = res.locals.user;
  const { title, content } = req.body;
  const recentList = await Posts.find().sort('-postId').limit(1); // 마지막 등록된 게시글의 key값 가져오기
  let postId = 1;

  if (recentList.length !== 0) {
    postId = recentList[0]['postId'] + 1; // 새로 작성된 게시글의 key값+1 (중복제거를 위함)
  }

  let createdAt = new Date();
  let updatedAt = new Date();

  const post = new Posts({
    content,
    createdAt,
    nickname,
    postId,
    title,
    updatedAt,
    userId,
  });
  await post.save();
  res.status(201).send({});
});

router.get('/posts/:postId', async (req, res) => {
  // 게시물 상세페이지
  try {
    const { postId } = req.params;
    let posts = await Posts.findOne({ postId });
    res.json(posts);
  } catch (err) {
    console.error(err);
  }
});

router.post('/comments/:postId', authMiddleware, async (req, res) => {
  // 댓글 등록
  const { postId } = req.params;
  const { nickname, userId } = res.locals.user;
  const { comment } = req.body;
  const recentComment = await Comments.find().sort('-commentId').limit(1); // 마지막 등록된 댓글의 key값 가져오기
  let commentId = 1;
  if (recentComment.length !== 0) {
    commentId = recentComment[0]['commentId'] + 1; // 새로 작성된 댓글의 key값+1 (중복제거를 위함)
  }

  let createdAt = new Date();
  let updatedAt = new Date();

  const comments = new Comments({
    comment,
    commentId,
    createdAt,
    nickname,
    updatedAt,
    userId,
    postId,
  });
  await comments.save();
  res.status(201).send({});
});

router.get('/comments/:postId', authMiddleware, async (req, res) => {
  // 해당 게시글의 모든 댓글 조회
  try {
    let comments = await Comments.find({});

    res.json(comments);
  } catch (err) {
    console.error(err);
  }
});

router.get('/comment/:postId', async (req, res) => {
  // 해당 게시글의 모든 댓글 조회
  try {
    let comments = await Comments.find({});

    res.json(comments);
  } catch (err) {
    console.error(err);
  }
});

router.patch('/comments/:commentId', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { commentId } = req.params;
  const { comment } = req.body;

  const existsComment = await Comments.findOne({
    userId,
    commentId,
  }).exec();

  existsComment.comment = comment;
  existsComment.updatedAt = new Date();
  await existsComment.save();

  // NOTE: 성공했을때 딱히 정해진 응답 값이 없다.
  res.send({});
});

router.delete('/comments/:commentId', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { commentId } = req.params;

  const existsComment = await Comments.findOne({
    userId,
    commentId,
  }).exec();

  // 있든 말든 신경 안쓴다. 그냥 있으면 지운다.
  if (existsComment) {
    await existsComment.delete();
  }

  // NOTE: 성공했을때 딱히 정해진 응답 값이 없다.
  res.send({});
});

router.get('/post/:postId', authMiddleware, async (req, res) => {
  // 전체 게시글 목록 조회
  const post = await Posts.find({}).sort('-postId'); // 게시글을 작성 날짜 기준으로 내림차순 정렬
  res.json(post);
});

router.get('/modify/:postId', authMiddleware, async (req, res) => {
  // 게시물 수정 페이지 진입 시 처음 세팅을 위한 get
  try {
    const { postId } = req.params;
    let posts = await Posts.findOne({ postId });
    res.json(posts);
  } catch (err) {
    console.error(err);
  }
});

router.patch('/modify/:postId', authMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  const { title, content } = req.body;

  const existsPost = await Posts.findOne({ postId }).exec();

  existsPost.title = title;
  existsPost.content = content;
  existsPost.updatedAt = new Date();
  await existsPost.save();

  // NOTE: 성공했을때 딱히 정해진 응답 값이 없다.
  res.send({});
});

app.use('/api', express.urlencoded({ extended: false }), router);
app.use(express.static('assets'));

app.listen(8080, () => {
  console.log('서버가 요청을 받을 준비가 됐어요');
});
