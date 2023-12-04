// 导入数据库模块
const db = require('../db/index.js')

// 查询房型信息列表
exports.findRoomTypeList = (req,res)=>{
    // 获取客户端传递的分页参数，默认为第一页，每页5条数据
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 5
    // 计算 OFFSET 值
    const offset = (page - 1) * pageSize
    // 构建 SQL 查询语句，带有 LIMIT 和 OFFSET 子句
    const sqlStr = `select * from ev_room limit ${pageSize} offset ${offset}`
    db.query(sqlStr,(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        // 查询总行数的SQL语句
        const countSql = `select count(*) as total from ev_room`
        db.query(countSql,(err,count)=>{
            if(err) return res.cc(500,'数据库查询错误')
            // 提取总行数
            const total = count[0].total
            res.send({code:200,msg:'获取成功',data:results,page,pageSize,total })
        })
    })
}

// 新增房型信息
exports.addRoomType = (req,res)=>{
    // 获取用户提交过来的数据
    const roomInfo = req.body
    // 新增sql语句
    const sqlStr='insert into ev_room set ?'
    // 查询
    db.query(sqlStr,roomInfo,(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        res.send({code:200,msg:'新增成功'})
    })
}