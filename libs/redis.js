var redis = require('redis');
var config = require('../config/config');
var client = null;
var redisLink = {
    //redis 处理模块
};

redisLink.check = function(){
    if(client == null){
        client = redis.createClient(config.redisConfig);
    }else {
        console.log('redis is already connect');
    }
    return client;
};


module.exports = redisLink;