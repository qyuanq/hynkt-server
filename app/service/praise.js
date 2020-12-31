const Service = require('egg').Service;

class praiseService extends Service{
    /**
     * 点赞 / 取消点赞
     * @param (*) userId
     * @param (*) anserQuestionId
     */
    async onLike(userId,anserQuestionId){
        let PraiseModel = this.ctx.model.PraiseModel;
        let AnserquestionModel = this.ctx.model.AnserquestionModel;
        let row = await PraiseModel.findAll({
            where: {UsersModelId:userId,AnserquestionModelId:anserQuestionId}
        })
        console.log('row',row.length);
        const res = await AnserquestionModel.findOne({
            attributes:['praise'],
            where: {id:anserQuestionId}
        })
        let praise = res.praise;
        console.log('praise',praise)
        // 取消点赞
        if(row.length > 0){
            // 取消点赞
            await PraiseModel.destroy({where: {UsersModelId:userId,AnserquestionModelId:anserQuestionId}})
            //修改 总数 - 1
            await AnserquestionModel.update({praise:praise - 1},{where: {id:anserQuestionId}});
        }else{
            // 点赞
            await PraiseModel.create({UsersModelId:userId,AnserquestionModelId:anserQuestionId})
            //总数 + 1
            await AnserquestionModel.update({praise:praise + 1},{where: {id:anserQuestionId}});
        }
    }

    /**
     * 是否点赞
     * @param (*) usersModelId
     * @param (*) anserquestionModelId
     */
    async isLike(userId,anserQuestionId){
        let PraiseModel = this.ctx.model.PraiseModel;
        let row = await PraiseModel.findAll({
            where: {UsersModelId:userId,AnserquestionModelId:anserQuestionId}
        })
        if(row.length > 0){
            // 说明该用户状态为以点赞
            return true;
        }else{
            // 说明该用户状态为未点赞
            return false;
        }
    }
}
module.exports = praiseService;