/**
 * Created by zhaoshuang on 2018/1/8.
 */
const express = require('express');
const config = require('../config');
const common = require('../libs/common');

let router = express.Router();
module.exports = router;
router.use((req,res,next)=>{
    if(!req.session['admin_ID']&&req.url!='/login'){
        res.redirect('/admin/login');
        console.log('走登陆了')
    }else{
        next();
    }
});

router.get('/login',(req,res)=>{
    res.render('login',{error_msg:""});
});

router.post('/login',(req,res,next)=>{
    let {username,password} = req.body;

    if(username==config.root_username){
        if(common.md5(password)==config.root_password){
            console.log('超级管理员已经登录');
            req.session['admin_ID']='1';
            res.redirect('/admin/');
        }else{
            console.log('超级管理员登录失败');
            showError('用户名或密码有误');
        }
    }else{
        req.db.query(`SELECT * FROM admin_table WHERE username='${username}'`,(err,data)=>{
            if(err){
                console.log(err);
                showError('数据库出错，请稍后重试');
            }else if(data.length==0){
                showError('用户名或密码有误');
            }else if(data[0].password==common.md5(password)){
                req.session['admin_ID'] = data[0].ID;
                console.log('普通管理员登陆成功');
                res.redirect('/admin/');
            }else{
                showError('用户名或密码有误');
            }
        })
    }
    function showError(msg){
        res.render('login', {error_msg: msg});
    }
});

router.get('/',(req,res)=>{
    console.log('走这个/admin/');
   res.redirect('/admin/house');
});


router.get('/house',(req,res)=>{
    req.db.query(`SELECT ID,title,ave_price,tel FROM house_table`,(err,data)=>{
        if(err){
            res.sendStatus(5000);
        }else{
            res.render('index',{data});
        }
    })
});