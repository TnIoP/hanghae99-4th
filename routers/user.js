const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../schemas/users');
const Join = require('../schemas/join');
const authMiddleware = require('../middlewares/auth-middleware');

// 회원가입 라우터
router.post('/register', async (req, res) => {
    console.log(req.body);
    const { userId, userName, password, passwordConfirm } = req.body;
    console.log(userId);
    console.log(userName);
    console.log(password);
    console.log(passwordConfirm);

    if (password !== passwordConfirm) {
        console.log('패스워드 체크 막힘');
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 일치하지 않습니다.',
        });
        return;
    }
    console.log('existusers 전');

    const existId = await User.find({ userId });
    console.log('existusers 후');

    if (existId.length) {
        res.status(400).send({
            errorMessage: '이미 가입된 아이디가 있습니다.',
        });
        return;
    }
    const existName = await User.find({ userName });
    if (existName.length) {
        res.status(400).send({
            errorMessage: '중복된 닉네임이 있습니다.',
        });
        return;
    }

    const user = new User({ userId, userName, password });
    await user.save();
    res.status(201).send({});
});


//로그인 라우터
router.post('/login', async (req, res) => {
    const { userId, password } = req.body
    const user = await User.findOne({ userId, password })
    console.log('/login post 들어옴 => user')
    console.log(user)
    if (user == null) {
        res.status(401).send({
            errorMessage: '아이디와 비밀번호를 확인하세요.',
        })
        return
    }
    const token = jwt.sign({ userId: user.userId, userName: user.userName }, 'my-secret-key')
    console.log(token)
    res.send({
        token,
    })
})

//내 정보 조회 API
// router.get('/users/me', authMiddleware, async (req, res) => {
//     const { user } = res.locals
//     res.send({
//         user: {
//             userId: user.id,
//             userName: user.userName
//         },
//     })
// })

//마이페이지 조회 API
router.get('/mypage/:userId', authMiddleware, async (req, res)=>{
    const { userId } = req.params
    const user = await User.findOne({ userId })

    const userName = user.userName
    res.send({
        userId: userId,
        userName: userName
    })
    
})

module.exports = router;
