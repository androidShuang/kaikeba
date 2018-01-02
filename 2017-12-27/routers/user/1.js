const router = require('../../libs/router');

users = {"zhao":123};

router.on('/login',(req,res)=>{
    console.log(req.query);
    
    let {user,pass} = req.query;
    if(!users[user]){
        res.send({code:1,msg:'user not found'});
        console.log("在on里");
        
        res.end();
    }else if(users[user]!=pass){
        res.send({code:1,msg:'username or password is not right'});
        res.end();
    }else{
        res.send({code:0,msg:'login success'});
        res.end();
    }
});

router.on('/reg', (req, res)=>{
    let {user, pass}=req.query;
  
    if(users[user]){
      res.send({code: 1, msg: '用户名已存在'});
      res.end();
    }else{
      users[user]=pass;
  
      res.send({code: 0, msg: '注册成功'});
      res.end();
    }
  });