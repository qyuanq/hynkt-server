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
}

module.exports = commentsController;