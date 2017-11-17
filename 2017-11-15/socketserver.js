/**
 * Created by zhaoshuang on 2017/11/17.
 */
let http = require("http");
let mysql = require("mysql");
let socket = require("socket.io");
let fs = require("fs");
let regs = require("./libs/regs");
let socks = [];

const sqlConn = mysql.createPool({host:"localhost",user:"root",password:"",database:"kaikeba"});

const httpserver = http.createServer((req,res)=>{
    fs.readFile(`www${req.url}`,(err,data)=>{
        if(err){
            res.writeHead(404);
            res.write("404");
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    })
}).listen(8080);

let socketServer = socket.listen(httpserver);
socketServer.on("connection",sock=>{
    socks.push(sock);
    let current_id = 0;
    let current_user = "";
    sock.on("reg",(user,pwd)=>{
        if(!regs.username.test(user)){
            sock.emit('reg_ret',1,'用户名不符合规则');
        }else if(!regs.password.test(pwd)){
            sock.emit('reg_ret',1,'密码不符合规则');
        }else{
            sqlConn.query(`SELECT * FROM user WHERE name='${user}'`,(err,data)=>{
                if(err){
                    sock.emit('reg_ret',1,'数据库查询错误');
                }else if(data.length>0){
                    sock.emit('reg_ret',1,'用户名已经存在');
                }else{
                    sqlConn.query(`INSERT INTO user (name,pwd) VALUES('${user}','${pwd}')`,(err,data)=>{
                        if(err){
                            sock.emit('reg_ret',1,'数据库插入错误');
                        }else{
                            sock.emit('reg_ret',0,'注册成功');
                        }
                    })
                }
            })
        }
    });

    sock.on('login',(user,pwd)=>{
        if(!regs.username.test(user)){
            sock.emit('login_ret',1,'用户名不符合规则');
        }else if(!regs.password.test(pwd)){
            sock.emit('login_ret',1,'密码不符合规则');
        }else{
            sqlConn.query(`SELECT * FROM user WHERE name='${user}'`,(err,data)=>{
                if(err){
                    sock.emit('login_ret',1,'数据库查询错误');
                }else if(data.length==0){
                    sock.emit('login_ret',1,'用户不存在');
                }else if(data[0].pwd!=pwd){
                    sock.emit('login_ret',1,'用户名或密码错误');
                }else{
                    //update返回的参数data没啥数据
                    sqlConn.query(`UPDATE user SET statue=1 WHERE id=${data[0].id}`,(err)=>{
                        if(err){
                            sock.emit('login_ret',1,'数据库更新错误');
                        }else{
                            sock.emit('login_ret',0,'登录成功');
                            current_id = data[0].id;
                            current_user = data[0].name;
                        }
                    })
                }
            })
        }
    })

    sock.on("sent",message=>{
        if(!message){
            sock.emit('sent_ret',1,"消息不能为空");
        }else{
            socks.forEach(item=>{
                if(item==sock){
                    return;
                }else{
                    item.emit('message', current_user, message);
                }
            })
            sock.emit('sent_ret', 0, '发送成功');
        }
    })

})