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
exports.getUserName = function(req, res){
    // 获取客户端提交到服务器的用户信息
    const userInfo=req.query
    // 定义SQL语句
    const sqlStr='select * from ev_users where username=?'
    const roleStr='select roleId,roleName  from ev_role where roleId=?'
    db.query(sqlStr,[userInfo.username],(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        if(results.length!==1){
            return res.cc(400,'用户名或Token错误')
        }
        const userLis={
            id:results[0].id,
            username:results[0].username,
            password:results[0].password,
            email:results[0].email,
            userPic:results[0].userPic,
            role:{},
            roleId:results[0].roleId
        }
        db.query(roleStr,[userLis.roleId],(err,dataArr)=>{
            userLis.role=dataArr[0]
            // 调用res.send()将Token响应给客户端
            res.send({code:200,msg:'获取成功',data:userLis})
        })
    })
}

// 获取用户列表信息
exports.getUserList = function(req, res){
    // 获取客户端传递的分页参数，默认为第一页，每页5条数据
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 5
    // 计算 OFFSET 值
    const offset = (page - 1) * pageSize
    // 构建 SQL 查询语句，带有 LIMIT 和 OFFSET 子句
    const sqlStr = `select * from ev_users limit ${pageSize} offset ${offset}`
    const roleStr='select *  from ev_role where roleId=?'
    db.query(sqlStr,(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        // 查询总行数的SQL语句
        const countSql = `select count(*) as total from ev_users`
        db.query(countSql,(err,count)=>{
            if(err) return res.cc(500,'数据库查询错误')
            // 提取总行数
            const total = count[0].total
            // 使用 Promise.all 来处理异步操作
            const  promises=results.map(item=>{
                return new Promise((resolve,reject)=>{
                    db.query(roleStr,[item.roleId],(err,dataArr)=>{
                        if(err) return reject(err)
                        item.role=dataArr[0]
                        resolve(item)
                    })
                })
            })
            // 等待所有异步操作完成后，再处理结果
            Promise.all(promises).then(items=>{
                // 这里可以使用处理完异步操作后的 items 数组
                res.send({code:200,msg:'获取成功',data:items,page,pageSize,total })
            }).catch(error=>{
                // 处理错误
                return res.cc(500, '数据库查询错误');
            })
        })
    })
}

// 删除用户信息
exports.deleteUser=(req,res)=>{
    const id=req.query.id
    const sqlStr='delete from ev_users where id=?'
    db.query(sqlStr,[id],(err,data)=>{
        if(err) return res.cc(500,'数据库查询错误')
        if(data.affectedRows>0) return res.cc(200,'删除成功')
        return res.cc(500,'删除失败')
    })
}

// 新增用户信息
exports.addUser=(req,res)=>{
    const userInfo=req.body
    const sqlStr='insert into ev_users set ?'
    db.query(sqlStr,userInfo,(err,data)=>{
        if(err) return res.cc(500,'数据库查询错误')
        if(data.affectedRows>0) return res.cc(200,'新增成功')
        return res.cc(500,'新增失败')
    })
}

// 编辑用户信息
exports.editUser=(req,res)=>{
    const userInfo=req.body
    const sqlStr='update ev_users set ? where id=?'
    db.query(sqlStr,[userInfo,userInfo.id],(err,data)=>{
        if(err) return res.cc(500,'数据库查询错误')
        if(data.affectedRows>0) return res.cc(200,'编辑成功')
        return res.cc(500,'编辑失败')
    })
}

// 查询角色列表
exports.getRoleList = function(req, res){
    // 获取客户端传递的分页参数，默认为第一页，每页5条数据
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 5
    // 计算 OFFSET 值
    const offset = (page - 1) * pageSize
    // 构建 SQL 查询语句，带有 LIMIT 和 OFFSET 子句
    const sqlStr = `select * from ev_role limit ${pageSize} offset ${offset}`
    // 执行查询
    db.query(sqlStr,(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        // 查询总行数的 SQL 语句
        const countSql = 'select count(*) as total from ev_role'
        db.query(countSql,(err,count)=>{
            if(err) return res.cc(500,'数据库查询错误')
            // 提取总行数
            const total = count[0].total
            res.send({code:200,msg:'获取成功',data:results,page,pageSize,total })
        })
    })
}

// 新增角色列表
exports.addRole = function(req, res){
    const roleInfo=req.body
    const sqlStr='insert into ev_role set ?'
    db.query(sqlStr,roleInfo,(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        res.send({code:200,msg:'新增成功'})
    })
}

//更新角色信息
exports.updateRole = function(req, res){
    const  roleInfo=req.body
    const sqlStr='update ev_role set ? where roleId=?'
    db.query(sqlStr, [roleInfo,roleInfo.roleId],(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        res.send({code:200,msg:'更新成功'})
    })
}

// 删除角色信息
exports.deleteRole = function(req, res){   
    const roleId=req.query.roleId
    const sqlStr='delete from ev_role where roleId=?'
    db.query(sqlStr,roleId,(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        res.send({code:200,msg:'删除成功'})
    })
}