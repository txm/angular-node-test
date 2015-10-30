var express = require('express')
var app = express()
// var forceSSL = require('express-force-ssl')

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var expressSession = require('express-session')

var mongoose = require('mongoose')

var dbConfig = require('./db.js')

require('./passport/init')

mongoose.connect(dbConfig.url)


app.engine('html', require('ejs').renderFile)

app.use(expressSession({secret: 'mySecretKey'}))
app.use(passport.initialize())
app.use(passport.session())


// TODO refactor

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next()
  res.redirect('/login')
}



passport.serializeUser(function(user, done) {
  done(null, user._id)
})
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})


app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login' })
)


app.get('/login', function (req, res) {
  res.render('login.html')
})


app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

app.get('/admin/feed', isAuthenticated, function (req, res) {
  // read from Mongo and print as CSV
  // IP, Datetime, Action, Username
  res.render('index.html')
})


app.get('/', isAuthenticated, function (req, res) {
  res.send('Hello ' + req.user)
})


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

