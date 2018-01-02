const Event = require('events').EventEmitter;
let ev = new Event();

ev.on('zhao',(a,b,c,d)=>{
    console.log('接收到了1个事件',a,b,c,d);
});

ev.on('zhao',(a,b,c,d)=>{
    console.log('接收到了2个事件',a,b,c,d);
});

let res = ev.emit('zhao',12,232,2,232);
console.log(res);

