const Controller = require('egg').Controller

class answerQuestionController extends Controller{
    /**
     * @summary 获取课程答疑
     * @descrption 获取课程答疑
     * @router get /api/answerQuestions/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getQuestion(){
        const {ctx,service} = this;
        // 课程id
        const courceId = parseInt(ctx.params.id) || {};
        // 分页页码
        const currentPage = parseInt(ctx.params.currentPage) || 1;
        console.log('courceId查看',ctx.params);
        const res = await service.answerQuestion.getQuestion(courceId,currentPage);
        ctx.helper.success({ctx, res})
    }

    /**
     * @summary 获取答疑详情
     * @description 获取答疑详情
     * @router get /api/questionsDetail/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getQuestionDetail(){
        const {ctx,service} = this;
        const id = ctx.params.id;
        const res = await service.answerQuestion.getQuestionDetail(id);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 删除答疑
     * @description 删除答疑
     * @router delete /api/answerQuestions/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async deleteQuestion(){
        const {ctx,service} = this;
        const id = ctx.params.id;
        const res = await service.answerQuestion.deleteQuestion(id);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 创建课程答疑
     * @description 创建课程答疑
     * @router get /api/setQuestion
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    // async setQuestion(){
    //     const {ctx,service} = this;
    //     const question = ctx.request.body || {};
    //     const res = await service.answerQuestion.setQuestion(question);
    //     ctx.helper.success({ctx,res});
    // }
}

module.exports = answerQuestionController;