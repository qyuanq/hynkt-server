const Controller = require('egg').Controller;

class cityController extends Controller {
    /**
     * @summary 获取省市区三级信息
     * @description 获取省市区三级信息
     * @router get /api/getProvinces
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getProvince(){
        const {ctx,service} = this
        let province = await service.adress.getProvinces();
        ctx.body = province
    }
}
module.exports = cityController