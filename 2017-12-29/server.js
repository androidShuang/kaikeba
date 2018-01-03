const express = require('express');
const bodyParser = require('body-parser')
let server = express();

server.use(bodyParser.urlencoded({extended:false}));

server.post('/aaa',(req,res)=>{
    console.log(req.body);
    
})

server.use(express.static('./www/'));

server.listen(9900);