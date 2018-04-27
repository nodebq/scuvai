var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');
var check = require('../libs/check');

var information = {
    name: '注册和账户修改逻辑'
};

//读取个人信息
information.get = function (req, res) {
    if (req.query.userId && req.query.token) {
        console.log("ok");
        // console.log(req.query.userId,req.query.token);
        // console.log(check.do(req.query.userId,req.query.token));
        check.do(req.query.userId, req.query.token, function (access) {
            if (access) {
                console.log(access);
                //验证通过
                conn.check().query({
                    sql: 'select real_name,avatar,gender,phone,email from user_extend where user_id=?',
                    values: [req.query.userId]
                }, function (e, r) {
                    if (e) {
                        console.log(e);
                        res.end(fyscu.out(code.mysqlError));
                    } else {
                        //查询成功
                        conn.check().query({
                            sql: 'select username from user where id=?',
                            values: [req.query.userId]
                        }, function (ee, rr) {
                            if (ee) {
                                console.log(ee);
                                res.end(fyscu.out(code.mysqlError));
                            } else {
                                //查询用户名成功
                                console.log('success');
                                res.end(fyscu.format({
                                    userId: req.query.userId,
                                    username: rr[0].username,
                                    realName: r[0].real_name,
                                    avatar: r[0].avatar,
                                    gender: r[0].gender,
                                    phone: r[0].phone,
                                    email: r[0].email
                                }))
                            }
                        })
                    }
                })
            } else {
                res.end(fyscu.out(code.checkLoginFailed));
            }
        });
    } else {
        console.log('参数错误');
        res.end(fyscu.out(code.paramError));
    }
    return 0;
};


module.exports = information;