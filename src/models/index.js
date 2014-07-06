var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

module.exports = {
  AddModel: require('./addModel.js')(mongoose)
}
