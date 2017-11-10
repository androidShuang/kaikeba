##Amd&Cmd
####什么是AMD
	1.AMD (Asynchronous Module Definition)直接翻译就是 异步模块定义,其实主要是requirejs在推行过程中形成的规范
	2.对于依赖的模块都是提前执行，所以运行速度要快一点，但是加载顺序不一定，要注意(2.0以后也可以延迟执行了)
	3.AMD 的 API 默认是一个当多个用，有全局require和局部require
	4.看下代码
```javascript
// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
    a.doSomething()
    // 此处略去 100 行
    b.doSomething()
    // ...
})
// 加载模块
require(['myModule'], function (my){
　 my.printName();
});
```
####什么是CMD
	1. CMD(Common Module Definition)直接翻译就是 通用模块定义,也就是seajs在推行过程中形成的规范
	2. 推崇依赖就近，就是你随时需要依赖就随时require，然后他执行，会存在执行排队的情况。
	3. CMD 的 API 严格区分，推崇职责单一
	4. 看代码
```javascript
// CMD
define(function(require, exports, module) {
    var a = require('./a')
    a.doSomething()
    // 此处略去 100 行
    var b = require('./b') // 依赖可以就近书写
    b.doSomething()
    // ...
})
// 加载模块
seajs.use(['myModule.js'], function(my){

});

```
以上就是基本理解具体可以参考各自文档
AMD规范文档 https://github.com/amdjs/amdjs-api/wiki/AMD
RequireJS官网接口文档  http://www.requirejs.org/docs/api.html
