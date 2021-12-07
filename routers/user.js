const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../schemas/users');
const Join = require('../schemas/join');
const Post = require('../schemas/posts')
const authMiddleware = require('../middlewares/auth-middleware');

// 회원가입 라우터
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
            errorMessage: '패스워드가 패스워드 확인란과 일치하지 않습니다.',
        });
        return;
    }
    console.log('existusers 전');

    const existEmail = await User.find({ userEmail });
    console.log('existusers 후');

    if (existEmail.length) {
        res.status(400).send({
            existEmail,
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
    let userId = 1;
    const recentUser = await User.find().sort("-userId").limit(1)

    if (recentUser.length != 0) {
        userId = recentUser[0]['userId'] + 1;
    }
    const user = new User({ userId, userEmail, userName, password });
    await user.save();
    res.status(201).send({});
});


//로그인 라우터
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
    const token = jwt.sign({ userId: user.userId, userEmail:user.userEmail, userName: user.userName }, 'my-secret-key')
    console.log(token)
    res.send({
        result:"success",
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
    const userEmail = user.userEmail
    const userName = user.userName

    res.send({
        userEmail: userEmail,
        userName: userName
    })
    
})

router.put('/mypage/:userId', authMiddleware, async (req, res)=>{
    const { userId } = req.params
    const user = await User.findOne({userId})
    const {userName, password, passwordConfirm} = req.body
    const userEmail = user.userEmail
    if (password !== passwordConfirm) {
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 일치하지 않습니다.',
        });
        return;
    }
    const existName = await User.find({ userName })
    
    if (existName.length){
        res.status(400).send({
            result:"nidknameExist",
            errorMessage: "중복된 닉네임 입니다."
        })
        return
    }

    await User.updateOne({userId:userId}, {$set:{userId:userId,userEmail:userEmail,userName:userName,password:password}}).exec()
    res.send({
        result:"success"
    })
})

router.get('/mypage/post/:userId', authMiddleware, async(req, res)=>{
    const {userId} = req.params
    const mypost = await Post.find({userId}).exec()

    res.send({
        mypost: mypost
    })
})
// 내가 쓴 글 삭제
router.delete('/mypage/post/:userId/:postId', authMiddleware, async (req, res) => {
    const { userId,postId } = req.params;
    await Post.deleteOne({ userId, postId });
    res.send({ result: 'success' });
});
router.get('/mypage/join/:userId', authMiddleware, async(req, res)=>{
    const {userId} = req.params
    const myjoin = await User.find({userId}).exec()
    res.send({
        myjoin : myjoin
    })
})

module.exports = router;
