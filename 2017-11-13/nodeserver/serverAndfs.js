/**
 * Created by zhaoshuang on 2017/11/14.
 */
let http = require("http");
let fs = require("fs");

http.createServer((req,res)=>{
   fs.readFile(`www${req.url}`,(err,data)=>{
       if(err){
           fs.readFile("www/error.html",(err,data)=>{
               if(err){
                   res.writeHead(404);
                   res.write("404");
               }else{
                   res.writeHead(404);
                   res.write(data);
               }
               res.end();
           });
       }else{
           res.write(data);
           res.end();
       }
   })
}).listen(8080);