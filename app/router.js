'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,jwt } = app;
  router.get('/', controller.home.index);
  router.post('/user', controller.user.create);
  router.post('/login',controller.user.login);
  router.get('/api/user',jwt,controller.userAccess.getUser);
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
  router.get('/api/answerQuestions/:id/:currentPage',jwt,controller.answerQuestion.getQuestion);
  // 创建课程答疑
  router.post('/api/answerQuestion',jwt,controller.upload.uploadQuestion);
  // 点赞
  router.get('/api/like',jwt,controller.praise.onLike);
  // 是否点赞状态
  router.get('/api/isLike',jwt,controller.praise.isLike);
  // 第一次获取评论
  router.get('/api/comments/:id',jwt,controller.comments.getComments);
  // 获取分页评论
  router.get('/api/comments/:id/:currentPage',jwt,controller.comments.getComments);
  // 添加答疑问题
  router.post('/api/comments',jwt,controller.comments.addComments);
  // 获取回复
  router.get('/api/replays/:commentId',jwt,controller.comments.getReplay);
  // 获取回复分页
  router.get('/api/replays/:commentId/:currentPage',jwt,controller.comments.getReplay);
  // 删除评论
  router.delete('/api/mycomments',jwt,controller.comments.deleteComments);
  // 热门课程
  router.get('/hotcources',controller.course.getHotCource);
  // 教师
  router.get('/teacher/:id',controller.teacher.getTeacher)
  router.get('/spe',controller.course.getCategory);

  // 支付
  router.get('/pay/wx',controller.pay.wxpay)
};
