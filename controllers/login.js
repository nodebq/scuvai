var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');
var uuid = require('node-uuid');
var redisLink = require('../libs/redis');

var login = {
    name:'登陆和验证权限逻辑'
};
login.do = function (req, res) {
    // console.log(req.query);
    // console.log('select username from user where username=1 and password=1');
    if(req.query.username&&req.query.password){//判断应有参数
        conn.check().query({//查询用户名是否存在
            sql:'select password from user where username=?',
            values:[req.query.username]
        },function(e, r) {
            if(e){
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
                return 0;
            }else{
                //console.log('200');
                // console.log(r);
                if(r.length){//用户名存在
                    // res.end(fyscu.out(code.success));
                    // console.log(r[0].password);
                    if(r[0].password === req.query.password){//判断密码是否一致
                        var random = uuid.v1().replace(/-/g, "");
                        console.log(random);
                        redisLink.check().on('connect',function (err) {
                            if(err){
                                console.log(err);
                                res.end(fyscu.out(code.redisError));
                            }else {
                                redisLink.check().set(req.query.username,random,function (ee, rr) {
                                    if(ee){
                                        console.log(ee);
                                        res.end(fyscu.out(code.redisError));
                                    }else {
                                        console.log(rr); 
                                        res.end(fyscu.out(code.success));
                                    }
                                });
                            }
                        });
                    }else {
                        res.end(fyscu.out(code.checkPasswordFailed));
                    }
                }else {
                    res.end(fyscu.out(code.checkUsernameFailed));
                }
                return 0;
            }
        })
    }else{
        console.log('参数错误');
        res.end(fyscu.out(code.paramError));
        return 0;
    }
};




module.exports = login;