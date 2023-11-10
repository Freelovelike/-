// 导入express
const express = require('express')

// 创建服务器的实例对象
const app = express()

// 启动服务器
app.listen(80, () => {
    console.log('服务器启动成功')       
})