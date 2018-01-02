const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url,true);

    switch(pathname){
        case '/login':
        console.log('login');
        
            break;
        case '/reg':
        console.log('reg');
        
            break;
    }
}).listen(9900);