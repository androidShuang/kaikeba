const express = require('express');
const consolidate = require('consolidate');
const mysql = require('mysql');

let db = mysql.createPool({host:'localhost',prot:3306,user:'root',password:'',database:'20191229'});

let server = express();
server.listen(9900);

server.engine('html',consolidate.pug);
server.set('view engine','pug');
server.set('views','./template_pug');

server.get('/ddd',(req,res)=>{
    res.render('1',{a:12,b:5,pretty:true,arr:[1212,222,333,555]});
});