const Controller = require('egg').Controller
/**
 * @Controller 用户管理
 */
class UserController extends Controller{
    constructor(ctx){
        super(ctx)
    }

    /**
     * @summary 创建用户
     * @description 创建用户，记录用户账户/密码/类型
     * @router post /api/user
     * @request body createUserRequest *body
     * @response 200 baseResponse 创建成功
     */
    async create(){
        const {ctx,service} = this
        // 检验参数
        ctx.validate(ctx.rule.createUserRequest)
        // 组装参数
        const payload = ctx.request.body || {}
        console.log(payload)
        // 调用service进行业务处理
        const res = await service.user.create(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ctx, res})
        
    }

    /**
     * @summary 用户登录
     * @description 验证用户手机和密码 返回token
     * @router post /login
     * @request body createUserRequest *body
     * @response 200 baseResponse 登录成功
     */
    async login(){
        const {ctx,service} = this;
        // 检验参数
        ctx.validate(ctx.rule.createUserRequest)
        const payload = ctx.request.body || {}
        const res = await service.userAccess.login(payload)
        ctx.helper.success({ctx, res})
    }

    /**
     * @summary 获取用户信息
     * @description 传入token获取用户信息
     * @router get /getUser
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getuser(){
        const {ctx,service} = this;
        // // 拿到token 
        // const token = ctx.header.authorization;
        // console.log('token:',token);
        // // 验证token
        const id = ctx.state.user.data.id
        console.log('id:',id)
        const user = await service.user.findById(id)
        ctx.body = user
    }

    /**
     * @summary 更新用户信息
     * @description 更新用户信息
     * @router post /api/updateUser
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async updateUser(){
        const {ctx,service} = this;
        const payload = ctx.request.body || {}
        const id = ctx.state.user.data.id
        const res = await service.user.update(id,payload)
         ctx.helper.success({ctx, res})
    }

    /**
     * @summary 获取用户课程
     * @description 获取用户课程
     * @router get /api/myCources
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async userCource(){
        const {ctx,service} = this;
        // 获取get 传递的参数
        const id = ctx.state.user.data.id;
        const res = await service.user.userCource(id);
        ctx.helper.success({ctx,res})
    }

    /**
     * @summary 查看用户学习进度
     * @description 查看用户学习进度
     * @router get /api/myProgress
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async userProgress(){
        const {ctx,service} = this;
        const id = ctx.params.id || {};
        const res = await service.user.userProgress(id);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 更新用户学习进度
     * @description 更新用户学习进度
     * @router get /api/updateProgress
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async updateProgress(){
        const {ctx,service} = this;
        const data = ctx.request.body || {};
        console.log('data',data);
        const res= await service.user.updateProgress(data);
        console.log(res);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 查看用户章节练习进度
     * @description 查看用户章节练习进度
     * @router get /api/myTest
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
     async getMyTest(){
        const {ctx,service} = this;
        const data = ctx.request.query || {};
        // console.log('查看参数',...data);
        const res = await service.user.getMyTest(data.userId,data.classId,data.sectionId); 
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 更新用户章节练习进度
     * @description 更新用户章节练习进度
     * @router get /api/myTest
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
     async updateMyTest(){
        const {ctx,service} = this;
        const data = ctx.request.body || {};
        const userId = ctx.state.user.data.id;
        const res = await service.user.updateMyTest(data,userId); 
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 获取用户所属专业
     * @description 获取用户所属专业
     * @router get /api/myClassgory
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async userClassgory(){
        const {ctx,service} = this;
        const id = ctx.params.id || {};
        const res = await service.user.userClassgory(id);
        ctx.helper.success({ctx,res}); 
    }
}

module.exports = UserController