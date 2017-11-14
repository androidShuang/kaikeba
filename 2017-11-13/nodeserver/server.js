/**
 *
 * Created by zhaoshuang on 2017/11/14.
 */

//引用http
let http = require("http");
http.createServer(function (req,res) {
    //解决乱码问题
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("你好,这是网页");
    res.end();
}).listen(8080);
