var conn = require('./mysql.js');
var redis = require('redis');
var config = require('../config/config.js');
var redisLink = require('../libs/redis.js');

//mysql测试
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


//redis测试
//var client  = redis.createClient(config.redisConfig);
//client.on("error", function (err) {
//    console.log("Error " + err);
//});
//
//
//client.set("string key", "string val", redis.print);
//
//client.quit();

//redis模块测试
// redisLink.check().on('connect',function (err) {
//     if(err){
//         console.log('err');
//         console.log(err);
//     }else {
//         console.log('success');
//         console.log(redisLink.check().set(1,1,function (e,r) {
//             if(e){}
//         }));
//     }
// });