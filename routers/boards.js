const express = require("express");
const { listenerCount } = require("../schemas/Posts");
const Posts = require("../schemas/Posts");

const router = express.Router();

router.get("/datail/:postId", async (req, res, next) => {
    try {
        const { postId } = req.params;

        let posts = await Posts.findOne({ postId });
        console.log(req.params)
        res.json({ list: posts });

    } catch (err) {
        console.error(err);
        next(err);

    }

});

router.get("/board", async (req, res) => { // get
    const post = await Posts.find({}).sort("-date");
    res.json(post);
});

router.post('/post', async function (req, res, next) {
    // let name = req.body.name;
    // let pw = req.body.pw;
    // let title = req.body.title;
    // let text = req.body.text;
    // let date = req.body.date;
    const recentList = await Posts.find().sort("-postId").limit(1);
    let postId = 1;
    if (recentList.length !== 0) {
        postId = recentList[0]["postId"] + 1;
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