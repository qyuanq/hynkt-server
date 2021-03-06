const Service = require('egg').Service

class chapterTestService extends Service {
    /**
     * @param (*) id 课程id
     * 获取章节练习
     */
    async getChapterTest(id){
        const {ctx} = this;
        let CourceSectionModel = ctx.model.CourceSectionModel;
        let ChapterTestModel = ctx.model.ChapterTestModel;
        return await CourceSectionModel.findAll({
            where: {classSingleModelId:id}
            // include:[
            //     {
            //         model:ChapterTestModel,
            //         attributes:["id","title","optionA","optionB","optionC","optionD","parse"]
            //     }
            // ]
        })
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
            attributes:["id","title","optionA","optionB","optionC","optionD","answer","parse"]
        });
    }
}

module.exports = chapterTestService;