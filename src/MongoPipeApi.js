var mongojs = require('mongojs');
var Promise = require('es6-promise').Promise;




module.exports = function(){
	var db = mongojs.apply(this, arguments);

	var result = {};
	var collections = arguments[1];
	collections.forEach(function(name){
		result[name] = wrappedCollection(db[name]);
	})

	return  result;
}

function wrappedCollection(collection){
	var result = {};
	result.drop = function(data, context){
		return new Promise(function(resolve, reject){
			collection.drop(function(){
				resolve();
			});
		});
	}
	result.find = function(data, context){
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


	result.findOne = function(data, context){
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

	result.remove = function(data, context){
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

	result.save = function(data, context){
		return new Promise(function(resolve, reject){
			collection.save(data, function(err, data){
				if(err) return reject(err);
				resolve(data)
			})
		});
	}


result.insert = function(data, context){
		return new Promise(function(resolve, reject){
			collection.insert(data, function(err, data){
				if(err) return reject(err);
				resolve(data)
			})
		});
	}

	return result;
}