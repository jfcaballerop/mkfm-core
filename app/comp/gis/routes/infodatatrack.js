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
var utm = require('utm');
var service = require(path.join(__dirname, '../../../services/services'));

var infodatatrackModels = require(path.join(__dirname, '../models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');
var roadModels = require(path.join(__dirname, '../models/road'));
var Road = mongoose.model('Road');
var koboinfoModels = require(path.join(__dirname, '../models/koboinfo'));
var Koboinfo = mongoose.model('Koboinfo');



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

//router.use(fileUpload());
//router.use(uploading.single('foofield'));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

/*******************************************************
        WEB CALLS
**********************************************************/
/* GET List infodatatracks */
router.post('/list_ifdt/:info', function (req, resp, next) {
    // req.params.info = req.params.info.replace(/%20/g, " ");
    // debug("LLego aqui");
    var encoded_url = encodeURI(config.PATH_API + '/infodatatrack/V1/list_ifdt/' + req.params.info);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: encoded_url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };

    // console.log('\n## list_ifdt ##\n' + encoded_url);


    var request = http.request(options, function (res) {
        // // console.log('STATUS: ' + res.statusCode);
        // // console.log('HEADERS: ' + JSON.stringify(res.headers));
        // // console.log('KOBO ID: ' + req.params.id);
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];

            // // console.log('## ResponseObject:: \n' + JSON.stringify(responseObject.properties));
            resp.status(200).jsonp(responseObject);
        });

    });
    request.on('error', function (e) {
        // General error, i.e.
        //  - ECONNRESET - server closed the socket unexpectedly
        //  - ECONNREFUSED - server did not listen
        //  - HPE_INVALID_VERSION
        //  - HPE_INVALID_STATUS
        //  - ... (other HPE_* codes) - server returned garbage
        // console.log(e);
    });
    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});
/* GET List infodatatracks GENERAL*/
router.post('/list_ifdt_general/:info', function (req, resp, next) {
    // req.params.info = req.params.info.replace(/%20/g, " ");
    // debug("LLego aqui");
    var encoded_url = encodeURI(config.PATH_API + '/infodatatrack/V1/list_ifdt_general/' + req.params.info);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: encoded_url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };

    // console.log('\n## list_ifdt ##\n' + encoded_url);


    var request = http.request(options, function (res) {
        // // console.log('STATUS: ' + res.statusCode);
        // // console.log('HEADERS: ' + JSON.stringify(res.headers));
        // // console.log('KOBO ID: ' + req.params.id);
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];

            // // console.log('## ResponseObject:: \n' + JSON.stringify(responseObject.properties));
            resp.status(200).jsonp(responseObject);
        });

    });
    request.on('error', function (e) {
        // General error, i.e.
        //  - ECONNRESET - server closed the socket unexpectedly
        //  - ECONNREFUSED - server did not listen
        //  - HPE_INVALID_VERSION
        //  - HPE_INVALID_STATUS
        //  - ... (other HPE_* codes) - server returned garbage
        // console.log(e);
    });
    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});
/**
 * Modify ROWS
 */
router.post('/delrows/:idifdt/:rowid/:koboid', function (req, resp, next) {
    var postData = extend({}, req.body);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/delrowskobo/' + req.params.idifdt + '/' + req.params.rowid + '/' + req.params.koboid,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        //// // console.log('STATUS: ' + res.statusCode);
        //// // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];
            //// // console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
            // resp.redirect('/auth/WEB/infodatatrack/edit_video_infodatatrack/' + req.params.idifdt);

        });
    });
    request.write(JSON.stringify(postData));
    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});
/**
 * SAVE DATA
 */
router.post('/save_tabular_data/', function (req, resp, next) {

    var postData = extend({}, req.body);
    // // console.log('INFODATA TRACK postData ' + JSON.stringify(req.body));

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/save_tabular_data/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        // // // console.log('STATUS: ' + res.statusCode);
        // // // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            // // // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];
            //// // console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});


/* GET List infodatatracks */
router.get('/list_infodatatrack/:id', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/' + req.params.id,
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
            //// // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];
            //// // console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});
/* GET List infodatatracks */
router.get('/list_infodatatrackbyid/:id', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/list_byid/' + req.params.id,
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
            //// // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];
            //// // console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/* GET Near infodatatracks */
router.post('/list_infodatatracks/:lng/:lat', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/getNear/' + req.params.lng + '/' + req.params.lat,
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
            //// // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];
            //// // console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/* GET List infodatatracks */
router.post('/list_infodatatracks/:id', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/' + req.params.id,
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
            //// // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];
            //// // console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/* EDIT List infodatatracks */
router.get('/edit_infodatatrack/:id', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/list_infobyid/' + req.params.id,
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
            //// // console.log('BODY: ' + chunk);
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
            resp.render('data_infodatatrack', {
                token: req.token,
                utm: utm,
                infodatatrack: responseObject,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME
            });
            //// // console.log(JSON.stringify(responseObject));
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

router.get('/edit_video_infodatatrack/:id', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/list_infobyid/' + req.params.id,
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
            //// // console.log('BODY: ' + chunk);
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
            resp.render('data_infodatatrack_jquery', {
                token: req.token,
                utm: utm,
                infodatatrack: responseObject,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME
            });
            //// // console.log(JSON.stringify(responseObject));
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});


router.post('/update_infodatatrack', function (req, resp, next) {
    var postData = extend({}, req.body.infodatatrack);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/update_infodatatrack/' + req.body.infodatatrack._id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function (res) {
        // //// // console.log('STATUS: ' + res.statusCode);
        // //// // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // //// // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            // //// // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/infodatatrack/edit_infodatatrack/' + req.body.infodatatrack._id);

        });
    });
    request.on('error', function (err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});


router.post('/update_videoinfodatatrack', function (req, resp, next) {
    var postData = extend({}, req.body.infodatatrack);
    var arrOneCoord = [];
    var arrCoord = [];
    var arrPK = [];
    // Comprobar si trae geometry
    if (postData.geometry !== undefined) {
        // // console.log('## WEB/update_videoinfodatatrack geometry## ');
        // // console.log('## WEB/update_videoinfodatatrack inverted ## ' + postData.inverted);
        if (postData.geometry.coordinates !== undefined) {
            //// console.log(JSON.stringify(postData.geometry.coordinates));
            postData.geometry.coordinates.forEach(function (element, index) {
                arrOneCoord = element.replace('[ ', '').replace(' ]', '').split(',');
                arrOneCoord.forEach(function (e, i) {
                    arrOneCoord[i] = parseFloat(e.trim());
                });
                arrCoord[index] = arrOneCoord;
                if (index > 0) {
                    arrPK[index] = Math.round((arrPK[index - 1] + service.calDIST(arrCoord[index], arrCoord[index - 1])) * 100) / 100;
                } else {
                    arrPK[index] = 0;
                }
            });
            postData.geometry.coordinates = arrCoord;
            postData.properties.pk = arrPK;

            //TODO: si se modifican las COORD, hay que recalcular los PK/UTM
            // // console.log(JSON.stringify(postData.properties));
        }
    }

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/update_infodatatrack/' + req.body.infodatatrack._id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function (res) {
        // //// // console.log('STATUS: ' + res.statusCode);
        // //// // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // //// // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            // //// // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/infodatatrack/edit_video_infodatatrack/' + req.body.infodatatrack._id);

        });
    });
    request.on('error', function (err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});


/*
UPDATE ROAD
*/

router.post('/update_infodatatrack', function (req, resp, next) {
    var postData = extend({}, req.body.infodatatrack);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/update_infodatatrack/' + req.body.infodatatrack._id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function (res) {
        // //// // console.log('STATUS: ' + res.statusCode);
        // //// // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // //// // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            // //// // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/infodatatrack/edit_infodatatrack/' + req.body.infodatatrack._id);

        });
    });
    request.on('error', function (err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});

/**
 * duplicate rows
 */
router.post('/duplicate_rows', function (req, resp, next) {
    var _id = req.body._id;
    // // console.log('## WEB/duplicate_rows ID ##:: ' + _id);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/duplicate_rows/' + _id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };

    var request = http.request(options, function (res) {
        // // console.log('STATUS: ' + res.statusCode);
        // // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            // // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // // console.log('postData:: ' + JSON.stringify(postData));
            //success(data);
            // resp.redirect('/auth/WEB/infodatatrack/edit_video_infodatatrack/' + _id);
            resp.status(200).jsonp(responseObject);

        });
    });
    request.on('error', function (err) {
        console.error('problem with request: ${err.message}');
    });
    // request.write(JSON.stringify(postData));
    request.end();
});

/**
 * invertedpk
 */
router.post('/invertedpk', function (req, resp, next) {
    var _id = req.body._id;
    // // console.log('## WEB/invertedpk ID ##:: ' + _id);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/invertedpk/' + _id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };

    var request = http.request(options, function (res) {
        // // console.log('STATUS: ' + res.statusCode);
        // // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            // // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // // console.log('postData:: ' + JSON.stringify(postData));
            //success(data);
            // resp.redirect('/auth/WEB/infodatatrack/edit_video_infodatatrack/' + _id);
            resp.status(200).jsonp(responseObject);

        });
    });
    request.on('error', function (err) {
        console.error('problem with request: ${err.message}');
    });
    // request.write(JSON.stringify(postData));
    request.end();
});


/*******************************************************
 API REST CALLS
 **********************************************************/



/* POST infodatatrack */
router.post('/V1/', function (req, res, next) {
    idata = new Infodatatrack(req.body);
    idata.save(function (err, infodatatrack) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(infodatatrack);
    });
});

/* GET JSON Infodatatracks listing. */
router.get('/V1/', function (req, res, next) {
    var fields = {
        type: 1,
        name: 1,
        geometry: 1,
        "properties.name": 1,
        "properties.rcategory": 1,
        "properties.Ccode": 1,
        "properties.bcode": 1,
        "properties.gcode": 1,
        "properties.gcode2": 1,
        "properties.Ctype": 1,
        "properties.Cnumelem": 1,
        "properties.Csection": 1,
        "properties.Cmaterial": 1,
        "properties.Cdiameter": 1,
        "properties.Cwidth": 1,
        "properties.Clength": 1,
        "properties.Cclearing": 1,
        "properties.CVisualCondition": 1,
        "properties.btype": 1,
        "properties.bspans": 1,
        "properties.blenght": 1,
        "properties.bwidth": 1,
        "properties.bfreeheight": 1,
        "properties.bmaterialdeck": 1,
        "properties.bmaterialpiers": 1,
        "properties.bmaterialabutments": 1,
        "properties.bdamagesfoundationsgeneraltype": 1,
        "properties.bvisualcondition": 1,
        "properties.gtype": 1,
        "properties.gposition": 1,
        "properties.gheight": 1,
        "properties.glength": 1,
        "properties.gslope": 1,
        "properties.gnature": 1,
        "properties.gintensityfailure": 1,
        "properties.gvisualcondition": 1,
        "properties.gtype2": 1,
        "properties.gposition2": 1,
        "properties.gheight2": 1,
        "properties.glength2": 1,
        "properties.gslope2": 1,
        "properties.gnature2": 1,
        "properties.gintensityfailure2": 1,
        "properties.gvisualcondition2": 1,
        "properties.koboedit": 1
    };
    debug(fields);

    Infodatatrack.find({}, fields).exec(function (err, infodatatracks) {
        if (err){
            res.send(500, err.message);
        }
        else {
            console.log('infodatatracks', infodatatracks.length)
            res.status(200).json(infodatatracks);
        }
    });

});
/* GET JSON Infodatatracks listing. */
router.get('/V1/list_order', function (req, res, next) {
    var properties = {
        'properties.name': 1,
        'properties.rcode': 1
    };
    Infodatatrack.find({}, properties).sort({
        'properties.name': 1
    }).exec(function (err, infodatatracks) {
        if (err) {
            console.error('Error en infodatatrack list_order', err.message)
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(infodatatracks);
    });

});

/* GET JSON Infodatatracks listing. */
router.get('/V1/list_info/:id', function (req, res, next) {
    Infodatatrack.find().exec(function (err, infodatatracks) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatracks);
    });

});


/* GET JSON Infodatatracks listing. */
router.get('/V1/:id_video', function (req, res, next) {
    Infodatatrack.findOne({
        'properties.video_roads': req.params.id_video
    }).sort({
        "updated_at": -1
    }).exec(function (err, infodatatracks) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatracks);
    });

});
/* GET JSON Infodatatracks listing. */
router.get('/V1/list_byid/:id', function (req, res, next) {
    Infodatatrack.findById(req.params.id).exec(function (err, infodatatrack) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatrack);
    });

});
/* GET JSON Infodatatracks listing id. */
router.get('/V1/list_id/', function (req, res, next) {
    Infodatatrack.find({}, {
        _id: 1,
        "properties.name": 1
    }).exec(function (err, infodatatracks) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatracks);
    });

});
/* GET JSON infodatatrack by id. */
router.get('/V1/list_infobyid/:id', function (req, res, next) {
    Infodatatrack.findById(req.params.id).exec(function (err, infodatatrack) {
        if (err) {
            res.send(500, err.message);
        }
        // // console.log(JSON.stringify(infodatatrack));
        // TODO: cargar la info de los Kobos
        var koboProm = new Array();

        infodatatrack.geometry.coordinates.forEach(function (element, tabindex) {

            var point = {
                type: "Point",
                coordinates: [parseFloat(element[0]), parseFloat(element[1])]
            };
            koboProm[tabindex] = Koboinfo.geoNear(point, {
                maxDistance: config.QUERYMAXDISTANCE,
                spherical: true
            }, function (err, kobos) {
                if (err) {
                    //// console.log(err);
                    return res.status(500).send(err.message);
                }
                return kobos[0];
            });
        });

        Promise.all(koboProm).then(function (values) {
            var koboarr = [];
            values.forEach(function (val, index) {
                if (val.length > 0) {
                    // // console.log('VAL: ' + val[0].dis);
                    koboarr[index] = {
                        kobo_id: val[0].obj._id,
                        kobo_type: val[0].obj.properties.kobo_type.toUpperCase()
                    };
                } else {
                    // // console.log('UNDEFINED');
                    koboarr[index] = undefined;
                }
                //// console.log('PROMISE ALL ' + index + '-PROMI ? SE ALL ' + index + '- ' + JSON.stringify(val[0].obj.properties.description) :'-' );
                //rldata = JSON.parse(val);
                // tabdata.properties.IRI = v ? al[0rties.IRI = val[0].obj.properties.descriptio :'-' n;
            });
            infodatatrack.properties.kobo = koboarr;
            // // console.log('TABDATA ' + JSON.stringify(tabdata));
            res.status(200).jsonp(infodatatrack);
        }).catch(function (reason) {
            // console.log(reason);
            return res.status(500).send(reason);

        });

        // res.status(200).jsonp(infodatatrack);
    });

});

/* DEL file */
router.post('/V1/delete/:id', function (req, res, next) {
    Infodatatrack.findByIdAndRemove(req.params.id, function (err, file) {
        // // // console.log('## API DEL file: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        Infodatatrack.find(function (err, files) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(files);
        });
    });

});

/* UPDATE Infodatatrack */
router.post('/V1/update_infodatatrack/:id', function (req, res, next) {
    //// console.log('## UPDATE Infodatatrack ##\nBODY: ' + JSON.stringify(req.body));
    Infodatatrack.findById(req.params.id, function (err, infodatatrack) {
        var saveInfodatatrack = extend({}, req.body);
        for (var key in saveInfodatatrack) {
            //// console.log(key + ": " + saveInfodatatrack[key]);
            if (typeof saveInfodatatrack[key] === 'object') {
                // estoy dentro de properties
                for (var key2 in saveInfodatatrack[key]) {
                    //// console.log(key2 + ": " + saveInfodatatrack[key][key2]);
                    if (key2 === 'koboedit') {
                        infodatatrack[key][key2]["kobo_id"] = saveInfodatatrack[key][key2]["kobo_id"];
                        infodatatrack[key][key2]["kobo_type"] = saveInfodatatrack[key][key2]["kobo_type"];

                    } else {
                        infodatatrack[key][key2] = saveInfodatatrack[key][key2];
                    }
                }
            } else {
                infodatatrack[key] = saveInfodatatrack[key];
            }
        }

        //// console.log('## UPDATE Infodatatrack ##\nfind&update: ' + JSON.stringify(infodatatrack));
        infodatatrack.updated_at = new Date();
        infodatatrack.save(function (err, data) {
            if (err) {
                return res.status(500).send(err.message);
            }
            //// console.log('RESULT OK :\n' + JSON.stringify(data));
            res.status(200).jsonp(data);
        });
        // Infodatatrack.findByIdAndUpdate(req.params.id, { $set: saveInfodatatrack }, function(err, result) {
        //     if (err) {
        //         //// // console.log(err);
        //         return res.status(500).send(err.message);
        //     }
        //     //// // console.log("RESULT: " + result);
        //     res.status(200).jsonp(result);
        //     // res.send('Done')
        // });
    });

});
/* GET JSON Infodatatracks near. */
router.get('/V1/getNear/:lng/:lat', function (req, res, next) {
    var point = {
        type: "Point",
        coordinates: [parseFloat(req.params.lng), parseFloat(req.params.lat)]
    };

    Infodatatrack.geoNear(point, {
        maxDistance: config.MAXDISTANCE,
        spherical: true
    }, function (err, infodatatracks) {
        if (err) {
            //// // console.log(err);
            return res.status(500).send(err.message);
        }
        if (infodatatracks && infodatatracks.length > 0) {
            res.status(200).jsonp(infodatatracks[0]);
        } else {
            res.status(200).jsonp({});
        }
    });


});

/* POST Data Road Track */
router.post('/V1/save_tabular_data/', function (req, res, next) {
    // // console.log('API save_tabular_data ' + JSON.stringify(req.body));
    infodatatrack = new Infodatatrack(req.body);
    infodatatrack.save(function (err, data) {
        if (err) {
            return res.status(500).send(err.message);
        }

        Road.findOne({
            "properties.name": infodatatrack.properties.name
        }).exec(function (err, road) {
            if (err) {
                res.send(500, err.message);
            }
            // roads.forEach(function(road, index) {
            road.proccessed = true;
            road.save(function (err2, data2) {
                if (err2) {
                    return res.status(500).send(err2.message);
                }
                // console.log('ROAD modified ' + JSON.stringify(data2._id));

            });
            // });
        });

        res.status(200).jsonp(data);
    });
});
/**
 * Duplicate ROWS
 */
router.post('/V1/duplicate_rows/:id', function (req, res, next) {
    // console.log('## duplicate_rows Infodatatrack ## ' + req.params.id);
    Infodatatrack.findById(req.params.id, function (err, infodatatrack) {
        //// console.log('infodatatrack:: \n' + infodatatrack._id);
        //// console.log('infodatatrack2:: \n' + JSON.stringify(infodatatrack));

        for (var key in infodatatrack) {
            if (key === "_doc") {
                for (var key2 in infodatatrack[key]) {
                    //// console.log(key2 + " : " + infodatatrack[key2]);
                    // Hay que duplicar Properties y geometry
                    if (key2 === "geometry") {
                        var coordinatesNew = infodatatrack.geometry.coordinates.slice(0);
                        coordinatesNew.push(infodatatrack.geometry.coordinates[infodatatrack.geometry.coordinates.length - 1]);
                        coordinatesNew.unshift(infodatatrack.geometry.coordinates[0]);
                        // // console.log('Entro:: ' + coordinatesNew);
                        infodatatrack.geometry.coordinates = coordinatesNew.slice(0);

                    } else if (key2 === "properties") {
                        for (var key3 in infodatatrack.properties) {
                            //// console.log("ANTES: " + key2 + " - " + key3 + " : " + (infodatatrack.properties[key3] !== undefined ? infodatatrack.properties[key3].length : ''));
                            if (infodatatrack.properties[key3] !== undefined &&
                                Array.isArray(infodatatrack.properties[key3]) &&
                                infodatatrack.properties[key3].length > 0) {

                                var arrNew = infodatatrack.properties[key3].slice(0);
                                arrNew.push(infodatatrack.properties[key3][infodatatrack.properties[key3].length - 1]);
                                arrNew.unshift(infodatatrack.properties[key3][0]);
                                //// console.log(arrNew);
                                // // console.log(typeof infodatatrack.properties[key3]);
                                // // console.log(typeof arrNew);

                                infodatatrack.properties[key3] = arrNew;
                                //// console.log("DESP: " + key3 + " : " + infodatatrack.properties[key3].length);
                            }

                        }

                    }
                }

            }
            // if (typeof saveInfodatatrack[key] === 'object') {
            //     // estoy dentro de properties
            //     for (var key2 in saveInfodatatrack[key]) {
            //         //// console.log(key2 + ": " + saveInfodatatrack[key][key2]);
            //         infodatatrack[key][key2] = saveInfodatatrack[key][key2];
            //     }
            // } else {
            //     infodatatrack[key] = saveInfodatatrack[key];
            // }
        }

        //// console.log('## UPDATE Infodatatrack ##\nfind&update: ' + infodatatrack);
        infodatatrack.updated_at = new Date();
        infodatatrack.save(function (err, data) {
            if (err) {
                return res.status(500).send(err.message);
            }
            //// console.log('RESULT OK :\n' + JSON.stringify(data));
            res.status(200).jsonp(data);
        });
        // Infodatatrack.findByIdAndUpdate(req.params.id, { $set: saveInfodatatrack }, function(err, result) {
        //     if (err) {
        //         //// // console.log(err);
        //         return res.status(500).send(err.message);
        //     }
        //     //// // console.log("RESULT: " + result);
        //     res.status(200).jsonp(result);
        //     // res.send('Done')
        // });
    });

});
/**
 * invertedpk
 */
router.post('/V1/invertedpk/:id', function (req, res, next) {
    // console.log('## invertedpk Infodatatrack ## ' + req.params.id);
    Infodatatrack.findById(req.params.id, function (err, infodatatrack) {

        // console.log('## UPDATE Infodatatrack ##\nfind&update: ' + infodatatrack.inverted);
        infodatatrack.updated_at = new Date();
        infodatatrack.inverted = true;
        var invertedpk = service.invertedpk(infodatatrack.properties.pk);
        infodatatrack.properties.pk = invertedpk;
        infodatatrack.save(function (err, data) {
            if (err) {
                return res.status(500).send(err.message);
            }
            // console.log('RESULT OK :\n' + JSON.stringify(data.inverted));
            res.status(200).jsonp(data);
        });

    });

});

/* UPDATE Infodatatrack */
router.post('/V1/delrowskobo/:idifdt/:rowid/:koboid', function (req, res, next) {
    // console.log('## UPDATE delrowskobo ##\nBODY: ' + JSON.stringify(req.body));
    Koboinfo.findById(req.params.koboid, function (err, kobomod) {
        if (err) {
            return res.status(500).send(err.message);
        }
        // console.log('kobomod ' + kobomod._id);
        Infodatatrack.findById(req.params.idifdt, function (err, ifdt) {
            if (err) return handleError(err);

            var arrkoboedit = [];
            var properties = [];

            var ini = parseInt(req.params.rowid);
            var fin = parseInt(req.params.rowid);

            for (var [kprop, vprop] of Object.keys(kobomod._doc.properties).entries()) {
                if (Object.keys(ifdt._doc.properties).indexOf(vprop) >= 0) {
                    var arrprop = [];


                    for (var [cindex, cval] of ifdt.geometry.coordinates.entries()) {
                        var newprop = '';
                        if (cindex >= ini && cindex <= fin) {
                            /**
                             * Si estoy dentro de las filas a borrar
                             * relleno con info vacía
                             */
                            // newprop = kobomod.properties[vprop];
                            arrprop.push(newprop);
                        } else {
                            /**
                             * El resto de valores los dejo como están
                             */
                            if (ifdt.properties[vprop] != undefined && ifdt.properties[vprop].length != 0) {
                                arrprop.push(ifdt.properties[vprop][cindex]);

                            } else {
                                arrprop.push(newprop);

                            }
                        }

                    }
                    if (ifdt.properties[vprop] === undefined) {
                        ifdt.properties[vprop] = [];
                    }
                    ifdt.properties[vprop] = arrprop;
                }
            }

            for (var [cindex, cval] of ifdt.geometry.coordinates.entries()) {
                var newkobo = {};
                if (cindex >= ini && cindex <= fin) {
                    newkobo.kobo_id = '';
                    newkobo.kobo_type = '';
                    arrkoboedit.push(newkobo);

                } else {
                    if (ifdt.properties.koboedit.length != 0) {
                        arrkoboedit.push(ifdt.properties.koboedit[cindex]);

                    } else {
                        arrkoboedit.push(newkobo);

                    }
                }
                // // console.log(cindex + JSON.stringify(arrkoboedit[cindex]));

            }
            ifdt.properties.koboedit = arrkoboedit;
            ifdt.isNew = false;

            ifdt.save(function (err, imod) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                // // console.log('imod.properties.koboedit: ' + JSON.stringify(imod.properties.koboedit));

                res.status(200).jsonp(kobomod);
            });
        });


    });

});
/* GET JSON Infodatatracks listing. */
router.get('/V1/list_ifdt/:info', function (req, res, next) {
    req.params.info = req.params.info;
    var returnObject = {};
    var index = 0;
    var lastindex = 0;
    // // console.log(req.params.info.replace('%20', ' '));
    Infodatatrack.find({
        $or: [{
                "properties.rcode": decodeURIComponent(req.params.info)
            },
            {
                "properties.rname": decodeURIComponent(req.params.info)
            },
            {
                "properties.bcode": decodeURIComponent(req.params.info)
            },
            {
                "properties.bname": decodeURIComponent(req.params.info)
            },
            {
                "properties.gcode": decodeURIComponent(req.params.info)
            },
            {
                "properties.gcode2": decodeURIComponent(req.params.info)
            },
            {
                "properties.dcode": decodeURIComponent(req.params.info)
            },
            {
                "properties.dcode2": decodeURIComponent(req.params.info)
            },
            {
                "properties.Ccode": decodeURIComponent(req.params.info)
            }
        ]
    }).exec(function (err, infodatatrack) {
        if (err) {
            res.send(500, err.message);
        }
        var roadCodeForAsset = '';
        var indexForAsset = '';
        if (infodatatrack.length > 0) {
            returnObject = extend({}, infodatatrack[0]._doc);
            // // console.log('returnObject1 ' + JSON.stringify(infodatatrack[0].properties.Ccode));

            if (infodatatrack[0].properties.rcode.indexOf(decodeURIComponent(req.params.info)) >= 0 ||
                infodatatrack[0].properties.rname.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                returnObject["properties"]["asset_type"] = "ROAD";
                /**
                 * En caso de ROAD hay que añadir los siguientes valores
                 * :"No. of bridges",
                    :"No. of culverts",
                    :"Km of Longitudinal drainage",
                    :"No. of retaining walls",
                    :"No. of cuttings",
                    :"No. of embankments",
                    :"No. of barriers",
                    :"No. of vertical signaling",
                    :"No. of street lights",
                 */
                for (var i = 0; i < infodatatrack[0].properties.rcode.length; i++) {
                    if (infodatatrack[0].properties['rcode'][i].indexOf(decodeURIComponent(req.params.info)) >= 0) {
                        roadCodeForAsset = infodatatrack[0].properties.rcode[i];
                        indexForAsset = i;
                        break;
                    }
                }
                var rnumbridges = 0;
                var rnumculverts = 0;
                var rnumLongitudinaldrainage = 0;
                var rnumLongitudinaldrainageini = 0;
                var rnumLongitudinaldrainagefin = 0;
                var rnumretainingwalls = 0;
                var rnumcuttings = 0;
                var rnumembankments = 0;
                var rnumbarriers = 0;
                var rnumverticalsignaling = 0;
                var rnumstreetlights = 0;
                for (var [kprop, vprop] of Object.keys(infodatatrack[0].properties).entries()) {
                    // // console.log(kprop + ' ' + vprop);
                    // // console.log(kprop + ' ' + vprop);
                    if (infodatatrack[0].properties[vprop] != undefined && Array.isArray(infodatatrack[0].properties[vprop])) {
                        var bvalant = "";
                        var cvalant = "";
                        var gvalant = "";
                        var gvalant2 = "";
                        var dvalant = "";
                        var dvalant2 = "";
                        var barriersexist = "NO";
                        var lightsexist = "NO";
                        for (var [kval, vval] of Object.keys(infodatatrack[0].properties[vprop]).entries()) {
                            if (vprop === 'bcode') {
                                /**
                                 * En caso de tener bcode, es porque hay un puente
                                 */
                                if (infodatatrack[0].properties[vprop][kval] != undefined &&
                                    infodatatrack[0].properties[vprop][kval] != "" &&
                                    infodatatrack[0].properties[vprop][kval] != bvalant) {
                                    rnumbridges++;
                                    bvalant = infodatatrack[0].properties[vprop][kval];
                                }
                            } else if (vprop === 'Ccode') {
                                /**
                                 * En caso de Ccode hay un culvert
                                 */
                                if (infodatatrack[0].properties[vprop][kval] != undefined &&
                                    infodatatrack[0].properties[vprop][kval] != "" &&
                                    infodatatrack[0].properties[vprop][kval] != cvalant) {
                                    //// console.log(infodatatrack[0].properties[vprop][kval]);
                                    rnumculverts++;
                                    cvalant = infodatatrack[0].properties[vprop][kval];
                                }
                            } else if (vprop === 'gcode') {
                                /**
                                 * En caso de gcode o gcode2, debo revisar en el mismo index el tipo de geot que es.
                                 * Siendo el tipo los tres definidos
                                 * Cutting Embankment Retaining_walls
                                 */
                                if (infodatatrack[0].properties[vprop][kval] != undefined &&
                                    infodatatrack[0].properties[vprop][kval] != "" &&
                                    infodatatrack[0].properties[vprop][kval] != gvalant) {
                                    //// console.log(infodatatrack[0].properties[vprop][kval]);
                                    if (infodatatrack[0].properties["gtype"][kval] === "Cutting") {
                                        rnumcuttings++;
                                    } else if (infodatatrack[0].properties["gtype"][kval] === "Embankment") {
                                        rnumembankments++;
                                    } else if (infodatatrack[0].properties["gtype"][kval] === "Retaining_walls") {
                                        rnumretainingwalls++;
                                    }
                                    gvalant = infodatatrack[0].properties[vprop][kval];
                                }
                            } else if (vprop === 'gcode2') {
                                if (infodatatrack[0].properties[vprop][kval] != undefined &&
                                    infodatatrack[0].properties[vprop][kval] != "" &&
                                    infodatatrack[0].properties[vprop][kval] != gvalant2) {
                                    //// console.log(infodatatrack[0].properties[vprop][kval]);
                                    if (infodatatrack[0].properties["gtype2"][kval] === "Cutting") {
                                        rnumcuttings++;
                                    } else if (infodatatrack[0].properties["gtype2"][kval] === "Embankment") {
                                        rnumembankments++;
                                    } else if (infodatatrack[0].properties["gtype2"][kval] === "Retaining_walls") {
                                        rnumretainingwalls++;
                                    }
                                    gvalant2 = infodatatrack[0].properties[vprop][kval];
                                }
                            } else if (vprop === 'dcode') {
                                /**
                                 * En caso de dcode o dcode2 tenemos un drainage
                                 * Los tipos son Longitudinales siempre, por lo que no hace falta comprobar nada
                                 */
                                if (infodatatrack[0].properties[vprop][kval] != undefined &&
                                    infodatatrack[0].properties[vprop][kval] != "") {
                                    //// console.log(infodatatrack[0].properties[vprop][kval] + ' ' + dvalant);
                                    if (dvalant === "") {
                                        dvalant = infodatatrack[0].properties[vprop][kval];
                                        rnumLongitudinaldrainageini = infodatatrack[0].properties["pk"][kval];
                                    }
                                    if (dvalant === infodatatrack[0].properties[vprop][kval]) {
                                        rnumLongitudinaldrainagefin = infodatatrack[0].properties["pk"][kval];
                                    } else {
                                        rnumLongitudinaldrainage += (rnumLongitudinaldrainagefin - rnumLongitudinaldrainageini);
                                        //// console.log('Resultados:: ' + rnumLongitudinaldrainage + ' = ' + rnumLongitudinaldrainagefin + ' - ' + rnumLongitudinaldrainageini);
                                        rnumLongitudinaldrainageini = infodatatrack[0].properties["pk"][kval];
                                        rnumLongitudinaldrainagefin = infodatatrack[0].properties["pk"][kval];
                                    }

                                    dvalant = infodatatrack[0].properties[vprop][kval];
                                } else if (dvalant != infodatatrack[0].properties[vprop][kval] &&
                                    infodatatrack[0].properties[vprop][kval] != undefined) {
                                    rnumLongitudinaldrainage += (rnumLongitudinaldrainagefin - rnumLongitudinaldrainageini);
                                    //// console.log('Resultados:: ' + rnumLongitudinaldrainage + ' = ' + rnumLongitudinaldrainagefin + ' - ' + rnumLongitudinaldrainageini);
                                    rnumLongitudinaldrainageini = infodatatrack[0].properties["pk"][kval];
                                    rnumLongitudinaldrainagefin = infodatatrack[0].properties["pk"][kval];
                                }
                            } else if (vprop === 'dcode2') {
                                if (infodatatrack[0].properties[vprop][kval] != undefined &&
                                    infodatatrack[0].properties[vprop][kval] != "") {
                                    //// console.log(infodatatrack[0].properties[vprop][kval] + ' ' + dvalant2);
                                    if (dvalant2 === "") {
                                        dvalant2 = infodatatrack[0].properties[vprop][kval];
                                        rnumLongitudinaldrainageini = infodatatrack[0].properties["pk"][kval];
                                    }
                                    if (dvalant2 === infodatatrack[0].properties[vprop][kval]) {
                                        rnumLongitudinaldrainagefin = infodatatrack[0].properties["pk"][kval];
                                    } else {
                                        rnumLongitudinaldrainage += (rnumLongitudinaldrainagefin - rnumLongitudinaldrainageini);
                                        //// console.log('Resultados:: ' + rnumLongitudinaldrainage + ' = ' + rnumLongitudinaldrainagefin + ' - ' + rnumLongitudinaldrainageini);
                                        rnumLongitudinaldrainageini = infodatatrack[0].properties["pk"][kval];
                                        rnumLongitudinaldrainagefin = infodatatrack[0].properties["pk"][kval];
                                    }

                                    dvalant2 = infodatatrack[0].properties[vprop][kval];
                                } else if (dvalant2 != infodatatrack[0].properties[vprop][kval] &&
                                    infodatatrack[0].properties[vprop][kval] != undefined) {
                                    rnumLongitudinaldrainage += (rnumLongitudinaldrainagefin - rnumLongitudinaldrainageini);
                                    //// console.log('Resultados:: ' + rnumLongitudinaldrainage + ' = ' + rnumLongitudinaldrainagefin + ' - ' + rnumLongitudinaldrainageini);
                                    rnumLongitudinaldrainageini = infodatatrack[0].properties["pk"][kval];
                                    rnumLongitudinaldrainagefin = infodatatrack[0].properties["pk"][kval];
                                }
                            } else if (vprop === 'rsignalstype') {
                                /*
                                 * En caso de rsignalstype, se tiene en cuenta el valor de VERTICAL SIGN
                                 */
                                if (infodatatrack[0].properties[vprop][kval] != undefined &&
                                    infodatatrack[0].properties[vprop][kval] != "" &&
                                    infodatatrack[0].properties[vprop][kval].toUpperCase() === "VERTICAL SIGN") {
                                    //// console.log(infodatatrack[0].properties[vprop][kval]);
                                    rnumverticalsignaling++;
                                }
                            } else if (vprop === 'rbarriersexist') {
                                /**
                                 * en caso de rbarriersexist
                                 * Debo comprobar aquellos valores que cambien a YES desde el NO, porque por defecto es NO.
                                 */
                                if (infodatatrack[0].properties[vprop][kval] != undefined &&
                                    infodatatrack[0].properties[vprop][kval] != "" &&
                                    infodatatrack[0].properties[vprop][kval].toUpperCase() != barriersexist) {
                                    //// console.log(infodatatrack[0].properties[vprop][kval]);
                                    if (barriersexist.toUpperCase() === 'NO') {
                                        rnumbarriers++;
                                    }
                                    barriersexist = infodatatrack[0].properties[vprop][kval].toUpperCase();
                                }
                            } else if (vprop === 'rlightexist') {
                                /**
                                 * idem del anterior
                                 */
                                if (infodatatrack[0].properties[vprop][kval] != undefined &&
                                    infodatatrack[0].properties[vprop][kval] != "" &&
                                    infodatatrack[0].properties[vprop][kval].toUpperCase() != lightsexist) {
                                    //// console.log(infodatatrack[0].properties[vprop][kval]);
                                    if (lightsexist.toUpperCase() === 'NO') {
                                        rnumstreetlights++;
                                    }
                                    lightsexist = infodatatrack[0].properties[vprop][kval].toUpperCase();
                                }
                            }

                        }

                    }


                }

                returnObject["properties"]["rcode"] = roadCodeForAsset; // achtung!! rcode rewriting
                returnObject["properties"]["rnumbridges"] = rnumbridges;
                returnObject["properties"]["rnumculverts"] = rnumculverts;
                returnObject["properties"]["rnumLongitudinaldrainage"] = Math.abs(rnumLongitudinaldrainage);
                returnObject["properties"]["rnumretainingwalls"] = rnumretainingwalls;
                returnObject["properties"]["rnumcuttings"] = rnumcuttings;
                returnObject["properties"]["rnumembankments"] = rnumembankments;
                returnObject["properties"]["rnumbarriers"] = rnumbarriers;
                returnObject["properties"]["rnumverticalsignaling"] = rnumverticalsignaling;
                returnObject["properties"]["rnumstreetlights"] = rnumstreetlights;
                returnObject["properties"]["pk"] = infodatatrack[0]["properties"]["pk"];
                // TODO: añadir kval como index
                // añadir las Coordenates

            } else if (infodatatrack[0].properties.bcode.indexOf(decodeURIComponent(req.params.info)) >= 0 ||
                infodatatrack[0].properties.bname.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                returnObject["properties"]["asset_type"] = "BRIDGE";

                if (infodatatrack[0].properties.bcode.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                    //// console.log('bcode index ' + infodatatrack[0].properties.bcode.indexOf(decodeURIComponent(req.params.info)));
                    index = infodatatrack[0].properties.bcode.indexOf(decodeURIComponent(req.params.info));
                    //// console.log('bcode lastindex ' + infodatatrack[0].properties.bcode.lastIndexOf(decodeURIComponent(req.params.info)));
                    lastindex = infodatatrack[0].properties.bcode.lastIndexOf(decodeURIComponent(req.params.info));
                } else {
                    //// console.log('bcode index ' + infodatatrack[0].properties.bname.indexOf(decodeURIComponent(req.params.info)));
                    index = infodatatrack[0].properties.bname.indexOf(decodeURIComponent(req.params.info));
                    //// console.log('bname lastindex ' + infodatatrack[0].properties.bname.lastIndexOf(decodeURIComponent(req.params.info)));
                    lastindex = infodatatrack[0].properties.bname.lastIndexOf(decodeURIComponent(req.params.info));
                }
                if (index == 0) {
                    //// console.log('index ' + index + ' ' + lastindex);
                    if (lastindex < returnObject.geometry.coordinates.length) {
                        returnObject.geometry.coordinates.splice(lastindex + 1, returnObject.geometry.coordinates.length - (lastindex + 1));
                    }

                } else {
                    //// console.log('index ' + index + ' ' + lastindex);
                    if (lastindex < returnObject.geometry.coordinates.length) {
                        returnObject.geometry.coordinates.splice(lastindex + 1, returnObject.geometry.coordinates.length - (lastindex + 1));
                    }
                    returnObject.geometry.coordinates.splice(0, index);
                }
                /**
                 * Recorto el resto de arrays de properties
                 */
                for (var [key, value] of Object.keys(returnObject.properties).entries()) {
                    //// console.log(key + ': ' + value + ' - ' + typeof(value));
                    if (Array.isArray(returnObject.properties[value])) {
                        //// console.log(key + ': ' + value + ' - ' + typeof(returnObject.properties[value]));
                        if (index == 0) {
                            //// console.log('index ' + index + ' ' + lastindex);
                            if (lastindex < returnObject.properties[value].length) {
                                returnObject.properties[value].splice(lastindex + 1, returnObject.properties[value].length - (lastindex + 1));
                            }

                        } else {
                            //// console.log('index ' + index + ' ' + lastindex);
                            if (lastindex < returnObject.properties[value].length) {
                                returnObject.properties[value].splice(lastindex + 1, returnObject.properties[value].length - (lastindex + 1));
                            }
                            returnObject.properties[value].splice(0, index);
                        }
                    }

                }
                //// console.log('returnObject2 ' + JSON.stringify(returnObject.geometry.coordinates));
                //// console.log('returnObject2 ' + JSON.stringify(returnObject.properties));

            } else if (infodatatrack[0].properties.gcode.indexOf(decodeURIComponent(req.params.info)) >= 0 ||
                infodatatrack[0].properties.gcode2.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                if (infodatatrack[0].properties.gcode.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                    returnObject["properties"]["asset_type"] = "GEOT";
                } else if (infodatatrack[0].properties.gcode2.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                    returnObject["properties"]["asset_type"] = "GEOT2";

                }

                if (infodatatrack[0].properties.gcode.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                    //// console.log('gcode index ' + infodatatrack[0].properties.gcode.indexOf(decodeURIComponent(req.params.info)));
                    index = infodatatrack[0].properties.gcode.indexOf(decodeURIComponent(req.params.info));
                    //// console.log('gcode lastindex ' + infodatatrack[0].properties.gcode.lastIndexOf(decodeURIComponent(req.params.info)));
                    lastindex = infodatatrack[0].properties.gcode.lastIndexOf(decodeURIComponent(req.params.info));
                } else {
                    //// console.log('gcode index ' + infodatatrack[0].properties.bname.indexOf(decodeURIComponent(req.params.info)));
                    index = infodatatrack[0].properties.gcode2.indexOf(decodeURIComponent(req.params.info));
                    //// console.log('gcode2 lastindex ' + infodatatrack[0].properties.gcode2.lastIndexOf(decodeURIComponent(req.params.info)));
                    lastindex = infodatatrack[0].properties.gcode2.lastIndexOf(decodeURIComponent(req.params.info));
                }
                if (index == 0) {
                    //// console.log('index ' + index + ' ' + lastindex);
                    if (lastindex < returnObject.geometry.coordinates.length) {
                        returnObject.geometry.coordinates.splice(lastindex + 1, returnObject.geometry.coordinates.length - (lastindex + 1));
                    }

                } else {
                    //// console.log('index ' + index + ' ' + lastindex);
                    if (lastindex < returnObject.geometry.coordinates.length) {
                        returnObject.geometry.coordinates.splice(lastindex + 1, returnObject.geometry.coordinates.length - (lastindex + 1));
                    }
                    returnObject.geometry.coordinates.splice(0, index);
                }
                /**
                 * Recorto el resto de arrays de properties
                 */
                for (var [key, value] of Object.keys(returnObject.properties).entries()) {
                    //// console.log(key + ': ' + value + ' - ' + typeof(value));
                    if (Array.isArray(returnObject.properties[value])) {
                        //// console.log(key + ': ' + value + ' - ' + typeof(returnObject.properties[value]));
                        if (index == 0) {
                            //// console.log('index ' + index + ' ' + lastindex);
                            if (lastindex < returnObject.properties[value].length) {
                                returnObject.properties[value].splice(lastindex + 1, returnObject.properties[value].length - (lastindex + 1));
                            }

                        } else {
                            //// console.log('index ' + index + ' ' + lastindex);
                            if (lastindex < returnObject.properties[value].length) {
                                returnObject.properties[value].splice(lastindex + 1, returnObject.properties[value].length - (lastindex + 1));
                            }
                            returnObject.properties[value].splice(0, index);
                        }
                    }

                }
            } else if (infodatatrack[0].properties.Ccode.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                returnObject["properties"]["asset_type"] = "CULVERT";

                //// console.log('Ccode  ' + decodeURIComponent(req.params.info));
                if (infodatatrack[0].properties.Ccode.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                    //// console.log('Ccode index ' + infodatatrack[0].properties.Ccode.indexOf(decodeURIComponent(req.params.info)));
                    index = infodatatrack[0].properties.Ccode.indexOf(decodeURIComponent(req.params.info));
                    //// console.log('Ccode lastindex ' + infodatatrack[0].properties.Ccode.lastIndexOf(decodeURIComponent(req.params.info)));
                    lastindex = infodatatrack[0].properties.Ccode.lastIndexOf(decodeURIComponent(req.params.info));
                }
                if (index == 0) {
                    //// console.log('index1 ' + index + ' ' + lastindex);
                    if (lastindex < returnObject.geometry.coordinates.length) {
                        returnObject.geometry.coordinates.splice(lastindex + 1, returnObject.geometry.coordinates.length - (lastindex + 1));
                    }

                } else {
                    //// console.log('index2 ' + index + ' ' + lastindex);
                    if (lastindex < returnObject.geometry.coordinates.length) {
                        returnObject.geometry.coordinates.splice(lastindex + 1, returnObject.geometry.coordinates.length - (lastindex + 1));
                    }
                    returnObject.geometry.coordinates.splice(0, index);
                }
                //// console.log('returnObject.geometry.coordinates ' + returnObject.geometry.coordinates);
                /**
                 * Recorto el resto de arrays de properties
                 */
                for (var [key, value] of Object.keys(returnObject.properties).entries()) {
                    //// console.log(key + ': ' + value + ' - ' + typeof(value));
                    if (Array.isArray(returnObject.properties[value])) {
                        //// console.log(key + ': ' + value + ' - ' + typeof(returnObject.properties[value]));
                        if (index == 0) {
                            //// console.log('index ' + index + ' ' + lastindex);
                            if (lastindex < returnObject.properties[value].length) {
                                returnObject.properties[value].splice(lastindex + 1, returnObject.properties[value].length - (lastindex + 1));
                            }

                        } else {
                            //// console.log('index ' + index + ' ' + lastindex);
                            if (lastindex < returnObject.properties[value].length) {
                                returnObject.properties[value].splice(lastindex + 1, returnObject.properties[value].length - (lastindex + 1));
                            }
                            returnObject.properties[value].splice(0, index);
                        }
                    }

                }
                //// console.log('returnObject.properties ' + JSON.stringify(returnObject.properties));

            } else if (infodatatrack[0].properties.dcode.indexOf(decodeURIComponent(req.params.info)) >= 0 ||
                infodatatrack[0].properties.dcode2.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                returnObject["properties"]["asset_type"] = "DRAINAGE";
                returnObject["properties"]
                if (infodatatrack[0].properties.dcode.indexOf(decodeURIComponent(req.params.info)) >= 0) {
                    //// console.log('dcode index ' + infodatatrack[0].properties.dcode.indexOf(decodeURIComponent(req.params.info)));
                    index = infodatatrack[0].properties.dcode.indexOf(decodeURIComponent(req.params.info));
                    //// console.log('dcode lastindex ' + infodatatrack[0].properties.dcode.lastIndexOf(decodeURIComponent(req.params.info)));
                    lastindex = infodatatrack[0].properties.dcode.lastIndexOf(decodeURIComponent(req.params.info));
                } else {
                    //// console.log('dcode index ' + infodatatrack[0].properties.bname.indexOf(decodeURIComponent(req.params.info)));
                    index = infodatatrack[0].properties.dcode2.indexOf(decodeURIComponent(req.params.info));
                    //// console.log('dcode2 lastindex ' + infodatatrack[0].properties.dcode2.lastIndexOf(decodeURIComponent(req.params.info)));
                    lastindex = infodatatrack[0].properties.dcode2.lastIndexOf(decodeURIComponent(req.params.info));
                }
                if (index == 0) {
                    //// console.log('index ' + index + ' ' + lastindex);
                    if (lastindex < returnObject.geometry.coordinates.length) {
                        returnObject.geometry.coordinates.splice(lastindex + 1, returnObject.geometry.coordinates.length - (lastindex + 1));
                    }

                } else {
                    //// console.log('index ' + index + ' ' + lastindex);
                    if (lastindex < returnObject.geometry.coordinates.length) {
                        returnObject.geometry.coordinates.splice(lastindex + 1, returnObject.geometry.coordinates.length - (lastindex + 1));
                    }
                    returnObject.geometry.coordinates.splice(0, index);
                }
                /**
                 * Recorto el resto de arrays de properties
                 */
                for (var [key, value] of Object.keys(returnObject.properties).entries()) {
                    //// console.log(key + ': ' + value + ' - ' + typeof(value));
                    if (Array.isArray(returnObject.properties[value])) {
                        //// console.log(key + ': ' + value + ' - ' + typeof(returnObject.properties[value]));
                        if (index == 0) {
                            //// console.log('index ' + index + ' ' + lastindex);
                            if (lastindex < returnObject.properties[value].length) {
                                returnObject.properties[value].splice(lastindex + 1, returnObject.properties[value].length - (lastindex + 1));
                            }

                        } else {
                            //// console.log('index ' + index + ' ' + lastindex);
                            if (lastindex < returnObject.properties[value].length) {
                                returnObject.properties[value].splice(lastindex + 1, returnObject.properties[value].length - (lastindex + 1));
                            }
                            returnObject.properties[value].splice(0, index);
                        }
                    }

                }
            }
            returnObject["properties"]["kval"] = kval;
        } else {

            returnObject["properties"] = {};
            returnObject["properties"]["asset_type"] = "ERROR";

        }
        // // console.log('/V1/list_ifdt/:info properties.asset_type ' + JSON.stringify(returnObject.properties.asset_type));
        res.status(200).jsonp(returnObject);
    });

});
/* GET JSON Infodatatracks listing BY ANY FIELD. */
router.get('/V1/list_ifdt_general/:info', function (req, res, next) {
    // req.params.info = req.params.info;
    var returnObject = {};
    var index = 0;
    var lastindex = 0;
    // console.log(req.params.info.replace('%20', ' '));
    var tofind = decodeURIComponent(req.params.info);
    // debug('req.params.info ' + req.params.info);
    Infodatatrack.find({
        $or: [{
                "properties.rcode": {
                    "$regex": tofind,
                    "$options": "i"
                }
            },
            {
                "properties.rname": {
                    "$regex": tofind,
                    "$options": "i"
                }
            },
            {
                "properties.bcode": {
                    "$regex": tofind,
                    "$options": "i"
                }
            },
            {
                "properties.bname": {
                    "$regex": tofind,
                    "$options": "i"
                }
            },
            {
                "properties.gcode": {
                    "$regex": tofind,
                    "$options": "i"
                }
            },
            {
                "properties.gcode2": {
                    "$regex": tofind,
                    "$options": "i"
                }
            },
            {
                "properties.dcode": {
                    "$regex": tofind,
                    "$options": "i"
                }
            },
            {
                "properties.dcode2": {
                    "$regex": tofind,
                    "$options": "i"
                }
            },
            {
                "properties.Ccode": {
                    "$regex": tofind,
                    "$options": "i"
                }
            }
            // ,
            // {
            //     "properties.name": {"$regex": tofind, "$options" : "i" }
            // }
        ],
    }, {
        'properties.rcode': 1,
        'properties.rname': 1,
        'properties.bcode': 1,
        'properties.bname': 1,
        'properties.gcode': 1,
        'properties.gcode2': 1,
        'properties.dcode': 1,
        'properties.dcode2': 1,
        'properties.Ccode': 1
    }).exec(function (err, infodatatrack) {
        if (err) {
            res.send(500, err.message);
        }
        var matchestoquery = {};
        var texto = '';

        // console.log('infodatatrack length ' + infodatatrack.length);
        // for (var [i, v] of Object.keys(infodatatrack[0]._doc.properties).entries()) {
        // for (var [k,ind] of Object.keys(infodatatrack[0]._doc.properties).entries()) {
        //     debug(k);
        //     debug(ind);
        // }

        for (i in infodatatrack) {
            if (infodatatrack[i] !== undefined &&
                infodatatrack[i].properties !== undefined) {
                if (infodatatrack.length > 0) {
                    // //console.log('infodatatrack:  ' + JSON.stringify(infodatatrack[i].properties.name) + '*********');
                    for (var j = 0; j <= infodatatrack[i].properties.rcode.length; j++) {
                        // debug(j);
                        if (true) {
                            if (infodatatrack[i].properties.rcode[j] !== undefined &&
                                infodatatrack[i].properties.rcode[j].length > 3 &&
                                infodatatrack[i].properties.rcode[j].toUpperCase().indexOf(tofind.toUpperCase()) >= 0) {
                                matchestoquery[infodatatrack[i].properties.rcode[j]] = 'rcode';
                                // texto += ;
                            }
                            if (infodatatrack[i].properties.rname[j] !== undefined &&
                                infodatatrack[i].properties.rname[j].length > 3 &&
                                infodatatrack[i].properties.rname[j].toUpperCase().indexOf(tofind.toUpperCase()) >= 0) {
                                matchestoquery[infodatatrack[i].properties.rname[j]] = 'rname';
                            }
                            if (infodatatrack[i].properties.bcode[j] !== undefined &&
                                infodatatrack[i].properties.bcode[j].length > 3 &&
                                infodatatrack[i].properties.bcode[j].toUpperCase().indexOf(tofind.toUpperCase()) >= 0) {
                                matchestoquery[infodatatrack[i].properties.bcode[j]] = 'bcode';
                            }
                            if (infodatatrack[i].properties.bname[j] !== undefined &&
                                infodatatrack[i].properties.bname[j].length > 3 &&
                                infodatatrack[i].properties.bname[j].toUpperCase().indexOf(tofind.toUpperCase()) >= 0) {
                                matchestoquery[infodatatrack[i].properties.bname[j]] = 'bname';
                            }
                            if (infodatatrack[i].properties.gcode[j] !== undefined &&
                                infodatatrack[i].properties.gcode[j].length > 3 &&
                                infodatatrack[i].properties.gcode[j].toUpperCase().indexOf(tofind.toUpperCase()) >= 0) {
                                matchestoquery[infodatatrack[i].properties.gcode[j]] = 'gcode';
                            }
                            if (infodatatrack[i].properties.gcode2[j] !== undefined &&
                                infodatatrack[i].properties.gcode2[j].length > 3 &&
                                infodatatrack[i].properties.gcode2[j].toUpperCase().indexOf(tofind.toUpperCase()) >= 0) {
                                matchestoquery[infodatatrack[i].properties.gcode2[j]] = 'gcode2';
                            }
                            if (infodatatrack[i].properties.dcode[j] !== undefined &&
                                infodatatrack[i].properties.dcode[j].length > 3 &&
                                infodatatrack[i].properties.dcode[j].toUpperCase().indexOf(tofind.toUpperCase()) >= 0) {
                                matchestoquery[infodatatrack[i].properties.dcode[j]] = 'dcode';
                            }
                            if (infodatatrack[i].properties.dcode2[j] !== undefined &&
                                infodatatrack[i].properties.dcode2[j].length > 3 &&
                                infodatatrack[i].properties.dcode2[j].toUpperCase().indexOf(tofind.toUpperCase()) >= 0) {
                                matchestoquery[infodatatrack[i].properties.dcode2[j]] = 'dcode2';
                            }
                            if (infodatatrack[i].properties.Ccode[j] !== undefined &&
                                infodatatrack[i].properties.Ccode[j].length > 3 &&
                                infodatatrack[i].properties.Ccode[j].toUpperCase().indexOf(tofind.toUpperCase()) >= 0) {
                                // debug(infodatatrack[i].properties.Ccode[j]);
                                // debug(tofind.toUpperCase());
                                matchestoquery[infodatatrack[i].properties.Ccode[j]] = 'Ccode';
                            }
                            // debug(matchestoquery);
                        }
                    }
                } //else {

                //     returnObject = extend({}, {});
                //     returnObject["properties"] = {};
                //     returnObject["properties"]["asset_type"] = "ERROR";

                // }
            }
        }
        returnObject = extend({}, matchestoquery);
        // console.log(matchestoquery);
        // //console.log('/V1/list_ifdt/:info properties.asset_type ' + JSON.stringify(returnObject.properties.asset_type));
        res.status(200).jsonp(returnObject);
    });

});

module.exports = router;