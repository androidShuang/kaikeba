const myexpress = require('./libs/my-express');
const logger = require('./libs/my-log');

let server = myexpress();
server.listen(9900);

server.get(logger);

server.get('/',(req,res,next)=>{
    console.log('abc');
    next();
    
})

server.get('/',(req,res,next)=>{
    console.log('ddd');
    res.send('abcdefg');
    res.end();
    
})