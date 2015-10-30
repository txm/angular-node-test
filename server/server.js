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
  // force login
  res.send('Hello login!')
})


app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})


app.get('/', isAuthenticated, function (req, res) {
  res.send('Hello ' + req.user)
})


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

