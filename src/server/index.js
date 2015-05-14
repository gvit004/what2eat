var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongodb = require('./db.js'),
    setRoutes = require('./routes.js');

mongodb.connect();
app.use(bodyParser.json());

app.get('/hellofrommongo', function(req,res){
    var cur = mongodb.useCollection('documents').then(function(collection){
      collection.find().toArray(function(err,rs){
          console.log(rs);
          res.json(rs[0].msg);
      });  
    });
});

app.get('/', function(req,res){
	res.send('Hello World\n');
});

setRoutes(app, mongodb);

app.listen(3000, function(){
	console.log('Listening at PORT:3000');
});
