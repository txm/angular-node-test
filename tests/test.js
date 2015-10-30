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


var port = 3000
var superagent = require('superagent')

describe('homepage', function(){
  it('should respond AUTH_FAILURE to GET',function(){
    superagent
      .get('http://localhost:'+port)
      .end(function(res){
        // TODO this test passes when it should fail :(
        expect(res.status).to.equal(403)
      })
  })
})






