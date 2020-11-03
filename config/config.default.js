/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1602297025618_1332';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo:{
      title:'慧永诺课堂接口',
      description:'慧永诺课堂接口',
      version:'1.0.0'
    },
    schemes:['http','https'],
    consumes:['application/json'],
    produces:['application/json'],
    enableSecurity:false,
    // enableValidate:true,
    routerMap:true,
    enable:true,
  }

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'hynkt',
    username: 'root',
    password: 'root',
    define: {
      timestamps: false
    }
  }


  config.jwt = {
    secret:'Great4-M',
    enable:true,
    match:/^\/api/
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  

  return {
    ...config,
    ...userConfig,
  };
};
