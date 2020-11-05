const { consoleLevel } = require('egg-mock');

const Service = require('egg').Service

class AdressService extends Service {
    /**
     * 获取省份信息
     */
    async getProvinces(){
    //     let proInfo = [];
    //     let province = {};
    //     let citys = [];
    //     for(let i = 11; i<=65; i++){
    //         let pro = await this.ctx.model.ProvinceModel.findOne({where:{province:i}})
    //         if(pro){
    //             province.province = pro.province;
    //             province.name = pro.name;
    //         }
    //         for(let j = 1; j<30; j++){
    //             if(j < 10){
    //                 j = '0' + j;
    //                 console.log(j)
    //             }
    //             let city = await this.ctx.model.ProvinceModel.findOne({where:{province:i,city:j}})
    //             if(city){
    //                 citys.push(city.name)
    //             }
    //         }
    //         province.city = citys
    //         citys = []
    //         proInfo.push(province)
    //         province = {}
    //     }
        
    //     return proInfo


        let proInfo = [];   //全部数据
        let province = {};  //省份信息
        let citys = [];
        province = await this.ctx.model.ProvinceModel.findAll();
        proInfo = province.map(item => {
            citys = this.ctx.model.CityModel.findAll({where: {province_id : item.province_id}})
            return item.city =  citys
        })
        console.log(citys)
        
        return proInfo;
    }
}

module.exports = AdressService