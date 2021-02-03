const Service = require('egg').Service;

class answerQuestionService extends Service{
    /**
     * 获取课程答疑
     * @param {'*'} courceId 
     */
    async getQuestion(courceId,currentPage){
        let AnserquestionModel = this.ctx.model.AnserquestionModel;
        let UsersModel = this.ctx.model.UsersModel;
        // let ClassSingleModel = this.ctx.model.ClassSingleModel;
        let pageSize = 10;
        // UsersModel.hasMany(AnserquestionModel);
        // AnserquestionModel.belongsTo(UsersModel);
        // ClassSingleModel.hasMany(AnserquestionModel);
        // AnserquestionModel.belongsTo(ClassSingleModel);
        const res =  await AnserquestionModel.findAndCountAll({
            include:[
                {model:UsersModel}
            ],
            where: {ClassSingleModelId : courceId},
            offset:(currentPage - 1) * pageSize,
            limit:pageSize,
            order:[["praise","desc"],["date","desc"]],
            distinct: true  //count的数量  include不算进去
        })
        console.log('res',res)
        return {
            result:res.rows,
            countPage:Math.ceil(res.count / pageSize)
        }
    }

    /**
     * 获取答疑详情
     * @param {*} questionId 
     */
    async getQuestionDetail(questionId){
        let AnserquestionModel = this.ctx.model.AnserquestionModel;
        let UsersModel = this.ctx.model.UsersModel;
        return await AnserquestionModel.findOne({
            where: {id:questionId},
            include:[
                {
                    model:UsersModel,
                    attributes:['id','username','icon']
                }
            ]
        })
    }

    /**
     * 上传课程问题
     * @param {'*'} question
     */
    async setQuestion(question){
        console.log('上传答疑',question)
        let AnserquestionModel = this.ctx.model.AnserquestionModel;
        return await AnserquestionModel.create(question);
    }

    /**
     * 删除答疑
     * @param {'*'} questionId
     */
    async deleteQuestion(questionId){
        let AnserquestionModel = this.ctx.model.AnserquestionModel;
        return await AnserquestionModel.destroy({
            where: {id:questionId}
        });
    }
}

module.exports = answerQuestionService