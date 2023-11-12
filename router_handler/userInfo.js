// 导入数据库模块
const db=require('../db/index.js')

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
            code:400,
            message:'获取用户信息成功',
            data:results[0]
        })
    })
}