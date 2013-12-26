var passport = require('passport');
var _ = require('underscore');
var express = require('express');
var errors = require('./errors.js');

var GitHubStrategy = require('passport-github').Strategy;
var util = require('util');
var fs = require('fs');

var User = require('./models').User;
var nock = require('nock');

module.exports = function(app){
  passport.use(new GitHubStrategy({
    clientID: nconf.get('github:GITHUB_CLIENT_ID'),
    clientSecret: nconf.get('github:GITHUB_CLIENT_SECRET'),
    callbackURL: "http://127.0.0.1:8080/auth/github/callback"
    },
    function(token, tokenSecret, profile, done) {
      User.getGithubUser(profile, gotUser);
      function gotUser(err, user){
        if(err){
          //WE can handle login errors here
          return done(err);
        }
        return done(null, user)
      }
    }
  ))
   
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.getById(id, done);
  });



  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret:nconf.get('security:salt')}));
  app.use(passport.initialize());
  app.use(passport.session());

  //put the user inside request
  app.use(function(req,res,next){
    if(req.user) console.log("UserID: " + req.user._id)
    next();
  });
 
  app.get('/auth/github', app.access.free,
    passport.authenticate('github'),
    function(req,res){})
  app.get('/auth/github/callback', app.access.free,
    passport.authenticate('github', {failureRedirect:"/auth/linkedin/failure"}),
    function(req, res, next){
      res.end();
    }
  )
};
