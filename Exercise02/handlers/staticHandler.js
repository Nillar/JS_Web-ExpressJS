const fs = require('fs');

let fileType = (dataString) => {
    let dataTypes = {
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.ico': 'image/x-icon'
    };
    for (let type in dataTypes) {
        if (dataString.endsWith(type)) {
            return dataTypes[type];
        }
    }
};

let favHandler = (req, res) => {
    fs.readFile('./public/images/favicon.ico', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': fileType(req.pathname)
        });

        res.write(data);
        res.end();
    })
};

let resData = (req, res) => {
    fs.readFile('.' + req.pathname, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.writeHead(200, {
            'Content-Type': fileType(req.pathname)
        });
        res.write(data);
        res.end(data);
    });
};

module.exports = (req, res) => {

    if (req.pathname === '/favicon.ico' && req.method === 'GET') {
        favHandler(req, res);
        // fs.readFile('./public/images/favicon.ico', (err, data) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //
        //     res.writeHead(200, {
        //         'Content-Type': 'image/x-icon'
        //     });
        //
        //     res.write(data);
        //     res.end();
        // })
    }
    else if (req.pathname.startsWith('/public/') && req.method === 'GET') {
        resData(req, res);
    } else {
        res.writeHead(resData);
        res.end();
    }
};
