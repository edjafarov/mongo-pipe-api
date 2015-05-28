var MongoPipeApi = require('../index');
var PromisePipe = require('promise-pipe')();
var expect = require('chai').expect;

PromisePipe.use('db', MongoPipeApi('test', ['coll']));

var dropPipe = PromisePipe().db.drop.coll();
var insertPipe = PromisePipe().db.insert.coll();
var findPipe = PromisePipe().db.find.coll();
var findOnePipe = PromisePipe().db.findOne.coll();
var findAndModifyPipe = PromisePipe().db.findAndModify.coll();
var removePipe = PromisePipe().db.remove.coll();



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
			describe('can modify item in collection', function(){
				var updateResult;
				before(function(done){
					findAndModifyPipe({query:{_id:findOneResult._id}, update:{$set:{a:"Mock"}}}).then(function(resp){
	          findOnePipe({_id: findOneResult._id}).then(function(resp){
							updateResult = resp[0];
	            done();
	          })
	        })
	      })
				it('shoul update the item', function(){
	        expect(updateResult).to.have.property("a","Mock");
	      })

			})
    });


  })

})
