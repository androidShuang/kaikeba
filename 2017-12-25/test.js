let str='Content-Disposition: form-data; name="user"; en=xx; aaa=12';

function pasrInfo(str){
    let arr = str.split("; ");
    console.log('====================================');
    console.log(arr);
    console.log('====================================');

    let json ={};

    arr.forEach(element => {
        let [key,value] = element.split("= ");
        json[key]=value;
    });
    return json;
}


let result = pasrInfo(str);
console.log('====================================');
console.log(result);
console.log('====================================');