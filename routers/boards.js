const express = require("express");
const { listenerCount } = require("../schemas/Posts");
const Posts = require("../schemas/Posts");

const router = express.Router();

router.delete("/modify/:postId", async (req, res) => {
    const { postId } = req.params;
    const  { pw }  = req.body;

    let posts = await Posts.findOne({ postId });
    
    if(posts.pw == pw){
      await Posts.deleteOne({ postId });
      res.send({ result: "success" });
    }else {
        res.send({ result: "fail" });
    }
  })

router.post("/modify/:postId", async (req, res) => { // post
    const { postId, name, title, text, pw } = req.body;

    let posts = await Posts.findOne({ postId });

    if (posts.pw == pw) {
        await Posts.updateOne({ postId }, { $set: { name:name } });
        await Posts.updateOne({ postId }, { $set: { title:title } });
        await Posts.updateOne({ postId }, { $set: { text:text } });
        res.send({ result: "success" });
    } else {
        res.send({ result: "fail" });
    }
});

router.get("/modify/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        let posts = await Posts.findOne({ postId });
        res.json(posts);
    } catch (err) {
        console.error(err);
    }
});

router.get("/detail/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        let posts = await Posts.findOne({ postId });
        res.json(posts);
    } catch (err) {
        console.error(err);
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