const express = require('express');

let vip_router = express.Router();

vip_router.get('/',(req,res)=>{
    res.send('vip 你好');
    res.end();
})

vip_router.get('/login',(req,res)=>{
    res.send('尊贵的vip登陆');
});

module.exports = vip_router;