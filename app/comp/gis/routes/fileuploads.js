var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');

var config = require(path.join(__dirname, '../../../../config/config'));
var querystring = require('querystring');
var bodyParser = require('body-parser');
var extend = require('util')._extend;

var fileuploadModels = require(path.join(__dirname, '../models/fileupload'));
var Fileupload = mongoose.model('Fileupload');
var filetypeModels = require(path.join(__dirname, '../models/filetype'));
var Filetype = mongoose.model('Filetype');




router.use(function timeLog(req, res, next) {
    //// // console.log('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});
router.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 1000000
}));
router.use(bodyParser.json({
    limit: 1024 * 1024 * 200,
    type: 'application/json',
    parameterLimit: 1000000
}));

// router.use(filetypeModels);
//router.use(uploading.single('foofield'));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());


/*******************************************************
        WEB CALLS
**********************************************************/

router.get('/upload', function (req, resp, next) {
    // Obtengo la lista de extensiones de ficheros
    var ft_options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/filetype/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var requestft = http.request(ft_options, function (res) {
        ////// console.log('STATUS: ' + res.statusCode);
        ////// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            ////// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            ////// console.log('DATA ' + data.length + ' ' + data);
            filetypesObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //resp.status(200).jsonp(filetypesObject);
        });
    });
    requestft.end();


    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/fileupload/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    // Peticiones 


    var request = http.request(options, function (res) {
        ////// console.log('STATUS: ' + res.statusCode);
        ////// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            ////// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('upload', {
                token: req.token,
                ft: filetypesObject,
                fup: responseObject,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME
            });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/*******************************************************
 API REST CALLS
 **********************************************************/
/* POST filetype */

module.exports = router;