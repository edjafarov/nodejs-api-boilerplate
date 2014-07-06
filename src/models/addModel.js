module.exports = function(){
	var memory = 0;
	return {
		add: function(a, b, cb){
			if(!b) memory +=a;
			// cb(new Error("bla-bla"));
			cb(null, !b?memory:(a+b));
		}
	}
}
