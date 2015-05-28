var mongojs = require('mongojs');
var Promise = require('es6-promise').Promise;




module.exports = function(){
  var db = mongojs.apply(this, arguments);

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
    wrappedCollection(result, name, db[name]);
  })


  return  result;
}

module.exports.ObjectId = mongojs.ObjectId;

function wrappedCollection(result, name, collection){

  result.drop[name] = function(data, context){
    return new Promise(function(resolve, reject){
      collection.drop(function(){
        resolve();
      });
    });
  }
  result.find[name] = function(data, context){
    return new Promise(function(resolve, reject){

      if(Array.isArray(data)){
        data[1] = data[1] || {};
        data[2] = function(err, data){
          if(err) return reject(err);
          resolve(data)
        }
        return collection.find.apply(collection, data);
      }

      collection.find(data, {}, function(err, data){
        if(err) return reject(err);
        resolve(data)
      });

    });
  }

	result.findAndModify[name] = function(data, context){
    return new Promise(function(resolve, reject){

      if(Array.isArray(data)){
        data[1] = data[1] || {};
        data[2] = function(err, data){
          if(err) return reject(err);
          resolve(data)
        }
        return collection.findAndModify.apply(collection, data);
      }

      collection.findAndModify(data, function(err, data){
        if(err) return reject(err);
        resolve(data)
      });

    });
  }


  result.findOne[name] = function(data, context){
    return new Promise(function(resolve, reject){

      if(Array.isArray(data)){
        data[1] = data[1] || {};
        data[2] = function(err, data){
          if(err) return reject(err);
          resolve(data)
        }
        return collection.findOne.apply(collection, data);
      }

      collection.find(data, {}, function(err, data){
        if(err) return reject(err);
        resolve(data)
      });

    });
  }

  result.remove[name] = function(data, context){
    return new Promise(function(resolve, reject){

      if(Array.isArray(data)){
        data[1] = data[1] || false;
        data[2] = function(err, data){
          if(err) return reject(err);
          resolve(data)
        }
        return collection.remove.apply(collection, data);
      }

      collection.remove(data, false, function(err, data){
        if(err) return reject(err);
        resolve(data)
      });

    });
  }

  result.save[name] = function(data, context){
    return new Promise(function(resolve, reject){
      collection.save(data, function(err, data){
        if(err) return reject(err);
        resolve(data)
      })
    });
  }


	result.insert[name] = function(data, context){
    return new Promise(function(resolve, reject){
      collection.insert(data, function(err, data){
        if(err) return reject(err);
        resolve(data)
      })
    });
  }

  return result;
}
