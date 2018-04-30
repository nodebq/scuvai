var redis = require('redis');
var config = require('../config/config');
var client = null;
var redisLink = {
    //redis 处理模块
};

redisLink.check = function () {
    // console.log(client);
    if (client == null) {
        //console.log(1);
        client = redis.createClient(config.redisConfig);
    } else {
        // client.quit();
        // client = redis.createClient(config.redisConfig);
        console.log('redis is already connect');
    }
    return client;
};


module.exports = redisLink;