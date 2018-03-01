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
        "properties.rginvestmentrequired": 1,
        "properties.grisk": 1,
        "properties.griskphysical": 1,
        "properties.grisknatural": 1,
        "properties.gcode": 1,
        "properties.rginvestmentrequired2": 1,
        "properties.grisk2": 1,
        "properties.griskphysical2": 1,
        "properties.grisknatural2": 1,
        "properties.gcode2": 1,
        "properties.Cinvestmentrequired": 1,
        "properties.CRISK": 1,
        "properties.CRISKphysical": 1,
        "properties.CRISKnatural": 1,
        "properties.Ccode": 1,
        "properties.rcriticality": 1,
        "properties.bcriticality": 1,
        "properties.Ccriticality": 1,
        "properties.gcriticality": 1,
        "properties.rcondition": 1,
        "properties.bcondition": 1,
        "properties.Ccondition": 1,
        "properties.gcondition": 1,
        "properties.gcondition2": 1,
        "properties.district": 1
    };
    var ret = {};
    ret['Total_investment'] = 0;
    ret['Total_investment_phy'] = 0;
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
    ret['Total_investment_grisknat1'] = 0;
    ret['Total_investment_grisknat2'] = 0;
    ret['Total_investment_grisknat3'] = 0;
    ret['Total_investment_grisknat4'] = 0;
    ret['Total_investment_grisknat5'] = 0;
    ret['Total_investment_riskphy1'] = 0;
    ret['Total_investment_riskphy2'] = 0;
    ret['Total_investment_riskphy3'] = 0;
    ret['Total_investment_riskphy4'] = 0;
    ret['Total_investment_riskphy5'] = 0;
    ret['Total_investment_briskphy1'] = 0;
    ret['Total_investment_briskphy2'] = 0;
    ret['Total_investment_briskphy3'] = 0;
    ret['Total_investment_briskphy4'] = 0;
    ret['Total_investment_briskphy5'] = 0;
    ret['Total_investment_criskphy1'] = 0;
    ret['Total_investment_criskphy2'] = 0;
    ret['Total_investment_criskphy3'] = 0;
    ret['Total_investment_criskphy4'] = 0;
    ret['Total_investment_criskphy5'] = 0;
    ret['Total_investment_griskphy1'] = 0;
    ret['Total_investment_griskphy2'] = 0;
    ret['Total_investment_griskphy3'] = 0;
    ret['Total_investment_griskphy4'] = 0;
    ret['Total_investment_griskphy5'] = 0;
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
    ret['Total_num_grisknat1'] = 0;
    ret['Total_num_grisknat2'] = 0;
    ret['Total_num_grisknat3'] = 0;
    ret['Total_num_grisknat4'] = 0;
    ret['Total_num_grisknat5'] = 0;
    ret['Total_num_briskphy1'] = 0;
    ret['Total_num_briskphy2'] = 0;
    ret['Total_num_briskphy3'] = 0;
    ret['Total_num_briskphy4'] = 0;
    ret['Total_num_briskphy5'] = 0;
    ret['Total_num_criskphy1'] = 0;
    ret['Total_num_criskphy2'] = 0;
    ret['Total_num_criskphy3'] = 0;
    ret['Total_num_criskphy4'] = 0;
    ret['Total_num_criskphy5'] = 0;
    ret['Total_num_griskphy1'] = 0;
    ret['Total_num_griskphy2'] = 0;
    ret['Total_num_griskphy3'] = 0;
    ret['Total_num_griskphy4'] = 0;
    ret['Total_num_griskphy5'] = 0;
    ret['Total_bridges_crit1'] = 0;
    ret['Total_bridges_crit2'] = 0;
    ret['Total_bridges_crit3'] = 0;
    ret['Total_bridges_crit4'] = 0;
    ret['Total_bridges_crit5'] = 0;
    ret['Total_culverts_crit1'] = 0;
    ret['Total_culverts_crit2'] = 0;
    ret['Total_culverts_crit3'] = 0;
    ret['Total_culverts_crit4'] = 0;
    ret['Total_culverts_crit5'] = 0;
    ret['Total_geot_crit1'] = 0;
    ret['Total_geot_crit2'] = 0;
    ret['Total_geot_crit3'] = 0;
    ret['Total_geot_crit4'] = 0;
    ret['Total_geot_crit5'] = 0;
    ret['Total_km_crit1'] = 0;
    ret['Total_km_crit2'] = 0;
    ret['Total_km_crit3'] = 0;
    ret['Total_km_crit4'] = 0;
    ret['Total_km_crit5'] = 0;
    ret['Total_interventions'] = 0;
    ret['Total_interventions_phy'] = 0;
    ret['Total_roads_interventions'] = 0;
    ret['Total_bridges_interventions'] = 0;
    ret['Total_culverts_interventions'] = 0;
    ret['Total_geot_interventions'] = 0;
    ret['Total_investment_Urban'] = 0;
    ret['Total_investment_MainRoad'] = 0;
    ret['Total_investment_Feeder'] = 0;
    ret['Total_investment_Secondary'] = 0;
    ret['Total_roads_interventions_Urban'] = 0;
    ret['Total_roads_interventions_MainRoad'] = 0;
    ret['Total_roads_interventions_Feeder'] = 0;
    ret['Total_roads_interventions_Secondary'] = 0;
    ret['Total_investment_Saint_George'] = 0;
    ret['Total_investment_Saint_Paul'] = 0;
    ret['Total_investment_Saint_Joseph'] = 0;
    ret['Total_investment_Saint_Peter'] = 0;
    ret['Total_investment_Saint_John'] = 0;
    ret['Total_investment_Saint_Andrew'] = 0;
    ret['Total_investment_Saint_David'] = 0;
    ret['Total_investment_Saint_Patrick'] = 0;
    ret['Total_investment_Saint_Mark'] = 0;
    ret['Total_investment_Saint_Luke'] = 0;
    ret['Total_elements_Saint_George'] = 0;
    ret['Total_elements_Saint_Paul'] = 0;
    ret['Total_elements_Saint_Joseph'] = 0;
    ret['Total_elements_Saint_Peter'] = 0;
    ret['Total_elements_Saint_John'] = 0;
    ret['Total_elements_Saint_Andrew'] = 0;
    ret['Total_elements_Saint_David'] = 0;
    ret['Total_elements_Saint_Patrick'] = 0;
    ret['Total_elements_Saint_Mark'] = 0;
    ret['Total_elements_Saint_Luke'] = 0;

    ret['Total_bridges_interventions_phy'] = 0;
    ret['Total_culverts_interventions_phy'] = 0;
    ret['Total_geot_interventions_phy'] = 0;

    ret['Total_km_lof1'] = 0;
    ret['Total_km_lof2'] = 0;
    ret['Total_km_lof3'] = 0;
    ret['Total_km_lof4'] = 0;
    ret['Total_km_lof5'] = 0;
    ret['Total_bridges_lof1'] = 0;
    ret['Total_bridges_lof2'] = 0;
    ret['Total_bridges_lof3'] = 0;
    ret['Total_bridges_lof4'] = 0;
    ret['Total_bridges_lof5'] = 0;
    ret['Total_culverts_lof1'] = 0;
    ret['Total_culverts_lof2'] = 0;
    ret['Total_culverts_lof3'] = 0;
    ret['Total_culverts_lof4'] = 0;
    ret['Total_culverts_lof5'] = 0;
    ret['Total_geot_lof1'] = 0;
    ret['Total_geot_lof2'] = 0;
    ret['Total_geot_lof3'] = 0;
    ret['Total_geot_lof4'] = 0;
    ret['Total_geot_lof5'] = 0;


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
            var gcodeant = "";
            var gcodeant2 = "";
            // debug(ifdt._id + ':' + ifdt.properties.rinvestmentrequired);
            for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                //////////////////
                // geotechnical //
                //////////////////
                if (ifdt.properties.rginvestmentrequired2 != undefined && ifdt.properties.rginvestmentrequired2 != [] &&
                    ifdt.properties.rginvestmentrequired2[i] != null) {
                    // debug(ifdt.properties.gcode2);
                    if (ifdt.properties.gcode2 != undefined && ifdt.properties.gcode2 != [] &&
                        ifdt.properties.gcode2[i] != null && ifdt.properties.gcode2[i] !== "") {
                        if (ifdt.properties.gcode2[i] !== gcodeant2) {
                            gcodeant2 = ifdt.properties.gcode2[i];
                            // selecciono number of elements por Parish
                            if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                                ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                                ret = budgetModule.nRoadsDistrict(ret, ifdt.properties.district[i]);

                            }
                            if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                                ifdt.properties.rcategory[i] != null && ifdt.properties.rcategory[i] !== "") {
                                ret = budgetModule.nRoadsCategory(ret, ifdt.properties.rcategory[i]);

                            }
                            if (ifdt.properties.gcriticality2 != undefined && ifdt.properties.gcriticality2 != [] &&
                                ifdt.properties.gcriticality2[i] != null) {
                                ret = budgetModule.nInterventionsCriticality(ret, ifdt.properties.gcriticality2[i], 'geot');

                            }
                            if (ifdt.properties.grisknatural2 != undefined && ifdt.properties.grisknatural2 != [] &&
                                ifdt.properties.grisknatural2[i] != null) {
                                var risknathaz_lof = ifdt.properties.grisknatural2[i].split('__')[0];
                                var risknathaz_cons = ifdt.properties.grisknatural2[i].split('__')[1];
                                ret = budgetModule.nInterventions(ret, risknathaz_lof, risknathaz_cons, 'geot', 'nat');

                            }
                            if (ifdt.properties.griskphysical2 != undefined && ifdt.properties.griskphysical2 != [] &&
                                ifdt.properties.griskphysical2[i] != null) {
                                var riskphy_lof = ifdt.properties.griskphysical2[i].split('__')[0];
                                var riskphy_cons = ifdt.properties.griskphysical2[i].split('__')[1];
                                ret = budgetModule.nInterventions(ret, riskphy_lof, riskphy_cons, 'geot', 'phy');

                            }
                            if (ifdt.properties.gcondition2 != undefined && ifdt.properties.gcondition2 != [] &&
                                ifdt.properties.gcondition2[i] != null) {

                                var gcond = ifdt.properties.gcondition2[i];
                                // debug(gcond);
                                ret = budgetModule.nLikelihood(ret, gcond, 'geot', 'phy');

                            }
                        }
                        // selecciono investment por Parish
                        if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                            ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                            ret = budgetModule.investmentDistrict(ret, ifdt.properties.district[i], ifdt.properties.rginvestmentrequired2[i]);

                        }
                        if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                            ifdt.properties.rcategory[i] != null) {
                            ret = budgetModule.investmentCategory(ret, ifdt.properties.rcategory[i], ifdt.properties.rginvestmentrequired2[i]);

                        }

                        if (ifdt.properties.grisknatural2 != undefined && ifdt.properties.grisknatural2 != [] &&
                            ifdt.properties.grisknatural2[i] != null) {
                            var risknathaz_lof = ifdt.properties.grisknatural2[i].split('__')[0];
                            var risknathaz_cons = ifdt.properties.grisknatural2[i].split('__')[1];

                            ret = budgetModule.investmentGeotNatural(ret, risknathaz_lof, risknathaz_cons, ifdt.properties.rginvestmentrequired2[i]);

                        }
                        if (ifdt.properties.griskphysical2 != undefined && ifdt.properties.griskphysical2 != [] &&
                            ifdt.properties.griskphysical2[i] != null) {
                            var riskphy_lof = ifdt.properties.griskphysical2[i].split('__')[0];
                            var riskphy_cons = ifdt.properties.griskphysical2[i].split('__')[1];

                            ret = budgetModule.investmentGeotPhysical(ret, riskphy_lof, riskphy_cons, ifdt.properties.rginvestmentrequired2[i]);

                        }

                    }
                }
                if (ifdt.properties.rginvestmentrequired != undefined && ifdt.properties.rginvestmentrequired != [] &&
                    ifdt.properties.rginvestmentrequired[i] != null) {
                    // debug(ifdt.properties.gcode);
                    if (ifdt.properties.gcode != undefined && ifdt.properties.gcode != [] &&
                        ifdt.properties.gcode[i] != null && ifdt.properties.gcode[i] !== "") {
                        if (ifdt.properties.gcode[i] !== gcodeant) {
                            gcodeant = ifdt.properties.gcode[i];
                            // selecciono number of elements por Parish
                            if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                                ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                                ret = budgetModule.nRoadsDistrict(ret, ifdt.properties.district[i]);

                            }
                            if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                                ifdt.properties.rcategory[i] != null && ifdt.properties.rcategory[i] !== "") {
                                ret = budgetModule.nRoadsCategory(ret, ifdt.properties.rcategory[i]);

                            }
                            if (ifdt.properties.gcriticality != undefined && ifdt.properties.gcriticality != [] &&
                                ifdt.properties.gcriticality[i] != null) {
                                ret = budgetModule.nInterventionsCriticality(ret, ifdt.properties.gcriticality[i], 'geot');

                            }
                            if (ifdt.properties.grisknatural != undefined && ifdt.properties.grisknatural != [] &&
                                ifdt.properties.grisknatural[i] != null) {
                                var risknathaz_lof = ifdt.properties.grisknatural[i].split('__')[0];
                                var risknathaz_cons = ifdt.properties.grisknatural[i].split('__')[1];
                                ret = budgetModule.nInterventions(ret, risknathaz_lof, risknathaz_cons, 'geot', 'nat');

                            }
                            if (ifdt.properties.griskphysical != undefined && ifdt.properties.griskphysical != [] &&
                                ifdt.properties.griskphysical[i] != null) {
                                var riskphy_lof = ifdt.properties.griskphysical[i].split('__')[0];
                                var riskphy_cons = ifdt.properties.griskphysical[i].split('__')[1];
                                ret = budgetModule.nInterventions(ret, riskphy_lof, riskphy_cons, 'geot', 'phy');

                            }
                            if (ifdt.properties.gcondition != undefined && ifdt.properties.gcondition != [] &&
                                ifdt.properties.gcondition[i] != null) {

                                var gcond = ifdt.properties.gcondition[i];
                                // debug(gcond);
                                ret = budgetModule.nLikelihood(ret, gcond, 'geot', 'phy');

                            }
                        }

                        // selecciono investment por Parish
                        if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                            ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                            ret = budgetModule.investmentDistrict(ret, ifdt.properties.district[i], ifdt.properties.rginvestmentrequired[i]);

                        }
                        if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                            ifdt.properties.rcategory[i] != null) {

                            ret = budgetModule.investmentCategory(ret, ifdt.properties.rcategory[i], ifdt.properties.rginvestmentrequired[i]);

                        }

                        if (ifdt.properties.grisknatural != undefined && ifdt.properties.grisknatural != [] &&
                            ifdt.properties.grisknatural[i] != null) {
                            var risknathaz_lof = ifdt.properties.grisknatural[i].split('__')[0];
                            var risknathaz_cons = ifdt.properties.grisknatural[i].split('__')[1];

                            ret = budgetModule.investmentGeotNatural(ret, risknathaz_lof, risknathaz_cons, ifdt.properties.rginvestmentrequired[i]);

                        }
                        if (ifdt.properties.griskphysical != undefined && ifdt.properties.griskphysical != [] &&
                            ifdt.properties.griskphysical[i] != null) {
                            var riskphy_lof = ifdt.properties.griskphysical[i].split('__')[0];
                            var riskphy_cons = ifdt.properties.griskphysical[i].split('__')[1];

                            ret = budgetModule.investmentGeotPhysical(ret, riskphy_lof, riskphy_cons, ifdt.properties.rginvestmentrequired[i]);

                        }

                    }
                }
                //////////////
                // culverts //
                //////////////
                if (ifdt.properties.Cinvestmentrequired != undefined && ifdt.properties.Cinvestmentrequired != [] &&
                    ifdt.properties.Cinvestmentrequired[i] != null) {
                    // debug(ifdt.properties.Ccode);
                    if (ifdt.properties.Ccode != undefined && ifdt.properties.Ccode != [] &&
                        ifdt.properties.Ccode[i] != null &&
                        ifdt.properties.Ccode[i] !== "") {
                        if (ifdt.properties.Ccode[i] !== Ccodeant) {
                            Ccodeant = ifdt.properties.Ccode[i];

                            // selecciono number of elements por Parish
                            if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                                ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                                ret = budgetModule.nRoadsDistrict(ret, ifdt.properties.district[i]);

                            }
                            if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                                ifdt.properties.rcategory[i] != null && ifdt.properties.rcategory[i] !== "") {
                                ret = budgetModule.nRoadsCategory(ret, ifdt.properties.rcategory[i]);


                            }

                            if (ifdt.properties.Ccriticality != undefined && ifdt.properties.Ccriticality != [] &&
                                ifdt.properties.Ccriticality[i] != null) {
                                ret = budgetModule.nInterventionsCriticality(ret, ifdt.properties.Ccriticality[i], 'culverts');

                            }
                            if (ifdt.properties.CRISKnatural != undefined && ifdt.properties.CRISKnatural != [] &&
                                ifdt.properties.CRISKnatural[i] != null) {
                                var risknathaz_lof = ifdt.properties.CRISKnatural[i].split('__')[0];
                                var risknathaz_cons = ifdt.properties.CRISKnatural[i].split('__')[1];

                                ret = budgetModule.nInterventions(ret, risknathaz_lof, risknathaz_cons, 'culverts', 'nat');

                            }
                            if (ifdt.properties.CRISKphysical != undefined && ifdt.properties.CRISKphysical != [] &&
                                ifdt.properties.CRISKphysical[i] != null) {
                                var riskphyz_lof = ifdt.properties.CRISKphysical[i].split('__')[0];
                                var riskphy_cons = ifdt.properties.CRISKphysical[i].split('__')[1];

                                ret = budgetModule.nInterventions(ret, riskphyz_lof, riskphy_cons, 'culverts', 'phy');

                            }
                            if (ifdt.properties.Ccondition != undefined && ifdt.properties.Ccondition != [] &&
                                ifdt.properties.Ccondition[i] != null) {

                                var Ccond = ifdt.properties.Ccondition[i];
                                // debug(Ccond);
                                ret = budgetModule.nLikelihood(ret, Ccond, 'culverts', 'phy');

                            }
                        }

                        if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                            ifdt.properties.rcategory[i] != null) {

                            ret = budgetModule.investmentCategory(ret, ifdt.properties.rcategory[i], ifdt.properties.Cinvestmentrequired[i]);

                        }
                        // selecciono investment por Parish
                        if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                            ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                            ret = budgetModule.investmentDistrict(ret, ifdt.properties.district[i], ifdt.properties.Cinvestmentrequired[i]);

                        }
                        if (ifdt.properties.CRISKnatural != undefined && ifdt.properties.CRISKnatural != [] &&
                            ifdt.properties.CRISKnatural[i] != null) {
                            var risknathaz_lof = ifdt.properties.CRISKnatural[i].split('__')[0];
                            var risknathaz_cons = ifdt.properties.CRISKnatural[i].split('__')[1];

                            ret = budgetModule.investmentCulvertsNatural(ret, risknathaz_lof, risknathaz_cons, ifdt.properties.Cinvestmentrequired[i]);


                        }
                        if (ifdt.properties.CRISKphysical != undefined && ifdt.properties.CRISKphysical != [] &&
                            ifdt.properties.CRISKphysical[i] != null) {
                            var riskphy_lof = ifdt.properties.CRISKphysical[i].split('__')[0];
                            var riskphy_cons = ifdt.properties.CRISKphysical[i].split('__')[1];

                            ret = budgetModule.investmentCulvertsPhysical(ret, riskphy_lof, riskphy_cons, ifdt.properties.Cinvestmentrequired[i]);


                        }


                    }
                }
                /////////////
                // bridges //
                //////////////
                if (ifdt.properties.binvestmentrequired != undefined && ifdt.properties.binvestmentrequired != [] &&
                    ifdt.properties.binvestmentrequired[i] != null) {
                    // debug(ifdt.properties.bcode);
                    if (ifdt.properties.bcode != undefined && ifdt.properties.bcode != [] &&
                        ifdt.properties.bcode[i] != null && ifdt.properties.bcode[i] !== "") {

                        if (ifdt.properties.bcode[i] !== bcodeant) {
                            // el CODE solo debe contabilizar 1 activo
                            // pero para el caso del investment debe contabilizar TODOS los puntos
                            bcodeant = ifdt.properties.bcode[i];
                            // selecciono number of elements por Parish
                            if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                                ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                                ret = budgetModule.nRoadsDistrict(ret, ifdt.properties.district[i]);

                            }
                            if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                                ifdt.properties.rcategory[i] != null && ifdt.properties.rcategory[i] !== "") {
                                ret = budgetModule.nRoadsCategory(ret, ifdt.properties.rcategory[i]);

                            }
                            if (ifdt.properties.bcriticality != undefined && ifdt.properties.bcriticality != [] &&
                                ifdt.properties.bcriticality[i] != null) {
                                ret = budgetModule.nInterventionsCriticality(ret, ifdt.properties.bcriticality[i], 'bridges');
                            }

                            if (ifdt.properties.brisknatural != undefined && ifdt.properties.brisknatural != [] &&
                                ifdt.properties.brisknatural[i] != null) {
                                var risknathaz_lof = ifdt.properties.brisknatural[i].split('__')[0];
                                var risknathaz_cons = ifdt.properties.brisknatural[i].split('__')[1];

                                ret = budgetModule.nInterventions(ret, risknathaz_lof, risknathaz_cons, 'bridges', 'nat');
                            }
                            if (ifdt.properties.briskphysical != undefined && ifdt.properties.briskphysical != [] &&
                                ifdt.properties.briskphysical[i] != null) {
                                var riskphyhaz_lof = ifdt.properties.briskphysical[i].split('__')[0];
                                var riskphyhaz_cons = ifdt.properties.briskphysical[i].split('__')[1];

                                ret = budgetModule.nInterventions(ret, riskphyhaz_lof, riskphyhaz_cons, 'bridges', 'phy');
                            }
                            if (ifdt.properties.bcondition != undefined && ifdt.properties.bcondition != [] &&
                                ifdt.properties.bcondition[i] != null) {

                                var bcond = ifdt.properties.bcondition[i];
                                // debug(bcond);
                                ret = budgetModule.nLikelihood(ret, bcond, 'bridges', 'phy');

                            }

                        }
                        // selecciono investment por Parish
                        if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                            ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                            ret = budgetModule.investmentDistrict(ret, ifdt.properties.district[i], ifdt.properties.binvestmentrequired[i]);

                        }
                        if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                            ifdt.properties.rcategory[i] != null) {

                            ret = budgetModule.investmentCategory(ret, ifdt.properties.rcategory[i], ifdt.properties.binvestmentrequired[i]);

                        }

                        /*
                        RISK
                        */

                        if (ifdt.properties.brisknatural != undefined && ifdt.properties.brisknatural != [] &&
                            ifdt.properties.brisknatural[i] != null) {
                            var risknathaz_lof = ifdt.properties.brisknatural[i].split('__')[0];
                            var risknathaz_cons = ifdt.properties.brisknatural[i].split('__')[1];


                            ret = budgetModule.investmentBridgesNatural(ret, risknathaz_lof, risknathaz_cons, ifdt.properties.binvestmentrequired[i]);
                        }
                        if (ifdt.properties.briskphysical != undefined && ifdt.properties.briskphysical != [] &&
                            ifdt.properties.briskphysical[i] != null) {
                            var riskphyhaz_lof = ifdt.properties.briskphysical[i].split('__')[0];
                            var riskphyhaz_cons = ifdt.properties.briskphysical[i].split('__')[1];


                            ret = budgetModule.investmentBridgesPhysical(ret, riskphyhaz_lof, riskphyhaz_cons, ifdt.properties.binvestmentrequired[i]);
                        }


                    }
                }

                ////////////////
                // pavements //
                ///////////////
                if (ifdt.properties.rinvestmentrequired != undefined && ifdt.properties.rinvestmentrequired != [] &&
                    ifdt.properties.rinvestmentrequired[i] != null) {
                    if (!newinterv) {
                        newinterv = true;
                        ret['Total_interventions']++;
                        ret['Total_interventions_phy']++;
                        ret['Total_roads_interventions']++;

                        // selecciono number of elements por Parish
                        if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                            ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                            ret = budgetModule.nRoadsDistrict(ret, ifdt.properties.district[i]);

                        }
                        if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                            ifdt.properties.rcategory[i] != null && ifdt.properties.rcategory[i] !== "") {
                            ret = budgetModule.nRoadsCategory(ret, ifdt.properties.rcategory[i]);


                        }
                    }

                    if (ifdt.properties.rcriticality != undefined && ifdt.properties.rcriticality != [] &&
                        ifdt.properties.rcriticality[i] != null) {

                        ret = budgetModule.investmentKmCriticality(ret, ifdt.properties.rcriticality[i], ifdt.geometry.coordinates[i - 1],
                            ifdt.geometry.coordinates[i], i);

                    }
                    if (ifdt.properties.rcategory != undefined && ifdt.properties.rcategory != [] &&
                        ifdt.properties.rcategory[i] != null && ifdt.properties.rcategory[i] !== "") {

                        ret = budgetModule.investmentCategory(ret, ifdt.properties.rcategory[i], ifdt.properties.rinvestmentrequired[i]);
                    }

                    // selecciono investment por Parish
                    if (ifdt.properties.district != undefined && ifdt.properties.district != [] &&
                        ifdt.properties.district[i] != null && ifdt.properties.district[i] !== "") {
                        ret = budgetModule.investmentDistrict(ret, ifdt.properties.district[i], ifdt.properties.rinvestmentrequired[i]);

                    }
                    /*
                    Recojo los valores de RISK y los agrupo
                    */

                    if (ifdt.properties.rrisknatural != undefined && ifdt.properties.rrisknatural != [] &&
                        ifdt.properties.rrisknatural[i] != null) {

                        var risknathaz_lof = ifdt.properties.rrisknatural[i].split('__')[0];
                        var risknathaz_cons = ifdt.properties.rrisknatural[i].split('__')[1];

                        ret = budgetModule.investmentNatural(ret, risknathaz_lof, risknathaz_cons,
                            ifdt.properties.rinvestmentrequired[i], ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i], i);



                    }

                    if (ifdt.properties.rriskphysical != undefined && ifdt.properties.rriskphysical != [] &&
                        ifdt.properties.rriskphysical[i] != null) {

                        var riskphy_lof = ifdt.properties.rriskphysical[i].split('__')[0];
                        var riskphy_cons = ifdt.properties.rriskphysical[i].split('__')[1];

                        ret = budgetModule.investmentPhysical(ret, riskphy_lof, riskphy_cons,
                            ifdt.properties.rinvestmentrequired[i], ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i], i);

                    }
                    // debug(ifdt.properties.rcondition);
                    if (ifdt.properties.rcondition != undefined && ifdt.properties.rcondition != [] &&
                        ifdt.properties.rcondition[i] != null) {

                        var rcond = ifdt.properties.rcondition[i];
                        // debug(rcond);
                        ret = budgetModule.KmLikelihood(ret, rcond, ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i], i);

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
            "properties.rwidth": 1,
            "properties.bcondition": 1,
            "properties.bcode": 1,
            "properties.binvestmentrequired": 1,
            "properties.bwidth": 1,
            "properties.btype": 1,
            "properties.Ccondition": 1,
            "properties.Ccode": 1,
            "properties.Cinvestmentrequired": 1,
            "properties.Cwidth": 1,
            "properties.Clength": 1,
            "properties.Cdiameter": 1,
            "properties.Cmaterial": 1,
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
                rcosts[0] = 0;
                bcosts[0] = 0;
                Ccosts[0] = 0;
                for (var i = 1; i < ifdt.geometry.coordinates.length; i++) {
                    var rcost = 0;
                    var bcost = 0;
                    var Ccost = 0;
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
                            bcosts[i] = formulasService.BridgesCost(ifdt.geometry.coordinates[i - 1], ifdt.geometry.coordinates[i], bcost, ifdt.properties.bwidth[i]);
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




                        }
                    }
                    if (existsgcode) {}
                    if (existsgcode2) {}


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
                        "properties.binvestmentrequired": bcosts
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