var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');
var check = require('../libs/check');

var profile = {
    name: '注册和账户修改逻辑'
};

//读取个人信息
profile.get = function (req, res) {
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
                                res.end(fyscu.format(200, 'success', {
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

//修改除图片以外的个人信息
profile.set = function (req, res) {
    if (req.query.userId && req.query.token && req.query.realName && req.query.gender && req.query.phone && req.query.email) {
        console.log("ok");
        console.log(req.query.userId,req.query.token);
        // console.log(check.do(req.query.userId,req.query.token));
        check.do(req.query.userId, req.query.token, function (access) {
            if (access) {
                console.log(access);
                //验证通过
                conn.check().query({
                    sql: 'update user_extend set real_name=?,gender=?,phone=?,email=? where user_id=?',
                    values: [req.query.realName, req.query.gender, req.query.phone, req.query.email, req.query.userId]
                }, function (e, r) {
                    if (e) {
                        console.log(e);
                        res.end(fyscu.out(code.mysqlError));
                    } else {
                        //插入成功
                        //http://localhost:2245/setinfo?userId=1&token=cda756a04a8211e8be89874de5716264&userId=1&username=1&realName=bb&avatar=cc&gender=n&phone=111111&email=471
                        console.log(r);
                        console.log('success');
                        res.end(fyscu.out(code.success));
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

//修改头像
profile.avatar = function (req, res) {
    //
};

module.exports = profile;