'use strict'
const Controller = require('egg').Controller

/**
 * @Controller用户鉴权
 */
class UserAccessController extends Controller{
    constructor(ctx){
        super(ctx)
    }
    /**
     * @summary 用户登入
     * @description 用户登入
     * @router post /auth/jwt/login
     * @request body loginRequest *body
     * @response 200 baseResponse 创建成功
     */
    async login(){
        const {ctx,service} = this
        // 校验参数
        ctx.validate(ctx.rule.loginRequest);
        // 组装参数
        const payload = ctx.request.body || {}
        // 调用service进行业务处理
        const res = await service.userAccess.login(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ctx,res})
    }

    /**
     * @summary 用户登出
     * @description 用户登出
     * @router post /auth/jwt/logout
     * @request body loginRequest *body
     * @response 200 baseResponse 创建成功
     */
    async logout(){
        const {ctx,service} = this
        // 调用service进行业务处理
        await service.userAccess.logout();
        // 设置响应内容和状态码
        ctx.helper.success({ctx})
    }

    /**
     * @summary 获取用户信息
     * @description 获取用户信息
     * @router get /api/user
     * @request header string *header
     * @response 200 baseResponse 成功
     */
    async getUser(){
        const {ctx,service} = this;
        const id = ctx.state.user.data.id;
        const res = await service.userAccess.current(id);
        ctx.helper.success({res,ctx});
    }
}

module.exports = UserAccessController