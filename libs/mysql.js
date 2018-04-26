var mysql = require('mysql');
var config = require('../config/config.js');
var conn = null;

var link = {};

link.check = function () {
    //连接mysql数据库
    if(conn == null){
        conn = mysql.createConnection(config.mysqlConfig);
    }else{
        console.log('conn is already running');
    }
    return conn;
};
module.exports = link;