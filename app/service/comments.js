const Service = require('egg').Service
const sequelize = require('sequelize')

class commentsService extends Service{
    /**
     * 查看该答疑下所有评论
     * @params (*) id
     */
    async getComments(id,currentPage){
        let CommentsModel = this.ctx.model.CommentsModel;
        let ReplayModel = this.ctx.model.ReplayModel;
        let UsersModel = this.ctx.model.UsersModel;
        // 每页显示数量
        let pageSize = 10;
        const res =  await CommentsModel.findAndCountAll({
            where: {AnserquestionModelId:id},
            offset:(currentPage - 1) * pageSize,
            limit:pageSize,
            include:[
                {
                    model:ReplayModel,
                    // attributes: [[sequelize.fn('COUNT', sequelize.col('replay.id')), 'replay_model.count']],
                    attributes:[[sequelize.literal(`(SELECT COUNT(*) FROM  replay as replay_model WHERE replay_model.CommentsModelId = comments_model.id)`),'count']]
                },
                {
                     model:UsersModel,
                     attributes:['id','username','icon']
                }
            ],
            order:[["praise","desc"],["date","desc"]],//根据点赞和时间倒序排列
            attributes:['id','AnserquestionModelId','content','date','praise'],
            distinct: true  //去重，返回的 count 把 include 的数量算进去
        })
       
        return {
            result:res.rows,
            countPage:Math.ceil(res.count / pageSize)
        }
    }

    /**
     * 添加评论或回复
     * @params (*) commentsContent
     */
    async addComments(comment,userId){
        console.log('回复comment',comment);
        console.log('userId',userId);
        const {ctx} = this;
        let AnserquestionModel = ctx.model.AnserquestionModel;
        let CommentsModel = ctx.model.CommentsModel;
        let ReplayModel = ctx.model.ReplayModel; 
        let res = null;
        comment.data.UsersModelId = userId;
        comment.data.praise = 0;
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
    async getReplay(commentId,currentPage){
        console.log('commentId',commentId);
        let ReplayModel = this.ctx.model.ReplayModel;
        let UsersModel = this.ctx.model.UsersModel;
        let pageSize = 10;
        const res =  await ReplayModel.findAndCountAll({
            where: {CommentsModelId:commentId},
            include:[
                {
                    model:UsersModel,
                    as:"users_model",
                    attributes:["id","username","icon"]
                },
                {
                    model:UsersModel,
                    as:"to_user",
                    attributes:["id","username","icon"]
                }
            ],
            offset:(currentPage - 1) * pageSize,
            limit:pageSize,
            order:[["praise","desc"],["date","desc"]]
        })
        return {
            result:res.rows,
            countPage:Math.ceil(res.count / pageSize)
        }
    }

    /**
     * 删除评论或回复
     * @params (*) comment
     */
    async deleteComment(comment){
        const {ctx} = this;
        let AnserquestionModel = ctx.model.AnserquestionModel;
        let CommentsModel = ctx.model.CommentsModel;
        let ReplayModel = ctx.model.ReplayModel; 

         // 获取答疑评论总数
         let result = await AnserquestionModel.findOne({
            attributes:['comment'],
            where: {id:comment.AnserquestionModelId}
        });

        if(comment.replay_models){
            // 删除评论
            console.log('删除主评论');
            await CommentsModel.destroy({where: {id:comment.id}})
            await ReplayModel.destroy({where: {CommentsModelId:comment.id}})
            // 答疑评论- 1
            await AnserquestionModel.update({comment:result.comment - (comment.replay_models.length + 1)},{where: {id:comment.AnserquestionModelId}});
        }else{
            // 删除回复
            console.log('删除回复');
            await ReplayModel.destroy({where: {id:comment.id}})
             // 答疑评论- 1
            await AnserquestionModel.update({comment:result.comment - 1},{where: {id:comment.AnserquestionModelId}});
        }
    }
}

module.exports = commentsService