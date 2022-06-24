const express = require("express");
const { listenerCount } = require("../schemas/posts");
const Posts = require("../schemas/posts");

const router = express.Router();

router.delete("/modify/:postId", async (req, res) => { // modify.ejs : 게시글 삭제
    const { postId } = req.params;
    const { pw } = req.body;

    let posts = await Posts.findOne({ postId });

    if (posts.pw == pw) {
        await Posts.deleteOne({ postId });
        res.send({ result: "success" });
    } else {
        res.send({ result: "fail" });
    }
})

router.post("/modify/:postId", async (req, res) => { // modify.ejs : 게시글 수정 db에 반영
    const { postId, name, title, text, pw } = req.body;

    let posts = await Posts.findOne({ postId });

    if (posts.pw == pw) {
        await Posts.updateOne({ postId }, { $set: { name: name, title: title, text: text } });
        res.send({ result: "success" });
    } else {
        res.send({ result: "fail" });
    }
});

router.get("/modify/:postId", async (req, res) => { // modify.ejs : 게시물 수정 페이지 진입 시 처음 세팅을 위한 get
    try {
        const { postId } = req.params;
        let posts = await Posts.findOne({ postId });
        res.json(posts);
    } catch (err) {
        console.error(err);
    }
});

router.get("/detail/:postId", async (req, res) => { // detail.ejs : 게시글 조회
    try {
        const { postId } = req.params;
        let posts = await Posts.findOne({ postId });
        res.json(posts);
    } catch (err) {
        console.error(err);
    }
});

router.get("/board", async (req, res) => { // board.ejs : 전체 게시글 목록 조회
    const post = await Posts.find({}).sort("-postId"); // 게시글을 작성 날짜 기준으로 내림차순 정렬
    res.json(post);
});

router.post('/post', async function (req, res, next) { // post.ejs : 게시글 등록
    // let name = req.body.name;
    // let pw = req.body.pw;
    // let title = req.body.title;
    // let text = req.body.text;
    // let date = req.body.date;
    const recentList = await Posts.find().sort("-postId").limit(1); // 마지막 등록된 게시글의 key값 가져오기
    let postId = 1;
    if (recentList.length !== 0) {
        postId = recentList[0]["postId"] + 1; // 새로 작성된 게시글의 key값+1 (중복제거를 위함)
    }

    const { name, pw, title, text, date } = req.body;
    console.log(req.body)
    
    try {
        await Posts.create({ postId, name, pw, title, text, date });
    } catch (err) {
        console.log("에러 : " + err)
    }
    res.send({ result: "success" });
});

module.exports = router;