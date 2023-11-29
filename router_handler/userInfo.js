// 导入数据库模块
const db=require('../db/index.js')

// 根据用户的id，查询用户的基本信息
exports.getUserInfo=(req,res)=>{
    // 根据用户的id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 passeword字段
    const mysqlStr='select id,username,email,nickname,user_pic from ev_users where id=?'
    db.query(mysqlStr,req.user.id,(err,results)=>{
        if(err) return res.cc(err)
        // 执行成功，但是查询的结果可能为空
        if(results.length!==1) return res.cc('用户不存在')
        // 用户信息获取成功
        res.send({
            code:200,
            message:'获取用户信息成功',
            data:results[0]
        })
    })
}

// 根据用户名获取当前用户信息
exports.getUserInfo = function(req, res){
    // 获取客户端提交到服务器的用户信息
    const userInfo=req.query
    console.log(req,'userInfo');
    // 定义SQL语句
    const sqlStr='select * from ev_users where username=?'
    db.query(sqlStr,[userInfo.username],(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        console.log(results,'results');
        if(results.length!==1){
            return res.cc(400,'用户名或Token错误')
        }
        // 调用res.send()将Token响应给客户端
        res.send({code:200,msg:'获取成功',data:results[0]})
    })
}