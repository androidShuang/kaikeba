const http = require('http');
const fs = require('fs');
const url = require('url');
const router = require('./libs/router');
const zlib = require('zlib');
const user = require('./routers/user'); //默认会引入Index

http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url, true);
    req.query = query;

    res.send = function(data){
        if(!(data instanceof Buffer) && typeof data!='string'){
            data = JSON.stringify(data);
        }
        console.log("在send里");
        
        res.write(data);
    }


    if(false==router.emit(pathname,req,res)){
        let res = fs.createReadStream(`www${pathname}`);
        let gz = zlib.createGzip();
        res.setHeader('Content-Encoding','gzip');
        rs.pipe(gz).pipe(res);
        rs.on('error',err=>{
            res.writeHeader(404);
            res.write('not found');
            res.end();
        })
    }else{
        //是个接口
        console.log('走接口了');
        
    }

}).listen(9900);