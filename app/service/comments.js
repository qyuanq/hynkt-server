const Service = require('egg').Service
const sequelize = require('sequelize')

class commentsService extends Service{
    /**
     * 查看该答疑下所有评论
     * @params (*) id
     */
    async getComments(id){
        let CommentsModel = this.ctx.model.CommentsModel;
        let ReplayModel = this.ctx.model.ReplayModel;
        let UsersModel = this.ctx.model.UsersModel;
        // UsersModel.hasMany(CommentsModel);
        // CommentsModel.belongsTo(UsersModel);
        // CommentsModel.hasMany(ReplayModel);
        // ReplayModel.belongsTo(CommentsModel);
        return await CommentsModel.findAll({
            where: {AnserquestionModelId:id},
            include:[
                {
                    model:ReplayModel,
                    // attributes: [[sequelize.fn('COUNT', sequelize.col('replay.id')), 'replay_model.count']],
                    attributes:[[sequelize.literal(`(SELECT COUNT(*) FROM  replay as replay_model WHERE replay_model.CommentsModelId = comments_model.id)`),'count']]
                },
                {
                     model:UsersModel
                }
            ]
        })
    }

    /**
     * 添加根评论
     * @params (*) commentsContent
     */
    async addComments(comment){
        const {ctx} = this;
        let CommentsModel = ctx.model.CommentsModel;
        let ReplayModel = ctx.model.ReplayModel;
        if(comment.AnserquestionModelId){
            comment.data.AnserquestionModelId = comment.AnserquestionModelId;
            return await CommentsModel.create(comment.data);
        }else if(comment.CommentsModelId){
            comment.data.CommentsModelId = comment.CommentsModelId;
            comment.data.to_user_id = comment.to_user_id;
            comment.data.level = comment.level;
            return await ReplayModel.create(comment.data);
        }
    }
    /**
     * 获取回复
     * @params (*) commentId
     */
    async getReplay(commentId){
        console.log('commentId',commentId);
        let ReplayModel = this.ctx.model.ReplayModel;
        let UsersModel = this.ctx.model.UsersModel;
        return await ReplayModel.findAll({
            where: {CommentsModelId:commentId},
            include:[
                {
                    model:UsersModel,
                    as:"users_model"
                },
                {
                    model:UsersModel,
                    as:"to_user"
                }
            ]
        })
    }
}

module.exports = commentsService