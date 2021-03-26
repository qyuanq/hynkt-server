const Controller = require('egg').Controller
const path = require('path');
const fs = require('fs');
class downloadController extends Controller{
    /**
     * @summary 下载文件
     * @description 下载文件
     * @router get /api/download
     * @request
     * @response
     */
    async download(){
        const {ctx} = this;
        const id = ctx.params.id || {};
        let fileName;
        if(id == 1){
            fileName = '2月绩效.xlsx';
        }else if(id == 2){
            fileName = '7750102942968_399996210200001616.pdf';
        }else if(id == 3){
            fileName = '驾校招生.docx';
        }
        const  filePath = path.resolve(__dirname,`../public/files/${fileName}`);
        
        ctx.attachment(fileName);
        // ctx.set('Content-Disposition' ,`attachment; filename="${fileName}"`)
        console.log(fs.createReadStream(filePath))
        ctx.body = fs.createReadStream(filePath);
    }
}

module.exports = downloadController