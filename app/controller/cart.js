const Controller = require('egg').Controller

class cartController extends Controller{
    /**
     * @summary  添加购物车
     * @description 添加购物车
     * @router get /api/carts
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async addCart(){
        const {ctx,service} = this;
        const query = ctx.request.query || {};
        let singleId = query.singleId ? query.singleId :null
        let mealId = query.mealId ? query.mealId : null
        const userId = ctx.state.user.data.id;
        const res = await service.cart.addCart(userId,singleId,mealId);
        console.log(res);
        ctx.helper.success({ctx, res});
    }

    /**
     * @summary  查看购物车
     * @description 查看购物车
     * @router get /api/myCart
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getCart(){
        const {ctx,service} = this;
        const userId = ctx.state.user.data.id || {};
        const res = await service.cart.getCart(userId);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary  删除购物车
     * @description 删除购物车
     * @router delete /api/myCart/:cartId
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async deleteCart(){
        const {ctx,service} = this;
        const cartId = ctx.params.cartId || {};
        const userId = ctx.state.user.data.id || {};
        const res = await service.cart.deleteCart(userId,cartId)
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary  清空购物车/选中购物车商品
     * @description 清空购物车/选中购物车商品
     * @router delete /api/myCartAll
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
     async deleteCartAll(){
        const {ctx,service} = this;
        const userId = ctx.state.user.data.id || {};
        const query = ctx.request.query;
        const cartIds = query.cartIds || [];
        const isAll = query.isAll || null;
        const res = await service.cart.deleteCartAll(userId,cartIds,isAll);
        ctx.helper.success({ctx,res});
    }
}

module.exports = cartController;