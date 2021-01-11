const Service = require('egg').Service;

class praiseService extends Service{
    /**
     * 点赞 / 取消点赞
     * @param (*) userId
     * @param (*) anserQuestionId
     */
    async onLike(userId,CommentId,commentLabel){
        let PraiseModel = this.ctx.model.PraiseModel;
        let AnserquestionModel = this.ctx.model.AnserquestionModel; 
        let CommentModel = this.ctx.model.CommentModel;
        let ReplayModel = this.ctx.model. ReplayModel;
        let row;
        let res;

        if(commentLabel === 'anserQuestionId'){
            this.likes(AnserquestionModel,{AnserquestionModelId:CommentId});
            // row = await PraiseModel.findAll({
            //     where: {UsersModelId:userId,AnserquestionModelId:CommentId}
            // });
            // res = await AnserquestionModel.findOne({
            //     attributes:['praise'],
            //     where: {id:CommentId}
            // });
            // let praise = res.praise;
            // console.log('praise',praise)
            // // 取消点赞
            // if(row.length > 0){
            //     // 取消点赞
            //     await PraiseModel.destroy({where: {UsersModelId:userId,AnserquestionModelId:anserQuestionId}})
            //     //修改 总数 - 1
            //     await AnserquestionModel.update({praise:praise - 1},{where: {id:anserQuestionId}});
            // }else{
            //     // 点赞
            //     await PraiseModel.create({UsersModelId:userId,AnserquestionModelId:anserQuestionId})
            //     //总数 + 1
            //     await AnserquestionModel.update({praise:praise + 1},{where: {id:anserQuestionId}});
            // }
        }else if(commentLabel === 'commentId'){
            // row = await PraiseModel.findAll({
            //     where: {UsersModelId:userId,CommentsModelId:CommentId}
            // });
            this.likes(CommentModel,{CommentsModelId:CommentId});
        }else if(commentLabel === 'replayId'){
            // row = await PraiseModel.findAll({
            //     where: {UsersModelId:userId,RepalyModelId:CommentId}
            // });
            this.likes(ReplayModel,{RepalyModelId:CommentId});
        }

        async function likes(model,modelId){
            row = await PraiseModel.findAll({
                where: {UsersModelId:userId,modelId}
            });
            res = await model.findOne({
                attributes:['praise'],
                where: {id:CommentId}
            });
            let praise = res.praise;
            console.log('praise',praise)
            // 取消点赞
            if(row.length > 0){
                // 取消点赞
                await PraiseModel.destroy({where: {UsersModelId:userId,modelId}})
                //修改 总数 - 1
                await model.update({praise:praise - 1},{where: {id:CommentId}});
            }else{
                // 点赞
                await PraiseModel.create({UsersModelId:userId,modelId})
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
        if(commentLabel === 'anserQuestionId'){
            row = await PraiseModel.findAll({
                where: {UsersModelId:userId,AnserquestionModelId:commentId}
            })
        }else if(commentLabel === 'commentId'){
            row = await PraiseModel.findAll({
                where: {UsersModelId:userId,CommentsModelId:commentId}
            })
        }else if(commentLabel === 'replayId'){
            row = await PraiseModel.findAll({
                where: {UsersModelId:userId,RepalyModelId:commentId}
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