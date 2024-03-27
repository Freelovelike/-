const db = require('../db/index.js');

exports.getQuotaList = (req,res) => {
    // 分页
    const pageSize = req.query.pageSize || 10;
    const pageNum = req.query.pageNum || 1;
    const sql = `select * from quota limit ${(pageNum-1)*pageSize},${pageSize}`;
   db.query(sql,(err,results)=> {
      if(err) return res.cc(err);
      return res.send({code:200,msg:'获取指标列表成功',data:results})
   })
}

exports.createQuota = (req,res) => {
    // create quota  height weight blood_sugar boold_pressure
    
   
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