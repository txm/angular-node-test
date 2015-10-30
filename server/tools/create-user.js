var mongoose = require('mongoose')

var bCrypt = require('bcrypt-nodejs')

var dbConfig = require('./../db.js')

var User = require('../models/user')


// TODO refactor...
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}


var newUser = new User()

newUser.username = 'andy'
newUser.password = createHash('andy')
 
newUser.save(function(err) {
  if (err)
    console.log('Error in Saving user: '+err)  
  else
    console.log('User Registration succesful')    
})

