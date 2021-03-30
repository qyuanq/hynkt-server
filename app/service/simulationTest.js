const Service = require('egg').Service
const sequelize = require('sequelize')
class simulationTestService extends Service {
    /**
     * 获取所有模拟考试
     * @param (*) courceId
     */
    async getAllTest(courceId){
        let SimulationTestModel = this.ctx.model.SimulationTestModel;
        let MysimulationModel = this.ctx.model.MysimulationModel;
        return await SimulationTestModel.findAll({
            where :{classSingleModelId:courceId},
            include:[
                {
                    model:MysimulationModel,
                    attributes:["count","score","record","time"]
                }
            ],
            order:[["id","asc"]],
            raw:true
        })
    }

    /**
     * 获取模拟考试下所有考题
     * @param (*) testId
     */
    async getTestQuestion(testId){
        let TestQuestionModel = this.ctx.model.TestQuestionModel;
        return await TestQuestionModel.findAll({
            where: {simulationTestModelId: testId}
        })
    }

    /**
     * 保存更新模拟考试进度
     * @param (*) userId
     * @param (*) testId
     * @param (*) record
     * @param (*) time
     */
    async updateTestRecord(userId,data){
        let MysimulationModel = this.ctx.model.MysimulationModel;
        data.usersModelId = userId
        console.log('data值',data)
        const res = await MysimulationModel.upsert(data)
        if(data.score >= 0){
             //count默认为0，count自增 +1
            await MysimulationModel.increment('count',{by:1,where:{simulationTestModelId:data.simulationTestModelId}});
        }
        return res;
    }
}

module.exports = simulationTestService