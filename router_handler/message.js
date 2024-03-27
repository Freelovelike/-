// 导入数据库模块
const db = require('../db/index.js');

exports.createMessage = (req,res) => {
   // 获取客户端提交过来的数据
   const message = req.body.messag;
   const userid = req.body.userid;
   const data={messagee,userid}
   console.log({message});
   const sql = 'insert into ev_message set ?';
   db.query(sql,data,(err,results)=> {
      if(err) return res.cc(err);
      if(results.affectedRows !== 1)  return res.send({code:500,msg:'留言失败'})
      return res.send({code:200,msg:'留言成功'})
   })
}
// 删除留言
exports.deleteMessage = (req,res) => {
   const id = req.query.id;
   const sql = 'delete from ev_message where id=?'
   db.query(sql,id,(err,results)=> {
      if(err) return res.cc(err);
      if(results.affectedRows !== 1)  return res.send({code:500,msg:'删除留言失败'})
      return res.send({code:200,msg:'删除留言成功'})
   })
}


exports.updateMessage = (req,res) => {
      const id = req.body.id;
      const message = req.body.message;
      const sql = 'update ev_message set message = ? where id=?'

      db.query(sql,[message,id],(err,results)=> {
         if(err) return res.cc(err);
         if(results.affectedRows !== 1)  return res.send({code:500,msg:'更新留言失败'})
         return res.send({code:200,msg:'更新留言成功'})
      })
}

exports.getMessageList = (req,res) => {
   const sql = 'select * from ev_message'
   db.query(sql,(err,results)=> {
      if(err) return res.cc(err);
      return res.send({code:200,msg:'获取留言列表成功',data:results})
   })
}