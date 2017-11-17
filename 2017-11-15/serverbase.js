/**
 * Created by zhaoshuang on 2017/11/16.
 */
let http = require("http");
let mysql = require("mysql");
let fs = require("fs");
let url = require("url");
let regs = require("./libs/regs");

let sqlconnec = mysql.createPool({host:"localhost",user:"root",password:"",database:"kaikeba"});

const httpserver = http.createServer((req,res)=>{
    console.log(url.parse(req.url,true));
    let {pathname,query} = url.parse(req.url,true);
    let {user,pwd} = query;
    if(pathname=="/reg"){
        if(!regs.username.test(query.user)){
            res.write(JSON.stringify({code:1,message:'用户名格式不正确'}));
            res.end();
        }else if(!regs.password.test(query.pwd)){
            res.write(JSON.stringify({code:1,message:'密码格式不正确'}));
            res.end();
        }else{
            sqlconnec.query(`SELECT * FROM user WHERE name='${user}'`,(err,data)=>{
                if(err){
                    res.write(JSON.stringify({code:1,message:"数据库查询错误"}));
                    res.end();
                }else if(data.length>0){
                   res.write(JSON.stringify({code:1,message:"用户名已经存在"}));
                   res.end();
                }else{
                    sqlconnec.query(`INSERT INTO user (name,pwd) VALUES('${user}','${pwd}')`,(err,data)=>{
                        if(err){
                            res.write(JSON.stringify({code:1,message:"数据库插入错误"}));
                            res.end();
                        }else{
                            res.write(JSON.stringify({code:0,message:"注册成功"}));
                            res.end();
                        }
                    })
                }
            });
        }
    }else if(pathname=="/login"){
        if(!regs.username.test(user)){
            res.write(JSON.stringify({code:1,message:'用户名格式不正确'}));
            res.end();
        }else if(!regs.password.test(pwd)){
            res.write(JSON.stringify({code:1,message:'密码格式不正确'}));
            res.end();
        }else{
            sqlconnec.query(`SELECT * FROM user WHERE name='${user}'`,(err,data)=>{
                if(err){
                    res.write(JSON.stringify({code:1,message:"数据库查询错误"}));
                    res.end();
                }else if(data.length==0){
                    res.write(JSON.stringify({code:1,message:"用户不存在"}));
                    res.end();
                }else if(data[0].pwd!=pwd){
                    res.write(JSON.stringify({code:1,message:"用户名或密码有误"}));
                    res.end();
                }else{
                    sqlconnec.query(`UPDATE user SET statue=1 WHERE name='${user}'`,(err,data)=>{
                        if(err){
                            res.write(JSON.stringify({code:1,message:"数据库错误"}));
                            res.end();
                        }else{
                            res.write(JSON.stringify({code:0,message:"登录成功"}));
                            res.end();
                        }
                    })
                }
            })
        }
    }else{
        fs.readFile(`www${pathname}`,(err,data)=>{
            if(err){
                res.writeHead(404);
                res.write("404");
                res.end();
            }else{
                res.write(data);
                res.end();
            }
        })
    }
});
httpserver.listen(8080);