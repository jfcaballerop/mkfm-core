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
var assert = require('assert');
var req2 = require('request');


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
    var promises = [];
    var optionsRoad = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/list_id_not_proccesed/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var optionsInfoData = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/list_order',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    promises.push(new Promise(function(resolve, reject) {
        var localOptions = optionsRoad;
        var request = http.request(localOptions, function(res) {
            res.setEncoding('utf8');
            var data = '';
            res.on('data', function(chunk) {
                var type = typeof chunk;
                data += chunk;
            });
            res.on('end', function() {
                var responseObject = JSON.parse(data);
                resolve({
                    hostname: localOptions.hostname,
                    port: localOptions.port,
                    path: localOptions.path,
                    statusCode: res.statusCode,
                    responseHeaders: JSON.stringify(res.headers),
                    body: responseObject
                });

            });
        });
        request.on('error', function(e) {
            console.error(e);
            reject(e);
        });
        request.end();
    }));

    promises.push(new Promise(function(resolve, reject) {
        // save options locally because it will be reassigned to a different object
        // before it gets used in the callback below
        var localOptions = optionsInfoData;
        var req = http.request(localOptions, function(res) {
            var data = "";
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                var responseObject = JSON.parse(data);
                resolve({
                    hostname: localOptions.hostname,
                    port: localOptions.port,
                    path: localOptions.path,
                    statusCode: res.statusCode,
                    responseHeaders: JSON.stringify(res.headers),
                    body: responseObject
                });
            });
        });
        req.on('error', function(e) {
            console.error(e);
            reject(e);
        });
        req.end();
    }));


    // now wait for all promises to be done
    Promise.all(promises).then(function(allData) {
        console.log('## maps.js ## Promise.all ##');

        resp.render('maps_data', { utm: utm, roadsvals: allData[0].body, infodatasvals: allData[1].body, moment: moment, token: req.token, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol, api_key: config.MAPS_API_KEY });

    }, function(reason) {
        return res.status(500).send(reason);
    });
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
    var promises = [];
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
    var optionsKobo = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/koboinfo/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };

    promises.push(new Promise(function(resolve, reject) {
        // save options locally because it will be reassigned to a different object
        // before it gets used in the callback below
        var localOptions = optionsRoad;
        var req = http.request(localOptions, function(res) {
            var data = "";
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                var responseObject = JSON.parse(data);
                responseObject.forEach(function(item) {
                    delete item["_id"];
                    delete item["updated_at"];
                    delete item["created_at"];
                    //delete item["properties"]["coordTimes"];

                });
                // resolve with the accumulated data
                // do it this way so that the promise infrastructure will order it for us
                resolve({
                    hostname: localOptions.hostname,
                    port: localOptions.port,
                    path: localOptions.path,
                    statusCode: res.statusCode,
                    responseHeaders: JSON.stringify(res.headers),
                    body: responseObject
                });
            });
        });
        req.on('error', function(e) {
            console.error(e);
            reject(e);
        });
        req.end();
    }));
    promises.push(new Promise(function(resolve, reject) {
        // save options locally because it will be reassigned to a different object
        // before it gets used in the callback below
        var localOptions = optionsKobo;
        var req = http.request(localOptions, function(res) {
            var data = "";
            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', function() {
                var responseObject = JSON.parse(data);
                responseObject.forEach(function(item) {
                    delete item["_id"];
                    delete item["updated_at"];
                    delete item["created_at"];
                    //delete item["properties"]["coordTimes"];

                });
                // resolve with the accumulated data
                // do it this way so that the promise infrastructure will order it for us
                resolve({
                    hostname: localOptions.hostname,
                    port: localOptions.port,
                    path: localOptions.path,
                    statusCode: res.statusCode,
                    responseHeaders: JSON.stringify(res.headers),
                    body: responseObject
                });
            });
        });
        req.on('error', function(e) {
            console.error(e);
            reject(e);
        });
        req.end();
    }));

    // now wait for all promises to be done
    Promise.all(promises).then(function(allData) {
        // This callback renders the page with all needed data 
        //   when all the https.request() calls are done
        //runISYGetCallback(allData, resInput);
        // console.log(JSON.stringify(allData[0].body));
        var koboinfos_odt = [];
        var koboinfos_bridge = [];
        var koboinfos_geo = [];
        var kobo_mainr_odt = [];
        var kobo_mainr_bridge = [];
        var kobo_mainr_geo = [];
        var kobo_secondaryr_odt = [];
        var kobo_secondaryr_bridge = [];
        var kobo_secondaryr_geo = [];
        var kobo_feederr_odt = [];
        var kobo_feederr_bridge = [];
        var kobo_feederr_geo = [];
        var kobo_otherr_odt = [];
        var kobo_otherr_bridge = [];
        var kobo_otherr_geo = [];
        var kobo_urbanr_odt = [];
        var kobo_urbanr_bridge = [];
        var kobo_urbanr_geo = [];
        var mainr = [];
        var secondaryr = [];
        var feederr = [];
        var otherr = [];
        var urbanr = [];
        allData[1].body.forEach(function(elem, index) {
            if (elem.properties.kobo_type === "Culvert") {
                koboinfos_odt.push(elem);
            } else if (elem.properties.kobo_type === "Bridge") {
                koboinfos_bridge.push(elem);

            } else {
                koboinfos_geo.push(elem);
            }
        });
        allData[0].body.forEach(function(elem, index) {
            if (elem.properties.rcategory.indexOf('Main Road') >= 0) {
                mainr.push(elem);
            } else if (elem.properties.rcategory.indexOf('Secondary') >= 0) {
                secondaryr.push(elem);

            } else if (elem.properties.rcategory.indexOf('Feeder') >= 0) {
                feederr.push(elem);

            } else if (elem.properties.rcategory.indexOf('Urban') >= 0) {
                urbanr.push(elem);

            } else {
                otherr.push(elem);
            }
        });

        resp.render('data_sheet', {
            kobo_mainr_geo: kobo_mainr_geo,
            kobo_secondaryr_geo: kobo_secondaryr_geo,
            kobo_feederr_geo: kobo_feederr_geo,
            kobo_urbanr_geo: kobo_urbanr_geo,
            kobo_otherr_geo: kobo_otherr_geo,
            kobo_mainr_bridge: kobo_mainr_bridge,
            kobo_secondaryr_bridge: kobo_secondaryr_bridge,
            kobo_feederr_bridge: kobo_feederr_bridge,
            kobo_urbanr_bridge: kobo_urbanr_bridge,
            kobo_otherr_bridge: kobo_otherr_bridge,
            kobo_otherr_odt: kobo_otherr_odt,
            kobo_urbanr_odt: kobo_urbanr_odt,
            kobo_feederr_odt: kobo_feederr_odt,
            kobo_secondaryr_odt: kobo_secondaryr_odt,
            kobo_mainr_odt: kobo_mainr_odt,
            otherr: otherr,
            urbanr: urbanr,
            feederr: feederr,
            secondaryr: secondaryr,
            mainr: mainr,
            koboinfos_geo: koboinfos_geo,
            koboinfos_odt: koboinfos_odt,
            koboinfos_bridge: koboinfos_bridge,
            token: req.token,
            title: config.CLIENT_NAME + '-' + config.APP_NAME,
            cname: config.CLIENT_NAME,
            id: req.user_id,
            login: req.user_login,
            rol: req.rol,
            api_key: config.MAPS_API_KEY
        });
        //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

    }, function(reason) {
        console.log(reason);
        return res.status(500).send(reason);
    });

});

module.exports = router;