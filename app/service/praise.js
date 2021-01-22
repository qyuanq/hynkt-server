const Service = require('egg').Service;
const sequelize = require('sequelize');

class praiseService extends Service{
    /**
     * 点赞 / 取消点赞
     * @param (*) userId
     * @param (*) anserQuestionId
     */
    async onLike(userId,CommentId,commentLabel){
        let PraiseModel = this.ctx.model.PraiseModel;
        let AnserquestionModel = this.ctx.model.AnserquestionModel; 
        let CommentsModel = this.ctx.model.CommentsModel;
        let ReplayModel = this.ctx.model. ReplayModel;
        let row;
        let res;
        CommentId = parseInt(CommentId);
        if(commentLabel === 'anserQuestionId'){
           likes(AnserquestionModel,'AnserquestionModelId',null,null,CommentId);
        }else if(commentLabel === 'commentId'){
            likes(CommentsModel,null,'CommentsModelId',null,CommentId);
        }else if(commentLabel === 'replayId'){
            likes(ReplayModel,null,null,'RepalyModelId',CommentId);
        }

        async function likes(model,AnserquestionModelId,CommentsModelId,RepalyModelId,CommentId){
            let json;
            if(AnserquestionModelId){
                // 答疑，修改where动态条件
                json = {UsersModelId:userId,AnserquestionModelId:CommentId}
            }else if(CommentsModelId){
                // 评论 修改where动态条件
                json = {UsersModelId:userId,CommentsModelId:CommentId}
            }else if(RepalyModelId){
                // 回复 修改where动态条件
                json = {UsersModelId:userId,RepalyModelId:CommentId}
            }
            // 是否有该点赞记录
            row = await PraiseModel.findAll({
                where: json
            });
            // 获取praise点赞总数
            res = await model.findOne({
                attributes:['praise'],
                where: {id:CommentId}
            });
            let praise = res.praise;
            // 取消点赞
            if(row.length > 0){
                // 取消点赞
                await PraiseModel.destroy({where: json})
                //修改 总数 - 1
                await model.update({praise:praise - 1},{where: {id:CommentId}});
            }else{
                // 点赞
                await PraiseModel.create(json)
                //总数 + 1
                await model.update({praise:praise + 1},{where: {id:CommentId}});
            }
        }
    }

    /**
     * 是否点赞
     * @param (*) usersModelId
     * @param (*) anserquestionModelId
     */
    async isLike(userId,commentId,commentLabel){
        let PraiseModel = this.ctx.model.PraiseModel;
        let row;
        let conditions; //where动态条件
        if(commentLabel === 'anserQuestionId'){
            // 设置答疑条件
            conditions = {UsersModelId:userId,AnserquestionModelId:commentId};
            row = await find(conditions);
        }else if(commentLabel === 'commentId'){
            // 设置评论条件
            conditions = {UsersModelId:userId,CommentsModelId:commentId};
            row = await find(conditions);
        }else if(commentLabel === 'replayId'){
            // 设置回复条件
            conditions = {UsersModelId:userId,RepalyModelId:commentId};
            row = await find(conditions);
        }
        // 查询函数
        async function find(conditions){
           return await PraiseModel.findAll({
                where: conditions
            })
        }
        
        if(row.length > 0){
            // 说明该用户状态为以点赞
            return true;
        }else{
            // 说明该用户状态为未点赞
            return false;
        }
    }
}
module.exports = praiseService;