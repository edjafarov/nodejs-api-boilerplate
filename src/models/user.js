var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: String,
  github: Object
})

UserSchema.statics.getById = function(id, cb){
  return this.findOne({_id: id}, cb);
}

UserSchema.statics.getGithubUser = function(profile, cb){
  this.find({'github.id': profile.id}, gotUser);
  var that = this;
  function gotUser (err, users){
    if(err){
      return cb(err);
    }
    if(users.length === 0){
      return that.create({
        github: profile
      },cb);
    }
    if(users.length > 1){
      return cb(errors.authError('we got multiple users with same mail in DB'));
    }

    cb(null, users[0]);
  }
}

module.exports = mongoose.model('User', UserSchema)


