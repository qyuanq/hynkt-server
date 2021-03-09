const Service = require('egg').Service
const { Op } = require("sequelize");

class favoritesService extends Service{
    /**
     * 收藏练习 / 视频
     * @params (*) userId
     * @params (*) testId
     * @params (*) videoId
     */
    async collection(userId,testId,videoId){
        let FavoritesModel = this.ctx.model.FavoritesModel;
        let conditions;
        let row;
        // 收藏习题
        if(testId){
            //设置条件
            conditions = {UsersModelId:userId,ChapterTestModelId:testId};
            // 查看是否收藏
            row = await find(conditions);
            // 说明已收藏
            if(row.length > 0){
                //  取消收藏
                FavoritesModel.destroy({where: conditions});
            }else{  //未收藏
                //添加收藏
                FavoritesModel.create(conditions);
            }
        }else if(videoId){//收藏视频
            conditions = {UsersModelId:userId,VideoGoodModelId:videoId};
            row = await find(conditions);
            if(row.length > 0){
                FavoritesModel.destroy(conditions);
            }else{  
                FavoritesModel.create(conditions);
            }
        }

        // 查询是否存在函数
        async function find(conditions){
            return await FavoritesModel.findAll({
                where: conditions
            });
        }
    };

    /**
     * 获取是否收藏  收藏状态
     */
    async isCollection(userId,testId,videoId){
        let FavoritesModel = this.ctx.model.FavoritesModel;
        let conditions;
        // 收藏的习题
        if(testId){
            conditions = {
                UsersModelId:userId,
                ChapterTestModelId:testId
            };
            return await FavoritesModel.findOne({
                where: conditions
            });

        }else if(videoId){  //收藏的视频
            conditions = {
                UsersModelId:userId,
                VideoGoodModelId:videoId
            }
            return await FavoritesModel.findOne({
                where: conditions
            });
        }
    };

    /**
     * 获取某一用户全部收藏
     * @param (*) userId
     * @param (*) isTest
     * @param (*) isVideo
     */
    async getCollectionAll(userId,isTest,isVideo){
        let FavoritesModel = this.ctx.model.FavoritesModel;
        let conditions; //查询条件
        //获取习题
        if(isTest){
            conditions = {
                UsersModelId:userId,
                ChapterTestModelId:{
                    [Op.not]: null
                }
            };
            return await FavoritesModel.findAll({
                where: conditions
            });
        }else if(isVideo){  //获取视频
            conditions = {
                UsersModelId:userId,
                VideoGoodModelId:{
                    [Op.not]: null
                }
            }
            return await FavoritesModel.findAll({
                where: conditions
            });
        }
    }

}

module.exports = favoritesService;