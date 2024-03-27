const express = require("express");

// 创建路由对象
const router = express.Router();

// 导入用户路由处理函数模块
const commentHandler = require("../router_handler/comment.js");



// 创建评论
router.post("/create", commentHandler.createComment);
// 删除评论
router.post("/delete", commentHandler.deleteComment);
// 修改评论
router.post("/update", commentHandler.updateComment);
// 获取评论
router.get("/list", commentHandler.getCommentList);
// 将路由对象暴露出去


module.exports = router;
