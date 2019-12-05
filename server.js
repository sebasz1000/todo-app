let express = require('express');
let server = express();

server.use(express.urlencoded({ extended: false }));
server.get('/', function(req, res){
    server.sendFile();
});