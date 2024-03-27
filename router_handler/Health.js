// 导入数据库模块
const db = require('../db/index.js');

exports.findHealthpeList = (req,res) => {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 9;
    const offset = (page - 1) * pageSize;
    const sqlStr = `select * from health limit ${pageSize} offset ${offset}`;
  
    console.log('SQL 查询语句:', sqlStr); // 调试输出 SQL 查询语句
  
    db.query(sqlStr, (err, results) => {
      if (err) {
        console.error('查询错误:', err); // 调试输出查询错误信息
        return res.status(500).send('数据库查询错误');
      }
  
      console.log('查询结果:', results); // 调试输出查询结果
  
      const countSql = `select count(*) as total from health`;
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
}
// const req = {
//     query: {
//         page: 1,
//         pageSize: 5
//     }
// };
// const res = {
//     cc: (status, message) => {
//         console.error('错误:', status, message);
//     },
//     send: (data) => {
//         console.log('响应数据:', data);
//     }
// };
// exports.findHealthpeList(req, res);




exports.addHealth = (req, res) => {
  const data = req.body;
  const sqlStr = 'INSERT INTO Health SET ?';
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
// // 模拟请求对象
// const req = {
//   body: {
//     name: 'David',
//     age: 35,
//     gender: 'Male',
//     blood_type: 'AB+',
//     medical_history: '无',
//     health_condition: true
//   }
// };
// // 模拟响应对象
// const res = {
//   cc: (status, message) => {
//     console.error('错误:', status, message);
//   },
//   send: (data) => {
//     console.log('响应数据:', data);
//   }
// };
// exports.addHealth(req, res);


// 删除房型
exports.delHealths = (req,res)=>{
  const id = req.query.id
  const sqlStr = 'delete from Health where id=?'
  db.query(sqlStr,id,(err,results)=>{
      if(err) return res.cc(500,'数据库查询错误')
      return res.send({code:200,msg:'删除成功'})
  })
}

// // 模拟的删除请求对象
// const delReq = {
//   query: {
//     id: 4 // 假设要删除的健康记录的 ID 为 1
//   }
// };

// // 模拟的响应对象
// const res = {
//   cc: (status, message) => {
//     console.error('错误:', status, message);
//   },
//   send: (data) => {
//     console.log('响应数据:', data);
//   }
// };

// // 调用删除接口函数
// exports.delHealths(delReq, res);


// 编辑房型信息
exports.editHealth = (req,res)=>{
  const roomInfo = req.body
  const sqlStr='update Health set ?  where id=?'
  db.query(sqlStr,[roomInfo,roomInfo.id],(err,results)=>{
      if(err) return res.cc(500,'数据库查询错误')
      return res.send({code:200,msg:'编辑成功'})
  })
}

// // 模拟的编辑请求对象
// const editReq = {
//   body: {
//     id: 2, // 假设要编辑的健康记录的 ID 为 1
//     name: 'Alice', // 修改后的姓名
//     age: 99, // 修改后的年龄
//     gender: 'Female', // 修改后的性别
//     blood_type: 'A+', // 修改后的血型
//     medical_history: '无明显病史', // 修改后的病史
//     health_condition: true // 修改后的健康状况
//   }
// };

// // 模拟的响应对象
// const res = {
//   cc: (status, message) => {
//     console.error('错误:', status, message);
//   },
//   send: (data) => {
//     console.log('响应数据:', data);
//   }
// };

// // 调用编辑接口函数
// exports.editHealth(editReq, res);