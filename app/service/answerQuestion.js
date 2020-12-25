const Service = require('egg').Service;

class answerQuestionService extends Service{
    /**
     * 获取课程答疑
     * @param {'*'} courceId 
     */
    async getQuestion(courceId){
        let AnserquestionModel = this.ctx.model.AnserquestionModel;
        let UsersModel = this.ctx.model.UsersModel;
        let ClassSingleModel = this.ctx.model.ClassSingleModel;
        UsersModel.hasMany(AnserquestionModel);
        AnserquestionModel.belongsTo(UsersModel);
        ClassSingleModel.hasMany(AnserquestionModel);
        AnserquestionModel.belongsTo(ClassSingleModel);
        return await AnserquestionModel.findAll({
            include:[
                {model:UsersModel}
            ],
            where: {ClassSingleModelId : courceId}
        })
    }

    /**
     * 上传课程问题
     * @param {'*'} question
     */
    async setQuestion(question){
        let AnserquestionModel = this.ctx.model.AnserquestionModel;
        return await AnserquestionModel.create(question);
    }
}

module.exports = answerQuestionService