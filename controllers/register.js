var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');

var register = {
    name: '注册和账户修改逻辑'
};

//注册
register.do = function (req, res) {
    //判断参数是否存在
    if (req.query.username && req.query.password) {
        conn.check().query({
            sql: 'select username from user where username=?',
            values: [req.query.username]
        }, function (e, r) {
            if (e) {
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
            } else {
                if (r.length) {
                    //用户名存在
                    console.log('The username is already existed');
                    res.end(fyscu.out(code.usernameIsAlreadyExisted));
                } else {
                    //用户名不存在
                    conn.check().query({
                        sql: 'insert into user (username,password) values (?,?)',
                        values: [req.query.username, req.query.password]
                    }, function (ee, rr) {
                        //注册新建回调
                        if (ee) {
                            console.log(ee);
                            res.end(fyscu.out(code.mysqlError));
                        } else {
                            console.log(rr);
                            res.end(fyscu.out(code.success));
                        }
                    })
                }
            }
        })
    } else {
        console.log('参数错误');
        res.end(fyscu.out(code.paramError));
    }
    return 0;
};

//重置密码
register.reset = function (req, res) {
    if (req.query.username && req.query.password && req.query.new) {
        conn.check().query({
            sql: 'select password from user where username=?',
            values: [req.query.username]
        }, function (e, r) {
            if (e) {
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
            } else {
                console.log(r);
                if (r.length) {
                    //验证密码
                    if(r[0].password===req.query.password){
                        //修改密码
                        conn.check().query({
                            sql: 'update user set password=? where username=?',
                            values: [req.query.new,req.query.username]
                        },function (ee,rr) {
                            if(ee){
                                console.log(ee);
                                res.end(fyscu.out(code.mysqlError));
                            }else {
                                //更新成功
                                console.log(r);
                                res.end(fyscu.out(code.success));
                            }
                        });
                    }else {
                        console.log('密码错误');
                        res.end(fyscu.out(code.checkPasswordFailed));
                    }
                } else {
                    console.log('用户不存在');
                    res.end(fyscu.out(code.checkUsernameFailed));
                }
            }
        })
    }else {
        console.log('参数错误');
        res.end(fyscu.out(code.paramError));
    }
    return 0;
};


module.exports = register;