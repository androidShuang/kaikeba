/**
 * Created by zhaoshuang on 2018/1/8.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const consolidate = require('consolidate');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const config = require('./config');

let server = express();
server.listen(config.port);

const db = mysql.createPool({port:config.mysql_port,user:config.mysql_user,password:config.mysql_password,database:config.mysql_dbname,host:config.mysql_host});

server.use((req,res,next)=>{
    req.db = db;
    next();
});

server.use(bodyParser.urlencoded({extended:false}));

let multerObj = multer({dest:'./upload'});
server.use(multerObj.any());

server.use(cookieParser(require('./serct/cookie_key')));

server.use(cookieSession({
    keys:require('./serct/sess_key')
}));

server.set('html',consolidate.ejs);
server.set('view engine','ejs');
server.set('views','./template');

server.use('/admin',require('./routers/admin'));
server.use('/',require('./routers/www'));

//静态文件
server.use(express.static('./www/'));