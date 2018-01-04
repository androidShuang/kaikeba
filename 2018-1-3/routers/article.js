const express = require('express');

let article_router = express.Router();

article_router.get('/', (req, res)=>{
    res.send('文章的根目录');
    res.end();
  });

  module.exports = article_router;