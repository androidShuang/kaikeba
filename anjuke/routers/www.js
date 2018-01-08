/**
 * Created by zhaoshuang on 2018/1/8.
 */
const express = require('express');
let router = express.Router();
module.exports = router;
router.get('/',(req,res)=>{
    res.send("aaa");
    res.end();
});
