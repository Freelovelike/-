const express=require('express')

// 创建路由对象
const router=express.Router()

// 导入房型/房间信息的处理函数模块
const guest=require('../router_handler/guest')

// 获取入住用户列表信息
router.get('/getGuestList',guest.getUserGuest)

// 获取结账状态信息列表
router.get('/getCheckOutList',guest.getCheckOutList)

// 将路由对象暴露出去
module.exports=router