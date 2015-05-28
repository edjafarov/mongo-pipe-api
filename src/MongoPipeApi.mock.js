var Promise = require('es6-promise').Promise;

module.exports = function(){
  var result = {
		drop:{},
		find:{},
		findOne:{},
		remove:{},
		save:{},
		insert:{},
    findAndModify:{}
	};
  var collections = arguments[1];
  collections.forEach(function(name){
    wrappedCollection(result, name);
  })

  return  result;
}

module.exports.ObjectId = function(){}

function wrappedCollection(result, name, collection){

  result.drop[name] = function(data, context){
    return new Promise(function(resolve, reject){
      //dummy
      console.log("should not be called");
    });
  }
  result.find[name] = function(data, context){
    return new Promise(function(resolve, reject){

      //dummy

      console.log("should not be called");

    });
  }


  result.findAndModify[name] = function(data, context){
    return new Promise(function(resolve, reject){

      //dummy

      console.log("should not be called");

    });
  }

  result.findOne[name] = function(data, context){
    return new Promise(function(resolve, reject){

      //dummy
      console.log("should not be called");

    });
  }

  result.remove[name] = function(data, context){
    return new Promise(function(resolve, reject){

      //dummy
      console.log("should not be called");

    });
  }

  result.save[name] = function(data, context){
    return new Promise(function(resolve, reject){
      //dummy
      console.log("should not be called");
    });
  }


	result.insert[name] = function(data, context){
    return new Promise(function(resolve, reject){
      //dummy
      console.log("should not be called");
    });
  }

  return result;
}
