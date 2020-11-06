const Controller = require('egg').Controller;

class cityController extends Controller {
    /**
     * @summary 获取省份信息
     */
    async getProvince(){
        const {ctx,service} = this
        let citys = await service.adress.getCity();
        let province = await service.adress.getProvinces();
        let proInfo = province.map((item,index) => {
           return{
               name:item.name,
               city:citys[index]
           }
       })
        ctx.body = proInfo
    }
}
module.exports = cityController