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
}

module.exports = UserController