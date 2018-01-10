/**
 * Created by zhaoshuang on 2018/1/8.
 */
const express = require('express');
const config = require('../config');
const common = require('../libs/common');
const fs = require('fs');

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
            // req.admin_ID=data[0]['admin_ID'];
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

router.post('/house',(req,res)=>{

    let aImagePath = [];
    let aImgRealPath = [];

    req.body['sale_time'] = Math.floor(new Date(req.body['sale_time']).getTime()/1000);
    req.body['submit_time'] = Math.floor(new Date(req.body['submit_time']).getTime()/1000);


    for(let i=0;i<req.files.length;i++){
        switch (req.files[i].fieldname){
            case 'main_img':
                req.body['main_img_path'] = req.files[i].filename;
                req.body['main_img_real_path'] = req.files[i].path.replace(/\\/g,'\\\\');
                break;
            case 'img':
                aImagePath.push(req.files[i].filename);
                aImgRealPath.push(req.files[i].path.replace(/\\/g,'\\\\'));
                break;
            case 'property_img':
                req.body['property_img_paths']=req.files[i].filename;
                req.body['property_img_real_paths']=req.files[i].path.replace(/\\/g, '\\\\');
                break;
        }
    };

    req.body['ID'] = common.uuid();
    req.body['admin_ID'] = req.admin_ID;
    
    req.body['img_paths'] = aImagePath.join(',');
    req.body['img_real_paths'] = aImgRealPath.join(',');
    
    let arrFiled = [];
    let arrValue = [];
    
    for(let name in req.body){
        arrFiled.push(name);
        arrValue.push(req.body[name]);
    }
    
    let sql = `INSERT INTO house_table (${arrFiled.join(',')}) VALUES('${arrValue.join("','")}')`;
    
    req.db.query(sql,err=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.redirect('/admin/house');
        }
    });
});

router.get('/house/delete',(req,res)=>{
    let ID = req.query['id'];
    let sql = `SELECT * FROM house_table WHERE ID='${ID}'`;
    req.db.query(sql,(err,data)=>{
        if(err){
            res.sendStatus(500);
            console.log(err);
        }else if(data.length==0){
            res.sendStatus(404,'no this data');
        }else{
            let arr = [];
            arr.push(data[0]['main_img_real_path']);
            data[0]['img_real_paths'].split(',').forEach(item=>{
                arr.push(item);
            });
            data[0]['property_img_real_paths'].split(',').forEach(item=>{
                arr.push(item);
            });
            
            let complete = 0;
            arr.forEach(item=>{
                fs.unlink(item,err=>{
                    if(err){
                        res.sendStatus(500);
                    }else{
                        complete++;
                        if(complete==arr.length){
                            req.db.query(`DELETE FROM house_table WHERE ID='${ID}'`,(err)=>{
                                if(err){
                                    console.log(err);
                                    res.sendStatus(500);
                                }else{
                                    res.redirect('/admin/house');
                                }
                            });
                        }
                    }
                });
            });
            
        }
    });
    
});