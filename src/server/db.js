var mongoClient = require('mongodb').MongoClient,
    config = require('./config.js'),
    Promise = require('bluebird'),
    db;

module.exports = {
    useCollection : useCollection,
    connect : connect
}

function connect(){
    var mongoConfig = config().mongo;

    if( !mongoConfig ){
        console.log('No MongoDb Connection');
        return 0; 
    }

    var url = [
        'mongodb://',
        mongoConfig.host, ':',
        mongoConfig.port, '/',
        mongoConfig.dbName
    ].join('');

	console.log('Establishing connection to ', url);
    db = mongoClient.connectAsync(url).then(function (db) {
    	console.log('MongoDB Connection Established');
        return db;
	}).catch(function (err) {
		console.log('Error connecting to', url, ':', err);
	});
    //Insert HelloWorld Document
    db.then(function(db){
        var collection = db.collection(mongoConfig.defaultCollection);
        collection.remove({'msg':'Hello Wrold'}, { justOnce : false });
        collection.insert({'msg':'Hello World'});
    });
    return db;
}

function useCollection(collectionName){
    return db.then(function(db){
        return db.collection(collectionName);
    });
}

Promise.promisifyAll(mongoClient);
