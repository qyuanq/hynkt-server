const Service = require('egg').Service
const fs = require('fs')
// const unipay = require('@dcloudio/unipay')
class payService extends Service {
    async wxPay(){
        // const unipayIns = await unipay.initWeixin({
        //     appId: 'wx67ebcd3fcd4825e9',
        //     mchId: '1573583401',
        //     key: 'ed7e26b70229a6b55145397a094e9513',
        //     // pfx: fs.readFileSync('/path/to/your/pfxfile'), // p12文件路径，使用微信退款时需要，需要注意的是阿里云目前不支持以相对路径读取文件，请使用绝对路径的形式
        // })
        return true 
    }
}

module.exports = payService