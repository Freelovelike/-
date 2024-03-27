const db = require('../db/index.js');

exports.getQuotaList = (req,res) => {
    // 分页
    const pageSize = req.query.pageSize || 10;
    const pageNum = req.query.pageNum || 1;
    const sql = `select * from quota limit ${(pageNum-1)*pageSize},${pageSize}`;
   db.query(sql,(err,results)=> {
      if(err) return res.cc(err);

      const sql2= `select count(*) as total from quota`;
      db.query(sql2,(err,results2)=> {
        if(err) return res.cc(err);
        res.send({
          code:200,
          msg:'获取数据成功',
          data:results,
          total:results2[0].total
        })
      })
   })
}

exports.getQuotaListById = (req,res) => {
    // 分页
    const pageSize = req.query.pageSize || 10;
    const pageNum = req.query.pageNum || 1;
    const sql = `select * from quota limit ${(pageNum-1)*pageSize},${pageSize} where user_id=?`;
   db.query(sql,(err,results)=> {
      if(err) return res.cc(err);

      const sql2= `select count(*) as total from quota  where user_id=?`;
      db.query(sql2,(err,results2)=> {
        if(err) return res.cc(err);
        res.send({
          status:0,
          message:'获取数据成功',
          data:results,
          total:results2[0].total
        })
      })
   })
}

exports.createQuota = (req,res) => {
   // 获取客户端提交过来的数据
    
    const {height,weight,blood_sugar,boold_pressure,user_id} = req.body;
    console.log({height,weight,blood_sugar,boold_pressure,user_id});
    console.log(typeof Number(weight));
    const quota = {height,weight:Number(weight),blood_sugar:Number(blood_sugar),boold_pressure,user_id};
    const sql = `insert into quota set ?`;
    db.query(sql,quota,(err,results)=> {
        if(err) return res.cc(err);
        if(results.affectedRows !== 1) return res.cc('创建失败');
        return res.cc('创建成功',200);
    })

}