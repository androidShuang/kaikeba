/**
 * Created by zhaoshuang on 2017/11/14.
 */

let mysql  = require("mysql");
//创建数据库连接池
let db =  mysql.createPool({host:"localhost",user:"root",password:"",database:"kaikeba"});
db.query("select * from user",(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(JSON.stringify(data));
    }
})
