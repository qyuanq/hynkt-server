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
  router.get('/api/myProgress/:id',jwt,controller.user.userProgress);
  // 更新用户学习进度
  router.post('/api/updateProgress',jwt,controller.user.updateProgress);
  // 用户专业
  router.get('/api/myClassgory/:id',jwt,controller.user.userClassgory);
  // 课程
  router.get('/api/categorys',jwt,controller.course.getCategory);
  router.get('/api/classes/:id',jwt,controller.course.getClasses);
  router.get('/api/goodVideos/:id',jwt,controller.course.getGoodVideo);
  router.get('/cource/:id',controller.course.getCource)
  router.get('/mealClass/:id',controller.course.getMealClass);
  //模糊查询课程
  router.get('/api/searchCource',jwt,controller.course.searchCource);
  // 课程答疑第一页
  router.get('/api/answerQuestions/:id/',jwt,controller.answerQuestion.getQuestion);
  // 课程答疑分页
  router.get('/api/answerQuestions/:id/:currentPage',jwt,controller.answerQuestion.getQuestion);
  // 课程答疑详情
  router.get('/api/questionsDetail/:id',jwt,controller.answerQuestion.getQuestionDetail);
  // 创建课程答疑
  router.post('/api/answerQuestion',jwt,controller.upload.uploadQuestion);
  // 删除答疑
  router.delete('/api/answerQuestions/:id',jwt,controller.answerQuestion.deleteQuestion);
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

  // 题库
  router.get('/api/chapterTests/:id',controller.chapterTest.getChapterTest);
  router.get('/api/topics/:id',controller.chapterTest.getTopic);
  // 章节练习进度
  router.get('/api/myTest',controller.user.getMyTest);
  router.post('/api/myTest',controller.user.updateMyTest);
  // 收藏
  router.get('/api/collection',controller.favorites.collection);
  router.get('/api/isCollection',controller.favorites.isCollection);
  router.get('/api/collectionall',controller.favorites.getCollectionAll);
  // 模拟考试
  router.get('/api/alltests/:courceId',controller.simulationTest.getAllTest);
  router.get('/api/testQuestions/:testId',controller.simulationTest.getTestQuestion);
  router.post('/api/testRecord',controller.simulationTest.updateTestRecord);
  // 学习进度
  router.get('/api/myAllTest',jwt,controller.user.getAllTest);
  
  //下载
  router.get('/api/download/:id',jwt,controller.download.download);
  
  // 购物车
  router.get('/api/carts',jwt,controller.cart.addCart);
  router.get('/api/myCart',jwt,controller.cart.getCart);
  router.delete('/api/myCart/:cartId',jwt,controller.cart.deleteCart);
  router.delete('/api/myCartAll',jwt,controller.cart.deleteCartAll);
  // 支付
  router.get('/api/pay/wx',jwt,controller.pay.wxpay)
};
