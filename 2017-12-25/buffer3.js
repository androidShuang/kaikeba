Buffer.prototype.split = Buffer.prototype.splite||function(spliter){
    let bi = this;
    let n;
    let result = [];
    while((n=bi.indexOf(spliter))!=-1){
        let res1 = bi.slice(0,n);
        let res2 = bi.slice(n+2);
        result.push(res1);
        bi = res2;
    }
    result.push(bi);
    return result;
}
let b = new Buffer("abd==dsd==dsad==dsadsa");
let res = b.split("==");
console.log('====================================');
console.log(res);
console.log('====================================');