var vows = require('vows'),
    assert = require('assert');

var config = require('../config.js'),
    fs = require('fs');

vows.describe('Init Test').addBatch({
    'is /etc/hosts available' : {
        topic : function () {
            fs.stat('/etc/hosts', this.callback);
        },
        'can be accessed': function(err,stat) {
            assert.isNull(err);
            assert.isObject(stat);
        },
        'is not empty': function(err,stat) {
            assert.isNotZero(stat.size);
        }
    }
}).addBatch({
    'is mongo connection available' : {
        topic : require('../db.js'),
        'test mongo connection and default Hello World json': function(mongodb){
            mongodb.connect().then(function(db){
                assert.isFalse(db === void(0));
                /*mongodb.useCollection('documents').then(function(collection){
                    collection.find().toArray(function(err,rs){
                        assert.isFalse(!!err);
                        assert.isTrue(rs.length > 0);
                        assert.equal(rs[0].msg, 'Hello World');
                    });
                });*/
            });
        }
    }
}).run(function(results){
    return results;
});

