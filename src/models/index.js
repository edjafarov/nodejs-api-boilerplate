var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

module.exports = {
  User: require('./user.js')
}
