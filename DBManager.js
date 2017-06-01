var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/data';
exports = module.exports = DBManager;

function DBManager(){
}

DBManager.prototype.insert = function(doc){
    try{
        mongoClient.connect(url,function(err,db){
            assert.equal(err,null);
            var colle = db.collection('queries');
            colle.insertOne(doc,function(err,result){
                assert.equal(err,null);
                console.log('DBManager:insert successfully');
                db.close();
            })
        })
    }
    catch(e){
        console.log('Mongodb error:'+e);
        //res.end('Mongodb error:'+e);
    }
}

DBManager.prototype.list = function(callback){
    mongoClient.connect(url,function(err,db){
        assert.equal(err,null);
        var colle = db.collection('queries');
        colle.find({},{_id:0}).toArray(function(error,data){
            assert.equal(error,null);
            callback(data);
        });
        db.close();
    })
}