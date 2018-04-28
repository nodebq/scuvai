var express = require('express');
var router = express.Router();
var login = require('../controllers/login');
var register = require('../controllers/register');
var profile = require('../controllers/profile');
var upload = require('../controllers/upload.js');

/* GET home page. */
router.use(function (req, res, next) {
    //提前处理
    // console.log("进入路由");
    // res.setHeader('content-type', 'application/json; charset=UTF-8');
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

router.get('/', function (req, res, next) {
    //根目录
    res.setHeader('Content-Type', 'text/html');
    res.render('index', {title: 'Express'});
    next();
});

router.get('/login', function (req, res) {
    // 登录接口
    login.do(req, res);
});
router.get('/check', function (req, res) {
    // 登录接口
    login.check(req, res);
});
router.get('/register', function (req, res) {
    //注册接口
    register.do(req, res);
});
router.get('/reset', function (req, res) {
    //注册接口
    register.reset(req, res);
});
router.get('/getInfo', function (req, res) {
    //个人信息获取
    profile.get(req, res);
});
router.get('/setInfo', function (req, res) {
    //个人信息获取
    profile.set(req, res);
});
router.post('/upload', function (req, res, next) {
    // req.query.userId = 1;
    // console.log(req.body);
    // console.log(req.query);
    // req.query.type = 1;
    // res.end('666');
    // return 0;
    // console.log(req);
    upload.up(req,res);
    return 0;
});

module.exports = router;
