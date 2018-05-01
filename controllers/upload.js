var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');
var multiparty = require('multiparty');
var check = require('../libs/check');
// var util = require('util');
var fs = require('fs');
var uuid = require('node-uuid');

var upload = {
    name: "上传逻辑"
};

upload.up = function (req, res) {
    //上传头像
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './uploads/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        // console.log(fields.type[0]);
        console.log(fields);
        //console.log(req);
        if (fields.userId && fields.token && files.file) {
            console.log("ok");
            check.do(fields.userId[0], fields.token[0], function (access) {
                //console.log(1);
                if (access) {
                    console.log(access);
                    //验证通过
                    var filesTmp = JSON.stringify(files, null, 2);//未用到?
                    if (err) {
                        console.log('parse error: ' + err);
                    } else {
                        //console.log('parse files: ' + filesTmp);
                        // console.log(files);
                        // var inputFile = files.inputFile[0];
                        // var inputFile = 'inputFile';
                        // console.log(files.file[0].path);
                        var uploadedPath = files.file[0].path;
                        // console.log(files.file[0].originalFilename);
                        // var dstPath = './avatar/' + files.file[0].originalFilename;
                        var dstPath = './avatar/' + uuid.v1().replace(/-/g, "") + '.png';
                        // var path = '..//' + inputFile.originalFilename;
                        //重命名为真实文件名
                        fs.rename(uploadedPath, dstPath, function (err) {
                            if (err) {
                                console.log('rename error: ' + err);
                                console.log('404NotFound');
                                res.end(fyscu.out(code.NotFound404));
                                // return;
                            } else {
                                console.log('rename ok');
                                //console.log(uploadedPath);
                                console.log(dstPath);
                                conn.check().query({
                                    sql: 'update user_extend set avatar=?',
                                    values: [dstPath]
                                }, function (e, r) {
                                    if (e) {
                                        console.log(e);
                                        res.end(fyscu.out(code.mysqlError));
                                    } else {
                                        console.log(r);
                                        console.log('头像信息写入数据库成功');
                                        res.end(fyscu.out(code.success));
                                    }
                                });
                                // console.log('insert into clothes (userId,type,url,name) values ('+req.query.userId+','+fields.type[0]+','+path+','+inputFile.originalFilename+')');
                                res.end(fyscu.out(code.success));
                            }
                        });
                    }
                } else {
                    console.log('验证失败');
                    res.end(fyscu.out(code.checkLoginFailed));
                }
            });
        } else {
            console.log('参数错误');
            res.end(fyscu.out(code.paramError));
        }
    });
    return 0;
};

upload.video = function (req, res) {
    //上传视频
    //生成multiparty对象，并配置上传目标路径
    //console.log('aaa');
    //console.log('1');
    var form = new multiparty.Form({uploadDir: './uploads/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        // console.log(fields.type[0]);
        console.log(fields);
        //console.log(req);
        if (fields.userId && fields.token && files.file && fields.realName && fields.title) {
            console.log("ok");
            check.do(fields.userId[0], fields.token[0], function (access) {
                //console.log(1);
                if (access) {
                    console.log(access);
                    //验证通过
                    var filesTmp = JSON.stringify(files, null, 2);//未用到?
                    if (err) {
                        console.log('parse error: ' + err);
                    } else {
                        //console.log('parse files: ' + filesTmp);
                        // console.log(files);
                        // var inputFile = files.inputFile[0];
                        // var inputFile = 'inputFile';
                        //console.log(files);
                        var uploadedPath = files.file[0].path;
                        var path = uuid.v1().replace(/-/g, "");
                        // console.log(files.file[0].originalFilename);
                        // var dstPath = './avatar/' + files.file[0].originalFilename;
                        var dstPath = './video/' + path + '.' + files.file[0].originalFilename.split(".").pop();
                        // var path = '..//' + inputFile.originalFilename;
                        //重命名为真实文件名
                        fs.rename(uploadedPath, dstPath, function (err) {
                            if (err) {
                                console.log('rename error: ' + err);
                                console.log('404NotFound');
                                res.end(fyscu.out(code.NotFound404));
                                // return;
                            } else {
                                console.log('rename ok');
                                conn.check().query({
                                    sql: 'insert into video (user_id,video,real_name,title,image) values (?,?,?,?)',
                                    values: [fields.userId[0], dstPath, fields.realName[0], fields.title[0]]
                                }, function (e, r) {
                                    if (e) {
                                        console.log(e);
                                        res.end(fyscu.out(code.mysqlError));
                                    } else {
                                        console.log('视频信息写入成功');
                                        res.end(fyscu.out(code.success));
                                    }
                                });
                            }
                        });
                    }
                } else {
                    console.log('验证失败');
                    res.end(fyscu.out(code.checkLoginFailed));
                }
            });
        } else {
            console.log('参数错误');
            res.end(fyscu.out(code.paramError));
        }
    });
    return 0;
};

module.exports = upload;