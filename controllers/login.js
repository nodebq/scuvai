var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');

var login = {
    name:'登陆逻辑'
};
login.do = function (req, res) {
    console.log(req.query);
    console.log('select username from user where username=1 and password=1');
    if(req.query.username&&req.query.password){
        conn.check().query({
            sql:'select username from user where username=:username and password=:password',
            params:{
                username:req.query.username,
                password:req.query.password
            }
        },function(e, r) {
            if(e){
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
                return 0;
            }else{
                //console.log('200');
                console.log(r);
                res.end(fyscu.out(code.success));
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