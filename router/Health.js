const express=require('express')

const router=express.Router()

const HealthType =require('../router_handler/Health')

//测试
// router.get('/', (req, res) => {
//     res.send('Hello, World!');
//   });


router.get('/getHealthType',HealthType.findHealthpeList)

router.post('/addHealth_room_type',HealthType.addHealth)

router.get('/delHealth',HealthType.delHealths)

router.post('/editHealths',HealthType.editHealth)

// 将路由对象暴露出去
module.exports=router