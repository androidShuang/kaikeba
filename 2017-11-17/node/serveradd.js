/**
 * Created by zhaoshuang on 2017/11/20.
 */
let http = require("http");
let url = require("url");
http.createServer(function (req,res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    // console.log(url.parse(req.url),true);
    let {callback,a,b} = url.parse(req.url,true).query;
    console.log(callback)
    res.write(`${callback}(${parseInt(a)+parseInt(b)})`);
    res.end();
}).listen("8081");