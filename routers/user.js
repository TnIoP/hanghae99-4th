const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../schemas/users');
const Join = require('../schemas/join');
const Post = require('../schemas/posts')
const Comment = require('../schemas/comments')
const authMiddleware = require('../middlewares/auth-middleware');

// 회원가입 
router.post('/register', async (req, res) => {
    console.log(req.body);
    const { userEmail, userName, password, passwordConfirm } = req.body;
    console.log(userEmail);
    console.log(userName);
    console.log(password);
    console.log(passwordConfirm);

    if (password !== passwordConfirm) {
        console.log('패스워드 체크 막힘');
        res.status(400).send({
            result: 'passwordError',
            errorMessage: '패스워드가 패스워드 확인란과 일치하지 않습니다.',
        });
        return;
    }
    console.log('existusers 전');

    const existEmail = await User.find({ userEmail });
    console.log('existusers 후');

    if (existEmail.length) {
        res.status(400).send({
            result: "existError",
            errorMessage: '이미 가입된 아이디가 있습니다.',
        });
        return;
    }
    const existName = await User.find({ userName });
    if (existName.length) {
        res.status(400).send({
            result: "usernameExist",
            errorMessage: '중복된 닉네임이 있습니다.',
        });
        return;
    }
    let userId = 1;
    const recentUser = await User.find().sort("-userId").limit(1)

    if (recentUser.length != 0) {
        userId = recentUser[0]['userId'] + 1;
    }
    const user = new User({ userId, userEmail, userName, password });
    await user.save();
    res.status(201).send({
        result: "success"
    });
});


//로그인 
router.post('/login', async (req, res) => {
    const { userEmail, password } = req.body
    const user = await User.findOne({ userEmail, password })
    console.log('/login post 들어옴 => user')
    console.log(user)
    if (user == null) {
        res.status(401).send({
            result: "notExist",
            errorMessage: '아이디와 비밀번호를 확인하세요.',
        })
        return
    }
    const token = jwt.sign({ userId: user.userId, userEmail: user.userEmail, userName: user.userName }, 'my-secret-key')
    console.log(token)
    res.send({
        result: "success",
        token,
    })
})



//마이페이지 조회 API
router.get('/mypage/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params
    const user = await User.findOne({ userId })
    const userEmail = user.userEmail
    const userName = user.userName

    res.send({
        userEmail: userEmail,
        userName: userName
    })

})

// 내정보 수정 API
router.patch('/mypage/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params
    const user = await User.findOne({ userId })
    const { userName, password, passwordConfirm } = req.body
    const userEmail = user.userEmail
    if (password !== passwordConfirm) {
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 일치하지 않습니다.',
        });
        return;
    }
    const existName = await User.find({ userName })

    if (existName.length) {
        res.status(400).send({
            result: "nidknameExist",
            errorMessage: "중복된 닉네임 입니다."
        })
        return
    }

    await User.updateOne({ userId: userId }, { $set: { userName: userName, password: password } }).exec()
    await Post.updateMany({ userId: userId }, { $set: { userName: userName } })
    await Join.updateMany({ userId: userId }, { $set: { userName: userName } })
    res.send({
        result: "success"
    })
})
// 내가 작성한 모임 API
router.get('/mypage/posts/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params
    const mypost = await Post.find({ userId }).exec()

    res.send({
        mypost: mypost
    })
})

// 내가 쓴 글 삭제
router.delete('/mypage/posts/:userId/:postId', authMiddleware, async (req, res) => {
    const { userId, postId } = req.params;

    await Post.deleteOne({ userId, postId });
    await Join.deleteMany({ postId });
    await Comment.deleteMany({ postId })
    res.send({ result: 'success' });
});

//참가한 스터디 목록
router.get('/mypage/join/:userId', authMiddleware, async (req, res) => {
    const { userId } = req.params
    let temp
    let temp2
    const existJoin = await Join.find({ userId })
    const existPost = []
    for (let i = 0; i < existJoin.length; i++) {
        temp = existJoin[i]['postId'];
        console.log(temp)
        temp2 = await Post.findOne({ postId: temp });
        console.log(temp2)
        existPost.push(temp2);
    }
    res.send(existPost);

})

module.exports = router;
