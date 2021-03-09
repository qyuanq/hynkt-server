const Controller = require('egg').Controller

class favoritesController extends Controller{
    /**
     * @summary 收藏/取消收藏
     * @description 收藏/取消收藏 习题/视频
     * @router get /api/collection
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async collection(){
        const {ctx,service} = this;
        const userId = ctx.request.query.userId;
        const testId = ctx.request.query.testId || {};
        const videoId = ctx.request.query.testId || {};
        const res = await service.favorites.collection(userId,testId,videoId);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 检查是否收藏
     * @description 检测某个用户是否收藏了某个习题/视频 
     * @router get /api/isCollection
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async isCollection(){
        const {ctx,service} = this;
        const userId = ctx.request.query.userId;
        const testId = ctx.request.query.testId || {};
        const videoId = ctx.request.query.videoId || {};
        const res = await service.favorites.isCollection(userId,testId,videoId);
        ctx.helper.success({ctx,res});
    }

    /**
     * @summary 某一用户收藏的全部习题 / 视频
     * @description 某一用户收藏的全部习题 / 视频
     * @router get /api/collectionall
     * @request header string *header
     * @response 200 baseResponse 返回用户信息成功
     */
    async getCollectionAll(){
        const {ctx,service} = this;
        const userId = ctx.request.query.userId;
        const isTest = ctx.request.query.isTest || {};
        const isVideo = ctx.request.query.isVideo || {};
        const res = await service.favorites.getCollectionAll(userId,isTest,isVideo);
        ctx.helper.success({ctx,res});
    }
}

module.exports = favoritesController;