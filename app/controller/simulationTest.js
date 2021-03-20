const Controller = require('egg').Controller

class simulationTestController extends Controller{
    /**
     * @summary 获取课程全部模拟考试
     * @description 获取课程全部模拟考试
     * @router get /api/alltests/:courceId
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getAllTest(){
        const {ctx,service} = this;
        const courceId = ctx.params.courceId || {};
        const res = await service.simulationTest.getAllTest(courceId);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 获取模拟考试下所有考题
     * @description 获取模拟考试下所有考题
     * @router get /api/testQuestions/:testId
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getTestQuestion(){
        const {ctx,service} = this;
        const testId = ctx.params.testId || {};
        console.log('参数',testId);
        const res = await service.simulationTest.getTestQuestion(testId);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 更新保存用户模拟考试记录
     * @description 更新保存用户模拟考试记录
     * @router post /api/testRecord
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async updateTestRecord(){
        const {ctx,service} = this;
        const data = ctx.request.body || {};
        let userId = ctx.state.user.data.id;
        const res = await service.simulationTest.updateTestRecord(userId,data);
        ctx.helper.success({ctx,res});
    }
}

module.exports = simulationTestController