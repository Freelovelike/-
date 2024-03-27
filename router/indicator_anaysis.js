const express = require("express");

// 创建路由对象
const router = express.Router();

// 导入用户路由处理函数模块
const indicatorAnaysisHandler = require("../router_handler/indicator_anaysis.js");

    router.post("/create", indicatorAnaysisHandler.createIndicatorAnaysis);

    router.get("/list", indicatorAnaysisHandler.getIndicatorAnaysisList);

module.exports = router;
