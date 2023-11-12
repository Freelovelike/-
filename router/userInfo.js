const express=require('express')
const router=express.Router()

// 导入用户信息的处理函数模块
const userInfo=require('../router_handler/userInfo')
// 获取用户的基本信息
router.get('/userInfo',userInfo.getUserInfo)
module.exports=router