const Controller = require('egg').Controller;

class cityController extends Controller {
    /**
     * @summary 获取省份信息
     */
    async getProvince(){
        const {ctx,service} = this
        let province = await service.adress.getProvinces();
        ctx.body = province
        console.log(province)
    }
}
module.exports = cityController