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
        const courceId = ctx.params.id || {};
        const res = await service.answerQuestion.getQuestion(courceId);
        ctx.helper.success({ctx, res})
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