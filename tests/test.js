// basic test to test tests

var assert = require('assert')
describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5))
      assert.equal(-1, [1,2,3].indexOf(0))
    })
  })
})


//
// TODO: these tests still seem to be optimistic
//

var port = 3000
var superagent = require('superagent')

describe('homepage when not logged in', function(){
  it('should respond redirect to /login on GET',function(){
    superagent
      .get('http://localhost:'+port)
      .end(function(res){
        // TODO redirects are triggering a double callback
        expect(res.status).to.equal(302) // or is it 303 thesedays?
      })
  })
})


describe('login page when not logged in', function(){
  it('should respond 200 to GET',function(){
    superagent
      .get('http://localhost:'+port+'/login')
      .end(function(res){
        expect(res.status).to.equal(200)
      })
  })
})


describe('logout page when not logged in', function(){
  it('should redirect to / on GET',function(){
    superagent
      .get('http://localhost:'+port+'/logout')
      .end(function(res){
        expect(res.status).to.equal(200)
      })
  })
})



/*

// TODO fugly - helper script needs to be integrated
// to return success/failure and
// handle paths
describe('exec tools/create-user', function(){
  it('check STDOUT for response ;(',function(){

    var cp = require('child_process')
    var n = cp.fork('../tools/create-user.js')

    n.on('message', function(m) {
      console.log('PARENT got message:', m)
      //expect(res.status).to.equal(200)
    })

  })
})

*/

var mongoose = require('mongoose')
var dbConfig = require('././../server/db')
var User = require('././../server/models/user')

// TODO create test to query MongoDB to be sure create-user worked
describe('check create user exists', function(){
  it('check MongoDB for test user',function(){

    before(function(done) {
      db = mongoose.connect(dbConfig.url)
      done()
    })

    after(function(done) {
      mongoose.connection.close()
      done()
    })


    beforeEach(function(done) {
      var account = new User({
        username: 'testuser',
        password: 'testuserpass'
      })

      account.save(function(error) {
        if (error) console.log('error' + error.message)
        else console.log('no error')
        done()
      })
    })


    it('find a user by username', function(done) {
      User.findOne({ username: 'testuser' }, function(err, account) {
        account.username.should.eql('testuser')
        console.log("   username: ", account.username)
        expect(account.username).to.equal('testuser')
        done()
      })
    })

    afterEach(function(done) {
      User.remove({}, function() {
        done()
      })
    })

  })
})


describe('authpage', function(){
  it('should respond AUTH_FAILURE to GET',function(){
    superagent
      .get('http://localhost:'+port+'/admin/feed')
      .end(function(res){
        expect(res.status).to.equal(403)
    })
  })
})




// TODO create test for login

//
// I don't have ANY experience with BDD - if this is what is required here
//

// login OK: The usernames 'user', 'manager', 'admin', 'developer', 'tester', with the password 'password' should be authenticated.
// login KO: Eg, username 'john.smith' can never authenticate. Usernames should be case-insensitive, passwords should be case-sensitive.


describe('homepage when logged in', function(){
  it('should respond AUTH_FAILURE to GET',function(){
    superagent
      .get('http://localhost:'+port)
      .end(function(res){
        expect(res.status).to.equal(200)
      })
  })
})



describe('login page when logged in', function(){
  it('should redirect to / on GET',function(){
    superagent
      .get('http://localhost:'+port+'/login')
      .end(function(res){
        expect(res.status).to.equal(302)
      })
  })
})


describe('logout page when logged in', function(){
  it('should redirect to /login on GET',function(){
    superagent
      .get('http://localhost:'+port+'/logout')
      .end(function(res){
        expect(res.status).to.equal(302)
      })
  })
})




describe('authpage', function(){
  it('after admin login, should respond AUTH_SUCCESS to GET',function(){
    superagent
      .get('http://localhost:'+port+'/admin/feed')
      .end(function(res){
        expect(res.status).to.equal(200)
        // TODO check body feed of: IP, Datetime, Action, Username
    })
  })
})


