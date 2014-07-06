var request = require('request');
var expect = require('chai').expect;
describe('get url /add', function(){
	var result;
	before(function(done){
		request.get('http://localhost:8080/add',{qs: {a:3,b:2}}, function(err, resp, body){
			result = body;
			done();
		})
	});
	it('should be json ',function(){
		var res;
		try{
			res = JSON.parse(result);
		}catch(e){
			res = false;
		}
		expect(res).to.be.ok;
	})
	it.only('should return message', function(){
		expect(JSON.parse(result)).to.have.property("result", 5)
	})
})