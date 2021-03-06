const Controller = require('egg').Controller

class chapterTestController extends Controller{
    /**
     * @summary 获取全部章节
     * @description 获取全部章节
     * @router get /api/chapterTests/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getChapterTest(){
        const {ctx,service} = this;
        const id = ctx.params.id;
        const res = await service.chapterTest.getChapterTest(id);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 获取章节练习题
     * @description 获取章节练习题
     * @router get /api/topics/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getTopic(){
        const {ctx,service} = this;
        const id = ctx.params.id;
        const res = await service.chapterTest.getTopic(id);
        ctx.helper.success({ctx,res});
    }
}

module.exports = chapterTestController;