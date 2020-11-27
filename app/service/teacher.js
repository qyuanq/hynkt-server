const Service = require('egg').Service

class TeacherService extends Service {
    /**
     * 获取教师信息
     */
    async getTeacher(id){
        let ClassSingleModel = this.ctx.model.ClassSingleModel;
        let TeacherModel = this.ctx.model.TeacherModel;
        let TeacheritemModel = this.ctx.model.TeacheritemModel;
        ClassSingleModel.belongsToMany(TeacherModel,{through:TeacheritemModel})
        TeacherModel.belongsToMany(ClassSingleModel,{through:TeacheritemModel})
        return await this.ctx.model.TeacherModel.findOne({
            include:[
                {model:ClassSingleModel}
            ],
            where: {id:id}
        })
    }
}
module.exports = TeacherService;