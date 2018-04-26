var conn = require('./mysql.js');
var redis = require('redis');
var config = require('../config/config.js');

//function test(req, res) {
//    conn.check().query({
//        sql: 'select * from test'
//    }, function (e, r) {
//        if (e) {
//            console.log(e);
//            console.log('cannot connect test');
//            console.log('404');
//            return 0;
//        } else {
//            console.log(r);
//            console.log('200');
//            return 0;
//        }
//    });
//}
//test();


//
//var client  = redis.createClient(config.redisConfig);
//client.on("error", function (err) {
//    console.log("Error " + err);
//});
//
//
//client.set("string key", "string val", redis.print);
//
//client.quit();