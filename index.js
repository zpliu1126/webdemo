var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')

var searchRouter = require(path.join(__dirname, 'API/search.js'))
var loginRouter = require(path.join(__dirname, 'API/login.js'))
var registerRouter = require(path.join(__dirname, 'API/register.js'))
var masterInfoRouter = require(path.join(__dirname, 'API/masterInfo.js'))
var testRouter = require(path.join(__dirname, 'API/test.js'))

var cookieParser = require('cookie-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: false }))

app.use(cookieParser())
/*configure template engine */
app.engine('html', require('express-art-template'))

// open static resource
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.use(
  '/masterImg',
  express.static(path.resolve(__dirname, 'uploads/masterImg/'))
)
app.use(
  '/node_modules',
  express.static(path.resolve(__dirname, 'node_modules'))
)

/* home page render */
app.get('/', function (req, rep) {
  rep.render('index.html')
})
app.get('/master', function (req, rep) {
  rep.render('master.html')
})
app.get('/seminar', function (req, rep) {
  rep.render('seminar.html')
})
app.get('/test', function (req, rep) {
  rep.render('blast.html')
})
app.all('*', function (req, rep, next) {
  rep.header('Access-Control-Allow-Origin', '*')
  rep.header('Access-Control-Allow-Headers', '*')
  rep.header('Access-Control-Allow-Credentials', 'true')
  next()
})

/*mount router */
app.use(searchRouter)
app.use(loginRouter)
app.use(registerRouter)
app.use(masterInfoRouter)
app.use(testRouter)

/*########################*/
//err page
app.use(function (err, req, rep, next) {
  // rep.status(200).render(path.join(__dirname,"views/err.html"),{
  //   "errCode":err.errCode,
  //   errMessage:err.errMessage,
  //   email:'1944532210@qq.com'
  // });
  rep.status(200).send({
    errCode: err.errCode,
    errMessage: err.errMessage,
    email: '1944532210@qq.com'
  })
})
//404 page
app.use(function (req, rep) {
  rep.status(404).render('404.html')
})
/*########################*/

app.listen(8080, function () {
  console.log('web server is init successful')
})
