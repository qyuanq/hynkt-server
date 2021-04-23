const Controller = require('egg').Controller;

class courseController extends Controller {

    /**
     * @summary 获取课程分类
     * @description 获取课程分类包括种类、专业、课程分类
     * @router get /api/categorys
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getCategory(){
        const {ctx,service} = this;
        const res = await service.course.getCateGoryInfo();
        ctx.helper.success({ctx, res})
    }

    /**
     * @summary 获取课程班型
     * @description 获取单科班，套餐班型
     * @router get /api/classes/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getClasses(){
        const {ctx,service} = this;
        const id = ctx.params.id || {};
        //当前科目信息
        const classGoryInfo = await service.course.getClassgory(id)
        // 单科班
        const single = await service.course.getClasses(id);
        // 全科班
        const meal = await service.course.getMealClass(id)
        const res = {
            id:id,
            name:classGoryInfo.name,
            conditions:classGoryInfo.conditions_model,
            registratio:classGoryInfo.registratio_model,
            examguide:classGoryInfo.examguide_model,
            question:classGoryInfo.question_model,
            single:single,
            meal:meal
        } 
        ctx.helper.success({ctx,res})
    }

    /**
     * @summary 获取某一单科课程
     * @description 获取单一课程信息
     * @router get /api/cource/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getCource(){
        const {ctx,service} = this;
        const id = ctx.params.id || {};
        const res = await service.course.getCource(id);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 获取某一套餐班信息
     * @description 获取某一套餐班信息
     * @router get /api/mealClass/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getMealClass(){
        const {ctx,service} = this;
        const id = ctx.params.id || {};
        const res = await service.course.getOneMeal(id);
        ctx.helper.success({ctx,res})
    }


    /**
     * @summary 获取课程视频
     * @description 获取课程视频详细信息
     * @router get /api/goodVideos/:id
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getGoodVideo(){
        const {ctx,service} = this;
        const id = ctx.params.id || {};
        const content = await service.course.getGoodVideo(id);
        const count = await service.course.getVideoCount(id);
        let res = {
            content:content,
            count:count
        }
        ctx.helper.success({ctx,res})
    }

    /**
     * @summary 获取热门课程
     * @description 获取单科班套餐班热门课程
     * @router get /api/hotcources
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getHotCource(){
        const {ctx,service} = this;
        const res = await service.course.getHotCource();
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 模糊查询课程
     * @description 根据关键词模糊查询课程
     * @router get /api/searchCources
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async searchCource(){
        const {ctx,service} = this;
        const query = ctx.request.query;
        const keyword = query.keyword || null;
        const classGroup = query.classGroup || null;
        const classType = query.classType || null;
        const res = await service.course.searchCource(keyword,classGroup,classType);
        ctx.helper.success({ctx,res});
    }
}
module.exports = courseController
