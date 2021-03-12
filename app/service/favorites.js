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
        let CollectionitemModel = this.ctx.model.CollectionitemModel;
        let conditions;
        let row;
        // 查询用户的收藏夹id
        const FavoritesModelId = await FavoritesModel.findOne({
            where: {UsersModelId:userId},
            attributes:['id']
        })
        // 收藏习题
        if(testId){
            //设置条件
            conditions = {FavoritesModelId:FavoritesModelId.id,ChapterTestModelId:testId};
            // 查看是否收藏
            row = await find(conditions);
            // 说明已收藏
            if(row.length > 0){
                //  取消收藏
                CollectionitemModel.destroy({where: conditions});
            }else{  //未收藏
                //添加收藏
                CollectionitemModel.create(conditions);
            }
        }else if(videoId){//收藏视频
            conditions = {UsersModelId:userId,VideoGoodModelId:videoId};
            row = await find(conditions);
            if(row.length > 0){
                CollectionitemModel.destroy(conditions);
            }else{  
                CollectionitemModel.create(conditions);
            }
        }

        // 查询是否存在函数
        async function find(conditions){
            return await CollectionitemModel.findAll({
                where: conditions
            });
        }
    };

    /**
     * 获取是否收藏  收藏状态
     */
    async isCollection(userId,testId,videoId){
        let FavoritesModel = this.ctx.model.FavoritesModel;
        let CollectionitemModel = this.ctx.model.CollectionitemModel;
        let conditions;
        //查询用户的收藏夹id
        const FavoritesModelId = await FavoritesModel.findOne({
            where: {UsersModelId:userId},
            attributes:['id']
        })
        // 收藏的习题
        if(testId){
            conditions = {
                FavoritesModelId:FavoritesModelId.id,
                ChapterTestModelId:testId
            };
            return await CollectionitemModel.findOne({
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
        let CollectionitemModel = this.ctx.model.CollectionitemModel;
        let ChapterTestModel = this.ctx.model.ChapterTestModel;
        let conditions; //查询条件
        //查询用户的收藏夹id
        const FavoritesModelId = await FavoritesModel.findOne({
            where: {UsersModelId:userId},
            attributes:['id']
        })
        //获取习题
        if(isTest){
            conditions = {
                FavoritesModelId:FavoritesModelId.id,
                ChapterTestModelId:{
                    [Op.not]: null
                }
            };
            const res = await FavoritesModel.findAll({
                include:[
                    {
                        model:ChapterTestModel
                    }
                ],
                where: {UsersModelId:userId},
                raw:true
            });
            return res.map(item => {
                return {
                    id: item['chapter_test_models.id'],
                    title: item['chapter_test_models.title'],
                    optionA: item['chapter_test_models.optionA'],
                    optionB: item['chapter_test_models.optionB'],
                    optionC: item['chapter_test_models.optionC'],
                    optionD: item['chapter_test_models.optionD'],
                    answer: item['chapter_test_models.answer'],
                    parse: item['chapter_test_models.parse']
                }
            })
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