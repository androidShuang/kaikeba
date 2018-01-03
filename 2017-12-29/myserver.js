const express = require('express');
const uuid = require('uuid/v4');
const crypto = require('crypto');
const mysql = require('mysql');
const fs = require('fs');

let server = express();
server.listen(9900);

let db = mysql.createPool({host: 'localhost', port: 3306, user: 'root', password: '', database: '20171229'});

server.get('/reg', (req, res,next) => {

    let {user, pass} = req.query;
    
    if(!user){
        res.send({code: 1, msg: '用户名不能是空'});
    }else if(!pass){
        res.send({code: 1, msg: '密码不能是空'});
    }else if(!/^\w{6,32}$/.test(user)){
        res.send({code: 1, msg: '用户名必须是数字字母下划线，6~32位'});
    }else if(!/^.{6,}$/.test(pass)){
        res.send({code: 1, msg: '密码最短6位'});
    }else{
        next();
    }

});


//2.有没有这个用户
server.get('/reg', (req, res, next)=>{
    let {user,pass}=req.query;
  
    db.query(`SELECT * FROM user WHERE username='${user}'`,(err,data)=>{
        if(err){
            res.send({code:1,msg:'数据库没有用户有问题'});
        }else if(data.length>0){
            res.send({code:1,msg:'用户名已存在'});
        }else{
            next()
        }
    });

  });

//3.生成uuid并检测uuid是否存在
server.get('/reg',(req,res,next)=>{
    _next();
    function _next(){
        let id=uuid().replace(/\-/g, '');
        db.query(`SELECT * FROM user WHERE uuid='${id}'`,(err,data)=>{
            if(err){
                res.send({code:1,msg:'数据库UUID有问题',err:err});
            }else if(data>0){
                _next();
            }else{
                req._uuid = id;
                next();
            }
        })
    }
});

//4.写入数据库
server.get('/reg',(req,res,next)=>{
    let {user,pass}=req.query;
    let md5 = crypto.createHash('md5');
    md5.update(pass);
    pass = md5.digest('hex');
    console.log(req._uuid,user,pass);
    
    db.query(`INSERT INTO user (uuid,username,password) VALUES('${req._uuid}','${user}','${pass}')`,(err,data)=>{
        if(err){
            res.send({code:1,msg:'数据库插入有问题',err:err});
        }else{
            res.send({code:0,msg:'注册成功'});
        }
    });

});