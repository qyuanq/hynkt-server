const Controller = require('egg').Controller;

class commentsController extends Controller{
    /**
     * @summary 获取该答疑下全部评论
     * @description 获取该答疑下全部评论
     * @router get /api/comments
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getComments(){
        const {ctx,service} = this;
        const id = ctx.params.id || {};
        const currentPage = ctx.params.currentPage || 1;
        const res = await service.comments.getComments(id,currentPage);
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
        const userId = ctx.state.user.data.id
        const comments = ctx.request.body || {};
        const res = await service.comments.addComments(comments,userId);
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
        const currentPage = ctx.params.currentPage || 1;
        const res = await service.comments.getReplay(commentId,currentPage);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 删除评论
     * @description 删除评论
     * @router delete /api/mycomments/:comment
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async deleteComments(){
        const {ctx,service} = this;
        // comment转化json格式
        const comment = JSON.parse(decodeURIComponent(ctx.request.query.comment));
        const res = await service.comments.deleteComment(comment);
        ctx.helper.success({res,ctx});
    }
}

module.exports = commentsController;