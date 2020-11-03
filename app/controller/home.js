'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async create(){
    const { ctx } = this;
    ctx.body = 'hi user'
    
}
}

module.exports = HomeController;
