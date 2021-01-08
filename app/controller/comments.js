const Controller = require('egg').Controller;

class commentsController extends Controller{
    /**
     * @summary 获取该课程下全部答疑
     * @description 获取该课程下全部答疑
     * @router get /api/comments
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getComments(){
        const {ctx,service} = this;
        const id = ctx.params.id || {};
        const res = await service.comments.getComments(id);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 添加答疑
     * @description 添加答疑
     * @router post /api/comments
     * @request body createUserRequest *body
     * @response 200 baseResponse 返回用户信息成功
     */
    async addComments(){
        const {ctx,service} = this;
        const comments = ctx.request.body || {};
        const res = await service.comments.addComments(comments);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 获取回复
     * @desciption 获取一二级回复
     * @router get /api/replays
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getReplay(){
        const {ctx,service} =this;
        const commentId = ctx.params.commentId || {};
        const res = await service.comments.getReplay(commentId);
        ctx.helper.success({ctx,res});
    }
}

module.exports = commentsController;