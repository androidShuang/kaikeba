/**
 * Created by zhaoshuang on 2017/11/10.
 */
define(function (require, exports, module) {
   let a = require("a.js");
   let b = require("b.js");
   module.exports = {
       show(){
            a.show("require");
       }
   }
});
