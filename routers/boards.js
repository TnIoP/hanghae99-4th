const express = require("express");
const Posts = require("../schemas/Posts");

const router = express.Router();

router.get("/board", async (req, res) => { // get
    const post = await Posts.find({}).sort("-date");
    res.json(post);
  });

router.post('/board/post', async function(req,res,next){
    let name = req.body.name;
    let pw = req.body.pw;
    let title = req.body.title;
    let text = req.body.text;
    let date = req.body.date;
 
    console.log(req.body)
    try{
        await Posts.create({ name, pw, title, text, date });
    }catch(err){
        console.log("에러 : "  + err)
    }
    res.send({ result: "success" });
});

module.exports = router;