const express = require('express');
const bodyParser = require('body-parser');

let server = express();

server.listen(9900);

server.use(bodyParser.urlencoded({extended:false}));

server.post('/',(req,res)=>{
    console.log(req.body);
})