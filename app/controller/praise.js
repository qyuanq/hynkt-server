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
        const anserQuestionId = ctx.query.anserQuestionId;
        let res = await service.praise.onLike(userId,anserQuestionId);
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
        const anserQuestionId = ctx.query.anserQuestionId;
        let res = await service.praise.isLike(userId,anserQuestionId);
        ctx.helper.success({ctx,res}); 
    }
}
module.exports = praiseController;