# mongo-pipe-api mongojs Promise API compatible with PromisePipes

Mostly nodejs modules are not compatible with Promises.

With mongo-pipe-api you can write your code like
```
var PromisePipe = require('promise-pipe')();

PromisePipe.use('db', MongoPipeApi('test', ['Item']));

var putItemInDB = PromisePipe().db.insert.Item({item});

putItemInDB.then(function(){
  //item is in Item collection
})
```
