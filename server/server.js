var express = require('express')
var app = express()
// var forceSSL = require('express-force-ssl')

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy

app.use(passport.initialize())


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
    // ...
  }
))


app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login' })
)


app.get('/login', function (req, res) {
  // force login
  res.send('Hello login!')
})


app.get('/logout', function (req, res) {
  // force logout
  res.send('Hello logout!')
})


app.get('/', function (req, res) {
  // If logged out then redirect to /login
  // else display Angular app
  res.send('Hello World!')
})



var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

