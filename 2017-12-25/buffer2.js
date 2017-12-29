const buffer1 = new Buffer("abc");
const buffer2 = new Buffer("efg");

let buffer3 = Buffer.concat([buffer1,buffer2]);
console.log('====================================');
console.log(buffer3);
console.log('====================================');