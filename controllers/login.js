var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');
var uuid = require('node-uuid');
var redisLink = require('../libs/redis');

var login = {
    name: '登陆和验证权限逻辑'
};
//登录逻辑
login.do = function (req, res) {
    //登录,redis保存token
    // console.log(req.query);
    // console.log('select username from user where username=1 and password=1');
    if (req.query.username && req.query.password) {//判断应有参数
        conn.check().query({//查询用户名是否存在
            sql: 'select id,password from user where username=?',
            values: [req.query.username]
        }, function (e, r) {
            if (e) {
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
            } else {
                //console.log('200');
                // console.log(r);
                if (r.length) {//用户名存在
                    // res.end(fyscu.out(code.success));
                    if (r[0].password === req.query.password) {//判断密码是否一致
                        // console.log(0);
                        // redisLink.check().on('connect', function (err) {//连接redis
                        //     if (err) {
                        //         console.log(err);
                        //         res.end(fyscu.out(code.redisError));
                        //     } else {//生成随机token
                        //         // console.log(1);
                        //
                        //         // console.log(1);
                        //     }
                        // });
                        // console.log(6);
                        var token = uuid.v1().replace(/-/g, "");
                        console.log(2);
                        redisLink.check().set(r[0].id, token, function (ee, rr) {
                            if (ee) {
                                console.log(ee);
                                res.end(fyscu.out(code.redisError));
                            } else {
                                console.log(rr);
                                console.log(typeof (rr));
                                if (rr === 'OK') {
                                    res.end(fyscu.format(200, 'success', [r[0].id, token]));
                                } else {
                                    res.end(fyscu.out(code.redisWriteFailed));
                                }
                            }
                        });
                    } else {
                        res.end(fyscu.out(code.checkPasswordFailed));
                    }
                } else {
                    console.log('用户名存在');
                    res.end(fyscu.out(code.checkUsernameFailed));
                }
            }
        })
    } else {
        console.log('参数错误');
        res.end(fyscu.out(code.paramError));
    }
    return 0;
};
//权限验证
login.check = function (req, res) {
    if (req.query.username && req.query.token) {
        //判断应有参数
        redisLink.check().get(req.query.username, function (ee, rr) {
            if (ee) {
                console.log(ee);
                res.end(fyscu.out(code.redisError));
            } else {
                // console.log(2);
                console.log(rr);
                console.log(typeof (rr));
                if (rr === req.query.token) {
                    // console.log(3);
                    res.end(fyscu.out(code.success));
                } else {
                    res.end(fyscu.out(code.checkLoginFailed));
                }
            }
        });
    } else {
        console.log('参数错误');
        res.end(fyscu.out(code.paramError));
    }
};
//内部权限验证
// login.checkIn = function (username, token) {
//     if(username && token){
//         //判断应有参数
//         redisLink.check().get(username, function (ee, rr) {
//             if (ee) {
//                 console.log(ee);
//                 return false
//             } else {
//                 console.log(rr);
//                 if (rr === token) {
//                     // console.log(3);
//                     return 'true';
//                 } else {
//                     return false
//                 }
//             }
//         });
//     }else {
//         console.log('参数错误');
//         return false
//     }
// };

module.exports = login;