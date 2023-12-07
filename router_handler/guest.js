// 导入数据库模块
const db = require('../db/index.js')

// 获取入住用户列表信息
exports.getUserGuest=(req,res)=>{
    // 获取客户端传递的分页参数，默认为第一页，每页5条数据
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 5
    // 入住状态ID
    const resideStateId=req.query.resideStateId==='0'?null:req.query.resideStateId
    // 入住用户名称
    const guestName=req.query.guestName==='0'?null:req.query.guestName
    // 计算 OFFSET 值
    const offset = (page - 1) * pageSize
    const queryParams=[
        resideStateId,resideStateId,
        guestName,guestName,
        pageSize,offset
    ]
    // 构建sql语句
    const sqlStr = `
    SELECT *
    FROM ev_guest
    JOIN ev_residestate ON ev_guest.resideStateId = ev_residestate.resideStateId
    JOIN ev_room ON ev_guest.roomId = ev_room.roomId
    JOIN ev_roomstate ON ev_room.roomStateId = ev_roomstate.roomStateId
    JOIN ev_roomtype ON ev_room.roomTypeId = ev_roomtype.roomTypeId
    WHERE
        (? IS NULL OR ev_guest.resideStateId = ?)
        AND
        (? IS NULL OR ev_guest.guestName = ?)
    LIMIT ${pageSize} OFFSET ${offset}
    `
    // 执行sql语句
    db.query(sqlStr,queryParams,(err,result)=>{
        if(err) return res.cc(500,'数据库查询错误')
        const data =result.map((item)=>{
            return {
                guestId:item.guestId,
                guestName:item.guestName,
                identityId:item.identityId,
                phone:item.phone,
                deposit:item.deposit,
                guestNum:item.guestNum,
                leaveDate:item.leaveDate,
                resideDate:item.resideDate,
                resideState:{
                    resideStateId:item.resideStateId,
                    resideStateName:item.resideStateName
                },
                resideStateId:item.resideStateId,
                room:{
                    roomId:item.roomId,
                    roomStateId:item.roomStateId,
                    roomState:{
                        roomStateId:item.roomStateId,
                        roomStateName:item.roomStateName
                    },
                    roomTypeId:item.roomTypeId,
                    roomType:{
                        bedNum:item.bedNum,
                        roomTypeId:item.roomTypeId,
                        roomTypeName:item.roomTypeName,
                        roomTypePrice:item.roomTypePrice,
                        typeDescription:item.typeDescription
                    }
                },
                roomId:item.roomId,
                totalMoney:item.totalMoney
            }
        })
        //获取总数
        const count=`
        select count(*) as total from ev_guest
		JOIN ev_residestate ON ev_guest.resideStateId=ev_residestate.resideStateId
		JOIN ev_room ON ev_guest.roomId=ev_room.roomId
		JOIN ev_roomstate ON ev_room.roomStateId=ev_roomstate.roomStateId
		JOIN ev_roomtype ON  ev_room.roomTypeId = ev_roomtype.roomTypeId
        `
        db.query(count,(err,result)=>{
            if(err) return res.cc(500,'数据库查询错误')
            const total=result[0].total
            res.send({code:200,msg:'查询成功',data,page,pageSize,total})
        })
    })
}

// 获取结账状态列表
exports.getCheckOutList=(req,res)=>{
    const sqlStr='select * from ev_residestate'
    db.query(sqlStr,(err,result)=>{
        if(err) return res.cc(500,'数据库查询错误')
        res.send({code:200,msg:'查询成功',data:result})
    })
}

// 新增顾客（入住用户）
exports.addGuest=(req,res)=>{
    const guestInfo=req.body
    const roomId=guestInfo.roomId
    const sqlStr='insert into ev_guest set ?'
    db.query(sqlStr,guestInfo,(err,result)=>{
        if(err) return res.cc(500,'数据库查询错误')
        // 获取刚自增的顾客id
        const guestId=result.insertId
        // 更新房间状态
        const roomSql='update ev_room set roomStateId=2,guestId=? where roomId=?'
        db.query(roomSql,[guestId,roomId],(err,result)=>{
            if(err) return res.cc(500,'数据库查询错误')
            res.send({code:200,msg:'新增成功'})
        })
    })
}
// -- 开始事务
// START TRANSACTION;

// -- 将 ev_room 表中 guestId 为 8 的记录的 guestId 设置为 NULL
// UPDATE ev_room SET guestId = NULL WHERE guestId = 8;

// -- 将 ev_room 表中 roomId 为 1 的记录的 guestId 设置为 8
// UPDATE ev_room SET guestId = 8 WHERE roomId = 1;

// -- 更新 ev_guest 表中 guestId 为 3 的记录
// UPDATE ev_guest SET roomId = 1 WHERE guestId = 8;

// -- 提交事务
// COMMIT;
// 编辑顾客（入住用户）
exports.editGuest=(req,res)=>{
    const guestInfo=req.body
    const roomSql=`UPDATE ev_room SET roomStateId=1,guestId = NULL WHERE guestId = ${guestInfo.guestId}`
    const roomSql2=`UPDATE ev_room SET roomStateId=2,guestId=${guestInfo.guestId} WHERE roomId = ${guestInfo.roomId}`
    const sqlStr=`UPDATE ev_guest SET ? WHERE guestId = ${guestInfo.guestId}`
    db.query(roomSql,(err,result)=>{
        if(err) return res.cc(500,'数据库查询错误')
        db.query(roomSql2,(err,result)=>{
            if(err) return res.cc(500,'数据库查询错误')
            db.query(sqlStr,guestInfo,(err,result)=>{
                if(err) return res.cc(500,'数据库查询错误')
                res.send({code:200,msg:'编辑成功'})
            })
        })
    })
}

// 根据顾客id获取顾客已经开好的房间
exports.getGuestRoom=(req,res)=>{
    const guest=req.query
    const sqlStr=`
    select * from ev_room 
    JOIN ev_guest ON ev_room.guestId=ev_guest.guestId
	JOIN ev_roomType ON ev_room.roomTypeId=ev_roomType.roomTypeId
    where 
    (${guest.guestId} IS NULL OR ev_room.guestId = ${guest.guestId})   
	AND
    (${guest.roomTypeId} IS NULL OR ev_room.roomTypeId = ${guest.roomTypeId})
    `
    db.query(sqlStr,(err,results)=>{
        if(err) return res.cc(500,'数据库查询错误')
        const data={
            guestId:results[0].guestId,
            roomId:results[0].roomId,
            roomTypeId:results[0].roomTypeId,
            guestName:results[0].guestName,
            roomTypeName:results[0].roomTypeName
        }
        return res.send({code:200,msg:'获取成功',data})
    })
}