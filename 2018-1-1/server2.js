const mybodyParser = require('./libs/my-body-parser');
const express = require('express');
const mylog = require('./libs/my-log');

let server = express();
server.listen(9900);
server.use(mylog);
server.use(mybodyParser.urlEncoded);

server.post('/',(req,res)=>{
    console.log(req.body);
    
})