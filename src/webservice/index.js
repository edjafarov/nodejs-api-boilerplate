module.exports = function(app){
	require('./add.js')(app);
  require('./user.js')(app);
}
