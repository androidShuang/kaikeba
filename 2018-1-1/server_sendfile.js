const express = require('express');
const path = require('path');

let server = express();
server.listen(9900);

server.get('/1.html',(req,res,next)=>{
    res.setHeader('Content-Type',"text/plain")
    if(req.query['pass']=='123'){
        console.log(__dirname+'\\static\\1.html');
        res.sendFile(__dirname+'\\static\\aa.txt',(err)=>{
            console.log(err);
            //应该是异步的，所以要在回掉里写上res.end();
            res.end();
        });
    }else{
        res.sendStatus(403);
        res.end();
    }
});