var addModel = require('../models').AddModel;

module.exports = function(app){
	app.get('/add', app.access.free, function(req, res, next){
		console.log(req.query);
		var a = +req.query.a || 1;
		var b = +req.query.b || 2;
		addModel.add(a, b, function(err, result){
			if(err){
				return next(err);
			}
			res.json({result:result});
		});
	})
}