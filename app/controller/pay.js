const Controller = require('egg').Controller;

class payController extends Controller {
    /**
     * 
     */
    async wxpay(){
        const {ctx,service} = this;
        const res = await service.pay.wxPay();
        ctx.helper.success({ctx,res})
    }
}

module.exports = payController