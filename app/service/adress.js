const { consoleLevel } = require('egg-mock');

const Service = require('egg').Service

class AdressService extends Service {
    /**
     * 获取省份信息
     */
    async getProvinces(){
        let province;  //省份信息
        province = await this.ctx.model.ProvinceModel.findAll();
        return Promise.all(province.map(async item => {
            // 获取城市信息
            let citys = await this.ctx.model.CityModel.findAll({where:{province_id:item.province_id}});
            citys = await Promise.all(citys.map(async item => {
                console.log('id:',item.city_id)
                // 获取区县信息
                let countys = await this.ctx.model.CountyModel.findAll({where:{city_id:item.city_id}})
                return {
                    name:item.name,
                    county:countys
                }
            }))
            console.log(citys)
            return {
                name:item.name,
                province_id:item.province_id,
                city:citys
            }
        }))
    }
}

module.exports = AdressService