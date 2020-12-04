const Controller = require('egg').Controller;

class payController extends Controller {
    /**
     * 
     */
    async wxpay(){
        const {ctx,service} = this;
        await service.pay.wxPay();
    }
}

module.exports = payController