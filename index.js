const express = require('express')
const app = express()
const port = 3000

const connect = require('./schemas')
connect();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'));

// const boardRouter = require('./routes/board');

const boardRouter = require("./routers/boards");
app.use("/api", [boardRouter]);

// app.use('/board', boardRouter)

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('board');
})

app.get('/board/post', (req, res) => {
  res.render('post');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})