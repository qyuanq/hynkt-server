const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')

/**
 * @Controller 上传
 */
class UploadController extends Controller{
    constructor(ctx){
        super(ctx)
    }

    /**
     * @summary 上传单个文件
     * @description 上传单个文件
     * @router post /api/upload/single
     */
    async create(){
        const {ctx} = this
        // 要通过ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件
        // 只支持上传一个文件
        // 上传文件必须在所有其他的fields后面，否则在拿到文件流时可能还获取不到fields
        const stream = await ctx.getFileStream()

        // 所有表单字段都能通过`stream.fields` 获取到
        let question = stream.fields;   //获取除文件外的formDate字段
        
        const filename = path.basename(stream.filename) //文件名称
        const extname = path.extname(stream.filename).toLowerCase()  //文件扩展名称
        const uuid = (Math.random() * 999999).toFixed()

        // 组装参数stream
        const target = path.join(this.config.baseDir,'app/public/uploads',`${uuid}${extname}`)
        const writeStream = fs.createWriteStream(target)
        // 文件处理，上传到云存储等
        try{
            await awaitWriteStream(stream.pipe(writeStream))
            console.log(target)
        }catch(err){
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream)
            throw err
        }
        // 返回图片地址，供service调用
        const iconurl = `/public/uploads/${uuid}${extname}`

        // 返回文件路径和其余formDate数据
        return {iconurl,question};
    }

    /**
     * 修改用户头像
     */
    async updateIcon(){
        const{ctx} = this;
        const id = ctx.state.user.data.id;
        // 获取上传后的图片地址
        let iconurl = await this.create().iconurl;
        // 更新数据库
        ctx.service.user.updateIcon(id,iconurl)
        // 设置响应内容和响应状态码
        ctx.helper.success({ctx,res:iconurl})
    }

    /**
     * 上传答疑图
     */
    async uploadQuestion(){
        const{ctx} = this;
        // 获取上传后的图片地址，formDate数据
        const{iconurl,question} = await this.create();
        const id = ctx.state.user.data.id
        question.UsersModelId = id;
        question.picture = iconurl;
        question.praise = 0;
        
        console.log('question值：',question);
        // 上传数据库操作
        const res = ctx.service.answerQuestion.setQuestion(question);
        ctx.helper.success({ctx,res});
        // ctx.helper.success({ctx,res:picture})
    }
}

module.exports = UploadController