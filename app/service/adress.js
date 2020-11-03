const Service = require('egg').Service

class AdressService extends Service {
    /**
     * 获取省份信息
     */
    async getProvinces(){
        let province = []
        for(let i = 11; i<=65; i++){
            let pro = await this.ctx.model.ProvinceModel.findOne({where:{province:i}})
            // console.log(pro.name)
            if(pro){
                province.push(pro);
            }
        }
        return province
    }
}

module.exports = AdressService