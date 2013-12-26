var request = require('request');
var utils = require('../utils.js')();
var expect = require('chai').expect;
var async = require('async');
var _ = require('underscore');

var user = {
  name: "User1",
  id: 100
};

var admin = {
  name: "UserAdmin",
  id: 103
};



describe("authenticate user with premissions", function(){
  var uJar, aJar;
  //put 3 users and authenticate admin
  before(function(done){
    uJar = utils.authenticate(user, userIn);
    function userIn(){
      aJar = utils.authenticate(user, done);
    }
  })
  describe("GET /api/me should return user profile", function(){
    var gotUser;
    before(function(done){
      request.get(utils.url('/api/me'), {jar: uJar }, gotU1);
      function gotU1(err, req, body){
        gotUser = JSON.parse(body);
        done();
      }
    })
    it('the name/id should be same', function(){
      expect(gotUser.github).to.have.property('displayName', user.name);
      expect(gotUser.github).to.have.property('id', user.id);
    });
  })
})
