/**
*在这里定义和用户相关的路由处理函数，供/router/user.js 模块进行调用*/


//注册用户的处理函数
exports.regUser = function(req, res){
    res.send('注册用户')
}

//登录的处理函数
exports.login = function(req, res){
    res.send('登录')
}