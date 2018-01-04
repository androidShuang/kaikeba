const fs = require('fs');
module.exports = function(req,res,next){
    let arr = [];
    let oDate = new Date();
    arr.push('['+oDate.toGMTString()+']');
    arr.push(req.method);
    arr.push(req.url);
    fs.appendFile('logs/access.log',arr.join(' ')+'\n',(err)=>{
        if(err){
            console.log('日志写入失败',err);
        }
        next();
    });
};