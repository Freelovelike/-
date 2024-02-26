const express=require('express')

const router=express.Router()

const shopType =require('../router_handler/shop_room_type')

//测试
// router.get('/', (req, res) => {
//     res.send('Hello, World!');
//   });
router.get('/shop_room_type',shopType.findRoomTypeList)


router.post('/addShop_room_type',shopType.addShop)

router.get('/delShop',shopType.delShops)

router.post('/editShop_room_type',shopType.editShop)

// 将路由对象暴露出去
module.exports=router