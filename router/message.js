const express = require("express");

// 创建路由对象
const router = express.Router();

// 导入用户路由处理函数模块
const messageHandler = require("../router_handler/message.js");



// 创建留言
router.post("/create", messageHandler.createMessage);
// 删除留言
router.post("/delete", messageHandler.deleteMessage);
// 修改留言
router.post("/update", messageHandler.updateMessage);
// 获取留言
router.get("/list", messageHandler.getMessageList);
// 将路由对象暴露出去


module.exports = router;
