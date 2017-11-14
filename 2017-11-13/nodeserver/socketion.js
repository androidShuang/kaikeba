/**
 * Created by zhaoshuang on 2017/11/14.
 */
let http =require("http");
let io = require("socket.io");
const httpserver = http.createServer();
httpserver.listen(8080);

const wsServer = io.listen(httpserver);
wsServer.on("connection",sock=>{
    sock.on('a',function(n1,n2){
       console.log(n1,n2);
    });
});