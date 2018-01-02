const http = require('http');
const fs = require('fs');
const url = require('url');

let server = http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url,true);
    let rs = fs.createReadStream(`www${pathname}`);
    rs.pipe(res);
    rs.on('error',err=>{
        res.writeHeader(404);
        res.write('not found');
        res.end();
    })
}).listen(9900);