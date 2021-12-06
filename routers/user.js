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

module.exports = router;
