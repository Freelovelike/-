const express=require('express')

// 创建路由对象
const router=express.Router()

// 导入房型信息的处理函数模块
const roomType=require('../router_handler/room')

// 查询房型列表
router.get('/getRoomType',roomType.findRoomTypeList)

// 将路由对象暴露出去
module.exports=router