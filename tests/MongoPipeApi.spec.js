var MongoPipeApi = require('../index');
var PromisePipe = require('promise-pipe')();
var expect = require('chai').expect;

PromisePipe.use('db', MongoPipeApi('test', ['coll']));

var dropPipe = PromisePipe().db.coll.drop();
var insertPipe = PromisePipe().db.coll.insert();
var findPipe = PromisePipe().db.coll.find();
var findOnePipe = PromisePipe().db.coll.findOne();
var removePipe = PromisePipe().db.coll.remove();

var mockData = {
	a: "testA"
}
describe("MongoPipeApi", function(){
	before(function(done){
		dropPipe().then(done)
	})
	describe('can insert item to collection', function(){
		var saveResult;
		before(function(done){
			insertPipe(mockData).then(function(resp){
				saveResult = resp;
				done();
			})
		})
		it('should have ID',function(){
			expect(saveResult).to.have.property("_id");
		});
		it('should return mockData',function(){
			expect(saveResult).to.have.property('a', mockData.a);
		});		
		describe('can get it from collection', function(){
			var findResult;
			before(function(done){
				findPipe({a: "testA"}).then(function(resp){
					findResult = resp[0];
					done();		
				})
			})
			it('shoul be same as post', function(){
				expect(findResult).to.deep.equal(saveResult);
			})
			describe('can remove it from collection', function(){
				var removeCount;
				before(function(done){
					removePipe({_id:findResult._id}).then(function(count){
						removeCount = count;
						done();
					});
				})
				it('it should remove one item', function(){
					expect(removeCount.n).to.equal(1);
				})
			})
		});
		describe('can get one from collection', function(){
			var findOneResult, saveOneResult;
			before(function(done){
				insertPipe(mockData).then(function(resp){
				saveOneResult = resp;
					findOnePipe({a: "testA"}).then(function(resp){
						findOneResult = resp[0];
						done();		
					})
				})
			})
			it('shoul be same as post', function(){
				expect(findOneResult).to.deep.equal(saveOneResult);
			})
		});


	})

})

