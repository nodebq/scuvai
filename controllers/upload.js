var fyscu = require('../libs/fyscu.js');
var code = require('../config/code.js');
var conn = require('../libs/mysql.js');
var multiparty = require('multiparty');
// var util = require('util');
var fs = require('fs');

var upload = {
    name: "上传逻辑"
};

upload.up = function (req, res) {
    //上传文件
    //生成multiparty对象，并配置上传目标路径
    //console.log('aaa');
    console.log('1');
    var form = new multiparty.Form({uploadDir: './public/files/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        //console.log(fields.type[0]);
        // var filesTmp =
        JSON.stringify(files, null, 2);//未用到?
        if (err) {
            //console.log('parse error: ' + err);
        } else {
            //console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            conn.check().query({//检查数据库是否有重复文件
                sql: 'select * from clothes where name=:name',
                params: {
                    name: inputFile.originalFilename
                }
            }, function (e, r) {
                if (e) {
                    console.log(e);
                    console.log('can not access fy_vip_base');
                    res.end(fyscu.out(code.mysqlError));
                    // return;
                } else {
                    if (r.length) {
                        console.log('dataRedundancy');
                        res.end(fyscu.out(code.dataRedundancy));
                        // return;
                    } else {//没有重复文件
                        var dstPath = 'public/uploads/' + inputFile.originalFilename;
                        var path = 'uploads/' + inputFile.originalFilename;
                        //重命名为真实文件名
                        fs.rename(uploadedPath, dstPath, function (err) {
                            if (err) {
                                //console.log('rename error: ' + err);
                                console.log('404NotFound');
                                res.end(fyscu.out(code.NotFound404));
                                // return;
                            } else {
                                //console.log('rename ok');
                                console.log('insert into clothes (userId,type,url,name) values ('+req.query.userId+','+fields.type[0]+','+path+','+inputFile.originalFilename+')');
                                conn.check().query({//插入数据库
                                    sql: 'insert into clothes (userId,type,url,name) values (:userId,:type,:url,:name)',
                                    params: {
                                        userId: req.query.userId,
                                        type: fields.type[0],
                                        url: path,
                                        name: inputFile.originalFilename
                                    }
                                }, function (ee, rr) {
                                    if (ee) {
                                        console.log(e);
                                        console.log('yes,me again');
                                        res.end(fyscu.out(code.mysqlError));
                                        // return;
                                    } else {
                                        console.log('success');
                                        res.end(fyscu.out(code.success));
                                        //res.write('success');
                                        // return;
                                    }
                                });
                            }
                        });
                    }
                }
            })
        }
        return 0;
        // res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        // res.write('received upload:\n\n');
        //res.end(util.inspect({fields: fields, files: filesTmp}));
    });
};


module.exports = upload;