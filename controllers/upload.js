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
    var form = new multiparty.Form({uploadDir: '../uploads/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        //console.log(fields.type[0]);
        var filesTmp =JSON.stringify(files, null, 2);//未用到?
        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = '../avatar/' + inputFile.originalFilename;
            // var path = '..//' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    //console.log('rename error: ' + err);
                    console.log('404NotFound');
                    res.end(fyscu.out(code.NotFound404));
                    // return;
                } else {
                    //console.log('rename ok');
                    // console.log('insert into clothes (userId,type,url,name) values ('+req.query.userId+','+fields.type[0]+','+path+','+inputFile.originalFilename+')');
                    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
                    res.write('received upload:\n\n');
                    res.end(fyscu.out(code.success));
                }
            });
        }
        return 0;

    });
};


module.exports = upload;