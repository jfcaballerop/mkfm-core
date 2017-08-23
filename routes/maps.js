var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config'));
var fs = require('fs');
var http = require('http');


/* GET home page. */
router.get('/', function(req, res, next) {
    var list_files = [];
    fs.readdir(path.join(__dirname, '../public/uploads'), function(err, files) {
        if (files)
            list_files = files.concat();
        list_files.forEach(function(item) {
            console.log('## Files: ' + item);
        });
        res.render('maps', { files: list_files, token: req.token, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol, api_key: config.MAPS_API_KEY });
    });
    console.log('## Files 2: ' + list_files);

});

/* GET List Files */
router.get('/list_files', function(req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/active_valid',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data = chunk;

        });
        res.on('end', function() {
            console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            resp.render('maps', { files: responseObject, token: req.token, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol, api_key: config.MAPS_API_KEY });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

module.exports = router;