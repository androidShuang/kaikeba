const url = require("url");
const querystring = require("querystring");
let obj = url.parse("https://www.baidu.com/s?wd=abcdd&rsv_spt=1&rsv_iqid=0xca2e19fe000897df&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&rqlang=&tn=baiduhome_pg&ch=&rsv_enter=1&inputT=975",false);
let obj2 = url.parse("https://www.baidu.com/s?wd=abcdd&rsv_spt=1&rsv_iqid=0xca2e19fe000897df&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&rqlang=&tn=baiduhome_pg&ch=&rsv_enter=1&inputT=975",true);
console.log('====================================');
console.log(obj2);
console.log('====================================');

let {path} = obj2;
let querS = querystring.parse(path);
console.log('====================================');
console.log(querS);
console.log('====================================');