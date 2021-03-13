const Service = require('egg').Service
const moment = require('moment')

class UserService extends Service {
  
  /**
   * 创建用户
   * @param {*} payload 
   */
  async create(payload) {
    const { ctx, service } = this
    payload.password = await this.ctx.genHash(payload.password)
    const data = {
      username:payload.phone,
      password:payload.password,
      phone:payload.phone,
      sex:0,
      icon:'/public/static/icon-boy.png'
    }
    return ctx.model.UsersModel.create(data)
  }

  /**
   * 删除用户
   * @param {*} _id 
   */
  async destroy(_id) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.User.findByIdAndRemove(_id)
  }

  /**
   * 修改用户
   * @param {*} _id 
   * @param {*} payload 
   */
  async update(_id, payload) {
    const { ctx, service } = this
    const user = await service.user.findById(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.UsersModel.update(payload,{where:{id:_id}})
  }

  /**
   * 修改用户头像
   * @params {*} id
   * @params {*} iconurl
   */
  async updateIcon(id,iconurl){
    const {ctx} = this
    return await ctx.model.UsersModel.update({icon:iconurl},{where:{id:id}})
  }

  /**
   * 查看用户课程
   * @param {*} id 
   */
  async userCource(id){
    let ClassSingleModel = this.ctx.model.ClassSingleModel;
    let CourceitemsModel = this.ctx.model.CourceitemsModel;
    let MycourceModel = this.ctx.model.MycourceModel;
    let UsersModel = this.ctx.model.UsersModel;
    let CourceSectionModel = this.ctx.model.CourceSectionModel;
  
    ClassSingleModel.belongsToMany(MycourceModel,{through:CourceitemsModel})
    MycourceModel.belongsToMany(ClassSingleModel,{through:CourceitemsModel})
    UsersModel.hasMany(MycourceModel);
    MycourceModel.belongsTo(UsersModel);

    let noverCource=[];
    let overdueCource=[];
    let userCource =  await UsersModel.findOne({
      include:[
        {
          model:MycourceModel,
          attributes:['id','date','sec_selected','vid_selected','vid_title','currentTime','proarr'],
          where:{usersModelId : id},
          include:[
            {
              model:ClassSingleModel,
              attributes:['id','head_picture','name','label','classCode','classgroup_id','validity']
            }
          ]
        }
      ],
      attributes:['username'],
      where:{id:id}
    });

    let mycources = userCource.mycource_models.map(item => {
      if(item){
        // 获取当前时间
        let dateEnd = moment(new Date());
        // 课程加入时间
        let dateBegin = moment(item.date);
        // 比对时间相差天
        let dayDiff = dateEnd.diff(dateBegin,'days');
        if(dayDiff <= 365){
          // 未过期课程
          noverCource.push(item);
        }else{
          // 过期续费课程
          overdueCource.push(item);
        }

        console.log(dateEnd,dateBegin,item.date,'时间戳',dayDiff)
        return {item}
      }
    })
  console.log('未过期',noverCource,'过期',overdueCource);
    return  {
        mycources:mycources,
        noverCource:noverCource,
        overdueCource:overdueCource
        // userCource
      };
  }

  /**
   * 查看用户课程学习进度
   * @param {*} id 
   */
  async userProgress(id){
    let MycourceModel = this.ctx.model.MycourceModel;
    return await MycourceModel.findOne({
      where: {id:id},
      attributes:['sec_selected','vid_selected','vid_title','currentTime','proarr']
    })
  } 

  /**
   * 更新用户课程学习进度
   * @param {*} arr
   * @param {*} id
   */
  async updateProgress(data){
    let MycourceModel = this.ctx.model.MycourceModel;
    return await MycourceModel.update(
      data,
      {where: {id:data.id}}
    )
  }

  /**
  * 查看考试时间和课程专业名称
  * @param {*} classgroup_id
  */
  async userClassgory(classgroup_id){
  let ClassgoryModel = this.ctx.model.ClassgoryModel;
   return await ClassgoryModel.findOne({
      where: {id : classgroup_id},
      attributes:['name','Exam_time']
    })
  }

  /**
   * 查看我的章节练习进度
   * @param {*} userId
   * @param {*} classId
   * @param {*} sectionId
   * @returns 
   */
  async getMyTest(userId,classId,sectionId){
    let MytestModel = this.ctx.model.MytestModel;
    let TestRecordModel = this.ctx.model.TestRecordModel;
    return await MytestModel.findOne({
      where: {usersModelId:userId,classSingleModelId:classId,courceSectionModelId:sectionId},
      include:[
        {
          model:TestRecordModel,
          attributes:["record"]      
        }
      ],
      raw:true  
    })
  }

  /**
   * 更新我的章节练习进度
   * @param {*} userId
   * @param {*} classId
   * @param {*} sectionId
   * @param {*} testId
   * @returns 
   */
  async updateMyTest(userId,classId,sectionId,testId,date,haveCount,rightCount,record){
      let MytestModel = this.ctx.model.MytestModel;
      let TestRecordModel = this.ctx.model.TestRecordModel;
      const conditions = {usersModelId:userId,classSingleModelId:classId,courceSectionModelId:sectionId};
      // 该用户下是否存在该课程该章节下的练习进度
      const res =  await MytestModel.findAll({
        where: conditions
      })
      let resultData;
      if(res.length > 0){
        // 存在更新
        resultData = await MytestModel.update(
          {chapterTestModelId:testId,date:date,haveCount:haveCount,rightCount:rightCount},
          {where: conditions}
        )
      }else{
        // 不存在添加
        resultData = await MytestModel.create({usersModelId:userId,classSingleModelId:classId,courceSectionModelId:sectionId,chapterTestModelId:testId,date:date});
      }
      return  await TestRecordModel.create({mytestModelId:resultData[0],record:record},{updateOnDuplicate:["record"]});
  }

  /**
   * 查看单个用户
   */
  async show(_id) {
    const user = await this.ctx.service.user.find(_id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return this.ctx.model.User.findById(_id).populate('role')
  }

  /**
   * 查看用户列表
   * @param {*} payload 
   */
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.User.find({mobile: { $regex: search } }).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({}).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.User.find({mobile: { $regex: search } }).populate('role').sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({}).populate('role').sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'Are you ok?'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }  
  
  /**
   * 删除多个用户
   * @param {*} payload 
   */
  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } })
  }

  /**
   * 根据手机号查找
   * @param {*} phone 
   */
  async findByMobile(phone) {
    return this.ctx.model.UsersModel.findOne({phone: phone})
  }

  /**
   * 查找用户
   * @param {*} id 
   */
  async findById(id) {
    return this.ctx.model.UsersModel.findOne({where:{id:id}})
  }

  /**
   * 更新用户信息
   * @param {*} id 
   * @param {*} values 
   */
  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values)
  }

}


module.exports = UserService