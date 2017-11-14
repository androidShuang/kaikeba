/**
 * Created by zhaoshuang on 2017/11/14.
 */
let fs = require("fs");
let http = require("http");

const httpserver = http.createServer((req,res)=>{
    if(req.url=="/1.html"){
        res.write("1html");
        res.end();
    }else{
        fs.readFile("www/error.html",(err,data)=>{
            if(err){

            }else{
                res.write(data);
                res.end();
            }
        })
    }
});
httpserver.listen(8080)