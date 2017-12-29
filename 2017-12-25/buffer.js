const fs = require('fs');

fs.readFile("a.jpg",(err,data)=>{
    if(err){
        console.log('====================================');
        console.log("读取错误");
        console.log('====================================');
    }else{
        //原本是二进制数据tostring就废了
        str = data.toString();
        fs.writeFile("b.jpg",str,err=>{
            if(err){
                console.log('====================================');
                console.log('写入失败');
                console.log('====================================');
            }else{
                console.log('====================================');
                console.log('写入成功');
                console.log('====================================');
            }
        })
    }
})