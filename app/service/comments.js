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
     * 添加评论或回复
     * @params (*) commentsContent
     */
    async addComments(comment,userId){
        console.log('userId',userId);
        const {ctx} = this;
        let AnserquestionModel = ctx.model.AnserquestionModel;
        let CommentsModel = ctx.model.CommentsModel;
        let ReplayModel = ctx.model.ReplayModel; 
        let res = null;
        comment.data.UsersModelId = userId;
        if(comment.CommentsModelId){
            // 添加回复
            comment.data.CommentsModelId = comment.CommentsModelId;
            comment.data.to_user_id = comment.to_user_id;
            comment.data.level = comment.level;
            res =  await ReplayModel.create(comment.data);
        }else{
            // 添加根评论
            comment.data.AnserquestionModelId = comment.AnserquestionModelId;
            res = await CommentsModel.create(comment.data);
        }
        if(res){
            // 获取答疑评论总数
            let result = await AnserquestionModel.findOne({
                attributes:['comment'],
                where: {id:comment.AnserquestionModelId}
            });
            // 答疑评论+ 1
            await AnserquestionModel.update({comment:result.comment + 1},{where: {id:comment.AnserquestionModelId}})
        }
        return res;
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

    /**
     * 删除评论或回复
     * @params (*) id
     */
}

module.exports = commentsService