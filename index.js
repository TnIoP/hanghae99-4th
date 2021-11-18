const express = require('express')
const app = express()
const port = 3000
const connect = require('./schemas')
const boardRouter = require("./routers/boards");

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'));

connect();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use("/api", [boardRouter]);

app.get('/', (req, res) => {
  res.render('board');
})

app.get('/post', (req, res) => {
  res.render('post');
})

app.get('/detail', (req, res) => {
  res.render('detail');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})