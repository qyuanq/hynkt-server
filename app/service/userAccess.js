'use strict'
const Service = require('egg').Service
class UserAccessService extends Service{
    async login(payload){
        const {ctx,service} = this
        // const user = await service.user.findByMobile(payload.phone)
        const user = await ctx.model.UsersModel.findOne({where:{phone: payload.phone}})
        console.log(user)
        if(!user){
            ctx.throw(404,'user not found')
        }
        let verifyPsw = await ctx.compare(payload.password,user.password)
        console.log('verifyPsw:',verifyPsw)
        if(!verifyPsw){
            ctx.throw(404,'user password is error')
        }
        // if(payload.password != user.password){
        //     ctx.throw(404,'user password is error')
        // }
        // 生成Token令牌
        return {token:await service.actionToken.apply(user.id)}
    }

    async logout(){

    }

    /**
     * 获取用户信息
     */
    async current(){
        const {ctx,service} = this
        //ctx.state.user  可以提取到jwt编码的data
        const _id = ctx.state.user.data._id
        const user = await service.user.find(_id)
        if(!user){
            ctx.throw(404,'user is not found')
        }
        user.password = 'How olad are you?'
        return user
    }
}
module.exports = UserAccessService