const Service = require('egg').Service

class cartService extends Service{
    /**
     * 添加购物车
     * @param {*} userId 
     * @param {*} courceId 
     */
    async addCart(userId,singleId,mealId){
        let GoodCartModel = this.ctx.model.GoodCartModel;
        let CartitemModel = this.ctx.model.CartitemModel;
        //判断有无购物车，无添加
        const res = await GoodCartModel.findOrCreate({
            where: {userModelId: userId},
            defaults:{userModelId: userId}
        })
        //判断单科班还是套餐班
        let conditions = {};
        if(singleId){
            conditions = {
                goodCartModelId:res[0].dataValues.id,
                classSingleModelId:singleId
            }
        }else if(mealId){
            conditions = {
                goodCartModelId:res[0].dataValues.id,
                classMealModelId:mealId
            }
        }
        const resItem = await CartitemModel.findOne({
            where: conditions,
            attributes:['id']
        })
        
        if(resItem){    //有则数量 + 1
            return await CartitemModel.increment('count',{by:1,where:conditions});
        }else{  //没有则添加
            const date = new Date();
            conditions.count = 1;   
            conditions.date = this.ctx.helper.formatTime(date);
            return await CartitemModel.create(conditions)
        }
    }

    /**
     * 删除购物车/批量删除购物车
     * @param {*} userId 
     * @param {*} cartId 
     */
    async deleteCart(userId,cartId){
        let CartitemModel = this.ctx.model.CartitemModel;
        return await CartitemModel.destroy({
            where: {id:cartId}
        })
    }

    /**
     * 清空购物车 / 删除选中购物车商品
     * @param {*} userId 
     * @param {*} cartIds 
     * @param {*} isAll 
     */
     async deleteCartAll(userId,cartIds,isAll){
        let GoodCartModel = this.ctx.model.GoodCartModel;
        let CartitemModel = this.ctx.model.CartitemModel;
        const res = await GoodCartModel.findOne({
            where:{userModelId:userId},
            attributes:['id']
        })
        const myCartId = res.dataValues.id;
        console.log(cartIds,isAll)
        //清空购物车
        if(isAll){
            return await CartitemModel.destroy({
                where: {goodCartModelId:myCartId}
            })
        }else{  //删除选中购物车商品
            return await CartitemModel.destroy({
                where: {id: JSON.parse(cartIds)}
            })
        }
    }

    /**
     * 查看购物车
     * @params {*} userId
     * @params {*} courceId
     */
    async getCart(userId){
        let GoodCartModel = this.ctx.model.GoodCartModel;
        let CartitemModel = this.ctx.model.CartitemModel;
        let ClassSingleModel = this.ctx.model.ClassSingleModel;
        let ClassMealModel = this.ctx.model.ClassMealModel;
        return await GoodCartModel.findAll({
            where: {userModelId: userId},
            include:[
                {
                    model:CartitemModel,
                    order:["date","desc"],
                    include:[
                        {
                            model:ClassSingleModel
                        },
                        {
                            model:ClassMealModel
                        }
                    ]
                }
            ],
            raw:true
        })
    }
}

module.exports = cartService;