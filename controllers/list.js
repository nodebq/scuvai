var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');
var check = require('../libs/check');

var list = {
    name: '列表模块'
};

list.videoList = function (req, res) {
    //视频列表
    if (req.query.videoId) {
        req.query.videoId = parseInt(req.query.videoId);
        conn.check().query({
            sql: 'select id,video,user_id,real_name,title from video limit ?,10',
            values: [req.query.videoId]
        }, function (e, r) {
            if (e) {
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
            } else {
                //var data=[];
                res.end(fyscu.format(200, 'success', r))
            }
        })
    } else {
        console.log('参数错误');
        res.end(fyscu.out(code.paramError));
    }
    return 0;
};
list.myVideoList = function (req, res) {
    //我的视频列表
    if (req.query.videoId && req.query.userId && req.query.token) {
        req.query.videoId = parseInt(req.query.videoId);
        req.query.userId = parseInt(req.query.userId);
        //req.query.videoId = parseInt(req.query.videoId);
        check.do(req.query.userId, req.query.token, function (access) {
            if (access) {
                conn.check().query({
                    sql: 'select id,video,user_id,real_name,title from video where user_id=? limit ?,10',
                    values: [req.query.userId, req.query.videoId]
                }, function (e, r) {
                    if (e) {
                        console.log(e);
                        res.end(fyscu.out(code.mysqlError));
                    } else {
                        //var data=[];
                        res.end(fyscu.format(200, 'success', r))
                    }
                })
            } else {
                console.log('验证未通过');
                res.end(fyscu.out(code.checkLoginFailed));
            }
        });
    } else {
        console.log('参数错误');
        res.end(fyscu.out(code.paramError));
    }
    return 0;
};


module.exports = list;