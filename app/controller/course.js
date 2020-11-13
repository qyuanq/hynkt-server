const Controller = require('egg').Controller;

class courseController extends Controller {

    /**
     * @summary 获取分类
     * @description 获取全部分类
     * @router get /api/categorys
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getCategory(){
        const {ctx,service} = this;
        const res = await service.course.getCategory();
        ctx.helper.success({ctx, res})
    }

    /**
     * @summary 获取专业
     * @description 获取全部专业
     * @router get /api/spe
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getSpe(){
        const {ctx,service} = this;
        const res = await service.course.getSpeclallty();
        ctx.helper.success({ctx,res})
    }
}
module.exports = courseController
