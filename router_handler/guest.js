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
    // 构建sql语句
    const sqlStr=`
    select * from ev_guest
    JOIN ev_residestate ON ev_guest.resideStateId=ev_residestate.resideStateId
    JOIN ev_room ON ev_guest.roomId=ev_room.roomId
    JOIN ev_roomstate ON ev_room.roomStateId=ev_roomstate.roomStateId
    JOIN ev_roomtype ON  ev_room.roomTypeId = ev_roomtype.roomTypeId
    where 
    (${resideStateId} IS NULL OR ev_guest.resideStateId = ${resideStateId}) 
     AND
    (${guestName} IS NULL OR ev_guest.guestName = ${guestName})
    limit ${pageSize} offset ${offset}
    `
    // 执行sql语句
    db.query(sqlStr,(err,result)=>{
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