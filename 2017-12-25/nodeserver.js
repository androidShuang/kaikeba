const http = require('http');
const querystring = require('querystring');
const url = require('url');

let server = http.createServer((request,response)=>{
    //get方法
    let {pathname,query} = url.parse(request.url,true);
    console.log('====================================');
    console.log('we get the get pramer',pathname,query);
    console.log('====================================');

    //post方法
    let aBuffer = [];
    request.on('data',data=>{
        aBuffer.push(data);
    })

    request.on('end',()=>{
        let data = Buffer.concat(aBuffer);
        const post = querystring.parse(data.toString());
        console.log('====================================');
        console.log("post data",post);
        console.log('====================================');
    })

}).listen(9900);
