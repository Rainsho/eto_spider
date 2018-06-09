/*
 Navicat Premium Data Transfer

 Source Server         : MySQL_localhost
 Source Server Type    : MySQL
 Source Server Version : 50716
 Source Host           : localhost
 Source Database       : test

 Target Server Type    : MySQL
 Target Server Version : 50716
 File Encoding         : utf-8

 Date: 06/10/2018 01:09:21 AM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `eto`
-- ----------------------------
DROP TABLE IF EXISTS `eto`;
CREATE TABLE `eto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `percentage` decimal(15,8) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `timeindex` (`createtime`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
