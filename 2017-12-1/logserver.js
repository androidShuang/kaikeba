const http = require("http");
const io = require("socket.io");
let server = http.createServer();
server.listen(9900);
let wsServer = io.listen(server);
wsServer.on("connection",sock=>{
    sock.on("log",function(...arg){
        console.log(...arg);
    })
})