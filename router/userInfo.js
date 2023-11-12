const express=require('express')
const router=express.Router()
// 获取用户的基本信息
router.get('/userInfo',(req,res)=>{
    res.send('ok')
})
module.exports=router