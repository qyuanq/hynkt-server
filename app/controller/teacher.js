const Controller = require('egg').Controller;

class teacherController extends Controller {
    /**
     * @summary 获取教师信息
     * @description 获取教师信息
     * @router get /api/teacher/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getTeacher(){
        const {ctx,service} = this;
        const id = ctx.params.id || {}
        const res = await service.teacher.getTeacher(id)
        ctx.helper.success({ctx,res});
    }
}

module.exports = teacherController;