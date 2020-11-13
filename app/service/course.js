const Service = require('egg').Service

class CourseService extends Service {
    /**
     * 获取管理分类
     */
    async getCategory(){
        
        return await this.ctx.model.CategoryModel.findAll({attributes:['name']})
    }

    /**
     * 获取专业
     */
    async getSpeclallty(){
       return await this.ctx.model.CategoryModel.getSpeclallty()
    }
}

module.exports = CourseService