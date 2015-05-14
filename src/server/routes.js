module.exports = function(app, mongodb){

    app.get('/what2eat/:name', function(req,res){
        mongodb.useCollection('what2eat').then(function(c){
            //@name , string
            var name = req.params.name;
            c.findOne({ name : name }, function(err,result){
                if ( err ) {
                    console.log( 'err:', err );
                    res.status(500).send(err);
                } else {
                    res.status(200).send(result);
                }
            });
        });
    });

    app.get('/what2eat/all', function(req,res){
        mongodb.useCollection('what2eat').then(function(c){
            c.find().toArray(function(err, result){
                if ( err ) {
                    console.log('err:', err);
                    res.status(500).send(err);
                } else {
                   res.status(200).send(result);
                }
            });
        });
    });

    app.get('/what2eat', function(req,res){
        mongodb.useCollection('what2eat').then(function(c){
           c.count(function(err, result){
               if ( err ) {
                   console.log(err);
                   res.status(500).send(err);
               } else {
                   var rnd,count = result;
                   rnd = Math.floor((Math.random() * count)); 
                   console.log("Random Number =", rnd);
                   c.find().limit(-1).skip(rnd).next(function(err, result){
                       if ( err ){
                           console.log(err);
                           res.status(500).send(err);
                       }
                       console.log(result.name);
                       res.status(200).send(result.name);
                   });
               }
           }); 
        });
    });

    app.post('/what2eat', function(req,res){
        mongodb.useCollection('what2eat').then(function(c){
            //@list , string
            console.log(req.body);
            var list = req.body.list.split(',');
            var docArr = [];
            for ( var i = 0; i < list.length; i++ ){
                docArr.push({ 'name' : list[i] });
            }

            c.insert(docArr, function(err,result){
                if (err) {
                    console.log('err', err);
                    res.status(500).end();
                } else {
                    res.set({
                        'Location':'/what2eat/'+docArr[0].name
                    });
                    res.status(201).end();
                }
            });
        });
    });

    app.get('/api/all', function(req,res){
        var rs = { routes : [] };
        for ( var i in app._router.stack ){
            if ( app._router.stack[i].route !== void(0) ){
                rs.routes.push({
                    path : app._router.stack[i].route.path,
                    methods : app._router.stack[i].route.methods
                });
            }
        }
        res.send(rs);
    });
}
