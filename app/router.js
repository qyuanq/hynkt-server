'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,jwt } = app;
  router.get('/', controller.home.index);
  router.post('/user', controller.user.create);
  router.post('/login',controller.user.login);
  router.post('/api/upload/single',jwt,controller.upload.create);
  router.get('/api/getuser',controller.user.getuser);
  router.get('/getProvince',controller.adress.getProvince);
};
