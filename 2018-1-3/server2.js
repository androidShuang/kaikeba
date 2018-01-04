const express = require('express');
const consolidate = require('consolidate');
const mysql = require('mysql');

let db = mysql.createPool({host:'localhost',port:3306,user:'root',password:'',database:'20171229'});

let server = express();
server.listen(9900);

server.engine('html',consolidate.ejs);
server.set('view engine','ejs');
server.set('views','./template');

server.get('/aaa',(req,res)=>{
    res.render('1',{arr:[22,33,34]});
});

server.get('/bbb',(req,res)=>{
    res.render('2',{arr:[21,2,333,44]});
});

server.get('/ccc',(req,res)=>{
    db.query('SELECT * FROM user',(err,data)=>{
        if(err){
            res.sendStatus(500);
            res.end();
        }else{
            res.render('3',{user:data,foot: '<strong>底部</strong>aaa', catas: ['国际', '国内', '军事', '武器']});
        }
    })
})