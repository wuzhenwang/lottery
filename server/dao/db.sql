/*
 Navicat Premium Data Transfer

 Source Server         : yhye_dev
 Source Server Type    : MySQL
 Source Server Version : 50741 (5.7.41)
 Source Host           : 111.204.36.181:3306
 Source Schema         : nxb_yuhengyaoye_3.2

 Target Server Type    : MySQL
 Target Server Version : 50741 (5.7.41)
 File Encoding         : 65001

 Date: 01/05/2023 23:52:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for prize_plan
-- ----------------------------
DROP TABLE IF EXISTS `prize_plan`;
CREATE TABLE `prize_plan` (
                              `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                              `name` varchar(255) DEFAULT NULL,
                              `desc` text COMMENT '一大段描述',
                              `mark` varchar(255) DEFAULT NULL COMMENT '标识，例如公司名"腾讯"或者"组织名"或者"部门名"',
                              `state` tinyint(1) unsigned DEFAULT '0' COMMENT '启用标志，默认只有一个启用',
                              `user_file_path` varchar(255) DEFAULT NULL,
                              `created_at` datetime DEFAULT NULL,
                              `updated_at` datetime DEFAULT NULL,
                              `deleted_at` datetime DEFAULT NULL,
                              PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of prize_plan
-- ----------------------------
BEGIN;
INSERT INTO `prize_plan` (`id`, `name`, `desc`, `mark`, `state`, `user_file_path`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, '预置抽奖方案一', '', '高二3班', 0, 'data/users_1.xlsx', '2023-04-29 09:55:23', '2023-05-01 11:51:51', NULL);
INSERT INTO `prize_plan` (`id`, `name`, `desc`, `mark`, `state`, `user_file_path`, `created_at`, `updated_at`, `deleted_at`) VALUES (2, '预置方案二', NULL, '高一2班', 1, 'data/64c83024d0a927426f8bf93563cbd1d5.xlsx', '2023-05-01 11:06:02', '2023-05-01 11:51:48', NULL);
COMMIT;

-- ----------------------------
-- Table structure for prize
-- ----------------------------
DROP TABLE IF EXISTS `prize`;
CREATE TABLE `prize` (
                         `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                         `plan_id` int(11) unsigned NOT NULL COMMENT '主表主键',
                         `type` tinyint(4) unsigned DEFAULT '0' COMMENT '1特等奖，2一等奖，3二等奖，4三等奖。。。以此类推',
                         `text` varchar(255) DEFAULT NULL COMMENT '与type相对应;存储几等奖中文',
                         `count` tinyint(4) unsigned DEFAULT '1' COMMENT '奖品数量',
                         `title` varchar(255) DEFAULT NULL COMMENT '标题',
                         `each_count` tinyint(4) unsigned DEFAULT '1' COMMENT '抽取个数',
                         `img` varchar(255) DEFAULT NULL COMMENT '奖品图片',
                         `created_at` datetime DEFAULT NULL,
                         `updated_at` datetime DEFAULT NULL,
                         `deleted_at` datetime DEFAULT NULL,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of prize
-- ----------------------------
BEGIN;
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (1, 1, 0, '特别奖', 200, NULL, 1, NULL, NULL, NULL, NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (6, 1, 1, '特等奖', 1, '神秘大礼', 1, '../img/secrit.jpg', '2023-04-29 09:55:23', '2023-04-29 09:55:23', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (7, 1, 3, '二等奖', 3, '华为 Mate40', 3, '../img/huawei.png', '2023-04-29 09:55:23', '2023-04-29 09:55:23', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (8, 1, 5, '四等奖', 2, '大疆无人机', 2, '../img/spark.jpg', '2023-04-29 09:55:23', '2023-04-29 09:55:23', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (9, 1, 4, '三等奖', 4, 'Ipad Mini8', 4, '../img/ipad.jpg', '2023-04-29 09:55:23', '2023-04-29 09:55:23', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (10, 1, 2, '一等奖', 2, 'Mac Book Pro', 2, '../img/mbp.jpg', '2023-04-29 09:55:23', '2023-04-29 09:55:23', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (11, 1, 6, '五等奖', 3, 'Kindle', 3, '../img/kindle.jpg', '2023-04-29 09:55:23', '2023-04-29 09:55:23', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (12, 1, 7, '六等奖', 5, '漫步者耳机', 5, '../img/edifier.jpg', '2023-04-29 09:55:23', '2023-04-29 09:55:23', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (14, 2, 0, '特别奖', 200, '', 1, NULL, '2023-05-01 11:06:04', '2023-05-01 11:06:04', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (15, 2, 1, '特等奖', 1, '神秘大礼', 1, '../img/ba3a0369da46941b9068101cefd4bf5f.jpg', '2023-05-01 11:32:30', '2023-05-01 11:32:30', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (16, 2, 2, '一等奖', 1, '钢笔', 1, '../img/6c3edd6a7e3c546c5dd445706ce0c63d.jpg', '2023-05-01 11:34:55', '2023-05-01 11:34:55', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (17, 2, 3, '二等奖', 2, '文具袋', 2, '../img/bc010162282cc3c343d41d0748502d2c.jpg', '2023-05-01 11:36:09', '2023-05-01 11:36:09', NULL);
INSERT INTO `prize` (`id`, `plan_id`, `type`, `text`, `count`, `title`, `each_count`, `img`, `created_at`, `updated_at`, `deleted_at`) VALUES (18, 2, 4, '三等奖', 5, '橡皮', 5, '../img/32f9dddd795411b7733791cb4f6e92aa.jpg', '2023-05-01 11:36:59', '2023-05-01 11:36:59', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
