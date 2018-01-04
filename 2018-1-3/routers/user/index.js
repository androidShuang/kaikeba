const express = require('express');

let user_router = express.Router();

user_router.get('/',(req,res)=>{
    res.send('用户的根路径');
    res.end();
});

user_router.get('/login',(req,res)=>{
    res.send('登陆');
    res.end();
});

user_router.use('/vip',require('./vip'));

module.exports = user_router;