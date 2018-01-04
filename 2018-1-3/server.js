const express = require('express');

let server = express();
server.listen(9900);

server.use('/user',require('./routers/user'));
server.use('/article',require('./routers/article'));