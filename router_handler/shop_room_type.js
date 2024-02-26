// 导入数据库模块
const db = require('../db/index.js')
// moment
const moment = require('moment')
// 查询房型信息列表
// exports.findRoomTypeList = (req, res) => {
//   // 获取客户端传递的分页参数，默认为第一页，每页5条数据
//   const page = req.query.page || 1;
//   const pageSize = req.query.pageSize || 5;
//   // 计算 OFFSET 值
//   const offset = (page - 1) * pageSize;
//   // 构建 SQL 查询语句，带有 LIMIT 和 OFFSET 子句
//   const sqlStr = `select * from Work limit ${pageSize} offset ${offset}`;
//   db.query(sqlStr, (err, results) => {
//     if (err) return res.status(500).send('数据库查询错误');
//     // 查询总行数的SQL语句
//     const countSql = `select count(*) as total from Work`;
//     db.query(countSql, (err, count) => {
//       if (err) return res.status(500).send('数据库查询错误');
//       // 提取总行数
//       const total = count[0].total;
//       res.send({ code: 200, msg: '获取成功', data: results, page, pageSize, total });
//     });
//   });
// };

exports.findRoomTypeList = (req, res) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 9;
  const offset = (page - 1) * pageSize;
  const sqlStr = `select * from Work limit ${pageSize} offset ${offset}`;

  console.log('SQL 查询语句:', sqlStr); // 调试输出 SQL 查询语句

  db.query(sqlStr, (err, results) => {
    if (err) {
      console.error('查询错误:', err); // 调试输出查询错误信息
      return res.status(500).send('数据库查询错误');
    }

    console.log('查询结果:', results); // 调试输出查询结果

    const countSql = `select count(*) as total from Work`;
    db.query(countSql, (err, count) => {
      if (err) {
        console.error('查询错误:', err); // 调试输出查询错误信息
        return res.status(500).send('数据库查询错误');
      }

      console.log('总行数:', count); // 调试输出总行数

      const total = count[0].total;
      res.send({
        code: 200,
        msg: '获取成功',
        data: results,
        page,
        pageSize,
        total
      });
    });
  });
};


// exports.addShop = (req, res) => {
//   const ref = req.body;
//   const sqlStr = 'INSERT INTO Work SET ?';
//   console.log('Executing SQL query:', sqlStr);
//   console.log('Data to be inserted:', ref);
//   db.query(sqlStr, [ref], (err, results) => {
//     if (err) return res.cc(500, '数据库查询失败');
//     return res.send({ code: 200, msg: '添加成功', data: results });
//   });
// } 
exports.addShop = (req, res) => {
  const data = req.body;
  const sqlStr = 'INSERT INTO Work SET ?';
  console.log('Executing SQL query:', sqlStr);
  console.log('Data to be inserted:', data);
  db.query(sqlStr, data, (err, results) => {
    if (err) return res.cc(500, '数据库查询失败');
    return res.send({
      code: 200,
      msg: '添加成功',
      data: results
    });
  });
}


// 删除房型
exports.delShops = (req,res)=>{
  const id = req.query.id
  const sqlStr = 'delete from Work where id=?'
  db.query(sqlStr,id,(err,results)=>{
      if(err) return res.cc(500,'数据库查询错误')
      return res.send({code:200,msg:'删除成功'})
  })
}
// 编辑房型信息
exports.editShop = (req,res)=>{
  const roomInfo = req.body
  const sqlStr='update Work set ?  where id=?'
  db.query(sqlStr,[roomInfo,roomInfo.id],(err,results)=>{
      if(err) return res.cc(500,'数据库查询错误')
      return res.send({code:200,msg:'编辑成功'})
  })
}