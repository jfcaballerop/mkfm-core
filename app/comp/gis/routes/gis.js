var debug = require('debug')('debug');
var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
var flash = require('connect-flash');
var config = require(path.join(__dirname, '../../../../config/config'));
var querystring = require('querystring');
var bodyParser = require('body-parser');
var extend = require('util')._extend;
var multer = require('multer');
var GJV = require("geojson-validation");
var fs = require('fs');
var tj = require('togeojson');
var DOMParser = require('xmldom').DOMParser;

var fileuploadModels = require(path.join(__dirname, '../models/fileupload'));
var Fileupload = mongoose.model('Fileupload');
var filetypeModels = require(path.join(__dirname, '../models/filetype'));
var Filetype = mongoose.model('Filetype');
var infodatatrackModels = require(path.join(__dirname, '../models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');

var infodatatrackModels = require(path.join(__dirname, '../models/road'));
var Road = mongoose.model('Road');



router.use(function timeLog(req, res, next) {
    ////// console.log('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});
router.use(bodyParser.urlencoded({
    extended: true
}));
//router.use(fileUpload());
//router.use(uploading.single('foofield'));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

/*
 * Global VBLES
 */
var filetypesObject = {};

/*******************************************************
        WEB CALLS
**********************************************************/
/* GET List Files */
router.get('/list_files', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



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
            ////// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            resp.status(200).jsonp(responseObject);
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});
/* GET Form upload */
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
        path: config.PATH_API + '/gis/V1/',
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

/* UPLOAD File.*/
var uploadingDS = multer({
    dest: path.join(process.env.PWD, config.UPLOADS_FILES_PATH)
}).single('file');
router.post('/uploadDataSheet', uploadingDS, function (req, resp) {
    var postData = extend({}, req.file);
    postData.owner = req.user_login;
    postData.assetCode = req.body.assetCode;
    postData.status = 'pending';
    // debug(req);
    // debug('## FUP DATA uploadDataSheet ::' + JSON.stringify(postData)); //form files
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/fileupload/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);

        });
    });
    request.write(JSON.stringify(postData));

    request.end();


});
/* UPLOAD File.*/
var uploading = multer({
    dest: path.join(process.env.PWD, config.UPLOADS_FILES_PATH)
}).single('file');
router.post('/upload', uploading, function (req, resp) {
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

    ////// console.log('## upload:: ');
    if (!req.file)
        return resp.status(400).send('No files were uploaded.');
    else {
        ////// console.log(req.body); //form fields
        ////// console.log(req.file); //form files
        // SAVE File to DB
        var postData = extend({}, req.file);
        postData.owner = req.user_login;
        postData.type = req.body.type;
        postData.status = 'pending';

        ////// console.log('## FUP DATA ::' + JSON.stringify(postData)); //form files
        var options = {
            host: config.HOST_API,
            port: config.PORT_API,
            path: config.PATH_API + '/gis/V1/fileupload/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
                'Authorization': 'Bearer ' + req.cookies.jwtToken
            }
        };
        var request = http.request(options, function (res) {
            // ////// console.log('STATUS: ' + res.statusCode);
            // ////// console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            var data = '';
            res.on('data', function (chunk) {
                // ////// console.log('BODY: ' + chunk);
                data += chunk;

            });
            res.on('end', function () {
                // ////// console.log('DATA ' + data.length + ' ' + data);
                var responseObject = JSON.parse(data);
                //success(data);
                resp.redirect('/auth/WEB/gis/upload');
                //resp.send('File uploaded!');

            });
        });
        request.on('error', function (err) {
            console.error('problem with request: ${err.message}');
        });
        request.write(JSON.stringify(postData));
        request.end();

    }

});

/* VALIDATE File */
router.post('/validate/:id', function (req, resp) {
    //// console.log('## WEB Validate File: ' + req.params.id + '\n\n\n');
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
        path: config.PATH_API + '/gis/V1/validate/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
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
            //// console.log('\n\nDATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, ft: filetypesObject, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            resp.status(200).send(responseObject);
        });
    });

    request.end();

});

/**
 * GET File Valid
 */
router.get('/getfile/:id', function (req, resp) {
    Fileupload.findById(req.params.id, function (err, fup) {
        if (err) {
            resp.send(500, err.message);
        }

        var options = {
            host: config.HOST_API,
            port: config.PORT_API,
            path: config.PATH_API + '/gis/V1/' + req.params.id,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + req.cookies.jwtToken
            }
        };
        var request = http.request(options, function (res) {
            // console.log('STATUS: ****************************************************** ' + res.statusCode);
            ////// console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            var data = '';
            res.on('data', function (chunk) {
                ////// console.log('BODY: ' + chunk);
                data += chunk;

            });
            res.on('end', function () {
                var responseObject = JSON.parse(data);
                // resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
                //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
                resp.status(200).jsonp(responseObject);
                // res.attachment(data.path);
            });
        });

        var filePath = path.join(fup.path);
        var stat = fs.statSync(filePath);
        debug(fup.mimetype + '  **************************');
        resp.header('Content-Disposition', 'attachment; filename="' + fup.originalname + '"');
        resp.writeHead(200, {
            'Content-Type': fup.mimetype,
            // 'Access-Control-Allow-Origin': '*',
            'Content-Length': stat.size
        });

        var readStream = fs.createReadStream(filePath);
        readStream.pipe(resp);
        readStream.on('finish', function () {
            resp.end();
        });
        // console.log('The length was:', stat.size);
        request.end();
    });

});
/* DESACTIVATE file */
router.post('/desactivate/:id', function (req, resp, next) {
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
    ////// console.log('## WEB DESACTIVATE file: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/desactivate/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
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
            ////// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('upload', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
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
/* ACTIVATE file */
router.post('/activate/:id', function (req, resp, next) {
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

    ////// console.log('## WEB ACTIVATE file: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/activate/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
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
            ////// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('upload', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
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
/* DELETE file */
router.post('/delete/:id', function (req, resp, next) {
    ////// console.log('## WEB ACTIVATE file: ' + req.params.id);
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
        path: config.PATH_API + '/gis/V1/delete/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
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
            ////// console.log('DATA DELETE:: ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('upload', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('upload', {
                token: req.token,
                ft: filetypesObject,
                fup: responseObject,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME
            });
            //resp.redirect('/auth/WEB/gis/upload');

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});
/**************************************************************
 * AJAX CALLS
 **************************************************************/
//getFilesByAssetCode

router.post('/getFilesByAssetCode/:assetCode', function (req, resp) {
    var postData = extend({}, req.body);
    // debug('## ajax getFilesByAssetCode: ' + req.params.assetCode);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: encodeURI(config.PATH_API + '/gis/V1/getFilesByAssetCode/' + req.params.assetCode),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            // console.log('responseObject:     ' + responseObject);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
//getFilesByAssetCode GENERAL

router.post('/getFilesByAssetCode_general/:assetCode', function (req, resp) {
    var postData = extend({}, req.body);
    // debug('## ajax getFilesByAssetCode_general: ' + req.params.assetCode);
    // debug('## ajax getFilesByAssetCode_general: ' + encodeURI(config.PATH_API + '/gis/V1/getFilesByAssetCode/' + req.params.assetCode));

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: encodeURI(config.PATH_API + '/gis/V1/getFilesByAssetCode/' + req.params.assetCode),
        // path: config.PATH_API + '/gis/V1/getFilesByAssetCode_general/' + req.params.assetCode,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            // console.log('responseObject:     ' + responseObject);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
/*******************************************************
 API REST CALLS
 **********************************************************/
/* POST file */
router.post('/V1/fileupload/', function (req, res, next) {
    debug(req.body);

    if (req.body.path !== undefined &&
        req.body.path !== null) {
        fu = new Fileupload(req.body);
        fu.save(function (err, file) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(file);
        });
    } else {
        res.status(200);
    }
});


/* GET JSON files listing. */
router.get('/V1/', function (req, res, next) {
    Fileupload.find().sort({
        updated_at: -1
    }).exec(function (err, files) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(files);
    });

});

/* GET JSON files listing active_valid. */
router.get('/V1/active_valid/', function (req, res, next) {
    Fileupload.find({
        activo: true,
        status: 'validate'
    }, function (err, files) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(files);
    });

});

/* GET JSON file by id. */
router.get('/V1/:id', function (req, res, next) {
    // debug('llega a /V1/:id --------------------------------');
    // debug(req.params.id);
    Fileupload.findById(req.params.id, function (err, fup) {
        debug(fup);
        if (fup !== undefined) {
            if (err) {
                // res.send(500, err.message);
                res.status(500).send(err.message)
            }
            var validFeatureCollection = {};
            fs.readFile(fup.path, function (err, dataFile) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                // console.log('## File DATA:: ' + dataFile);
                // validFeatureCollection = JSON.parse(dataFile);

                // res.status(200).jsonp(validFeatureCollection);
                res.status(200);
            });
        } else {
            res.status(200);
        }
    });

});
/* GET JSON file by assetCode. */
router.post('/V1/getFilesByAssetCode/:assetCode', function (req, res, next) {

    req.params.assetCode = decodeURIComponent(req.params.assetCode);
    // debug('************************************************************');
    // debug('**************************** ' + req.params.assetCode + ' ********************************');
    // debug('**************************** ' + decodeURIComponent(req.params.assetCode) + ' ********************************');
    Fileupload.find({
        assetCode: req.params.assetCode
    }, function (err, fup) {
        if (err) {
            res.send(500, err.message);
        }

        res.status(200).jsonp(fup);
    });

});
/* GET JSON file by assetCode. GENERAL*/
router.post('/V1/getFilesByAssetCode_general/:assetCode', function (req, res, next) {
    Fileupload.find({
        $or: [{
            "properties.rcode": /req.params.assetCode/i
        },
        {
            "properties.rname": /req.params.assetCode/i
        },
        {
            "properties.bcode": /req.params.assetCode/i
        },
        {
            "properties.bname": /req.params.assetCode/i
        },
        {
            "properties.gcode": /req.params.assetCode/i
        },
        {
            "properties.gcode2": /req.params.assetCode/i
        },
        {
            "properties.dcode": /req.params.assetCode/i
        },
        {
            "properties.dcode2": /req.params.assetCode/i
        },
        {
            "properties.Ccode": /req.params.assetCode/i
        },
        {
            "properties.name": /req.params.assetCode/i
        }
        ]

    }, function (err, fup) {
        if (err) {
            res.send(500, err.message);
        }
        // console.log(fup._id);
        // console.log(req);
        // console.log(res);
        // console.log(next);
        res.status(200).jsonp(fup);
    });

});

/* VALIDATE File */
// TODO: Este método debería realizar la carga en BD una vez validado
router.post('/V1/validate/:id', function (req, res, next) {
    console.log("ID FINDID:", req.params.id);
    Fileupload.findById(req.params.id, function (err, fup) { // Se busca en la coleccion fileTypes 
        if (fup.type === 'geojson') { // CASO GEOJSON
            // // console.log("FUP ENTERO:", fup);
            var validFeatureCollection = {};
            fs.readFile(fup.path, function (err, dataFile) { //Leemos el archivo de disco subido en fileuploads (../public/uploads)
                if (err) {
                    return res.status(500).send(err.message);
                }
                // // console.log('## File DATA:: ' + dataFile);
                try {
                    var prueba = dataFile.toString();
                    var cadena1 = /ObjectId\(/g;
                    var cadena2 = /"\)/g;
                    var cadena3 = /\ISODate\(/g;

                    //CASO VALID GOSJSON SUSTITUYENDO OBJECTID / DOC EXISTENTE 
                    var nuevo1 = prueba.replace(cadena1, '');
                    var nuevo2 = nuevo1.replace(cadena2, '"');
                    //CASO 
                    var nuevo3 = nuevo2.replace(cadena3, '');

                    console.log("TRAD:", nuevo3);
                    validFeatureCollection = JSON.parse(nuevo3);

                    //GUARDAMOS OBJECTID que se usara en findId ya que si esta es porque se va a sustituir el doc
                    // var sustPuntos = prueba2.replace(':',',');
                    // _id = sustPuntos.split(",",2); //Sería _id[1]
                } catch (e) {
                    if (e) {
                        fup.status = 'error';
                        // console.log("ERROR AQUIII", e);
                    }
                }
                console.log('ENTRO ####');
                //simple test
                GJV.valid(validFeatureCollection, function (valid, errs) {
                    if (!valid) {
                        console.log("this is INVALID GeoJSON! :" + errs);

                    } else {
                        console.log("this is VALID GeoJSON!");
                    }

                });

                if (validFeatureCollection._id !== undefined && GJV.valid(validFeatureCollection)) { //GeoJson valido y hay _id: esINFODATATRACKS
                    // console.log("this is valid GeoJSON!\n" + JSON.stringify(validFeatureCollection));
                    console.log("Primer if\n", validFeatureCollection._id);
                    // Caso : subo archivo (_id) existente modificado 
                    Infodatatrack.findById(validFeatureCollection._id).exec(function (err, infodatatrack) {
                        if (err) {
                            fup.status = 'error';
                            console.log("AQUI");
                            return res.status(500).send(err.message);
                        } else {

                            console.log("AAAAA----------");
                            //// console.log('\ninfodatatrack::\n' + JSON.stringify(infodatatrack));
                            //res.status(200).jsonp(infodatatrack);
                            // TODO: Añadir poder modificar el resto de opciones
                            // Por ahora solo modifico las Coordenadas

                            // Paso 1. Comprobar longitud de las Coordenadas
                            if (validFeatureCollection.geometry.coordinates.length !== infodatatrack.geometry.coordinates.length) {
                                fup.status = 'error';
                                // // console.log('Error en longitud de coordenadas');
                            } else {
                                // HASTA QUE NO SE SUSTITUYE infodatatracks por validFeatureCollection no se ven los cambios

                                infodatatrack.geometry.coordinates = validFeatureCollection.geometry.coordinates;// En este caso se sustituye campo a campo
                                infodatatrack.properties.name = validFeatureCollection.properties.name
                                infodatatrack.save(function (err, info) {
                                    if (err) {
                                        // // console.log('Error en grabar infodatatrack');
                                        fup.status = 'error';
                                        return res.status(500).send(err.message);
                                    } else {
                                        console.log('infodatatrack grabado OK !!!');
                                        fup.status = 'validate';
                                        //// console.log('## API ACTIVATE file: ' + req.params.id);
                                        console.log('## API RES STATUS: ' + fup.status);
                                        fup.save(function (err, file) {
                                            if (err) {
                                                return res.status(500).send(err.message);
                                            }
                                            Fileupload.find(function (err, fup) {
                                                if (err) {
                                                    res.send(500, err.message);
                                                }
                                                res.status(200).jsonp(fup);
                                            });
                                        });
                                    }
                                });
                            }

                        }
                    });
                }  //Si no tenemos _id en el documento: ES ROAD
                else if (validFeatureCollection._id === undefined && GJV.valid(validFeatureCollection)) {
                    console.log("CASO GEOJSON sin _ID");
                    var road = new Road(validFeatureCollection);
                    if (validFeatureCollection.properties.coordTimes.length === 0) { // SI no nos dan coordTimes relleno se rellena manualmente
                        var newCoord = new Date();
                        console.log("MI IF AQUII");
                        // var year = newCoord.getFullYear();
                        // var month = newCoord.getMonth(); // no tiene el formato 01, 02...
                        // var day = newCoord.getDate();
                        // if (month.toString().length===1){
                        //     month = "0"+month;
                        // }
                        // if (day.toString().length===1){
                        //     day = "0"+day;
                        // }
                        // var cadena = year + "-" + month + "-" + day;
                        var cadena = newCoord.toISOString(); // IDEM , ya tiene el formato necesario
                        var copia = cadena.slice(0, 17); //Corta la cadena hasta el ultimo :
                        var copia1 = copia;
                        var miArray = new Array();
                        var copia2;
                        for (let i = 0; i < validFeatureCollection.geometry.coordinates.length; i++) {
                            if (i < 10) {
                                copia += "0" + i + "Z";
                                copia2 = copia;
                                miArray[i] = copia2;
                                copia = copia1;
                            } else {
                                copia += i + "Z";
                                copia2 = copia;
                                miArray[i] = copia2;
                                copia = copia1;
                            }

                        }
                        road.properties.coordTimes = miArray;
                    }

                    road.save(function (err, info) {
                        if (err) {
                            // // console.log('Error en grabar infodatatrack');
                            fup.status = 'error';
                            return res.status(500).send(err.message);
                        } else {
                            console.log('road grabado OK !!!');
                            fup.status = 'validate';
                            //// console.log('## API ACTIVATE file: ' + req.params.id);
                            console.log('## API RES STATUS: ' + fup.status);
                            fup.save(function (err, file) {
                                if (err) {
                                    return res.status(500).send(err.message);
                                }
                                Fileupload.find(function (err, fup) {
                                    if (err) {
                                        res.send(500, err.message);
                                    }
                                    res.status(200).jsonp(fup);
                                });
                            });
                        }
                    });
                } else { // Si el GEOJSON no es valido coloco el status 'error'
                    console.log("CASO GEOJSON NO VALIDO ELSE");

                    fup.status = 'error';
                    // console.log('## API ACTIVATE file: ' + req.params.id + ' STATUS: ' + fup.status);
                    fup.save(function (err, file) {
                        if (err) {
                            return res.status(500).send(err.message);
                        }
                        Fileupload.find(function (err, fup) {
                            if (err) {
                                res.send(500, err.message);
                            }
                            res.status(200).jsonp(fup);
                        });
                    });
                }
                console.log("SALGO FUP:", fup.status);
            });
        } else if ((fup.type === 'gpx') || (fup.type === 'kml')) {
            // Primero: transformar el fichero GPX a GeoJson
            var fileConv = new DOMParser().parseFromString(fs.readFileSync(fup.path, 'utf8'));
            var fconv;
            var fconvwithstyles;
            if (fup.type === 'gpx') {
                fconv = tj.gpx(fileConv);
                fconvwithstyles = tj.gpx(fileConv, {
                    styles: true
                });
            } else {
                fconv = tj.kml(fileConv);
                fconvwithstyles = tj.kml(fileConv, {
                    styles: true
                });
            }

            //// console.log('## FILE CONV:: ' + JSON.stringify(fconv));
            //// console.log('## FILE CONV STYLES:: ' + JSON.stringify(fconvwithstyles));
            ////// console.log('ENTRO ####');
            //simple test 
            if (GJV.valid(fconvwithstyles)) {
                //// console.log("this is valid GeoJSON!");
                fup.status = 'validate';
            } else {
                fup.status = 'error';
            }
            fup.activo = false;
            fup.save(function (err, file) {
                if (err) {
                    return res.status(500).send(err.message);
                }

            });
            // Guardo un nuevo File en formato GeoJson
            var fname_new = fup.filename + moment().format('YYYYMMDDHHmmss');
            fs.writeFile(path.join(process.env.PWD, config.UPLOADS_FILES_PATH, fname_new), JSON.stringify(fconvwithstyles), function (err) {
                if (err) {
                    return //// console.log(err);
                }
                //// console.log("The file was saved!");
                var fname_new_noext = fup.originalname.split('.');
                fname_new_noext.pop();
                var new_fu = new Fileupload({
                    "size": Buffer.byteLength(JSON.stringify(fconvwithstyles)),
                    "path": path.join(process.env.PWD, config.UPLOADS_FILES_PATH, fname_new),
                    "filename": fname_new,
                    "destination": path.join(process.env.PWD, config.UPLOADS_FILES_PATH),
                    "mimetype": "application/octet-stream",
                    "assetCode": 'juioñ',
                    "originalname": fname_new_noext + '.geojson',
                    "owner": fup.owner,
                    "type": "geojson",
                    "status": "validate"
                });
                new_fu.save(function (err, file) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    //// console.log(' SAVE Documento ' + new_fu);
                    // res.status(200).jsonp(file);
                    Fileupload.find(function (err, fup) {
                        if (err) {
                            res.send(500, err.message);
                        }
                        res.status(200).jsonp(fup);
                    });
                });
            });
        }
    });

});
/* GET JSON file by login. */
router.get('/V1/:originalname', function (req, res, next) {
    Fileupload.findOne({
        'name': req.params.originalname
    }, function (err, file) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(file);
    });

});

/* ACTIVATE file */
router.post('/V1/activate/:id', function (req, res, next) {
    Fileupload.findById(req.params.id, function (err, file) {
        ////// console.log('## API ACTIVATE file: ' + req.params.id);
        file.activo = true;
        file.save(function (err, file) {
            if (err) {
                return res.status(500).send(err.message);
            }
            Fileupload.find(function (err, files) {
                if (err) {
                    res.send(500, err.message);
                }
                res.status(200).jsonp(files);
            });
        });
    });

});
/* DESACTIVATE file */
router.post('/V1/desactivate/:id', function (req, res, next) {
    Fileupload.findById(req.params.id, function (err, file) {
        ////// console.log('## API DESACTIVATE file: ' + req.params.id);
        file.activo = false;
        file.save(function (err, file) {
            if (err) {
                return res.status(500).send(err.message);
            }
            Fileupload.find(function (err, files) {
                if (err) {
                    res.send(500, err.message);
                }
                res.status(200).jsonp(files);
            });
        });
    });

});

/* DEL file */
router.post('/V1/delete/:id', function (req, res, next) {
    Fileupload.findByIdAndRemove(req.params.id, function (err, file) {
        ////// console.log('## API DEL file: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        ////// console.log('### File located: ' + file.path);
        fs.unlink(file.path, function (ferr) {
            if (ferr) {
                //throw ferr;
                ////// console.log('Error: ' + ferr);
                res.status(400).jsonp(file);

            }
            Fileupload.find(function (err, files) {
                ////// console.log('Locate files:: ' + files);
                if (err) {
                    res.send(500, err.message);
                }
                ////// console.log('Send files:: ' + files);
                res.status(200).jsonp(files);
            });
        });
    });

});

/* UPDATE file */
router.post('/V1/update_file/:id', function (req, res, next) {

    res.send('Upoload File');

});
module.exports = router;