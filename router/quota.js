const express=require('express')

// 创建路由对象
const router=express.Router()

const quota_handler=require('../router_handler/quota')

router.get('/list',quota_handler.getQuotaList)

router.post('/create',quota_handler.createQuota)
module.exports=router