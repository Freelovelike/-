/**
*在这里定义和用户相关的路由处理函数，供/router/user.js 模块进行调用*/

// 导入数据库模块
const db=require('../db/index.js')

//注册用户的处理函数
exports.regUser = function(req, res){
    // 获取客户端提交到服务器的用户信息
    const userInfo=req.body
    // 定义SQL语句，查询用户名是否被占用
    const sqlStr='select * from ev_users where username=?'
    db.query(sqlStr,[userInfo.username],(err,results)=>{
            if(err) return res.cc(500,'数据库查询错误')
            if(results.length>0){
                return res.send({code:400,msg:'用户名已存在'})
            }
            // 执行其他操作--将输入插入数据库
            const insertSql='insert into ev_users set ?'
            db.query(insertSql,userInfo,(err,results)=>{
                if(err) return res.cc(500,'数据库插入错误')
                if(results.affectedRows>0){
                    return res.cc(200,'注册成功')
                }
            })
        }
    )
}

//登录的处理函数
exports.login = function(req, res){
    res.send('登录')
}