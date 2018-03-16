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
var valid = require(path.join(__dirname, '../../../services/inputValidation'));

var fileuploadModels = require(path.join(__dirname, '../../gis/models/fileupload'));
var Fileupload = mongoose.model('Fileupload');
var filetypeModels = require(path.join(__dirname, '../../gis/models/filetype'));
var Filetype = mongoose.model('Filetype');
var infodatatrackModels = require(path.join(__dirname, '../../gis/models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');
var costModels = require(path.join(__dirname, '../../budget/models/cost'));
var Cost = mongoose.model('Cost');

var budgetModels = require(path.join(__dirname, '../models/budget'));
var Budget = mongoose.model('Budget');

var schedulenatModels = require(path.join(__dirname, '../../schedule/models/schedulenat'));
var Schedulenat = mongoose.model('Schedulenat');
var schedulephyModels = require(path.join(__dirname, '../../schedule/models/schedulephy'));
var Schedulephy = mongoose.model('Schedulephy');

// modules
var budgetModule = require(path.join(__dirname, '../modules/budget_module'));

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
router.get('/indexes/:level', function (req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/budget/V1/get_budget_files/' + req.params.level,
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

            // debug(filters);

            debug(responseObject.budget);

            resp.render('indexes', {
                retValues: responseObject,
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

/* Update budgets*/
/**
 * Proceso ajax para actualizar todos los tracks, en base a su seccion, y con la formula aplicada
 * calcular el coste según los parámetros dados
 */
router.post('/update_budgets', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB update_budgets PAV_SECTION: ' + req.body.pavSection + '\n\n\n');

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/budget/V1/update_budgets/',
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
            // resp.redirect('/auth/WEB/budget/costs');
            resp.status(200).jsonp(responseObject);

        });
        request.on('error', function (err) {
            console.error('problem with request: ${err.message}');
        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
/*******************************************************
 AJAX REST CALLS
 **********************************************************/
/* Update field*/

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
/* Update field budget*/

router.post('/update_field_budget/:field/:value', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB update_field_budget: ' + req.params.field + '\n\n\n');

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/budget/V1/update_field_budget/',
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
router.post('/indexes/:level', function (req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/budget/V1/get_budget_files/' + req.params.level,
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

            // debug(filters);

            //debug(responseObject.config.properties);
            responseObject.result = 'OK';
            resp.status(200).jsonp(responseObject);


        });
    });

    request.end();
    // resp.render('admin_panel_formulas', { token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

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
router.get('/V1/get_budget_files/:level', function (req, res, next) {

    var ret = {};
    var level = Number(req.params.level);
    var schnats;
    var schphys;
    var arrPromises = [];
    var levelRange = [];
    var levelRangeGraph = [];



    switch (level) {
        case 1:
            // levelRange.push({
            //     "properties.code": /20-40__A/
            // });
            // levelRange.push({
            //     "properties.code": /0-20__A/
            // });
            // levelRange.push({
            //     "properties.code": /0-20__B/
            // });
            levelRange.push({
                "properties.code": /60-80__A/
            });
            levelRange.push({
                "properties.code": /40-60__A/
            });
            levelRange.push({
                "properties.code": /20-40__B/
            });
            levelRange.push({
                "properties.code": /20-40__C/
            });
            levelRange.push({
                "properties.code": /0-20__C/
            });
            levelRange.push({
                "properties.code": /0-20__D/
            });
            levelRange.push({
                "properties.code": /80-100__A/
            });
            levelRange.push({
                "properties.code": /80-100__B/
            });
            levelRange.push({
                "properties.code": /60-80__B/
            });
            levelRange.push({
                "properties.code": /40-60__B/
            });
            levelRange.push({
                "properties.code": /60-80__C/
            });
            levelRange.push({
                "properties.code": /40-60__C/
            });
            levelRange.push({
                "properties.code": /40-60__D/
            });
            levelRange.push({
                "properties.code": /20-40__D/
            });
            levelRange.push({
                "properties.code": /20-40__E/
            });
            levelRange.push({
                "properties.code": /0-20__E/
            });
            levelRange.push({
                "properties.code": /80-100__C/
            });
            levelRange.push({
                "properties.code": /60-80__D/
            });
            levelRange.push({
                "properties.code": /40-60__E/
            });
            levelRange.push({
                "properties.code": /80-100__D/
            });
            levelRange.push({
                "properties.code": /60-80__E/
            });
            levelRange.push({
                "properties.code": /80-100__E/
            });
            /**
             * El rango para Graph
             */
            levelRangeGraph.push({
                "properties.code": /20-40__A/
            });
            levelRangeGraph.push({
                "properties.code": /0-20__A/
            });
            levelRangeGraph.push({
                "properties.code": /0-20__B/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__A/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__A/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__B/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__C/
            });
            levelRangeGraph.push({
                "properties.code": /0-20__C/
            });
            levelRangeGraph.push({
                "properties.code": /0-20__D/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__A/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__B/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__B/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__B/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__C/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__C/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__D/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__D/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__E/
            });
            levelRangeGraph.push({
                "properties.code": /0-20__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__C/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__D/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__D/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__E/
            });

            break;
        case 2:
            // levelRange.push({
            //     "properties.code": /60-80__A/
            // });
            // levelRange.push({
            //     "properties.code": /40-60__A/
            // });
            // levelRange.push({
            //     "properties.code": /20-40__B/
            // });
            // levelRange.push({
            //     "properties.code": /20-40__C/
            // });
            // levelRange.push({
            //     "properties.code": /0-20__C/
            // });
            // levelRange.push({
            //     "properties.code": /0-20__D/
            // });
            levelRange.push({
                "properties.code": /80-100__A/
            });
            levelRange.push({
                "properties.code": /80-100__B/
            });
            levelRange.push({
                "properties.code": /60-80__B/
            });
            levelRange.push({
                "properties.code": /40-60__B/
            });
            levelRange.push({
                "properties.code": /60-80__C/
            });
            levelRange.push({
                "properties.code": /40-60__C/
            });
            levelRange.push({
                "properties.code": /40-60__D/
            });
            levelRange.push({
                "properties.code": /20-40__D/
            });
            levelRange.push({
                "properties.code": /20-40__E/
            });
            levelRange.push({
                "properties.code": /0-20__E/
            });
            levelRange.push({
                "properties.code": /80-100__C/
            });
            levelRange.push({
                "properties.code": /60-80__D/
            });
            levelRange.push({
                "properties.code": /40-60__E/
            });
            levelRange.push({
                "properties.code": /80-100__D/
            });
            levelRange.push({
                "properties.code": /60-80__E/
            });
            levelRange.push({
                "properties.code": /80-100__E/
            });

            /**
             * El rango para Graph
             */
            // levelRangeGraph.push({
            //     "properties.code": /20-40__A/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /0-20__A/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /0-20__B/
            // });
            levelRangeGraph.push({
                "properties.code": /60-80__A/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__A/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__B/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__C/
            });
            levelRangeGraph.push({
                "properties.code": /0-20__C/
            });
            levelRangeGraph.push({
                "properties.code": /0-20__D/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__A/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__B/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__B/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__B/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__C/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__C/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__D/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__D/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__E/
            });
            levelRangeGraph.push({
                "properties.code": /0-20__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__C/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__D/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__D/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__E/
            });
            break;
        case 3:
            // levelRange.push({
            //     "properties.code": /80-100__A/
            // });
            // levelRange.push({
            //     "properties.code": /80-100__B/
            // });
            // levelRange.push({
            //     "properties.code": /60-80__B/
            // });
            // levelRange.push({
            //     "properties.code": /40-60__B/
            // });
            // levelRange.push({
            //     "properties.code": /60-80__C/
            // });
            // levelRange.push({
            //     "properties.code": /40-60__C/
            // });
            // levelRange.push({
            //     "properties.code": /40-60__D/
            // });
            // levelRange.push({
            //     "properties.code": /20-40__D/
            // });
            // levelRange.push({
            //     "properties.code": /20-40__E/
            // });
            // levelRange.push({
            //     "properties.code": /0-20__E/
            // });
            levelRange.push({
                "properties.code": /80-100__C/
            });
            levelRange.push({
                "properties.code": /60-80__D/
            });
            levelRange.push({
                "properties.code": /40-60__E/
            });
            levelRange.push({
                "properties.code": /80-100__D/
            });
            levelRange.push({
                "properties.code": /60-80__E/
            });
            levelRange.push({
                "properties.code": /80-100__E/
            });
            /**
             * El rango para Graph
             */
            // levelRangeGraph.push({
            //     "properties.code": /60-80__A/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /40-60__A/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /20-40__B/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /20-40__C/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /0-20__C/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /0-20__D/
            // });
            levelRangeGraph.push({
                "properties.code": /80-100__A/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__B/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__B/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__B/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__C/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__C/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__D/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__D/
            });
            levelRangeGraph.push({
                "properties.code": /20-40__E/
            });
            levelRangeGraph.push({
                "properties.code": /0-20__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__C/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__D/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__D/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__E/
            });

            break;
        case 4:
            // levelRange.push({
            //     "properties.code": /80-100__C/
            // });
            // levelRange.push({
            //     "properties.code": /60-80__D/
            // });
            // levelRange.push({
            //     "properties.code": /40-60__E/
            // });
            levelRange.push({
                "properties.code": /80-100__D/
            });
            levelRange.push({
                "properties.code": /60-80__E/
            });
            levelRange.push({
                "properties.code": /80-100__E/
            });
            /**
             * El rango para Graph
             */
            // levelRangeGraph.push({
            //     "properties.code": /80-100__A/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /80-100__B/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /60-80__B/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /40-60__B/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /60-80__C/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /40-60__C/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /40-60__D/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /20-40__D/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /20-40__E/
            // });
            // levelRangeGraph.push({
            //     "properties.code": /0-20__E/
            // });
            levelRangeGraph.push({
                "properties.code": /80-100__C/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__D/
            });
            levelRangeGraph.push({
                "properties.code": /40-60__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__D/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__E/
            });
            break;
        case 5:
            levelRange.push({
                "properties.code": /NOTHING/
            });
            /**
             * El rango para Graph
             */
            levelRangeGraph.push({
                "properties.code": /80-100__D/
            });
            levelRangeGraph.push({
                "properties.code": /60-80__E/
            });
            levelRangeGraph.push({
                "properties.code": /80-100__E/
            });
            break;
        default:
            break;
    }

    // debug(levelRange);
    arrPromises.push(Schedulenat.find({

        $or: levelRange

    }).exec(function (err, scheds) {
        if (err) {
            res.send(500, err.message);
        }
        return scheds;
    }));
    arrPromises.push(Schedulephy.find({

        $or: levelRange
    }).exec(function (err, scheds) {
        if (err) {
            res.send(500, err.message);
        }
        return scheds;
    }));
    /**
     * Lista de valores precargados de Budgets
     */
    arrPromises.push(Budget.find().exec(function (err, budgets) {
        if (err) {
            res.send(500, err.message);
        }
        return budgets;
    }));



    /**
     * El rango para Graph
     */
    arrPromises.push(Schedulenat.find({

        $or: levelRangeGraph

    }).exec(function (err, scheds) {
        if (err) {
            res.send(500, err.message);
        }
        return scheds;
    }));
    arrPromises.push(Schedulephy.find({

        $or: levelRangeGraph
    }).exec(function (err, scheds) {
        if (err) {
            res.send(500, err.message);
        }
        return scheds;
    }));

    Promise.all(arrPromises).then(function (values) {
        schnats = values[0];
        schphys = values[1];
        budgets = values[2];
        schnatsGraph = values[3];
        schphysGraph = values[4];
        debug('Nat length ' + schnats.length);
        debug('Phy length ' + schphys.length);
        debug('Budgets length ' + budgets.length);
        debug('NatGraph length ' + schnatsGraph.length);
        debug('PhyGraph length ' + schphysGraph.length);

        ret = budgetModule.schedInterv(ret, schnats, schphys);
        ret = budgetModule.schedIntervGraph(ret, schnatsGraph, schphysGraph);
        ret['budget'] = budgets.length > 0 ? budgets[0] : undefined;

        debug(ret);
        res.status(200).jsonp(ret);

    }).catch(function (reason) {
        console.log(reason);
        return res.status(500).send(reason);

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
    //arrField[0] = arrField[0].replace('_', ' ');
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
/* POST update_field_budget */
router.post('/V1/update_field_budget/', function (req, res, next) {
    debug('API /V1/update_field_budget/');
    var postData = extend({}, req.body);
    var ret = {
        "result": "OK"
    };
    debug(postData);
    var value = postData[Object.keys(postData)[0]];
    var field_name = Object.keys(postData)[0];
    debug(field_name + ": " + value);
    var sendData = {};

    Budget.findOne({}).exec(function (err, c) {
        if (err) {
            res.send(500, err.message);
        }

        var bsave = new Budget(c);
        
        bsave[field_name] = value;

        
        // debug(c);
        bsave.updated_at = new Date();
        bsave.save(function (err, bsaved) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(ret);

        });
    });


});
/* POST update_budgets/ */
router.post('/V1/update_budgets/', function (req, res, next) {
    debug('API /V1/update_budgets/');
    var postData = extend({}, req.body);
    var ret = {
        "result": "OK"
    };
    debug(postData);
    // Caso de Pavements


    Cost.findOne({}).exec(function (err, c) {
        if (err) {
            res.send(500, err.message);
        }
        // debug(c);
        Infodatatrack.find({}, {
            "properties.rcondition": 1,
            "properties.rmaterial": 1,
            "properties.rinvestmentrequired": 1,
            "properties.rwidth": 1,
            "properties.bcondition": 1,
            "properties.bcode": 1,
            "properties.binvestmentrequired": 1,
            "properties.bwidth": 1,
            "properties.blenght": 1,
            "properties.btype": 1,
            "properties.Ccondition": 1,
            "properties.Ccode": 1,
            "properties.Cinvestmentrequired": 1,
            "properties.Cwidth": 1,
            "properties.Clength": 1,
            "properties.Cdiameter": 1,
            "properties.Cmaterial": 1,
            "properties.gmaterial": 1,
            "properties.gcode": 1,
            "properties.gtype": 1,
            "properties.gcondition": 1,
            "properties.gheight": 1,
            "properties.glength": 1,
            "properties.gnature": 1,
            "properties.rginvestmentrequired": 1,
            "properties.gmaterial2": 1,
            "properties.gcode2": 1,
            "properties.gtype2": 1,
            "properties.gcondition2": 1,
            "properties.gheight2": 1,
            "properties.glength2": 1,
            "properties.gnature2": 1,
            "properties.rginvestmentrequired2": 1,
            "geometry.coordinates": 1
        }).exec(async function (err, ifdts) {
            if (err) {
                res.send(500, err.message);
            }
            for (var ifdt of ifdts) {
                //debug(ifdt);
                // debug(ifdt.properties.rcondition);
                // debug(ifdt.properties.rcondition.length);
                // debug(ifdt.properties.rmaterial);
                // debug(ifdt.properties.rmaterial.length);
                var existsbcode = false;
                var existsCcode = false;
                var existsgcode = false;
                var existsgcode2 = false;
                var rcosts = [];
                var bcosts = [];
                var Ccosts = [];
                var gcosts = [];
                var gcosts2 = [];
                rcosts[0] = 0;
                bcosts[0] = 0;
                Ccosts[0] = 0;
                gcosts[0] = 0;
                gcosts2[0] = 0;
                for (var i = 1; i < ifdt.geometry.coordinates.length; i++) {
                    var rcost = 0;
                    var bcost = 0;
                    var Ccost = 0;
                    var gcost = 0;
                    var gcost2 = 0;
                    /**
                     *  Revisamos que exista el código del asset
                     * */
                    if (ifdt.properties.bcode !== undefined && ifdt.properties.bcode !== [] && ifdt.properties.bcode.length > 0 &&
                        ifdt.properties.bcode[i] !== undefined && ifdt.properties.bcode[i] !== null && ifdt.properties.bcode[i] !== "") {
                        existsbcode = true;
                    }
                    if (ifdt.properties.Ccode !== undefined && ifdt.properties.Ccode !== [] && ifdt.properties.Ccode.length > 0 &&
                        ifdt.properties.Ccode[i] !== undefined && ifdt.properties.Ccode[i] !== null && ifdt.properties.Ccode[i] !== "") {
                        existsCcode = true;
                    }
                    if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode !== [] && ifdt.properties.gcode.length > 0 &&
                        ifdt.properties.gcode[i] !== undefined && ifdt.properties.gcode[i] !== null && ifdt.properties.gcode[i] !== "") {
                        existsgcode = true;
                    }
                    if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2 !== [] && ifdt.properties.gcode2.length > 0 &&
                        ifdt.properties.gcode2[i] !== undefined && ifdt.properties.gcode2[i] !== null && ifdt.properties.gcode2[i] !== "") {
                        existsgcode2 = true;
                    }
                    if (existsbcode) {


                        // debug('BRIDGES');
                        if (ifdt.properties.bcondition !== undefined && ifdt.properties.bcondition.length > 0 && ifdt.properties.bcondition[i] !== '' &&
                            ifdt.properties.bwidth !== undefined && ifdt.properties.bwidth.length > 0 && ifdt.properties.bwidth[i] !== '' &&
                            ifdt.properties.btype !== undefined && ifdt.properties.btype.length > 0 && ifdt.properties.btype[i] !== '') {
                            var indexmat = c.Bridges.material.indexOf(ifdt.properties.btype[i]);
                            // debug(ifdt.properties.btype[i] + ' ' + indexmat);
                            if (indexmat >= 0) {
                                switch (formulasService.ConditionRating(ifdt.properties.bcondition[i])) {
                                    case 'E':
                                        bcost = c.Bridges.value1[indexmat];
                                        break;
                                    case 'D':
                                        bcost = c.Bridges.value2[indexmat];
                                        break;
                                    case 'C':
                                        bcost = c.Bridges.value3[indexmat];
                                        break;
                                    case 'B':
                                        bcost = c.Bridges.value4[indexmat];
                                        break;

                                    default:
                                        break;
                                }
                            } else {
                                bcost = 0;
                            }
                            bcosts[i] = formulasService.BridgesCost(ifdt.properties.blenght[i], bcost, ifdt.properties.bwidth[i]);
                        } else {
                            bcosts[i] = "";
                        }
                    }
                    if (existsCcode) {
                        // debug('CULVERT');
                        if (ifdt.properties.Ccondition !== undefined && ifdt.properties.Ccondition.length > 0 && ifdt.properties.Ccondition[i] !== '' &&
                            ifdt.properties.Cmaterial !== undefined && ifdt.properties.Cmaterial.length > 0 && ifdt.properties.Cmaterial[i] !== '' &&
                            ifdt.properties.Cdiameter !== undefined && ifdt.properties.Cdiameter.length > 0 && ifdt.properties.Cdiameter[i] !== '' &&
                            ifdt.properties.Clength !== undefined && ifdt.properties.Clength.length > 0 && ifdt.properties.Clength[i] !== ''
                        ) {
                            var indexmat = services.getAllIndexes(c.Culverts.material, ifdt.properties.Cmaterial[i]);
                            // debug(ifdt.properties.Cmaterial[i]);
                            // debug(indexmat);

                            if (services.getCulvertDiameterIndex(ifdt.properties.Cdiameter[i]) > 0) {
                                switch (formulasService.ConditionRating(ifdt.properties.Ccondition[i])) {
                                    case 'E':
                                        Ccost = c.Culverts.value1[indexmat[services.getCulvertDiameterIndex(ifdt.properties.Cdiameter[i])]];
                                        break;
                                    case 'D':
                                        Ccost = c.Culverts.value2[indexmat[services.getCulvertDiameterIndex(ifdt.properties.Cdiameter[i])]];
                                        break;
                                    case 'C':
                                        Ccost = c.Culverts.value3[indexmat[services.getCulvertDiameterIndex(ifdt.properties.Cdiameter[i])]];
                                        break;
                                    case 'B':
                                        Ccost = c.Culverts.value4[indexmat[services.getCulvertDiameterIndex(ifdt.properties.Cdiameter[i])]];
                                        break;

                                    default:
                                        break;
                                }
                                // debug("Cdiameter: " + ifdt.properties.Cdiameter[i]);
                                // debug("Ccondition: " + formulasService.ConditionRating(ifdt.properties.Ccondition[i]));
                                // debug("indexmat: " + indexmat[services.getCulvertDiameterIndex(ifdt.properties.Cdiameter[i])]);
                                // debug(c.Culverts.material[indexmat[services.getCulvertDiameterIndex(ifdt.properties.Cdiameter[i])]] + " Cost: " + Ccost + "\n");
                                Ccosts[i] = formulasService.CulvertsCost(ifdt.properties.Clength[i], Ccost);

                            }




                        } else {
                            Ccosts[i] = "";
                        }
                    }
                    if (existsgcode) {
                        if (ifdt.properties.gcondition !== undefined && ifdt.properties.gcondition.length > 0 && ifdt.properties.gcondition[i] !== '' &&
                            ifdt.properties.gheight !== undefined && ifdt.properties.gheight.length > 0 && ifdt.properties.gheight[i] !== '' &&
                            ifdt.properties.glength !== undefined && ifdt.properties.glength.length > 0 && ifdt.properties.glength[i] !== undefined && ifdt.properties.glength[i] !== '' &&
                            ifdt.properties.gtype !== undefined && ifdt.properties.gtype.length > 0 && ifdt.properties.gtype[i] !== '') {

                            if (ifdt.properties.gnature !== undefined && ifdt.properties.gnature.length > 0 && ifdt.properties.gnature[i] !== '' &&
                                (ifdt.properties.gtype[i] === "Cutting" || ifdt.properties.gtype[i] === "Embankment") &&
                                parseFloat(ifdt.properties.gheight[i]) >= 3) {

                                var indexmat = c.Cuttings_Embankments.material.indexOf(ifdt.properties.gnature[i]);

                                if (indexmat >= 0) {
                                    switch (formulasService.ConditionRating(ifdt.properties.gcondition[i])) {
                                        case 'E':
                                            gcost = c.Cuttings_Embankments.value1[indexmat];
                                            break;
                                        case 'D':
                                            gcost = c.Cuttings_Embankments.value2[indexmat];
                                            break;
                                        case 'C':
                                            gcost = c.Cuttings_Embankments.value3[indexmat];
                                            break;
                                        case 'B':
                                            gcost = c.Cuttings_Embankments.value4[indexmat];
                                            break;

                                        default:
                                            break;
                                    }
                                } else {
                                    gcost = 0;
                                }

                                gcosts[i] = formulasService.GeotCost(ifdt.properties.glength[i], gcost, ifdt.properties.gheight[i]);
                                // debug('CuttingEmbankment ' + ifdt.properties.gheight[i] + ' ' + ifdt.properties.glength[i] + ' ' + gcosts[i]);
                            } else if (ifdt.properties.gmaterial !== undefined && ifdt.properties.gmaterial.length > 0 && ifdt.properties.gmaterial[i] !== '' &&
                                ifdt.properties.gtype[i] === "Retaining_walls" && parseFloat(ifdt.properties.gheight[i]) >= 1) {
                                var indexmat = c.Retaining_walls.material.indexOf(ifdt.properties.gmaterial[i]);

                                if (indexmat >= 0) {
                                    switch (formulasService.ConditionRating(ifdt.properties.gcondition[i])) {
                                        case 'E':
                                            gcost = c.Retaining_walls.value1[indexmat];
                                            break;
                                        case 'D':
                                            gcost = c.Retaining_walls.value2[indexmat];
                                            break;
                                        case 'C':
                                            gcost = c.Retaining_walls.value3[indexmat];
                                            break;
                                        case 'B':
                                            gcost = c.Retaining_walls.value4[indexmat];
                                            break;

                                        default:
                                            break;
                                    }
                                } else {
                                    gcost = 0;
                                }

                                gcosts[i] = formulasService.GeotCost(ifdt.properties.glength[i], gcost, ifdt.properties.gheight[i]);
                                // debug('Retaining_walls ' + ifdt.properties.gheight[i] + ' ' + ifdt.properties.glength[i] + ' ' + gcosts[i]);

                            }

                        } else {
                            gcosts[i] = "";
                        }
                    }
                    if (existsgcode2) {

                        if (ifdt.properties.gcondition2 !== undefined && ifdt.properties.gcondition2.length > 0 && ifdt.properties.gcondition2[i] !== '' &&
                            ifdt.properties.gheight2 !== undefined && ifdt.properties.gheight2.length > 0 && ifdt.properties.gheight2[i] !== '' &&
                            ifdt.properties.glength2 !== undefined && ifdt.properties.glength2.length > 0 && ifdt.properties.glength2[i] !== undefined && ifdt.properties.glength2[i] !== '' &&
                            ifdt.properties.gtype2 !== undefined && ifdt.properties.gtype2.length > 0 && ifdt.properties.gtype2[i] !== '') {

                            if (ifdt.properties.gnature2 !== undefined && ifdt.properties.gnature2.length > 0 && ifdt.properties.gnature2[i] !== '' &&
                                (ifdt.properties.gtype2[i] === "Cutting" || ifdt.properties.gtype2[i] === "Embankment") &&
                                parseFloat(ifdt.properties.gheight2[i]) >= 3) {

                                var indexmat = c.Cuttings_Embankments.material.indexOf(ifdt.properties.gnature2[i]);

                                if (indexmat >= 0) {
                                    switch (formulasService.ConditionRating(ifdt.properties.gcondition2[i])) {
                                        case 'E':
                                            gcost2 = c.Cuttings_Embankments.value1[indexmat];
                                            break;
                                        case 'D':
                                            gcost2 = c.Cuttings_Embankments.value2[indexmat];
                                            break;
                                        case 'C':
                                            gcost2 = c.Cuttings_Embankments.value3[indexmat];
                                            break;
                                        case 'B':
                                            gcost2 = c.Cuttings_Embankments.value4[indexmat];
                                            break;

                                        default:
                                            break;
                                    }
                                } else {
                                    gcost2 = 0;
                                }

                                gcosts2[i] = formulasService.GeotCost(ifdt.properties.glength2[i], gcost2, ifdt.properties.gheight2[i]);
                                // debug('CuttingEmbankment ' + ifdt.properties.gheight2[i] + ' ' + ifdt.properties.glength2[i] + ' ' + gcosts2[i]);
                            } else if (ifdt.properties.gmaterial !== undefined && ifdt.properties.gmaterial.length > 0 && ifdt.properties.gmaterial[i] !== '' &&
                                ifdt.properties.gtype2[i] === "Retaining_walls" && parseFloat(ifdt.properties.gheight2[i]) >= 1) {
                                var indexmat = c.Retaining_walls.material.indexOf(ifdt.properties.gmaterial[i]);

                                if (indexmat >= 0) {
                                    switch (formulasService.ConditionRating(ifdt.properties.gcondition2[i])) {
                                        case 'E':
                                            gcost2 = c.Retaining_walls.value1[indexmat];
                                            break;
                                        case 'D':
                                            gcost2 = c.Retaining_walls.value2[indexmat];
                                            break;
                                        case 'C':
                                            gcost2 = c.Retaining_walls.value3[indexmat];
                                            break;
                                        case 'B':
                                            gcost2 = c.Retaining_walls.value4[indexmat];
                                            break;

                                        default:
                                            break;
                                    }
                                } else {
                                    gcost2 = 0;
                                }

                                gcosts2[i] = formulasService.GeotCost(ifdt.properties.glength2[i], gcost2, ifdt.properties.gheight2[i]);
                                // debug('Retaining_walls ' + ifdt.properties.gheight2[i] + ' ' + ifdt.properties.glength2[i] + ' ' + gcosts2[i]);

                            }

                        } else {
                            gcosts2[i] = "";
                        }

                    }


                    if (ifdt.properties.rcondition !== undefined && ifdt.properties.rcondition.length > 0 &&
                        ifdt.properties.rmaterial !== undefined && ifdt.properties.rmaterial.length > 0 &&
                        ifdt.properties.rmaterial[i] !== '') {
                        // if (c.Pavements.material.indexOf(ifdt.properties.rmaterial[i]) < 0)
                        var indexmat = c.Pavements.material.indexOf(ifdt.properties.rmaterial[i]);
                        // debug(ifdt.properties.rmaterial[i]);
                        // debug(indexmat);
                        // debug(formulasService.ConditionRating(ifdt.properties.rcondition[i]));
                        switch (formulasService.ConditionRating(ifdt.properties.rcondition[i])) {
                            case 'E':
                                rcost = c.Pavements.value1[indexmat];
                                break;
                            case 'D':
                                rcost = c.Pavements.value2[indexmat];
                                break;
                            case 'C':
                                rcost = c.Pavements.value3[indexmat];
                                break;
                            case 'B':
                                rcost = c.Pavements.value4[indexmat];
                                break;

                            default:
                                break;
                        }
                        // debug(ifdt._id + ' Index of costs: ' + ifdt.properties.rcondition[i] + ' ' + ifdt.properties.rmaterial[i]);
                        // debug(formulasService.PavementCost(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i], rcost));
                        // debug(ifdt._id);
                        // debug(ifdt.properties.rwidth[i]);
                        rcosts[i] = formulasService.PavementCost(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i], rcost, ifdt.properties.rwidth[i]);
                    }

                }
                var conditions = {
                    _id: ifdt._id
                };
                var query = {
                    $set: {
                        "properties.rinvestmentrequired": rcosts,
                        "properties.binvestmentrequired": bcosts,
                        "properties.Cinvestmentrequired": Ccosts,
                        "properties.rginvestmentrequired": gcosts,
                        "properties.rginvestmentrequired2": gcosts2
                    }
                };
                await Infodatatrack.update(conditions, query, function (err, iup) {
                    if (err) {
                        debug(err.message);
                    }
                    // debug(iup);
                });
            }
            res.status(200).jsonp(ret);

        });

    });


});





module.exports = router;