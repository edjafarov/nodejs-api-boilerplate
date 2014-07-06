
module.exports = function(app){
  app.get('/api/me', getMe);
}

function getMe(req, res, next){
  res.json(req.user);
}


