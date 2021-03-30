const moment = require('moment')
// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')
// 处理成功响应
exports.success = ({ctx,res,msg = '请求成功'}) => {
    ctx.body = {
        code:0,
        data:res,
        msg
    }
    ctx.status = 200
}

// 处理失败响应
exports.fail = ({ctx,res,msg = '无数据'}) => {
    ctx.body = {
        code:-1,
        data:res,
        msg
    }
    ctx.status = 200
}