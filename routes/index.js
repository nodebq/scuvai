var express = require('express');
var router = express.Router();
var login = require('../controllers/login');

/* GET home page. */
router.use(function (req, res, next) {
    //提前处理
    console.log("进入路由");
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

router.get('/', function (req, res, next) {
    //根目录
    res.setHeader('Content-Type', 'text/html');
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
    // 登录接口
    login.do(req, res);
});

module.exports = router;
