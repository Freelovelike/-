const { date } = require("joi");
const db = require("../db/index.js");

exports.getIndicatorAnaysisList = (req, res) => {
  // 分页
  const userid = req.user.id;
  const pageSize = req.query.pageSize || 10;
  const pageNum = req.query.pageNum || 1;
  const sql = `select * from indicator_anaysis where user_id= ? limit ${
    (pageNum - 1) * pageSize
  },${pageSize}`;
  db.query(sql, [userid], (err, results) => {
    if (err) return res.cc(err);

    const sql2 = `select count(*) as total from indicator_anaysis where user_id= ?`;
    db.query(sql2, [userid], (err, results2) => {
      if (err) return res.cc(err);
      return res.send({
        code: 200,
        msg: "获取数据成功！",
        data: results,
        total: results2[0].total,
      });
    });
  });
};

exports.createIndicatorAnaysis = (req, res) => {
  // 健康状况   建议
  // 创建健康指标 字段有 name sex age healthy suggestion user_id

  const { name, sex, age, healthy, suggestion, user_id } = req.body;
  const data = {
    name,
    sex,
    age,
    healthy,
    suggestion,
    user_id:req.user.id,
    create_at: new date(),
  };
  const sql = `insert into indicator_anaysis set ?`;
  db.query(sql, data, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1)
      return res.send({ code: 200, msg: "创建健康指标失败" });
    return res.send({ code: 200, msg: "创建健康指标成功" });
  });
};
