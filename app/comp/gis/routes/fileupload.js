var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var debug = require('debug')('debug');

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

router.get('/upload/:id', function (req, resp, next) {
    debug("### llego aquii #####");
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/fileupload/V1/upload/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };

    var request = http.request(options, function (res) {
        //// // console.log('STATUS: ' + res.statusCode);
        //// // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // 'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            resp.set({
                'Content-Length': Buffer.byteLength(JSON.stringify(responseObject)),
                'Content-Type': 'text/html'
            });

            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            // resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            resp.status(200).jsonp(responseObject);
            // console.log(JSON.stringify(responseObject));
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});


/*******************************************************
 API REST CALLS
 **********************************************************/
/* POST fileupload */
// router.post('/V1/', function (req, res, next) {
//     idata = new Fileupload(req.body);
//     idata.save(function (err, fileupload) {
//         if (err) {
//             return res.status(500).send(err.message);
//         }
//         res.status(200).jsonp(fileupload);
//     });
// });

router.get('/V1/upload/:id', function (req, res, next) {
    Fileupload.findById(req.params.id).exec(function (err, fileupload) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(fileupload);
    });

});
module.exports = router;