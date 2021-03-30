const Service = require('egg').Service
const moment = require('moment')
const sequelize = require('sequelize')

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
   * @param {*} myCourceId 
   * @param {*} userId 
   */
  async userProgress(courceId,userId){
    let MycourceModel = this.ctx.model.MycourceModel;
    return await MycourceModel.findOne({
      where: {id:courceId,usersModelId:userId},
      attributes:['sec_selected','vid_selected','vid_title','currentTime','proarr']
    })
  } 

  /**
   * 更新用户课程学习进度
   * @param {*} arr
   * @param {*} id
   */
  async updateProgress(data,userId){
    let MycourceModel = this.ctx.model.MycourceModel;
    return await MycourceModel.update(
      data,
      {where: {id:data.id,usersModelId:userId}}
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
   * 查看我的单章节练习进度
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
  async updateMyTest(data,userId){
      let MytestModel = this.ctx.model.MytestModel;
      let TestRecordModel = this.ctx.model.TestRecordModel;
      data.myProgress.usersModelId = userId;
      // 该用户下是否存在该课程该章节下的练习进度,存在即更新不存在即创建
      //upsert： 由于id设置了自增，model需要设置唯一约束，才能正常使用
      const resultData = await MytestModel.upsert(data.myProgress)
      const myTestId = resultData[0].dataValues.id;
      return  await TestRecordModel.upsert({mytestModelId:myTestId,record:data.record});
    }

    /**
     * 查看用户所有章节练习进度
     * @param {*} userId
     * @param {*} courceId
     */
    async getAllTest(userId,courceId){
      let MysimulationModel = this.ctx.model.MysimulationModel;
      let SimulationTestModel = this.ctx.model.SimulationTestModel;
      let VideoGoodModel = this.ctx.model.VideoGoodModel;
      let MycourceModel = this.ctx.model.MycourceModel;

      // 模拟试卷总数
      const resTest = await SimulationTestModel.findAndCountAll({
        where: {classSingleModelId: courceId}
      })
      const simCount = resTest.count;
      //我做过的试卷
      const resMyTest =  await MysimulationModel.findAndCountAll({
        where: {usersModelId:userId,classSingleModelId:courceId}
      })
      const mySimCount = resMyTest.count;
      
      const res = await this.ctx.service.chapterTest.getChapterTest(courceId,userId)
      //做过的练习总数
      let haveCount = 0;
      res.forEach(item => {
        haveCount += item.dataValues.haveCount;
      })
      //章节练习总数
      console.log('习题',res);
      const sectionTestCount = res[0].dataValues.chapter_test_models[0].dataValues.count;
      // 视频总数
      const videos = await VideoGoodModel.findAndCountAll({
        where:{single_id:courceId}
      })
      const videoCount = videos.count;

      // 视频总数
      let havVideos = await MycourceModel.findOne({
        where: {classSingleModelId:courceId,usersModelId:userId},
        attributes:['proarr']
      })
      
      let watchVideo = 0;
      havVideos = JSON.parse(havVideos.dataValues.proarr)
      havVideos.forEach(item => {
        watchVideo += parseInt(item.progress);
      })
      return {
        simCount,
        mySimCount,
        haveCount,
        sectionTestCount,
        videoCount,
        watchVideo
      };
      
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