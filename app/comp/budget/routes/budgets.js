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
        path: config.PATH_API + '/budget/V1/get_budget_files/',
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
router.get('/V1/get_budget_files/', function (req, res, next) {
    var properties = {
        "geometry.coordinates": 1,
        "properties.rcondition": 1,
        "properties.rcategory": 1,
        "properties.rinvestmentrequired": 1,
        "properties.rrisk": 1,
        "properties.rriskphysical": 1,
        "properties.rrisknatural": 1,
        "properties.binvestmentrequired": 1,
        "properties.brisk": 1,
        "properties.briskphysical": 1,
        "properties.brisknatural": 1,
        "properties.bcode": 1,
        "properties.Cinvestmentrequired": 1,
        "properties.CRISK": 1,
        "properties.CRISKphysical": 1,
        "properties.CRISKnatural": 1,
        "properties.Ccode": 1
    };
    var ret = {};
    ret['Total_investment'] = 0;
    ret['Total_investment_risknat1'] = 0;
    ret['Total_investment_risknat2'] = 0;
    ret['Total_investment_risknat3'] = 0;
    ret['Total_investment_risknat4'] = 0;
    ret['Total_investment_risknat5'] = 0;
    ret['Total_investment_brisknat1'] = 0;
    ret['Total_investment_brisknat2'] = 0;
    ret['Total_investment_brisknat3'] = 0;
    ret['Total_investment_brisknat4'] = 0;
    ret['Total_investment_brisknat5'] = 0;
    ret['Total_investment_crisknat1'] = 0;
    ret['Total_investment_crisknat2'] = 0;
    ret['Total_investment_crisknat3'] = 0;
    ret['Total_investment_crisknat4'] = 0;
    ret['Total_investment_crisknat5'] = 0;
    ret['Total_km_risknat1'] = 0;
    ret['Total_km_risknat2'] = 0;
    ret['Total_km_risknat3'] = 0;
    ret['Total_km_risknat4'] = 0;
    ret['Total_km_risknat5'] = 0;
    ret['Total_km_riskphy1'] = 0;
    ret['Total_km_riskphy2'] = 0;
    ret['Total_km_riskphy3'] = 0;
    ret['Total_km_riskphy4'] = 0;
    ret['Total_km_riskphy5'] = 0;
    ret['Total_num_brisknat1'] = 0;
    ret['Total_num_brisknat2'] = 0;
    ret['Total_num_brisknat3'] = 0;
    ret['Total_num_brisknat4'] = 0;
    ret['Total_num_brisknat5'] = 0;
    ret['Total_num_crisknat1'] = 0;
    ret['Total_num_crisknat2'] = 0;
    ret['Total_num_crisknat3'] = 0;
    ret['Total_num_crisknat4'] = 0;
    ret['Total_num_crisknat5'] = 0;
    ret['Total_km_briskphy1'] = 0;
    ret['Total_km_briskphy2'] = 0;
    ret['Total_km_briskphy3'] = 0;
    ret['Total_km_briskphy4'] = 0;
    ret['Total_km_briskphy5'] = 0;
    ret['Total_interventions'] = 0;
    ret['Total_roads_interventions'] = 0;
    ret['Total_bridges_interventions'] = 0;
    ret['Total_culverts_interventions'] = 0;
    ret['Total_investment_Urban'] = 0;
    ret['Total_investment_MainRoad'] = 0;
    ret['Total_investment_Feeder'] = 0;
    ret['Total_investment_Secondary'] = 0;

    Infodatatrack.find({}, properties).exec(function (err, ifdts) {
        if (err) {
            res.send(500, err.message);
        }
        //debug(" ### GET Querys ### \n" + JSON.stringify(ifdts));
        for (var ifdt of ifdts) {
            var newinterv = false;
            var bnewinterv = false;
            var Ccodeant = "";
            var bcodeant = "";
            // debug(ifdt._id + ':' + ifdt.properties.rinvestmentrequired);
            for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                // culverts //
                //////////////
                if (ifdt.properties.Cinvestmentrequired != undefined && ifdt.properties.Cinvestmentrequired != [] &&
                    ifdt.properties.Cinvestmentrequired[i] != null) {
                    // debug(ifdt.properties.Ccode);
                    if (ifdt.properties.Ccode != undefined && ifdt.properties.Ccode != [] &&
                        ifdt.properties.Ccode[i] != null &&
                        ifdt.properties.Ccode[i] !== Ccodeant && ifdt.properties.Ccode[i] !== "") {
                        Ccodeant = ifdt.properties.Ccode[i];
                        if (ifdt.properties.CRISKnatural != undefined && ifdt.properties.CRISKnatural != [] &&
                            ifdt.properties.CRISKnatural[i] != null) {
                            var risknathaz_lof = ifdt.properties.CRISKnatural[i].split('__')[0];
                            var risknathaz_cons = ifdt.properties.CRISKnatural[i].split('__')[1];
                            switch (formulasService.riskRatingScale(risknathaz_lof, risknathaz_cons)) {
                                case 1:
                                    ret['Total_investment_crisknat1'] += ifdt.properties.Cinvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.Cinvestmentrequired[i];

                                    ret['Total_num_crisknat1']++;
                                    ret['Total_culverts_interventions']++;
                                    ret['Total_interventions']++;


                                    break;
                                case 2:
                                    ret['Total_investment_crisknat2'] += ifdt.properties.Cinvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.Cinvestmentrequired[i];

                                    ret['Total_num_crisknat2']++;
                                    ret['Total_culverts_interventions']++;
                                    ret['Total_interventions']++;


                                    break;
                                case 3:
                                    ret['Total_investment_crisknat3'] += ifdt.properties.Cinvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.Cinvestmentrequired[i];

                                    ret['Total_num_crisknat3']++;
                                    ret['Total_culverts_interventions']++;
                                    ret['Total_interventions']++;


                                    break;
                                case 4:
                                    ret['Total_investment_crisknat4'] += ifdt.properties.Cinvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.Cinvestmentrequired[i];

                                    ret['Total_num_crisknat4']++;
                                    ret['Total_culverts_interventions']++;
                                    ret['Total_interventions']++;


                                    break;
                                case 5:
                                    ret['Total_investment_crisknat5'] += ifdt.properties.Cinvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.Cinvestmentrequired[i];

                                    ret['Total_num_crisknat5']++;
                                    ret['Total_culverts_interventions']++;
                                    ret['Total_interventions']++;

                                    break;

                                default:
                                    break;
                            }
                        }

                    }
                }
                // bridges //
                //////////////
                if (ifdt.properties.binvestmentrequired != undefined && ifdt.properties.binvestmentrequired != [] &&
                    ifdt.properties.binvestmentrequired[i] != null) {
                    // debug(ifdt.properties.bcode);
                    if (ifdt.properties.bcode != undefined && ifdt.properties.bcode != [] &&
                        ifdt.properties.bcode[i] != null &&
                        ifdt.properties.bcode[i] !== bcodeant && ifdt.properties.bcode[i] !== "") {
                        bcodeant = ifdt.properties.bcode[i];
                        if (ifdt.properties.brisknatural != undefined && ifdt.properties.brisknatural != [] &&
                            ifdt.properties.brisknatural[i] != null) {
                            var risknathaz_lof = ifdt.properties.brisknatural[i].split('__')[0];
                            var risknathaz_cons = ifdt.properties.brisknatural[i].split('__')[1];
                            switch (formulasService.riskRatingScale(risknathaz_lof, risknathaz_cons)) {
                                case 1:
                                    ret['Total_investment_brisknat1'] += ifdt.properties.binvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.binvestmentrequired[i];

                                    ret['Total_num_brisknat1']++;
                                    ret['Total_bridges_interventions']++;
                                    ret['Total_interventions']++;


                                    break;
                                case 2:
                                    ret['Total_investment_brisknat2'] += ifdt.properties.binvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.binvestmentrequired[i];

                                    ret['Total_num_brisknat2']++;
                                    ret['Total_bridges_interventions']++;
                                    ret['Total_interventions']++;


                                    break;
                                case 3:
                                    ret['Total_investment_brisknat3'] += ifdt.properties.binvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.binvestmentrequired[i];

                                    ret['Total_num_brisknat3']++;
                                    ret['Total_bridges_interventions']++;
                                    ret['Total_interventions']++;


                                    break;
                                case 4:
                                    ret['Total_investment_brisknat4'] += ifdt.properties.binvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.binvestmentrequired[i];

                                    ret['Total_num_brisknat4']++;
                                    ret['Total_bridges_interventions']++;
                                    ret['Total_interventions']++;


                                    break;
                                case 5:
                                    ret['Total_investment_brisknat5'] += ifdt.properties.binvestmentrequired[i];
                                    ret['Total_investment'] += ifdt.properties.binvestmentrequired[i];

                                    ret['Total_num_brisknat5']++;
                                    ret['Total_bridges_interventions']++;
                                    ret['Total_interventions']++;

                                    break;

                                default:
                                    break;
                            }
                        }

                    }
                }
                // pavements //
                //////////////
                if (ifdt.properties.rinvestmentrequired != undefined && ifdt.properties.rinvestmentrequired != [] && ifdt.properties.rinvestmentrequired[i] != null) {
                    if (!newinterv) {
                        newinterv = true;
                        ret['Total_interventions']++;
                        ret['Total_roads_interventions']++;
                    }
                    /*
                    Recojo los valores de RISK y los agrupo
                    */
                    // TODO: Revisar los valores totales respecto a los parciales y sumarlos.

                    if (ifdt.properties.rrisknatural != undefined && ifdt.properties.rrisknatural != [] &&
                        ifdt.properties.rrisknatural[i] != null) {

                        var risknathaz_lof = ifdt.properties.rrisknatural[i].split('__')[0];
                        var risknathaz_cons = ifdt.properties.rrisknatural[i].split('__')[1];
                        switch (formulasService.riskRatingScale(risknathaz_lof, risknathaz_cons)) {
                            case 1:
                                ret['Total_investment_risknat1'] += ifdt.properties.rinvestmentrequired[i];
                                ret['Total_investment'] += ifdt.properties.rinvestmentrequired[i];
                                if (i > 0) {
                                    ret['Total_km_risknat1'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }
                                break;
                            case 2:
                                ret['Total_investment_risknat2'] += ifdt.properties.rinvestmentrequired[i];
                                ret['Total_investment'] += ifdt.properties.rinvestmentrequired[i];
                                if (i > 0) {
                                    ret['Total_km_risknat2'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }

                                break;
                            case 3:
                                ret['Total_investment_risknat3'] += ifdt.properties.rinvestmentrequired[i];
                                ret['Total_investment'] += ifdt.properties.rinvestmentrequired[i];
                                if (i > 0) {
                                    ret['Total_km_risknat3'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }

                                break;
                            case 4:
                                ret['Total_investment_risknat4'] += ifdt.properties.rinvestmentrequired[i];
                                ret['Total_investment'] += ifdt.properties.rinvestmentrequired[i];
                                if (i > 0) {
                                    ret['Total_km_risknat4'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }

                                break;
                            case 5:
                                ret['Total_investment_risknat5'] += ifdt.properties.rinvestmentrequired[i];
                                ret['Total_investment'] += ifdt.properties.rinvestmentrequired[i];
                                if (i > 0) {
                                    ret['Total_km_risknat5'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }
                                break;

                            default:
                                break;
                        }
                    }
                    if (ifdt.properties.rriskphysical != undefined && ifdt.properties.rriskphysical != [] &&
                        ifdt.properties.rriskphysical[i] != null) {

                        var riskphyhaz_lof = ifdt.properties.rriskphysical[i].split('__')[0];
                        var riskphyhaz_cons = ifdt.properties.rriskphysical[i].split('__')[1];
                        switch (formulasService.riskRatingScale(riskphyhaz_lof, riskphyhaz_cons)) {
                            case 1:
                                if (i > 0) {
                                    ret['Total_km_riskphy1'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }
                                break;
                            case 2:
                                if (i > 0) {
                                    ret['Total_km_riskphy2'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }

                                break;
                            case 3:
                                if (i > 0) {
                                    ret['Total_km_riskphy3'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }

                                break;
                            case 4:
                                if (i > 0) {
                                    ret['Total_km_riskphy4'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }

                                break;
                            case 5:
                                if (i > 0) {
                                    ret['Total_km_riskphy5'] += services.calDIST(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i]);
                                }
                                break;

                            default:
                                break;
                        }
                    }
                    if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                        ifdt.properties.rcategory[i] != null) {

                        switch (ifdt.properties.rcategory[i]) {
                            case 'Urban':
                                ret['Total_investment_Urban'] += ifdt.properties.rinvestmentrequired[i];

                                break;
                            case 'Main Road':
                                ret['Total_investment_MainRoad'] += ifdt.properties.rinvestmentrequired[i];


                                break;
                            case 'Feeder':
                                ret['Total_investment_Feeder'] += ifdt.properties.rinvestmentrequired[i];


                                break;
                            case 'Secondary':
                                ret['Total_investment_Secondary'] += ifdt.properties.rinvestmentrequired[i];


                                break;


                            default:
                                break;
                        }
                    }
                }
            }
        }
        debug(ret);
        res.status(200).jsonp(ret);
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
                var rcosts = [];
                rcosts[0] = 0;
                for (var i = 1; i < ifdt.geometry.coordinates.length; i++) {
                    var rcost = 0;
                    if (ifdt.properties.rcondition !== undefined && ifdt.properties.rcondition.length > 0 &&
                        ifdt.properties.rmaterial !== undefined && ifdt.properties.rmaterial.length > 0 &&
                        ifdt.properties.rmaterial[i] !== '') {
                        // debug('entro');
                        // if (c.Pavements.material.indexOf(ifdt.properties.rmaterial[i]) < 0)
                        var indexmat = c.Pavements.material.indexOf(ifdt.properties.rmaterial[i]);
                        switch (ifdt.properties.rcondition[i]) {
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
                        rcosts[i] = formulasService.PavementCost(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i], rcost);
                    }
                }
                var conditions = {
                    _id: ifdt._id
                };
                var query = {
                    $set: {
                        "properties.rinvestmentrequired": rcosts
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