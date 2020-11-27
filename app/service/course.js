const { sequelize } = require('../../config/plugin')
const SpeclalltyModel = require('../model/SpeclalltyModel')

const Service = require('egg').Service

class CourseService extends Service {
    /**
     * 获取管理分类
     */
    async getCategory(){
        
        return await this.ctx.model.CategoryModel.findAll({attributes:['name']})
    }

    /**
     * 获取课程分类信息
     */
    async getCateGoryInfo(){
    
    // return await this.ctx.model.query("SELECT `category_model`.`id`, `category_model`.`name`, `speclallty_model`.`name` AS `speclallty_model.name` FROM `category` AS `category_model` LEFT OUTER JOIN `speclallty` AS `speclallty_model` ON `category_model`.`id` = `speclallty_model`.`categoryId`")
    let CategoryModel = this.ctx.model.CategoryModel;
    let SpeclalltyModel = this.ctx.model.SpeclalltyModel;
    let ClassgoryModel = this.ctx.model.ClassgoryModel
    CategoryModel.hasMany(SpeclalltyModel);
    SpeclalltyModel.belongsTo(CategoryModel,{foreginkey:"categoryId",targetkey:"id"});
    ClassgoryModel.belongsTo(SpeclalltyModel);
    SpeclalltyModel.hasMany(ClassgoryModel);

       let categoryInfo =  await CategoryModel.findAndCountAll({
           attributes:['name'],
           include:[{
               model: SpeclalltyModel,
               attributes:['name'],
               include:[{
                model: ClassgoryModel,
                attributes:['id','name']
               }]
           }],
        //    raw:true
       })
    return categoryInfo
    }

    /**
     * 获取当前课程类别下的所有信息
     */
    async getClassgory(id){
        let ClassgoryModel = this.ctx.model.ClassgoryModel;
        let ConditionsModel = this.ctx.model.ConditionsModel;
        let RegistratioModel = this.ctx.model.RegistratioModel;
        let ExamguideModel = this.ctx.model.ExamguideModel;
        let QuestionModel = this.ctx.model.QuestionModel;
        ClassgoryModel.hasOne(ConditionsModel);
        ClassgoryModel.hasOne(RegistratioModel);
        ClassgoryModel.hasOne(ExamguideModel);
        ClassgoryModel.hasOne(QuestionModel);
        ConditionsModel.belongsTo(ClassgoryModel);
        RegistratioModel.belongsTo(ClassgoryModel);
        ExamguideModel.belongsTo(ClassgoryModel);
        QuestionModel.belongsTo(ClassgoryModel);

       return await ClassgoryModel.findOne({
            where: {id:id},
            include:[
                {model:ConditionsModel},
                {model:RegistratioModel},
                {model:ExamguideModel},
                {model:QuestionModel}
            ]
        })
        
        // return {
        //     conditions:res.conditions_model,
        //     registration:res.registratio_model,
        //     examGuide:res.examguide_model,
        //     question:res.question_model
        // }
    }

    /**
     * 获取单科课程班型
     */
    async getClasses(id){
        console.log('id:',id)
        return await this.ctx.model.ClassSingleModel.findAll({where: {classgroup_id:id}})
    }
    
    /**
     * 获取某一单科课程信息
     * @param {'*'} pid 
     */
    async getCource(pid){
        let ClassSingleModel = this.ctx.model.ClassSingleModel;
        let TeacherModel = this.ctx.model.TeacherModel;
        let TeacheritemModel = this.ctx.model.TeacheritemModel;
        ClassSingleModel.belongsToMany(TeacherModel,{through:TeacheritemModel})
        TeacherModel.belongsToMany(ClassSingleModel,{through:TeacheritemModel})
        return await ClassSingleModel.findOne({
            where: {id:pid},
            include:[
                {model:TeacherModel}
            ]
        })
    }

    /**
     * 获取课程视频
     */
    async getGoodVideo(id){
        console.log('课程id:',id);
        let section = await this.ctx.model.VideoGoodModel.findAll({where: {single_id:id},attributes:['section'],group: ['section']})
        let cources;
        cources = Promise.all(section.map(async item => {
           let courceInfo = await this.ctx.model.VideoGoodModel.findAll({where: {section:item.section}})
            return {
                section:item.section,
                value:courceInfo
            }
        }))
        return cources;
    }

    /**
     * 获取课程视频总数
     */
    async getVideoCount(id){
        return await this.ctx.model.VideoGoodModel.count({where: {single_id:id}})
    }

    /**
     * 获取全科套餐班
     */
    async getMealClass(id){
        return await this.ctx.model.ClassMealModel.findAll({where: {classgroup_id:id}})
    }

    /**
     * 获取某一全科班信息
     */
    async getOneMeal(id){
        let ClassSingleModel = this.ctx.model.ClassSingleModel;
        let ClassMealModel = this.ctx.model.ClassMealModel;
        let ClassitemsModel = this.ctx.model.ClassitemsModel;
        ClassSingleModel.belongsToMany(ClassMealModel,{through:ClassitemsModel})
        ClassMealModel.belongsToMany(ClassSingleModel,{through:ClassitemsModel})

        let TeacherModel = this.ctx.model.TeacherModel;
        let TeacheritemModel = this.ctx.model.TeacheritemModel;
        ClassSingleModel.belongsToMany(TeacherModel,{through:TeacheritemModel})
        TeacherModel.belongsToMany(ClassSingleModel,{through:TeacheritemModel})
        // return await ClassMealModel.findAll({where: {id:id}})
        return await ClassMealModel.findOne({
            include:[
                {
                    model: ClassSingleModel,
                    group:['label'],
                    include:[
                        {model:TeacherModel}
                    ]
                }
            ],
            where: {id:id}
        })
    }

    /**
     * 获取热门课程
     */
    async getHotCource(){
        let ClassSingleModel = this.ctx.model.ClassSingleModel;
        let ClassMealModel = this.ctx.model.ClassMealModel;
        let ClassHotModel = this.ctx.model.ClassHotModel;
        ClassHotModel.hasMany(ClassSingleModel);
        ClassSingleModel.belongsTo(ClassHotModel);
        ClassHotModel.hasMany(ClassMealModel); 
        ClassMealModel.belongsTo(ClassHotModel);

        const res =  await this.ctx.model.ClassHotModel.findOne({
            where: {hot:1},
            include:[
                {
                    model:ClassSingleModel
                },
                {
                    model:ClassMealModel
                }
            ]
        })
        const hotSingle = res.class_single_models;
        const hotMeal = res.class_meal_models;
        // console.log([...hotSingle,...hotMeal].sort()) 
       //...解构；两个班型数组合并 并正序排序
        return [...hotSingle,...hotMeal].sort((a,b)=>{
            return a.hotSort - b.hotSort
        });
        
    }
}

module.exports = CourseService