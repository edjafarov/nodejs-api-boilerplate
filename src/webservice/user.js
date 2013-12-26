
module.exports = function(app){
  app.get('/api/me', getMe);
  app.get('/api/users', gotUsers);
}

function getMe(req, res, next){
  res.json(req.user);
}

function gotUsers(req, res, next){

}
