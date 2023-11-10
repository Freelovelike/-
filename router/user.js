const express=require('express')

// 创建路由对象
const router=express.Router()

// 注册新用户
router.post('/reguser',(req,res)=>{
    res.send('注册新用户')
})

// 登录
router.post('/login',(req,res)=>{
    res.send('登录')
})

// 将路由对象暴露出去
module.exports=router