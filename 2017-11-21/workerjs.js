/**
 * Created by zhaoshuang on 2017/11/21.
 */
let i = 0;
function count(){
    i+=1;
    postMessage(i);
    setTimeout("count()",500);
}
count();