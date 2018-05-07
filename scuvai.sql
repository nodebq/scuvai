/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : scuvai

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-05-07 18:36:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `test` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES ('1', '1', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `real_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1', '1', 'bb');
INSERT INTO `user` VALUES ('2', '2', '3', 'cc');

-- ----------------------------
-- Table structure for user_extend
-- ----------------------------
DROP TABLE IF EXISTS `user_extend`;
CREATE TABLE `user_extend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `real_name` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_extend
-- ----------------------------
INSERT INTO `user_extend` VALUES ('1', '1', 'bb', './avatar/e2187c904c8f11e8b328df484e211e38.png', 'n', '111111', '471');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `real_name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('3', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('4', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '2', 'bb2', '题目');
INSERT INTO `video` VALUES ('5', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '3', 'bb3', '题目');
INSERT INTO `video` VALUES ('6', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '4', 'bb4', '题目');
INSERT INTO `video` VALUES ('7', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '5', 'bb5', '题目');
INSERT INTO `video` VALUES ('8', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '6', 'bb6', '题目');
INSERT INTO `video` VALUES ('9', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '7', 'bb7', '题目');
INSERT INTO `video` VALUES ('10', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '8', 'bb8', '题目');
INSERT INTO `video` VALUES ('11', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '9', 'bb9', '题目');
INSERT INTO `video` VALUES ('12', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '10', 'bb10', '题目');
INSERT INTO `video` VALUES ('13', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '11', '11', '题目');
INSERT INTO `video` VALUES ('14', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '12', '12', '题目');
INSERT INTO `video` VALUES ('15', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '13', '13', '题目');
INSERT INTO `video` VALUES ('16', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '14', '14', '题目');
INSERT INTO `video` VALUES ('17', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '15', '15', '题目');
INSERT INTO `video` VALUES ('18', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '16', '16', '题目');
INSERT INTO `video` VALUES ('19', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '17', '17', '题目');
INSERT INTO `video` VALUES ('20', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '18', '18', '题目');
INSERT INTO `video` VALUES ('21', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '19', '19', '题目');
INSERT INTO `video` VALUES ('22', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '20', '20', '题目');
INSERT INTO `video` VALUES ('23', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '21', '21', '题目');
INSERT INTO `video` VALUES ('24', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '22', '22', '题目');
INSERT INTO `video` VALUES ('25', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '23', '23', '题目');
INSERT INTO `video` VALUES ('26', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('27', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('28', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('29', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('30', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('31', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('32', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('33', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('34', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('35', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('36', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('37', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('38', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('39', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('40', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('41', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('42', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('43', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('44', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('45', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('46', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('47', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('48', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('49', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('50', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('51', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('52', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('53', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('54', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('55', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('56', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
INSERT INTO `video` VALUES ('57', '/video/7c9efd404e7311e88ef23fecb40861dc.mp4', '1', 'bb1', '题目');
