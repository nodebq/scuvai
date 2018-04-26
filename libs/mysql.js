var mysql = require('mysql');
var config = require('../config/config.js');
var conn = null;

var link = {
    name: 'mysql连接模块'
};

link.check = function () {
    //连接mysql数据库
    if(conn == null){
        conn = mysql.createConnection(config.mysqlConfig);
    }else{
        console.log('mysql is already connect');
    }
    return conn;
};
module.exports = link;