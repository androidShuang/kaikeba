const express = require('express');
const cookieSession = require('cookie-session');

let server = express();

server.listen(9900);

server.use(cookieSession({secret:'12321312'}));
server.get('/',(req,res,next)=>{
    if(req.session['count']){
        req.session['count']++;
    }else{
        req.session['count']=1;
    }
    res.send(`欢迎你，你是第${req.session['count']}次访问本站了`);
    res.end();
})