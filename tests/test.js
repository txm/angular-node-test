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


// TODO create test to call tools/create-user.js
// TODO create test to query MongoDB to be sure create-user worked


// TODO create test for login
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





