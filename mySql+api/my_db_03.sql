/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80036 (8.0.36)
 Source Host           : localhost:3306
 Source Schema         : my_db_01

 Target Server Type    : MySQL
 Target Server Version : 80036 (8.0.36)
 File Encoding         : 65001

 Date: 27/03/2024 17:45:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ev_comment
-- ----------------------------
DROP TABLE IF EXISTS `ev_comment`;
CREATE TABLE `ev_comment`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '评论',
  `message_id` int NOT NULL COMMENT '被评论的留言',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ev_comment
-- ----------------------------
INSERT INTO `ev_comment` VALUES (2, '修改', 3);

-- ----------------------------
-- Table structure for ev_guest
-- ----------------------------
DROP TABLE IF EXISTS `ev_guest`;
CREATE TABLE `ev_guest`  (
  `guestId` int NOT NULL AUTO_INCREMENT,
  `guestName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `identityId` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `deposit` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `guestNum` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `leaveDate` datetime NULL DEFAULT NULL,
  `resideDate` datetime NULL DEFAULT NULL,
  `resideStateId` int NULL DEFAULT NULL,
  `roomId` int NULL DEFAULT NULL,
  `totalMoney` int NULL DEFAULT NULL,
  PRIMARY KEY (`guestId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ev_guest
-- ----------------------------
INSERT INTO `ev_guest` VALUES (21, '熊大', '778899', '1111111', '66666', '2', NULL, '2023-12-06 00:00:00', 1, 18, NULL);
INSERT INTO `ev_guest` VALUES (22, '吉吉国王', '22222', '222222', '99999', '1', '2023-12-09 02:15:29', '2023-12-08 00:00:00', 2, 17, 98499);
INSERT INTO `ev_guest` VALUES (23, '光头强', '33333', '66666', '66666', '1', '2023-12-23 09:28:17', '2023-12-09 02:10:47', 2, 16, 49866);
INSERT INTO `ev_guest` VALUES (24, '熊二', '889977', '6666', '50000', '1', NULL, '2023-12-01 00:00:00', 1, 13, NULL);
INSERT INTO `ev_guest` VALUES (25, '李老板', '9988', '222111', '1111111', '1', NULL, '2023-12-14 00:00:00', 1, 3, NULL);
INSERT INTO `ev_guest` VALUES (26, '毛毛', '9999888', '123546', '112233', '1', NULL, '2023-12-09 02:13:26', 1, 11, NULL);
INSERT INTO `ev_guest` VALUES (27, 'qweq', '123123', '123123123', '123213', '1', NULL, '2024-01-06 00:00:02', 1, 2, NULL);
INSERT INTO `ev_guest` VALUES (28, '123', '123', '123', '123', '123', NULL, '2024-01-19 00:00:00', 1, 5, NULL);
INSERT INTO `ev_guest` VALUES (29, '1', '1', '1', '1', '1', NULL, '2024-01-01 00:00:00', 1, 1, NULL);

-- ----------------------------
-- Table structure for ev_message
-- ----------------------------
DROP TABLE IF EXISTS `ev_message`;
CREATE TABLE `ev_message`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '留言id',
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ev_message
-- ----------------------------
INSERT INTO `ev_message` VALUES (4, 'test1', 1);
INSERT INTO `ev_message` VALUES (5, 'test32', 1);

-- ----------------------------
-- Table structure for ev_residestate
-- ----------------------------
DROP TABLE IF EXISTS `ev_residestate`;
CREATE TABLE `ev_residestate`  (
  `resideStateId` int NOT NULL AUTO_INCREMENT COMMENT '结账状态 1、未结账 2、已结账  ',
  `resideStateName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '状态名称',
  PRIMARY KEY (`resideStateId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ev_residestate
-- ----------------------------
INSERT INTO `ev_residestate` VALUES (1, '未结账');
INSERT INTO `ev_residestate` VALUES (2, '已结账');

-- ----------------------------
-- Table structure for ev_role
-- ----------------------------
DROP TABLE IF EXISTS `ev_role`;
CREATE TABLE `ev_role`  (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`roleId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ev_role
-- ----------------------------
INSERT INTO `ev_role` VALUES (1, '系统管理员');
INSERT INTO `ev_role` VALUES (2, '普通管理员');
INSERT INTO `ev_role` VALUES (3, '妞妞大魔王');
INSERT INTO `ev_role` VALUES (5, '咪咪不埋⑩');
INSERT INTO `ev_role` VALUES (6, '十七大笨蛋');
INSERT INTO `ev_role` VALUES (7, '美团骑手阿罗');
INSERT INTO `ev_role` VALUES (20, '123123');
INSERT INTO `ev_role` VALUES (21, '123123213');

-- ----------------------------
-- Table structure for ev_room
-- ----------------------------
DROP TABLE IF EXISTS `ev_room`;
CREATE TABLE `ev_room`  (
  `roomId` int NOT NULL AUTO_INCREMENT COMMENT '房间ID',
  `roomStateId` int NULL DEFAULT NULL COMMENT '房间状态',
  `roomTypeId` int NULL DEFAULT NULL COMMENT '房间类型',
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '简介',
  `guestId` int NULL DEFAULT NULL COMMENT '顾客id',
  PRIMARY KEY (`roomId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ev_room
-- ----------------------------
INSERT INTO `ev_room` VALUES (1, 2, 1, '标准2床', 29);
INSERT INTO `ev_room` VALUES (2, 2, 1, '标准', 27);
INSERT INTO `ev_room` VALUES (3, 2, 2, '单', 25);
INSERT INTO `ev_room` VALUES (4, 1, 2, '单人房', NULL);
INSERT INTO `ev_room` VALUES (5, 2, 3, '大床', 28);
INSERT INTO `ev_room` VALUES (6, 1, 3, '大床房间', NULL);
INSERT INTO `ev_room` VALUES (7, 1, 4, '三人', NULL);
INSERT INTO `ev_room` VALUES (8, 1, 4, '3人房间', NULL);
INSERT INTO `ev_room` VALUES (9, 1, 5, '套房', NULL);
INSERT INTO `ev_room` VALUES (10, 1, 5, '标准套房', NULL);
INSERT INTO `ev_room` VALUES (11, 2, 6, '豪华套房', 26);
INSERT INTO `ev_room` VALUES (12, 1, 6, '很豪华', NULL);
INSERT INTO `ev_room` VALUES (13, 2, 7, '77', 24);
INSERT INTO `ev_room` VALUES (14, 1, 7, '88', NULL);
INSERT INTO `ev_room` VALUES (15, 1, 8, NULL, NULL);
INSERT INTO `ev_room` VALUES (16, 1, 8, NULL, NULL);
INSERT INTO `ev_room` VALUES (17, 1, 9, NULL, NULL);
INSERT INTO `ev_room` VALUES (18, 2, 9, '99999999', 21);

-- ----------------------------
-- Table structure for ev_roomstate
-- ----------------------------
DROP TABLE IF EXISTS `ev_roomstate`;
CREATE TABLE `ev_roomstate`  (
  `roomStateId` int NOT NULL AUTO_INCREMENT COMMENT '房间状态ID：1、空闲 2、入住 3、维修',
  `roomStateName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '房间状态名称',
  PRIMARY KEY (`roomStateId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ev_roomstate
-- ----------------------------
INSERT INTO `ev_roomstate` VALUES (1, '空闲');
INSERT INTO `ev_roomstate` VALUES (2, '入住');
INSERT INTO `ev_roomstate` VALUES (3, '维修');

-- ----------------------------
-- Table structure for ev_roomtype
-- ----------------------------
DROP TABLE IF EXISTS `ev_roomtype`;
CREATE TABLE `ev_roomtype`  (
  `roomTypeId` int NOT NULL AUTO_INCREMENT COMMENT '房型编号',
  `roomTypeName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '房型名称',
  `roomTypePrice` int NULL DEFAULT NULL COMMENT '房型价格',
  `bedNum` int NULL DEFAULT NULL COMMENT '床位数',
  `typeDescription` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '房型简介',
  `typeTotalMoney` int NULL DEFAULT NULL COMMENT '房型销售总额',
  PRIMARY KEY (`roomTypeId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ev_roomtype
-- ----------------------------
INSERT INTO `ev_roomtype` VALUES (2, '单人间', 166, 1, '单人房', 300);
INSERT INTO `ev_roomtype` VALUES (3, '大床房', 188, 1, '豪华大床房', 400);
INSERT INTO `ev_roomtype` VALUES (4, '三人间', 300, 3, '多人房间', 500);
INSERT INTO `ev_roomtype` VALUES (24, '123', 12312, 3123, '123123', NULL);

-- ----------------------------
-- Table structure for ev_users
-- ----------------------------
DROP TABLE IF EXISTS `ev_users`;
CREATE TABLE `ev_users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `userPic` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `roleId` int NOT NULL COMMENT '1是系统管理员、2是普通管理员',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ev_users
-- ----------------------------
INSERT INTO `ev_users` VALUES (1, 'admin', '123456', '管理员', '66666', 'http://127.0.0.1:80/static/image1701632006885.jpg', 3);
INSERT INTO `ev_users` VALUES (3, '十七大笨蛋', '123456', '十七', '1234567', 'http://127.0.0.1:80/static/image1701631984905.jpg', 1);
INSERT INTO `ev_users` VALUES (6, '妞妞', '666666', '妞妞大魔王', '125800000', 'http://127.0.0.1:80/static/image1701631952645.jpg', 5);
INSERT INTO `ev_users` VALUES (7, 'xiaobai', '123456', '小白', '123456789', 'http://127.0.0.1:80/static/image1701630713646.jpg', 5);
INSERT INTO `ev_users` VALUES (9, 'smail', 'cewww', '测试', '123', 'http://127.0.0.1:80/static/image1701637057415.jpg', 1);
INSERT INTO `ev_users` VALUES (10, 'admin1', '123123', NULL, NULL, NULL, 2);
INSERT INTO `ev_users` VALUES (11, 'adminh123', '123456', NULL, NULL, NULL, 2);

-- ----------------------------
-- Table structure for health
-- ----------------------------
DROP TABLE IF EXISTS `health`;
CREATE TABLE `health`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `age` int NULL DEFAULT NULL,
  `gender` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `blood_type` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `medical_history` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `health_condition` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of health
-- ----------------------------
INSERT INTO `health` VALUES (25, 'Alice', 25, 'Female', 'A+', '无明显病史', 1);
INSERT INTO `health` VALUES (26, 'Bob', 30, 'Male', 'B-', '对青霉素过敏', 1);
INSERT INTO `health` VALUES (27, 'Charlie', 22, 'Male', 'O+', '高血压', 0);

-- ----------------------------
-- Table structure for indicator_anaysis
-- ----------------------------
DROP TABLE IF EXISTS `indicator_anaysis`;
CREATE TABLE `indicator_anaysis`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `sex` int NULL DEFAULT NULL COMMENT '1 男 0女',
  `age` int NULL DEFAULT NULL COMMENT '年龄',
  `healthy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '健康状态',
  `suggestion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '建议',
  `user_id` int NOT NULL COMMENT '用户id',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of indicator_anaysis
-- ----------------------------
INSERT INTO `indicator_anaysis` VALUES (3, 'huang111', 0, 22, '不健康', '多喝热水', 222, '2024-03-27 17:08:03');
INSERT INTO `indicator_anaysis` VALUES (4, 'huang111', 0, 22, '不健康', '多喝热水', 222, '2024-03-27 17:08:23');
INSERT INTO `indicator_anaysis` VALUES (5, 'huang111', 0, 22, '不健康', '多喝热水', 222, '2024-03-27 17:08:24');

-- ----------------------------
-- Table structure for quota
-- ----------------------------
DROP TABLE IF EXISTS `quota`;
CREATE TABLE `quota`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `height` int NULL DEFAULT NULL COMMENT '身高',
  `weight` int NULL DEFAULT NULL COMMENT '体重',
  `blood_sugar` int NULL DEFAULT NULL COMMENT '血糖',
  `boold_pressure` int NULL DEFAULT NULL COMMENT '血压',
  `user_id` int NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of quota
-- ----------------------------
INSERT INTO `quota` VALUES (1, 1, 1, 5, 1, 111);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `age` int NULL DEFAULT NULL,
  `sex` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('admin', '123', '超级管理员', 1, '女', 1);

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `workshop` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '车间',
  `materialName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '物资名称',
  `specification` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规格型号',
  `measurement` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '计量单位',
  `quantity` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '库存数量',
  `monthly` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '月消耗',
  `status` tinyint NULL DEFAULT NULL COMMENT '物资状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of work
-- ----------------------------
INSERT INTO `work` VALUES (44, '123', '123', '123', '123', '123', '123', 3);

-- ----------------------------
-- Table structure for work_copy1
-- ----------------------------
DROP TABLE IF EXISTS `work_copy1`;
CREATE TABLE `work_copy1`  (
  `id` int NOT NULL,
  `workshop` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '车间',
  `materialName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '物资名称',
  `specification` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规格型号',
  `measurement` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '计量单位',
  `quantity` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '库存数量',
  `monthly` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '月消耗',
  `status` tinyint NULL DEFAULT NULL COMMENT '物资状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of work_copy1
-- ----------------------------
INSERT INTO `work_copy1` VALUES (1, 'qwe', 'qwe', 'eqwe', 'qweqw', 'qwe', 'qweqwe', 1);

-- ----------------------------
-- Table structure for work_copy2
-- ----------------------------
DROP TABLE IF EXISTS `work_copy2`;
CREATE TABLE `work_copy2`  (
  `id` int NOT NULL,
  `workshop` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '车间',
  `materialName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '物资名称',
  `specification` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规格型号',
  `measurement` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '计量单位',
  `quantity` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '库存数量',
  `monthly` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '月消耗',
  `status` tinyint NULL DEFAULT NULL COMMENT '物资状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of work_copy2
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
