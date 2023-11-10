// 导入express
const express = require('express')

// 创建服务器的实例对象
const app = express()

// 导入CORS中间件
const cors = require('cors')
// 将CORS注册为全局中间件
app.use(cors())
 
// 配置解析表单数据的中间件 注意：这个中间件，只能解析application/x-www-form-urlencoded 格式的表单
app.use(express.urlencoded({ extended: false }))
// 配置解析JSON格式的中间件
app.use(express.json())

// 启动服务器
app.listen(80, () => {
    console.log('服务器启动成功,http://127.0.0.1:80')       
})