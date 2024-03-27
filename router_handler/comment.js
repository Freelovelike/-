// 导入数据库模块
const db = require("../db/index.js");

exports.createComment = (req, res) => {
  // 获取客户端提交过来的数据
  const message_id = req.body.message_id;
  const comment = req.body.comment;
  const data = { message_id, comment };
  const sql = "insert into ev_comment set ?";
  db.query(sql, data, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1)
      return res.send({ code: 500, msg: "添加留言失败" });
    return res.send({ code: 200, msg: "添加评论成功" });
  });
};

// 删除留言
exports.deleteComment = (req, res) => {
     const id = req.query.id;
     const sql = 'delete from ev_comment where id=?'
     db.query(sql,id,(err,results)=> {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1)  return res.send({code:500,msg:'删除评论失败'})
        return res.send({code:200,msg:'删除评论成功'})
     })
};

exports.updateComment = (req,res) => {
      const id = req.body.id;
      const comment = req.body.comment;
      const sql = 'update ev_comment set comment = ? where id=?'

      db.query(sql,[comment,id],(err,results)=> {
         if(err) return res.cc(err);
         if(results.affectedRows !== 1)  return res.send({code:500,msg:'更新评论失败'})
         return res.send({code:200,msg:'更新评论成功'})
      })
}

exports.getCommentList = (req,res) => {
  
   const sql = 'select * from ev_comment'
   db.query(sql,(err,results)=> {
      if(err) return res.cc(err);
      return res.send({code:200,msg:'获取留言列表成功',data:results})
   })
}
