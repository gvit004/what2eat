var fs = require('fs'),
    envBuild = process.env.build,
    dbAlias = process.env.dbalias,
    appName = process.env.appname;

module.exports = function () {
    var config = {
        appName : appName
    };

    config.mongo = {
        host : '',
        port : '27017',
        dbName : 'myproject',
        path : '/data/db',
        defaultCollection : 'documents'
    };
    config.mongo.host = getMongoHost();
    return config;
};

/* Reads '/etc/hosts' file and gets the ip addr of host 'mongodb' */
function getMongoHost(){
    var host = 'mongodb' + appName,
        regex = /((\d{1,3}\.){3}\d{1,3})/g,
        file, ipaddr;

    file = fs.readFileSync('/etc/hosts', 'utf-8');
    file.toString().split('\n').forEach(function(line){
        if(line.indexOf(host) > -1){
            ipaddr = line.match(regex);
        }
    });
    return ipaddr;
}
