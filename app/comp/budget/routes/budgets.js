//DEBUG
var debug = require('debug')('debug');

var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var config = require(path.join(__dirname, '../../../../config/config'));
var bodyParser = require('body-parser');
var extend = require('util')._extend;
var multer = require('multer');
var formulasService = require(path.join(__dirname, '../../../services/formulas'));
var services = require(path.join(__dirname, '../../../services/services'));

var fileuploadModels = require(path.join(__dirname, '../../gis/models/fileupload'));
var Fileupload = mongoose.model('Fileupload');
var filetypeModels = require(path.join(__dirname, '../../gis/models/filetype'));
var Filetype = mongoose.model('Filetype');
var infodatatrackModels = require(path.join(__dirname, '../../gis/models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');
var costlibraryModels = require(path.join(__dirname, '../../budget/models/costlibrary'));
var Costlibrary = mongoose.model('Costlibrary');


router.use(function timeLog(req, res, next) {
    ////// debug('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
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
/* GET Control panel */
router.get('/indexes', function (req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/budget/V1/get_one_config/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    // // Peticiones 


    var request = http.request(options, function (res) {
        ////// debug('STATUS: ' + res.statusCode);
        ////// debug('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            ////// debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// debug('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);

            var filters = Infodatatrack.schema.tree.properties;
            var filtersOff = ['time', 'name', 'proccessed', 'kobo', 'koboedit', 'video_roads', 'surveyor', 'datesurvey', 'coordTimes'];
            debug(filters);
            for (var foff of filtersOff) {
                delete filters[foff];
            };

            //debug(responseObject.config.properties);

            resp.render('indexes', {
                filters: filters,
                config: responseObject.config.properties,
                token: req.token,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME,
                api_key: config.MAPS_API_KEY
            });

        });
    });

    request.end();
    // resp.render('admin_panel_formulas', { token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

});
/* GET Costs Library */
router.get('/costs', function (req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/budget/V1/get_one_config/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    // // Peticiones 


    var request = http.request(options, function (res) {
        ////// debug('STATUS: ' + res.statusCode);
        ////// debug('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            ////// debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// debug('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);

            var filters = Infodatatrack.schema.tree.properties;
            var filtersOff = ['time', 'name', 'proccessed', 'kobo', 'koboedit', 'video_roads', 'surveyor', 'datesurvey', 'coordTimes'];
            debug(filters);
            for (var foff of filtersOff) {
                delete filters[foff];
            };

            //debug(responseObject.config.properties);

            resp.render('costs_library', {
                filters: filters,
                config: responseObject.config.properties,
                token: req.token,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME,
                api_key: config.MAPS_API_KEY
            });

        });
    });

    request.end();
    // resp.render('admin_panel_formulas', { token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

});

/* get_filter_values */
/**
 * Proceso AJAX que recibe la peticion de mostrar todos los valores de los filtros seleccionados
 */
router.post('/get_filter_values/:filter', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB get_filter_values ' + JSON.stringify(postData));

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/budget/V1/get_filter_values/' + req.params.filter,
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
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();
    // resp.status(200).jsonp({});

});
/* paint_results */
/**
 * Proceso AJAX que recibe la peticion de mostrar todos los resultados
 */
router.post('/paint_results', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB paint_results ' + JSON.stringify(postData));

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/budget/V1/paint_results/',
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
            // debug('\n\nLLEGO AQUI\n\n');
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

            // resp.render('querys_results', { results: responseObject, token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });


        });
    });
    request.on('error', function (err) {
        debug('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();

});



/*******************************************************
 API REST CALLS
 **********************************************************/



/* GET JSON ifdts config. */
router.get('/V1/get_one_config/', function (req, res, next) {
    Infodatatrack.findOne({}, {
        config: 1
    }).exec(function (err, ifdt) {
        if (err) {
            res.send(500, err.message);
        }
        //debug(" ### GET Querys ### \n" + JSON.stringify(ifdts));

        res.status(200).jsonp(ifdt);
    });

});
/* GET JSON formulas listing. */
router.get('/V1/consultas/', function (req, res, next) {
    Infodatatrack.find().exec(function (err, ifdts) {
        if (err) {
            res.send(500, err.message);
        }
        //debug(" ### GET Querys ### \n" + JSON.stringify(ifdts));

        res.status(200).jsonp(ifdts);
    });

});
/* POST get_formulas_tracks */
router.post('/V1/get_filter_values/:filter', function (req, res, next) {
    // debug('API /V1/update_field/');
    var postData = extend({}, req.body);
    debug(postData);
    var ret = {
        "result": "OK"
    };
    Infodatatrack.distinct("properties." + req.params.filter).exec(function (err, filters) {
        if (err) {
            ret.result = 'ERROR';
            ret.errormessage = err.message;
            res.send(500, ret);
        }
        //debug(" ### GET Querys ### \n" + JSON.stringify(ifdts));
        ret.filters = filters;
        debug(filters);
        //res.status(200).jsonp(ifdts);
        res.status(200).jsonp(ret);
    });



});

/* POST paint_results */
router.post('/V1/paint_results/', function (req, res, next) {
    // debug('API /V1/update_field/');
    var postData = extend({}, req.body);
    debug(postData);
    var ret = {
        "result": "OK"
    };
    var select = {
        "geometry.coordinates": 1
    };
    var select2 = {};
    var whereArr = [];

    for (var c of postData.columns) {
        select["properties." + c] = 1;
    };

    var inval = {};
    var where = {};
    var inArr = [];
    // WHERE
    for (var [k, v] of Object.keys(postData).entries()) {
        // debug(k + ' ' + v);
        if (v !== 'columns') {

            inval = {
                $in: postData[v]
            };
            where["properties." + v] = inval;
            whereArr.push(where);
            inArr[v] = postData[v];
            select2["properties." + v] = 1;

        }
    };
    debug(select);
    debug('#### WHERE ####');
    debug(JSON.stringify(whereArr));
    Infodatatrack.find({
        $and: whereArr
    }, services.mergeDeep(select, select2)).exec(function (err, data) {
        if (err) {
            ret.result = 'ERROR';
            ret.errormessage = err.message;
            res.send(500, ret);
        }
        //debug(" ### GET Querys ### \n" + JSON.stringify(ifdts));
        //ret.data = data;
        /*
         Hay que dividir cada resultado del objeto comprobando que el valor devuelto solo es válido en TODAS las columnas, o en todos los arays
        */
        // debug(data);
        // debug(JSON.stringify(data));
        // Hay que comprobar que existen valores para devolver, en otro caso debo mandar error
        if (data.length == 0) {
            ret.result = 'ERROR';
            ret.errormessage = 'Not results find.\nTry again.';
            res.send(500, ret);

        } else {

            ret.data = [];
            debug('### in arr ###');
            debug(inArr);
            for (var coll = 0; coll < data.length; coll++) {

                var point = {
                    geometry: {
                        coordinates: []
                    },
                    properties: {}
                };
                for (var i = 0; i < data[coll].geometry.coordinates.length; i++) {
                    var recordVal = true;
                    for (var ia of Object.keys(inArr)) {
                        // debug(ia + ' ' + inArr[ia]);
                        // debug(data[coll].properties[ia]);
                        if (!inArr[ia].includes(data[coll].properties[ia][i])) {
                            recordVal = false;
                        } else {
                            if (point["properties"][ia] === undefined) {
                                point["properties"][ia] = [];
                                point["properties"][ia].push(data[coll].properties[ia][i]);
                            } else {
                                point["properties"][ia].push(data[coll].properties[ia][i]);
                            }
                            // debug(data[coll].properties[ia][i]);
                        }
                    }
                    if (recordVal) {
                        point.geometry["coordinates"].push(data[coll].geometry.coordinates[i]);
                        for (var sv of Object.keys(select)) {
                            if (sv.indexOf("geometry.coordinates") < 0) {
                                //me quedo solo con los valores de la select que no tengo, y primero quito coordinates
                                var isinselect = false;
                                for (var ia of Object.keys(inArr)) {
                                    // debug('SV -->' + sv);
                                    // debug('IA -->' + ia);
                                    if (sv.indexOf(ia) >= 0) {
                                        // debug('SV isIN -->' + sv);
                                        isinselect = true;
                                    }
                                }

                                if (!isinselect) {
                                    // debug(data[coll].properties[sv.replace('properties.', '')]);
                                    if (point["properties"][sv.replace('properties.', '')] === undefined) {
                                        point["properties"][sv.replace('properties.', '')] = [];
                                        point["properties"][sv.replace('properties.', '')].push(data[coll].properties[sv.replace('properties.', '')][i]);
                                    } else {
                                        point["properties"][sv.replace('properties.', '')].push(data[coll].properties[sv.replace('properties.', '')][i]);
                                    }
                                }
                            }
                        }
                    }
                }
                ret.data.push(point);
                debug('point --> ' + JSON.stringify(point));
                debug('point --> ' + point);
            }

            debug(ret.data);
            //res.status(200).jsonp(ifdts);
            res.status(200).jsonp(ret);
        }
    });



});


module.exports = router;