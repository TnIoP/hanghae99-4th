const express = require('express')
const app = express()
const port = 3000

const boardRouter = require('./routes/board');

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'));

app.use('/board', boardRouter)

// app.use((req, res, next) => {
//   console.log(req);
//   next();
// });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.render('board');
// })

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})