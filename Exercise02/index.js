const http = require('http');
const fs = require('fs');
const port = 9999;
const url = require('url');
const handlers = require('./handlers');

http.createServer((req, res) => {
   req.pathname = url.parse(req.url).pathname;

    for (let handler of handlers) {
        let response = handler(req, res);

        if(response !== true){
            break;
        }
    }

}).listen(port);

console.log(`I'm on port ${port}`);