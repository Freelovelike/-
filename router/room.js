const express=require('express')

// 创建路由对象
const router=express.Router()

// 导入房型/房间信息的处理函数模块
const roomType=require('../router_handler/room')

// 查询房型列表
router.get('/getRoomType',roomType.findRoomTypeList)

// 新增房型信息
router.post('/addRoomType',roomType.addRoomType)

// 编辑房型信息
router.post('/editRoomType',roomType.editRoomType)

// 删除房型
router.get('/delRoomType',roomType.deleteRoomType)

// 查询房间信息列表
router.get('/getRoomList',roomType.getRoomList)

// 将路由对象暴露出去
module.exports=router