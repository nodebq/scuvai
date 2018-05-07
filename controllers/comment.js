var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');
var check = require('../libs/check');

var comment = {
    name: '评论接口'
};
comment.list = function (req, res) {
    //评论列表
    if(req.query.videoId){
        conn.check().query({
            sql:'select * from comment where video_id=?',
            values:[req.query.videoId]
        },function (e, r) {
            if(e){
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
            }else{
                res.end(fyscu.format("200","success",r));
            }
        });
    }else{
        res.end(fyscu.out(code.paramError));
    }
    return 0;
};

comment.new = function (req, res) {
    // 评论新增
    if (req.query.userId && req.query.token &&req.query.comment&&req.query.videoId) {
        check.do(req.query.userId, req.query.token, function (access) {
            if (access) {
                console.log(access);
                //验证通过
                conn.check().query({
                    sql:'insert into comment (comment,user_id,video_id) values (?,?,?)',
                    values:[req.query.comment,req.query.userId,req.query.videoId]
                },function (e,r) {
                    if(e){
                        console.log(e);
                        res.end(fyscu.out(code.mysqlError));
                    }else {
                        res.end(fyscu.out(code.success));
                    }
                });
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

comment.del = function(req,res){
    // 评论删除
    if (req.query.userId && req.query.token &&req.query.commentId) {
        check.do(req.query.userId, req.query.token, function (access) {
            if (access) {
                console.log(access);
                //验证通过
                
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

module.exports = comment;