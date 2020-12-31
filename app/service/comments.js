const Service = require('egg').Service

class commentsService extends Service{
    /**
     * 查看该课程下所有评论
     * @params (*) id
     */
    async getComments(id){
        let CommentsModel = this.ctx.model.CommentsModel;
        let ReplayParentModel = this.ctx.model.ReplayParentModel;
        let ReplayChildModel = this.ctx.model.ReplayChildModel;
        let UsersModel = this.ctx.model.UsersModel;
        UsersModel.hasMany(CommentsModel);
        CommentsModel.belongsTo(UsersModel);
        CommentsModel.hasMany(ReplayParentModel);
        ReplayParentModel.belongsTo(CommentsModel);
        ReplayParentModel.hasMany(ReplayChildModel);
        ReplayChildModel.belongsTo(ReplayParentModel);
        return await CommentsModel.findAll({
            where: {AnserquestionModelId:id},
            include:[
                {
                    model:ReplayParentModel,
                    include:[
                        {model:ReplayChildModel}
                    ]
                },
                {
                     model:UsersModel
                }
            ]
        })
    }

    /**
     * 添加根评论
     */
    async addComments(){
        let CommentsModel = this.ctx.model.CommentsModel;
        return await CommentsModel.create();
    }


}

module.exports = commentsService