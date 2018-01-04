const express = require('express');
const cookieParser = require('cookie-parser');

let server = express();
server.listen(9900);

server.use(cookieParser('aabbccddeeff'));

server.get('/',(req,res,next)=>{
    console.log('cookies',req.cookies);
    console.log('cookiesigned',req.signedCookies);
    
    res.cookie('pass','123',{signed:true});
    res.cookie('aaa','awww');
    res.end();
})