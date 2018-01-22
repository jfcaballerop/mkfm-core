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
var costModels = require(path.join(__dirname, '../../budget/models/cost'));
var Cost = mongoose.model('Cost');


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
        path: config.PATH_API + '/budget/V1/get_costlibrary/',
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

            //debug(responseObject.config.properties);

            resp.render('costs_library', {
                costlibrary: responseObject[0],
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
/* Update field*/
/**
 * Proceso AJAX que recibe la peticion de actualizar un campo de una formula en modo arbol con 3 niveles
 */
router.post('/update_field/:field/:value', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB update_field: ' + req.params.field + '\n\n\n');

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/budget/V1/update_field/',
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




/*******************************************************
 API REST CALLS
 **********************************************************/



/* GET JSON ifdts config. */
router.get('/V1/get_costlibrary/', function (req, res, next) {
    Cost.find({}).exec(function (err, cl) {
        if (err) {
            res.send(500, err.message);
        }
        debug(" ### GET get_costlibrary ### \n" + JSON.stringify(cl));

        res.status(200).jsonp(cl);
    });

});
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
/* POST update_field */
router.post('/V1/update_field/', function (req, res, next) {
    debug('API /V1/update_field/');
    var postData = extend({}, req.body);
    var ret = {
        "result": "OK"
    };
    debug(postData);
    var value = postData[Object.keys(postData)[0]];
    var field_name = Object.keys(postData)[0];
    debug(field_name + ": " + value);
    var sendData = {};
    var arrField = field_name.split('__');
    arrField[0] = arrField[0].replace('_', ' ');
    debug(arrField);

    Cost.findOne({}).exec(function (err, c) {
        if (err) {
            res.send(500, err.message);
        }

        var csave = new Cost(c);
        for (var i = 0; i < csave[arrField[0]].code.length; i++) {
            if (csave[arrField[0]].code[i] === arrField[1]) {
                csave[arrField[0]][arrField[2]][i] = value;

            }
        }
        // debug(c);
        csave.updated_at = new Date();
        csave.save(function (err, csaved) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(ret);

        });
    });


});


module.exports = router;