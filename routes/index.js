var express = require('express');
var router = express.Router();
var login = require('../controllers/login');
var register = require('../controllers/register');
var profile = require('../controllers/profile');
var upload = require('../controllers/upload');
var list = require('../controllers/list');
var comment = require('../controllers/comment');

/* GET home page. */
router.use(function (req, res, next) {
    //提前处理
    console.log("进入路由");
    //res.setHeader('content-type', 'charset=UTF-8');
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
router.get('/login', function (req, res) {
    // 登录接口
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    login.do(req, res);
});
router.get('/check', function (req, res) {
    // 验证接口
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    login.check(req, res);
});
router.get('/register', function (req, res) {
    //注册接口
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    register.do(req, res);
});
router.get('/reset', function (req, res) {
    //修改密码
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    register.reset(req, res);
});
router.get('/getInfo', function (req, res) {
    //个人信息获取
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    profile.get(req, res);
});
router.get('/setInfo', function (req, res) {
    //个人信息修改
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    profile.set(req, res);
});
router.get('/videoList', function (req, res) {
    //视频列表
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    list.videoList(req, res);
});
router.get('/myVideoList', function (req, res) {
    //我的视频列表
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    list.myVideoList(req, res);
});
router.post('/upload', function (req, res, next) {
    //上传头像
    upload.up(req, res);
});

router.post('/video', function (req, res, next) {
    //上传视频
    upload.video(req, res);
});

router.get('/comment', function (req, res) {
    //评论列表
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    comment.list(req, res);
});

router.get('/commentNew', function (req, res) {
    //评论新建
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    comment.new(req, res);
});

router.get('/commentDel', function (req, res) {
    //评论删除
    res.setHeader('content-type', 'application/json; charset=UTF-8');
    comment.del(req, res);
});

module.exports = router;
