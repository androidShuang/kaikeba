const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

let server = express();
server.listen(9900);

let multerObj = multer({dest:'./upload'});
server.use(bodyParser.urlencoded({extended:false}));
server.use(multerObj.any());
server.post('/upload',(req,res,next)=>{
    let i = 0;
    _next();
    function _next(){
        console.log(req.files);
        
        let newName=req.files[i].path+path.extname(req.files[i].originalname)
        console.log(newName);

        fs.rename(req.files[i].path,newName,err=>{
            if(err){
                console.log(err);
                res.sendStatus(500,'rename error');
                res.end();
            }else{
                i++;
                if(i>=req.files.length){
                    res.send('upload ok');
                    res.end();
                }else{
                    _next();
                }
            }
        })
        
    }
})