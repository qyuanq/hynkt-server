const Controller = require('egg').Controller;

class praiseController extends Controller{
    /**
     * @summary 点赞
     * @description 点赞
     * @router get /api/like
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async onLike(){
        const {ctx,service} = this;
        const userId = ctx.query.userId;
        let res;
        if(ctx.query.anserQuestionId){
            // 答疑点赞
            const anserQuestionId = ctx.query.anserQuestionId;
            res = await service.praise.onLike(userId,anserQuestionId,'anserQuestionId');
        }else if(ctx.query.commentId){
            // 评论点赞
            const commentId = ctx.query.commentId;
            res = await service.praise.onLike(userId,commentId,'commentId');
        }else if(ctx.query.replayId){
            // 回复点赞
            const replayId = ctx.query.replayId;
            res = await service.praise.onLike(userId,replayId,'replayId');
        }
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 点赞状态
     * @description 点赞状态
     * @router get /api/isLike
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async isLike(){
        const {ctx,service} = this;
        const userId = ctx.query.userId;
        let res;
        if(ctx.query.anserQuestionId){
            // 答疑点赞状态
            const anserQuestionId = ctx.query.anserQuestionId;
            res = await service.praise.isLike(userId,anserQuestionId,'anserQuestionId');
        }else if(ctx.query.commentId){
            // 评论点赞状态
            const commentId = ctx.query.commentId;
            res = await service.praise.isLike(userId,commentId,'commentId');
        }else if(ctx.query.replayId){
            // 回复点赞状态
            const replayId = ctx.query.replayId;
            res = await service.praise.isLike(userId,replayId,'replayId');
        }
        ctx.helper.success({ctx,res}); 
    }
}
module.exports = praiseController;