const express = require('express');
let server = express();

server.get('/login',(req,res)=>{
    res.send("hello world");
});

let app = server.listen(9900,()=>{
    console.log(app.address().address);
});