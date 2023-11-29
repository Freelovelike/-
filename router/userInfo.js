const express=require('express')
const router=express.Router()

// 导入用户信息的处理函数模块
const userInfo=require('../router_handler/userInfo')
// 获取用户的基本信息
router.get('/userInfo',userInfo.getUserInfo)

// 根据用户名获取当前用户信息
router.get('/getUserInfo',userInfo.getUserInfo)

// 查询角色列表
router.get('/roleList',userInfo.getRoleList)

module.exports=router