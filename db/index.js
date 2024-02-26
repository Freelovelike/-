const mysql=require('mysql')

// 创建一个连接池
const db= mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'my_db_01'
})



// // 连接数据库
// connection.connect();
module.exports=db