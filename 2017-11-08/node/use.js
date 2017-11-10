/**
 * Created by zhaoshuang on 2017/11/10.
 */
//由于1.js并没有放到node_module里所以为了避免冲突要加上路径
let u = require("./1");
//由于2.js放到了node_modules里所以可以不用写路径。
let u2 = require("2.js");
console.log(u);
console.log(u2);

