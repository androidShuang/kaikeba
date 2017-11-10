function runner(_gen){
  return new Promise((resolve, reject)=>{
    //将外部传过来的generator赋值给gen
    var gen=_gen();
    //调用一次本地的next函数
    _next();
    function _next(_last_res){
      //这个是第一次执行next
      var res=gen.next(_last_res);

      //如果done为false就继续执行
      if(!res.done){
        //将value传值给obj,这个Obj可能是另一个promise函数
        var obj=res.value;
        //如果这个obj是个promise函数就执行then，如果执行成功就把结果给next调用下一轮
        //如果这个Obj是一个generator，那么就递归调用一下，如果不是generator那么就调用一遍该方法，把值传给next，调用下一轮
        if(obj.then){
          obj.then((res)=>{
            _next(res);
          }, (err)=>{
            reject(err);
          });
        }else if(typeof obj=='function'){
          if(obj.constructor.toString().startsWith('function GeneratorFunction()')){
            runner(obj).then(res=>_next(res), reject);
          }else{
            _next(obj());
          }
        }else{
          _next(obj);
        }
      }else{
        resolve(res.value);
      }
    }
  });
}
