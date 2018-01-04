const queryString = require('querystring');

exports.urlEncoded = function(req,res,next){
    console.log(arguments.length);
    
    let str = '';
    req.on('data',data=>{
        str+=data;
    });
    req.on('end',()=>{
        console.log(str);
        
        req.body = queryString.parse(str);
        console.log(req.body);
        
        next();
    });
}