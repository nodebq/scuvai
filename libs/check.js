var redisLink = require('../libs/redis');

var check = {
    name: '内部验证权限逻辑'
};

//内部权限验证
check.do = function (id, token,callback) {
    if(id && token){
        //判断应有参数
        redisLink.check().get(id, function (ee, rr) {
            if (ee) {
                console.log(ee);
            } else {
                // console.log('没有错误');
                callback(rr===token);
            }
        });
    }else {
        console.log('参数错误');
    }
};

module.exports = check;