const Service = require('egg').Service
const sequelize = require('sequelize')

class chapterTestService extends Service {
    /**
     * @param (*) id 课程id
     * 获取章节练习
     */
    async getChapterTest(courceId,userId){
        const {ctx} = this;
        let CourceSectionModel = ctx.model.CourceSectionModel;
        let ChapterTestModel = ctx.model.ChapterTestModel;
        let MytestModel = ctx.model.MytestModel;
        let res =  await CourceSectionModel.findAll({
            where: {classSingleModelId:courceId},
            include:[
                {
                    model:ChapterTestModel,
                    attributes:[[sequelize.literal(`(SELECT COUNT(*) FROM  chapter_test as chapter_test_model)`),'count']] 
                }
            ]
        })
        
        const count = await MytestModel.findAll({
            where: {classSingleModelId: courceId,usersModelId: userId},
            attributes:["haveCount","rightCount"]
        })
        count.forEach((item,index) => {
            res[index].dataValues.haveCount = item.haveCount;
            res[index].dataValues.rightCount = item.rightCount;
        })
        return res;
    }

     /**
     * @param (*) id 章节id
     * 获取具体习题
     */
    async getTopic(id){
        const {ctx} = this;
        let ChapterTestModel = ctx.model.ChapterTestModel;
        return await ChapterTestModel.findAll({
            where:{courceSectionModelId:id},
            attributes:["id","title","optionA","optionB","optionC","optionD","answer","parse","type"]
        });
    }
}

module.exports = chapterTestService;