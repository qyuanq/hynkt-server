'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,jwt } = app;
  router.get('/', controller.home.index);
  router.post('/user', controller.user.create);
  router.post('/login',controller.user.login);
  router.post('/api/upload/single',jwt,controller.upload.updateIcon);
  router.get('/api/getuser',jwt,controller.user.getuser);
  router.get('/api/getProvince',jwt,controller.adress.getProvince);
  // 用户课程
  router.get('/api/myCources/:id',jwt,controller.user.userCource);
  // 用户学习进度
  router.get('/myProgress/:id',controller.user.userProgress);
  // 更新用户学习进度
  router.post('/updateProgress',controller.user.updateProgress);
  // 用户专业
  router.get('/api/myClassgory/:id',jwt,controller.user.userClassgory);
  // 课程
  router.get('/api/categorys',jwt,controller.course.getCategory);
  router.get('/api/classes/:id',jwt,controller.course.getClasses);
  router.get('/goodVideos/:id',controller.course.getGoodVideo);
  router.get('/cource/:id',controller.course.getCource)
  router.get('/mealClass/:id',controller.course.getMealClass);
  // 课程答疑
  router.get('/api/answerQuestions/:id',jwt,controller.answerQuestion.getQuestion);
  // 创建课程答疑
  router.post('/api/answerQuestion',jwt,controller.upload.uploadQuestion);
  // 热门课程
  router.get('/hotcources',controller.course.getHotCource);
  // 教师
  router.get('/teacher/:id',controller.teacher.getTeacher)
  router.get('/spe',controller.course.getCategory);

  // 支付
  router.get('/pay/wx',controller.pay.wxpay)
};
