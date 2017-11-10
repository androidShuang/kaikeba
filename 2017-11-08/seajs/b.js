/**
 * Created by zhaoshuang on 2017/11/10.
 */
define(function (require, exports, module) {
    exports.b = 12;
    module.exports = {
        a:12,b:11,c:0,
        add(){
            console.log(this.a+this.b+this.c);
            console.log(this);
        }
    }
})