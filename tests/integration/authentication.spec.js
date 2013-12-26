var request = require('request');
var utils = require('../utils.js')();
var expect = require('chai').expect;


describe("github authenticattion", function(){
  before(function(done){
    utils.setUpAuthMock();
    request.get(utils.url('/auth/github/callback?code=450bab02b3f9bf0dfd44'), {jar: true},gotAuthResponse);
    function gotAuthResponse(err, response, body){
      expect(response).to.have.property('statusCode', 200);
      done();
    }
  })
  
  it("works!", function(done){
    done()
  });

  describe("GET /api/me endoint returns user profile", function(){
    var profile;
    before(function(done){
      request.get(utils.url('/api/me'), {jar: true},gotMe);
      function gotMe(err, response, body){
        expect(response).to.have.property('statusCode', 200);
        try{
          profile = JSON.parse(body);
        }catch(e){
          throw new Error("Response is not object");
        }
        done();
      }
    })
    it("returns user profile", function(){
      expect(profile).to.have.property('_id');
    })
  })
})
