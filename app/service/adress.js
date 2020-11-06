const { consoleLevel } = require('egg-mock');

const Service = require('egg').Service

class AdressService extends Service {
    /**
     * 获取省份信息
     */
    async getProvinces(){
        let province;  //省份信息
        province = await this.ctx.model.ProvinceModel.findAll();
        return province
    }
    async getCity(){
        let cityInfo = this.getCounty()
        return cityInfo;
    }
    async getCounty(){
        let citys = await this.ctx.model.CityModel.findAll();
        return Promise.all(citys.map(async cut => {
        let countys = await this.ctx.model.CountyModel.findAll({where: {city_id:cut.city_id}})
        return{
            name:cut.name,
            city_id:cut.city_id,
            county:countys
        } 
        }))
    }
}

module.exports = AdressService