var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../../../../config/config'));
var fs = require('fs');
var http = require('http');
var moment = require('moment');
var sseExpress = require('sse-express');
var bodyParser = require('body-parser');
var utm = require('utm');


/*
 * Global VBLES
 */
var roadlabObject = {};
router.use(bodyParser.urlencoded({
    extended: true
}));
//router.use(fileUpload());
//router.use(uploading.single('foofield'));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

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
router.get('/view_data', function(req, resp, next) {
    var optionsRoad = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/list_id/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(optionsRoad, function(res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            var type = typeof chunk;
            // console.log('BODY: ' + chunk + 'TYPE: ' + typeof chunk);
            // console.log('TYPE ' + type);
            data += chunk;
            // console.log('DATA1 long:: ' + data.length);


        });
        res.on('end', function() {
            // console.log('DATA2 long ' + data.length);
            var responseObject = JSON.parse(data);
            // responseObject.forEach(function(item) {
            //     delete item["_id"];
            //     delete item["updated_at"];
            //     delete item["created_at"];
            //     //delete item["properties"]["coordTimes"];

            // });
            // responseObject.forEach(function(item) {
            //     console.log('responseObject.length:: ' + JSON.stringify(item));

            // });
            // console.log(JSON.stringify(responseObject));

            resp.render('maps_data', { utm: utm, roadsvals: responseObject, moment: moment, token: req.token, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol, api_key: config.MAPS_API_KEY });
            //resp.status(200).send(responseObject);

        });
    });

    request.end();
});

/*
    Write data
*/
router.get('/stream', sseExpress, function(req, resp, next) {
    // var optionsRoadlab = {
    //     host: config.HOST_API,
    //     port: config.PORT_API,
    //     path: config.PATH_API + '/roadlab/V1/',
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + req.cookies.jwtToken
    //     }
    // };
    // var requestRL = http.request(optionsRoadlab, function(res) {
    //     //console.log('STATUS: ' + res.statusCode);
    //     //console.log('HEADERS: ' + JSON.stringify(res.headers));
    //     res.setEncoding('utf8');
    //     var data = '';
    //     res.on('data', function(chunk) {
    //         //console.log('BODY: ' + chunk);
    //         data += chunk;

    //     });
    //     res.on('end', function() {
    //         //console.log('DATA ' + data.length + ' ' + data);
    //         roadlabObject = JSON.parse(data);
    //         roadlabObject.forEach(function(item) {
    //             delete item["_id"];
    //             delete item["updated_at"];
    //             delete item["created_at"];
    //             //delete item["properties"]["coordTimes"];

    //         });
    //         //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
    //         //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
    //         //resp.status(200).jsonp(filetypesObject);
    //         //console.log('\n\n### RL ###\n ' + JSON.stringify(roadlabObject));
    //     });
    // });
    // requestRL.end();
    resp.sse('message', { prueba: 'prueba mensaje' });

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
    var optionsRoadlab = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/roadlab/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var requestRL = http.request(optionsRoadlab, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            //console.log('DATA ' + data.length + ' ' + data);
            roadlabObject = JSON.parse(data);
            roadlabObject.forEach(function(item) {
                delete item["_id"];
                delete item["updated_at"];
                delete item["created_at"];
                //delete item["properties"]["coordTimes"];

            });
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //resp.status(200).jsonp(filetypesObject);
        });
    });
    requestRL.end();


    var optionsRoad = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(optionsRoad, function(res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            var type = typeof chunk;
            // console.log('BODY: ' + chunk + 'TYPE: ' + typeof chunk);
            // console.log('TYPE ' + type);
            data += chunk;
            // console.log('DATA1 long:: ' + data.length);


        });
        res.on('end', function() {
            // console.log('DATA2 long ' + data.length);
            var responseObject = JSON.parse(data);
            responseObject.forEach(function(item) {
                delete item["_id"];
                delete item["updated_at"];
                delete item["created_at"];
                //delete item["properties"]["coordTimes"];

            });
            // responseObject.forEach(function(item) {
            //     console.log('responseObject.length:: ' + JSON.stringify(item));

            // });
            // console.log(JSON.stringify(responseObject));

            resp.render('maps', { roadlabs: roadlabObject, roads: responseObject, token: req.token, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol, api_key: config.MAPS_API_KEY });
            //resp.status(200).send(responseObject);

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/* GET List Info */
router.get('/list_info', function(req, resp, next) {

    var optionsRoad = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(optionsRoad, function(res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            var type = typeof chunk;
            // console.log('BODY: ' + chunk + 'TYPE: ' + typeof chunk);
            // console.log('TYPE ' + type);
            data += chunk;
            // console.log('DATA1 long:: ' + data.length);


        });
        res.on('end', function() {
            // console.log('DATA2 long ' + data.length);
            var responseObject = JSON.parse(data);
            responseObject.forEach(function(item) {
                delete item["_id"];
                delete item["updated_at"];
                delete item["created_at"];
                //delete item["properties"]["coordTimes"];

            });
            // responseObject.forEach(function(item) {
            //     console.log('responseObject.length:: ' + JSON.stringify(item));

            // });
            // console.log(JSON.stringify(responseObject));

            resp.render('maps', { roadlabs: {}, roads: responseObject, token: req.token, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol, api_key: config.MAPS_API_KEY });
            //resp.status(200).send(responseObject);

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

module.exports = router;