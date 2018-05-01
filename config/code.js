var code = {
    //返回码格式:第一位为系统级返回码,第二位为业务级返回码,后三位具体代码
    'success': {
        code: 200,
        message: 'success'
    },
    'test': {
        code: 1001,
        message: 'test'
    },
    'mysqlError': {
        code: 1002,
        message: 'mysql数据库错误'
    },
    'paramError': {
        code: 1003,
        message: '参数错误'
    },
    'checkUsernameFailed': {
        code: 2001,
        message: '用户不存在'
    },
    'checkPasswordFailed': {
        code: 2002,
        message: '密码错误'
    },
    'redisError': {
        code: 1004,
        message: 'redis数据库错误'
    },
    'redisWriteFailed': {
        code: 1005,
        message: 'redis数据库写入失败'
    },
    'checkLoginFailed': {
        code: 2003,
        message: '登录状态验证失败'
    },
    'usernameIsAlreadyExisted': {
        code: 2004,
        message: '用户名已存在'
    },
    'dataRedundancy':{
        code:2005,
        message:'文件名重复'
    },
    'fileRepeat': {
        code: 2006,
        message: "已有重复文件"
    },
    'videoImageError':{
        code: 2007,
        message:"生成缩略图出错"
    }
};
module.exports = code;