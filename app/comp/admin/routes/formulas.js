//DEBUG
var debug = require('debug')('debug');
var ObjectId = require('mongoose').Types.ObjectId;

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

var fileuploadModels = require(path.join(__dirname, '../../gis/models/fileupload'));
var Fileupload = mongoose.model('Fileupload');
var filetypeModels = require(path.join(__dirname, '../../gis/models/filetype'));
var Filetype = mongoose.model('Filetype');
var infodatatrackModels = require(path.join(__dirname, '../../gis/models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');
var formulaModels = require(path.join(__dirname, '../models/formula'));
var Formula = mongoose.model('Formula');
var conditionFormulaModels = require(path.join(__dirname, '../models/formcondition'));
var conditionFormula = mongoose.model('Formcondition');

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
router.get('/formulas', function (req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/formulas/',
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
            // debug(JSON.stringify(responseObject));
            resp.render('admin_panel_formulas', {
                formula: responseObject,
                token: req.token,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME
            });

        });
    });

    request.end();
    // resp.render('admin_panel_formulas', { token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

});

/* get_formulas_tracks */
/**
 * Proceso AJAX que recibe la peticion de mostrar todos los tracks afectados por la formular seleccionada
 */
router.post('/get_formulas_tracks/', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB get_formulas_tracks ' + JSON.stringify(postData));

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/get_formulas_tracks/',
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
/* update_formulas_tracks_sensitivity */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks_sensitivity/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB update_formulas_tracks_sensitivity: ' + req.params.formula + ' - ' + req.params.asset);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks_sensitivity/' + req.params.formula + '/' + req.params.asset + '/',
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

});
/* update_formulas_tracks_response */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks_response/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB update_formulas_tracks_response: ' + req.params.formula + ' - ' + req.params.asset);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks_response/' + req.params.formula + '/' + req.params.asset + '/',
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

});
/* update_formulas_tracks */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB update_formulas_tracks: ' + +' - ' + req.params.asset + '\n\n\n' + '----------------------------');

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks/' + req.params.formula + '/' + req.params.asset + '/',
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

});
/* update_formulas_tracks_condition */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks_condition/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB update_formulas_tracks_condition: ' + '' + ' - ' + req.params.asset + '\n\n\n' + '----------------------------');

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks_condition/' + req.params.formula + '/' + req.params.asset + '/',
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
        path: config.PATH_API + '/admin/V1/update_field/',
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



/* GET JSON formulas listing. */
router.get('/V1/formulas/', function (req, res, next) {
    conditionFormula.find({}).exec(function (err, formcs) {
        if (err) {
            res.send(500, err.message);
        }
        Formula.find({}).sort({
            "properties.HTML.id": -1
        }).exec(function (err, forms) {
            if (err) {
                res.send(500, err.message);
            }
            debug(" ### GET Formulas ### \n" + JSON.stringify(formcs));

            res.status(200).jsonp(forms);
        });
    });

});

/* POST update_formulas_tracks_sensitivity */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks_sensitivity/:formula/:asset', async function (req, res, next) {
    debug('API /V1/update_formulas_tracks_sensitivity/');
    var postData = extend({}, req.body);
    var tracksUpdated = 0;
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    debug(postData);
    var form;
    var formula = Object.keys(postData)[0];
    debug(formula);
    await Formula.find({
        "name": formula
    }).exec(async function (err, f) {
        if (err) {
            res.send(500, err.message);
        }
        form = f[0];
    });
    // debug(form);
    var wherearr = [];

    //add codes asset
    wherearr.push('rcondition');
    wherearr.push('rresphazard');
    wherearr.push('bcode');
    wherearr.push('Ccode');
    wherearr.push('gcode');
    wherearr.push('gcode2');

    var selectjson = {
        "geometry.coordinates": 1,
        properties: []
    };
    for (var w of wherearr) {
        selectjson.properties[w] = 1;
    }
    debug(selectjson);
    await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
        if (err) {
            res.send(500, err.message);
        }
        // Arr de valores a updatear
        var valuersensitivityarr = [];
        var valuebsensitivityarr = [];
        var valueCsensitivityarr = [];
        var valuegsensitivityarr = [];
        var valuegsensitivityarr2 = [];

        for (var ifdt of ifdts) {
            //debug(ifdt._id);
            // debug(ifdt.geometry.coordinates);
            tracksUpdated++;
            var bcodeant = "";
            for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                var valuersensitivity = 0;
                var valuebsensitivity = 0;
                var valueCsensitivity = 0;
                var valuegsensitivity = 0;
                var valuegsensitivity2 = 0;
                for (var f = 0; f < form.formulaSpec.length; f++) {
                    var valrcond = 0;
                    var valweigths = 0;
                    var valrresphazard = 0;

                    if (ifdt.properties.rcondition[i] !== undefined) {
                        if (typeof ifdt.properties.rcondition[i] === "string") {
                            // TODO: Cambiar valores a 0 en caso de cadena Vacia
                            valrcond = parseFloat(ifdt.properties.rcondition[i].replace(",", "."));
                            debug('ifdt.properties.rcondition[i] ' + ifdt.properties.rcondition[i]);
                        } else if (typeof ifdt.properties.rcondition[i] === "number") {
                            valrcond = ifdt.properties.rcondition[i];
                        } else {
                            valrcond = 0;
                        }
                    }

                    if (typeof ifdt.properties.rresphazard[i] === "string") {
                        valrresphazard = parseFloat(ifdt.properties.rresphazard[i].replace(",", "."));
                    } else if (typeof ifdt.properties.rresphazard[i] === "number") {
                        valrresphazard = ifdt.properties.rresphazard[i];
                    } else {
                        valrresphazard = 0;
                    }
                    switch (form.formulaSpec[f]["FORM_COEF"]) {

                        case 'firstcoef':
                            debug("MIN(" + valrcond + "; Asset response)" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                            // if (parseFloat(ifdt.properties.rcondition[i].replace(",", ".")) <= parseFloat(ifdt.properties.rresphazard[i].replace(",", "."))) {
                            //     valuersensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value.replace(",", ".")) * parseFloat(ifdt.properties.rcondition[i].replace(",", "."));
                            //     debug(parseFloat(ifdt.properties.rcondition[i].replace(",", ".")) + ' MIN1 ' + parseFloat(ifdt.properties.rresphazard[i].replace(",", ".")) +
                            //         ' valuersensitivity ' + parseFloat(valuersensitivity));
                            // } else {
                            //     valuersensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value.replace(",", ".")) * parseFloat(ifdt.properties.rresphazard[i].replace(",", "."));
                            //     debug(parseFloat(ifdt.properties.rcondition[i].replace(",", ".")) + ' MIN2 ' + parseFloat(ifdt.properties.rresphazard[i].replace(",", ".")) + ' valuersensitivity ' + parseFloat(valuersensitivity));

                            // }

                            break;
                        case 'secondcoef':
                            debug("MAX(" + valrcond + "; Asset response)" + parseFloat(form.formulaSpec[f].WEIGHTS.value.replace(",", ".")));
                            // if (parseFloat(ifdt.properties.rcondition[i].replace(",", ".")) >= parseFloat(ifdt.properties.rresphazard[i].replace(",", "."))) {
                            //     valuersensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value.replace(",", ".")) * parseFloat(ifdt.properties.rcondition[i].replace(",", "."));
                            //     debug(parseFloat(ifdt.properties.rcondition[i].replace(",", ".")) + ' MAX1 ' + parseFloat(ifdt.properties.rresphazard[i].replace(",", ".")) + ' valuersensitivity ' + parseFloat(valuersensitivity));
                            // } else {
                            //     valuersensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value.replace(",", ".")) * parseFloat(ifdt.properties.rresphazard[i].replace(",", "."));
                            //     debug(parseFloat(ifdt.properties.rcondition[i].replace(",", ".")) + ' MAX2 ' + parseFloat(ifdt.properties.rresphazard[i].replace(",", ".")) + ' valuersensitivity ' + parseFloat(valuersensitivity));

                            // }

                            break;

                        default:
                            break;
                    }
                }

            }
        }
    });

    ret.tracksUpdated = tracksUpdated;
    debug(tracksUpdated);
    res.status(200).jsonp(ret);


});

/* POST update_formulas_tracks_response */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks_response/:formula/:asset', async function (req, res, next) {
    debug('API /V1/update_formulas_tracks_response/');
    var postData = extend({}, req.body);
    var tracksUpdated = 0;
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    debug(postData);
    var form;
    var formula = Object.keys(postData)[0];
    debug(formula);
    await Formula.find({
        "name": formula
    }).exec(async function (err, f) {
        if (err) {
            res.send(500, err.message);
        }
        form = f[0];
    });
    // debug(form);
    var wherearr = [];
    for (var fv of form.formulaSpec) {
        if (wherearr.indexOf(fv.WEIGHTS.dbfield) < 0 && fv.WEIGHTS.dbfield !== '--')
            wherearr.push(fv.WEIGHTS.dbfield);
    }
    
    //add codes asset
    wherearr.push('bcode');
    wherearr.push('Ccode');
    wherearr.push('gcode');
    wherearr.push('gcode2');

    var selectjson = {
        "geometry.coordinates": 1,
        properties: []
    };
    for (var w of wherearr) {
        selectjson.properties[w] = 1;
    }
    debug(selectjson);
    // debug(form);
    await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
        if (err) {
            res.send(500, err.message);
        }
        // Arr de valores a updatear
        var valuerresphazardarr = [];
        var valuebresphazardarr = [];
        var valueCresphazardarr = [];
        var valuegresphazardarr = [];
        var valuegresphazardarr2 = [];

        for (var ifdt of ifdts) {
            //debug(ifdt._id);
            // debug(ifdt.geometry.coordinates);
            tracksUpdated++;
            var bcodeant = "";
            for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                //debug(form.formulaSpec.length);
                var valuerresphazard = 0;
                var valuebresphazard = 0;
                var valueCresphazard = 0;
                var valuegresphazard = 0;
                var valuegresphazard2 = 0;

                for (var f = 0; f < form.formulaSpec.length; f++) {
                    switch (form.formulaSpec[f]["ASSET TYPE"]) {
                        case 'Pavement':
                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                valuerresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                // debug(form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                //     form.formulaSpec[f].score.value + ' valuerresphazard ' + valuerresphazard);
                            }

                            break;
                        case 'Bridges':
                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties.bcode !== undefined && ifdt.properties.bcode !== [] &&
                                ifdt.properties.bcode[i] !== undefined && ifdt.properties.bcode[i] !== null && ifdt.properties.bcode[i] !== "") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuebresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // debug(ifdt.properties.bcode[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        //form.formulaSpec[f].score.value + ' valuebresphazard ' + valuebresphazard);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // debug(minval + ' ' + operador + ' ' + maxval);
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            //form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuebresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }

                            break;
                        case 'Cross drainage':
                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties.Ccode !== undefined && ifdt.properties.Ccode.length > 0 &&
                                ifdt.properties.Ccode[i] !== undefined && ifdt.properties.Ccode[i] !== null && ifdt.properties.Ccode[i] !== "") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valueCresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        //debug(ifdt.properties.Ccode[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        //  form.formulaSpec[f].score.value + ' valueCresphazard ' + valueCresphazard);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            //debug(minval + ' ' + operador + ' ' + maxval);
                                            //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            // form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valueCresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }

                            break;
                        case 'Earthworks':
                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode.length > 0 &&
                                ifdt.properties.gcode[i] !== undefined && ifdt.properties.gcode[i] !== null && ifdt.properties.gcode[i] !== "" &&
                                ifdt.properties.gtype !== undefined && ifdt.properties.gtype.length > 0 &&
                                ifdt.properties.gtype[i] !== undefined && ifdt.properties.gtype[i] !== null && ifdt.properties.gtype[i] !== "" &&
                                ifdt.properties.gtype[i] !== "Cutting" && ifdt.properties.gtype[i] !== "Embankment") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuegresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // debug(ifdt.properties.gcode[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        // form.formulaSpec[f].score.value + ' valuegresphazard ' + valuegresphazard);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // debug(minval + ' ' + operador + ' ' + maxval);
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            // form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuegresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }
                            if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2.length > 0 &&
                                ifdt.properties.gcode2[i] !== undefined && ifdt.properties.gcode2[i] !== null && ifdt.properties.gcode2[i] !== "" &&
                                ifdt.properties.gtype2 !== undefined && ifdt.properties.gtype2.length > 0 &&
                                ifdt.properties.gtype2[i] !== undefined && ifdt.properties.gtype2[i] !== null && ifdt.properties.gtype2[i] !== "" &&
                                ifdt.properties.gtype2[i] !== "Cutting" && ifdt.properties.gtype2[i] !== "Embankment") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuegresphazard2 += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // debug(ifdt.properties.gcode2[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        //     form.formulaSpec[f].score.value + ' valuegresphazard2 ' + valuegresphazard2);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // debug(minval + ' ' + operador + ' ' + maxval);
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            //     form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuegresphazard2 += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }

                            break;

                        case 'Retaining walls':
                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode.length > 0 &&
                                ifdt.properties.gcode[i] !== undefined && ifdt.properties.gcode[i] !== null && ifdt.properties.gcode[i] !== "" &&
                                ifdt.properties.gtype !== undefined && ifdt.properties.gtype.length > 0 &&
                                ifdt.properties.gtype[i] !== undefined && ifdt.properties.gtype[i] !== null && ifdt.properties.gtype[i] !== "" &&
                                ifdt.properties.gtype[i] !== "Retaining_walls") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuegresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // debug(ifdt.properties.gcode[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        // form.formulaSpec[f].score.value + ' valuegresphazard ' + valuegresphazard);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // debug(minval + ' ' + operador + ' ' + maxval);
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            // form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuegresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }
                            if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2.length > 0 &&
                                ifdt.properties.gcode2[i] !== undefined && ifdt.properties.gcode2[i] !== null && ifdt.properties.gcode2[i] !== "" &&
                                ifdt.properties.gtype2 !== undefined && ifdt.properties.gtype2.length > 0 &&
                                ifdt.properties.gtype2[i] !== undefined && ifdt.properties.gtype2[i] !== null && ifdt.properties.gtype2[i] !== "" &&
                                ifdt.properties.gtype2[i] !== "Retaining_walls") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuegresphazard2 += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // debug(ifdt.properties.gcode2[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        // form.formulaSpec[f].score.value + ' valuegresphazard2 ' + valuegresphazard2);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // debug(minval + ' ' + operador + ' ' + maxval);
                                            // debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            // form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuegresphazard2 += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }

                            break;

                        default:
                            break;
                    }
                }
                valuerresphazardarr[i] = valuerresphazard;
                valuebresphazardarr[i] = valuebresphazard;
                valueCresphazardarr[i] = valueCresphazard;
                valuegresphazardarr[i] = valuegresphazard;
                valuegresphazardarr2[i] = valuegresphazard2;
            }
            var conditions = {
                _id: ifdt._id
            };
            var query = {
                $set: {
                    "properties.rresphazard": valuerresphazardarr,
                    "properties.bresphazard": valuebresphazardarr,
                    "properties.gresphazard": valuegresphazardarr,
                    "properties.gresphazard2": valuegresphazardarr2,
                    "properties.CRespHazard": valueCresphazardarr
                }
            };
            await Infodatatrack.update(conditions, query, function (err, iup) {
                if (err) {
                    debug(err.message);
                }
                // debug(iup);

            });
        }

    });
    ret.tracksUpdated = tracksUpdated;
    debug(tracksUpdated);
    res.status(200).jsonp(ret);

});

/* POST update_formulas_tracks */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks/:formula/:asset', async function (req, res, next) {
    debug('API /V1/update_formulas_tracks/');
    var postData = extend({}, req.body);
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    debug(postData);
    var asset = postData[Object.keys(postData)[0]];
    var formula = Object.keys(postData)[0];
    var sendData = {};
    var formResult = [];
    var formResultLeft = [];
    var formResultRight = [];
    var tracks;
    var tracksUpdated = 0;
    debug('formula: ' + formula + ' asset: ' + asset);

    Formula.find({
        "name": formula
    }).exec(async function (err, f) {
        if (err) {
            res.send(500, err.message);
        }
        await Infodatatrack.find().exec(function (err, rtracks) {
            if (err) {
                res.send(500, err.message);
            }
            tracks = rtracks;
        });

        for (var track of tracks) {
            // var track = { "_id": "59c91c60100b7d4adb8ea9ec" };
            await Infodatatrack.findById(track._id).exec(function (err, ifdt) {
                if (err) {
                    res.send(500, err.message);
                }
                // debug(ifdt.properties.name);
                var index = 0;
                // debug(ifdt._id);
                formResult = new Array(ifdt.geometry.coordinates.length);
                formResultLeft = new Array(ifdt.geometry.coordinates.length);
                formResultRight = new Array(ifdt.geometry.coordinates.length);
                for (index = 0; index < ifdt.geometry.coordinates.length; index++) {
                    // debug(index);
                    var calcularValue = false;
                    /**
                     * debo comprobar que el asset elegido tenga CODE para poder actualizarlo
                     * Solo sucederá en aquellos casos que esté completado
                     */
                    switch (asset) {
                        case 'Pavements':
                            if (ifdt.properties.rcode !== undefined &&
                                ifdt.properties.rcode !== null &&
                                ifdt.properties.rcode !== [] &&
                                ifdt.properties.rcode[index] !== undefined &&
                                ifdt.properties.rcode[index] !== "") {
                                calcularValue = true;
                                // debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                            } else {
                                // debug(fieldkey + ' : UNDEFINED');
                                calcularValue = false;
                            }
                            break;
                        case 'Bridges':
                            if (ifdt.properties.bcode !== undefined &&
                                ifdt.properties.bcode !== null &&
                                ifdt.properties.bcode !== [] &&
                                ifdt.properties.bcode[index] !== undefined &&
                                ifdt.properties.bcode[index] !== "") {
                                calcularValue = true;
                                // debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                            } else {
                                // debug(fieldkey + ' : UNDEFINED');
                                calcularValue = false;
                            }
                            break;
                        case 'Culverts':
                            if (ifdt.properties.Ccode !== undefined &&
                                ifdt.properties.Ccode !== null &&
                                ifdt.properties.Ccode !== [] &&
                                ifdt.properties.Ccode[index] !== undefined &&
                                ifdt.properties.Ccode[index] !== "") {
                                calcularValue = true;
                                // debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                            } else {
                                // debug(fieldkey + ' : UNDEFINED');
                                calcularValue = false;
                            }
                            break;
                        case 'Retaining_Walls':
                            if ((
                                ifdt.properties.gcode != undefined &&
                                ifdt.properties.gcode != null &&
                                ifdt.properties.gcode != [] &&
                                ifdt.properties.gcode[index] != undefined &&
                                ifdt.properties.gcode[index] != "" &&
                                ifdt.properties.gtype != undefined &&
                                ifdt.properties.gtype != null &&
                                ifdt.properties.gtype != [] &&
                                ifdt.properties.gtype[index] != undefined &&
                                ifdt.properties.gtype[index] != "" &&
                                ifdt.properties.gtype[index] === "Retaining_walls") || (
                                    ifdt.properties.gcode2 != undefined &&
                                    ifdt.properties.gcode2 != null &&
                                    ifdt.properties.gcode2 != [] &&
                                    ifdt.properties.gcode2[index] != undefined &&
                                    ifdt.properties.gcode2[index] != "" &&
                                    ifdt.properties.gtype2 != undefined &&
                                    ifdt.properties.gtype2 != null &&
                                    ifdt.properties.gtype2 != [] &&
                                    ifdt.properties.gtype2[index] != undefined &&
                                    ifdt.properties.gtype2[index] != "" &&
                                    ifdt.properties.gtype2[index] === "Retaining_walls"
                                )) {
                                calcularValue = true;
                                // debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                            } else {
                                // debug(fieldkey + ' : UNDEFINED');
                                calcularValue = false;
                            }
                            break;
                        case 'Earthworks':
                            if ((
                                ifdt.properties.gcode != undefined &&
                                ifdt.properties.gcode != null &&
                                ifdt.properties.gcode != [] &&
                                ifdt.properties.gcode[index] != undefined &&
                                ifdt.properties.gcode[index] != "" &&
                                ifdt.properties.gtype != undefined &&
                                ifdt.properties.gtype != null &&
                                ifdt.properties.gtype != [] &&
                                ifdt.properties.gtype[index] != undefined &&
                                ifdt.properties.gtype[index] != "" && (
                                    ifdt.properties.gtype[index] === "Cutting" || ifdt.properties.gtype[index] === "Embankment"
                                )
                            ) || (
                                    ifdt.properties.gcode2 != undefined &&
                                    ifdt.properties.gcode2 != null &&
                                    ifdt.properties.gcode2 != [] &&
                                    ifdt.properties.gcode2[index] != undefined &&
                                    ifdt.properties.gcode2[index] != "" &&
                                    ifdt.properties.gtype2 != undefined &&
                                    ifdt.properties.gtype2 != null &&
                                    ifdt.properties.gtype2 != [] &&
                                    ifdt.properties.gtype2[index] != undefined &&
                                    ifdt.properties.gtype2[index] != "" && (
                                        ifdt.properties.gtype2[index] === "Cutting" || ifdt.properties.gtype2[index] === "Embankment"
                                    )
                                )) {
                                calcularValue = true;
                                // debug(index + ': ' + ifdt.properties.gtype[index] + ' : ' + ifdt.properties.gtype2[index]);
                            } else {
                                // debug(index + ' : UNDEFINED');
                                calcularValue = false;
                            }
                            break;

                        default:
                            break;
                    }

                    if (calcularValue) {
                        if (f[0].formulaSpec !== undefined) {
                            for (var fspec of f[0].formulaSpec) {
                                if (fspec.name === asset) {
                                    // debug(fspec);
                                    for (var [l1key, level1] of Object.entries(fspec)) {
                                        if (typeof level1 === 'object') {
                                            for (var [fieldkey, field] of Object.entries(level1)) {
                                                if (typeof field === 'object') {
                                                    /**
                                                     * En este nivel tengo los campos de la formula
                                                     * Debo comprobar que tienen valor para poder aplicar la formula
                                                     */
                                                    if (ifdt.properties[fieldkey] !== undefined &&
                                                        ifdt.properties[fieldkey] !== null &&
                                                        ifdt.properties[fieldkey] !== [] &&
                                                        ifdt.properties[fieldkey][index] !== undefined &&
                                                        ifdt.properties[fieldkey][index] !== "") {
                                                        sendData[fieldkey] = ifdt.properties[fieldkey][index];
                                                        // debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                                                    } else {
                                                        // debug(fieldkey + ' : UNDEFINED');
                                                        sendData[fieldkey] = undefined;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // debug(sendData);
                    // debug(fspec);       

                    switch (asset) {
                        case 'Pavements':
                            formResult[index] = calcularValue ? formulasService.criticality('Pavements', fspec, sendData) : undefined;
                            break;
                        case 'Bridges':
                            formResult[index] = calcularValue ? formulasService.criticality('Bridges', fspec, sendData) : undefined;
                            break;
                        case 'Culverts':
                            formResult[index] = calcularValue ? formulasService.criticality('Culverts', fspec, sendData) : undefined;
                            break;
                        case 'Retaining_Walls':

                            //debug('\n\n\n-----------------------------------------------------------------------------------------');
                            //debug(fspec);
                            var fspec1 = extend({}, fspec);
                            for (var [leftkey, leftfield] of Object.entries(fspec1)) {
                                if (leftkey.indexOf('2') >= 0) {
                                    // si el campo tiene un 2, lo quito de la formula por ser el lado dcho
                                    delete fspec1[leftkey];
                                }
                            }
                            //debug(fspec1);
                            var fspec2 = extend({}, fspec);
                            for (var [rightkey, rightfield] of Object.entries(fspec2)) {
                                if (rightkey.indexOf('2') >= 0) {
                                    // si el campo tiene un 2, quito de la formula el que no tiene un 2 por ser el izdo
                                    delete fspec2[rightkey.replace('2', '')];
                                }
                            }
                            //debug(fspec2);

                            if (
                                ifdt.properties.gcode !== undefined &&
                                ifdt.properties.gcode !== null &&
                                ifdt.properties.gcode !== [] &&
                                ifdt.properties.gcode[index] !== undefined &&
                                ifdt.properties.gcode[index] !== "" &&
                                ifdt.properties.gtype !== undefined &&
                                ifdt.properties.gtype !== null &&
                                ifdt.properties.gtype !== [] &&
                                ifdt.properties.gtype[index] !== undefined &&
                                ifdt.properties.gtype[index] !== "" &&
                                ifdt.properties.gtype[index] === "Retaining_walls"
                            ) {
                                // en este caso estoy en la izda
                                if (calcularValue) {
                                    formResultLeft[index] = formulasService.criticality('Retaining_Walls', fspec1, sendData);
                                } else {
                                    if (ifdt.properties.gcriticality !== undefined &&
                                        ifdt.properties.gcriticality !== null &&
                                        ifdt.properties.gcriticality[index] !== undefined &&
                                        ifdt.properties.gcriticality[index] !== null
                                    ) {
                                        formResultLeft[index] = ifdt.properties.gcriticality[index];

                                    } else {
                                        formResultLeft[index] = undefined;

                                    }
                                }

                            } else {
                                if (ifdt.properties.gcode !== undefined &&
                                    ifdt.properties.gcode !== null &&
                                    ifdt.properties.gcode !== [] &&
                                    ifdt.properties.gcode[index] !== undefined &&
                                    ifdt.properties.gcode[index] !== "" &&
                                    ifdt.properties.gcriticality !== undefined &&
                                    ifdt.properties.gcriticality !== null &&
                                    ifdt.properties.gcriticality[index] !== undefined &&
                                    ifdt.properties.gcriticality[index] !== null
                                ) {
                                    formResultLeft[index] = ifdt.properties.gcriticality[index];

                                } else {
                                    formResultLeft[index] = undefined;

                                }
                            }
                            if (
                                ifdt.properties.gtype2 !== undefined &&
                                ifdt.properties.gtype2 !== null &&
                                ifdt.properties.gtype2 !== [] &&
                                ifdt.properties.gtype2[index] !== undefined &&
                                ifdt.properties.gtype2[index] !== "" &&
                                ifdt.properties.gtype2[index] === "Retaining_walls"
                            ) {
                                // en este caso estoy en la dcha
                                if (calcularValue) {
                                    formResultRight[index] = formulasService.criticality('Retaining_Walls', fspec2, sendData);
                                } else {
                                    if (ifdt.properties.gcriticality2 !== undefined &&
                                        ifdt.properties.gcriticality2 !== null &&
                                        ifdt.properties.gcriticality2[index] !== undefined &&
                                        ifdt.properties.gcriticality2[index] !== null
                                    ) {
                                        formResultRight[index] = ifdt.properties.gcriticality2[index];

                                    } else {
                                        formResultRight[index] = undefined;

                                    }
                                }

                            } else {

                                if (ifdt.properties.gcode2 !== undefined &&
                                    ifdt.properties.gcode2 !== null &&
                                    ifdt.properties.gcode2 !== [] &&
                                    ifdt.properties.gcode2[index] !== undefined &&
                                    ifdt.properties.gcode2[index] !== "" &&
                                    ifdt.properties.gcriticality2 !== undefined &&
                                    ifdt.properties.gcriticality2 !== null &&
                                    ifdt.properties.gcriticality2[index] !== undefined &&
                                    ifdt.properties.gcriticality2[index] !== null
                                ) {
                                    formResultRight[index] = ifdt.properties.gcriticality2[index];

                                } else {
                                    formResultRight[index] = undefined;

                                }
                            }
                            break;
                        case 'Earthworks':

                            //debug('\n\n\n-----------------------------------------------------------------------------------------');
                            //debug(fspec);
                            var fspec1 = extend({}, fspec);
                            for (var [leftkey, leftfield] of Object.entries(fspec1)) {
                                if (leftkey.indexOf('2') >= 0) {
                                    // si el campo tiene un 2, lo quito de la formula por ser el lado dcho
                                    delete fspec1[leftkey];
                                }
                            }
                            //debug(fspec1);
                            var fspec2 = extend({}, fspec);
                            for (var [rightkey, rightfield] of Object.entries(fspec2)) {
                                if (rightkey.indexOf('2') >= 0) {
                                    // si el campo tiene un 2, quito de la formula el que no tiene un 2 por ser el izdo
                                    delete fspec2[rightkey.replace('2', '')];
                                }
                            }
                            //debug(fspec2);

                            if (
                                ifdt.properties.gcode !== undefined &&
                                ifdt.properties.gcode !== null &&
                                ifdt.properties.gcode !== [] &&
                                ifdt.properties.gcode[index] !== undefined &&
                                ifdt.properties.gcode[index] !== "" &&
                                ifdt.properties.gtype !== undefined &&
                                ifdt.properties.gtype !== null &&
                                ifdt.properties.gtype !== [] &&
                                ifdt.properties.gtype[index] !== undefined &&
                                ifdt.properties.gtype[index] !== "" && (
                                    ifdt.properties.gtype[index] === "Cutting" || ifdt.properties.gtype[index] === "Embankment"
                                )

                            ) {
                                // en este caso estoy en la izda
                                if (calcularValue) {
                                    formResultLeft[index] = formulasService.criticality('Earthworks', fspec1, sendData);
                                } else {
                                    if (
                                        ifdt.properties.gcriticality !== undefined &&
                                        ifdt.properties.gcriticality !== null &&
                                        ifdt.properties.gcriticality[index] !== undefined &&
                                        ifdt.properties.gcriticality[index] !== null
                                    ) {
                                        formResultLeft[index] = ifdt.properties.gcriticality[index];

                                    } else {
                                        formResultLeft[index] = undefined;

                                    }
                                }

                            } else {

                                if (
                                    ifdt.properties.gcode !== undefined &&
                                    ifdt.properties.gcode !== null &&
                                    ifdt.properties.gcode !== [] &&
                                    ifdt.properties.gcode[index] !== undefined &&
                                    ifdt.properties.gcode[index] !== "" &&
                                    ifdt.properties.gcriticality !== undefined &&
                                    ifdt.properties.gcriticality !== null &&
                                    ifdt.properties.gcriticality[index] !== undefined &&
                                    ifdt.properties.gcriticality[index] !== null
                                ) {
                                    formResultLeft[index] = ifdt.properties.gcriticality[index];

                                } else {
                                    formResultLeft[index] = undefined;

                                }
                            }
                            if (
                                ifdt.properties.gcode2 !== undefined &&
                                ifdt.properties.gcode2 !== null &&
                                ifdt.properties.gcode2 !== [] &&
                                ifdt.properties.gcode2[index] !== undefined &&
                                ifdt.properties.gcode2[index] !== "" &&
                                ifdt.properties.gtype2 !== undefined &&
                                ifdt.properties.gtype2 !== null &&
                                ifdt.properties.gtype2 !== [] &&
                                ifdt.properties.gtype2[index] !== undefined &&
                                ifdt.properties.gtype2[index] !== "" && (
                                    ifdt.properties.gtype2[index] === "Cutting" || ifdt.properties.gtype2[index] === "Embankment"
                                )
                            ) {
                                // en este caso estoy en la dcha
                                if (calcularValue) {
                                    formResultRight[index] = formulasService.criticality('Earthworks', fspec2, sendData);
                                } else {
                                    if (ifdt.properties.gcriticality2 !== undefined &&
                                        ifdt.properties.gcriticality2 !== null &&
                                        ifdt.properties.gcriticality2[index] !== undefined &&
                                        ifdt.properties.gcriticality2[index] !== null
                                    ) {
                                        formResultRight[index] = ifdt.properties.gcriticality2[index];

                                    } else {
                                        formResultRight[index] = undefined;

                                    }
                                }

                            } else {
                                if (
                                    ifdt.properties.gcode2 !== undefined &&
                                    ifdt.properties.gcode2 !== null &&
                                    ifdt.properties.gcode2 !== [] &&
                                    ifdt.properties.gcode2[index] !== undefined &&
                                    ifdt.properties.gcode2[index] !== "" &&
                                    ifdt.properties.gcriticality2 !== undefined &&
                                    ifdt.properties.gcriticality2 !== null &&
                                    ifdt.properties.gcriticality2[index] !== undefined &&
                                    ifdt.properties.gcriticality2[index] !== null
                                ) {
                                    formResultRight[index] = ifdt.properties.gcriticality2[index];

                                } else {
                                    formResultRight[index] = undefined;

                                }
                            }
                            break;
                        default:
                            break;
                    }

                }
                switch (asset) {
                    case 'Pavements':
                        ifdt.properties.rcriticality = formResult;
                        break;
                    case 'Bridges':
                        ifdt.properties.bcriticality = formResult;
                        break;
                    case 'Culverts':
                        ifdt.properties.Ccriticality = formResult;
                        break;
                    case 'Retaining_Walls':
                        ifdt.properties.gcriticality = formResultLeft;
                        ifdt.properties.gcriticality2 = formResultRight;
                        break;
                    case 'Earthworks':
                        ifdt.properties.gcriticality = formResultLeft;
                        ifdt.properties.gcriticality2 = formResultRight;
                        break;

                    default:
                        break;
                }
                ifdt.updated_at = new Date();
                ifdt.save(function (err, isaved) {
                    if (err) {
                        res.send(500, err.message);
                    }
                    tracksUpdated++;
                });
            });
        }
        ret.tracksUpdated = tracksUpdated;
        debug(tracksUpdated);
        res.status(200).jsonp(ret);

    });

});
/* POST update_formulas_tracks_condition */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks_condition/:formula/:asset', async function (req, res, next) {
    debug('API /V1/update_formulas_tracks_condition/');
    var postData = extend({}, req.body);
    var tracksUpdated = 0;
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    debug(postData);
    var form;
    // var formula = Object.keys(postData)[0];
    var asset = req.params.asset;
    var formula = 'Condition';
    debug(formula);
    await Formula.find({
        "name": formula
    }).exec(async function (err, f) {
        if (err) {
            res.send(500, err.message);
        }
        form = f[0];
    });
    // debug(form);
    var wherearr = [];
    // for (var fv of form.formulaSpec) {
    //     if (wherearr.indexOf(fv.WEIGHTS.dbfield) < 0 && fv.WEIGHTS.dbfield !== '--')
    //         wherearr.push(fv.WEIGHTS.dbfield);
    // }
    var selectjson = {
        "geometry.coordinates": 1,
        properties: []
    };
    // Add codes select
    wherearr.push('Ccode');
    wherearr.push('bcode');
    wherearr.push('gcode');
    wherearr.push('gcode2');

    for (var w of wherearr) {
        selectjson.properties[w] = 1;
    }


    var tracksUpdated2 = 0;
    debug(selectjson);
    switch (asset) {
        case 'Culverts':
            // debug(form);
            // Infodatatrack.find({}, selectjson).exec(function (err, ifdts) {
            await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }

                for (var ifdt of ifdts) {
                    tracksUpdated2++;
                    //debug(ifdt._id);
                    // debug(ifdt.geometry.coordinates);
                    var valueconditionsr = [];
                    debug(tracksUpdated2);
                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {

                        //debug(form.formulaSpec.length);
                        for (var f = 0; f < form.formulaSpec.length; f++) {
                            var totalScoring = Number.MAX_VALUE;
                            switch (form.formulaSpec[f].name) {
                                case 'Culverts':
                                    if (ifdt.properties.Ccode.length > 0) {
                                        if (ifdt.properties.Ccode !== undefined && ifdt.properties.Ccode !== [] &&
                                            ifdt.properties.Ccode[i] !== null &&
                                            ifdt.properties.Ccode[i] !== "") {
                                            // debug(ifdt.properties.Ccode);
                                            // TODO: calculo de la formula para Pavements -- Sacarlo a un service
                                            // debug('form.formulaSpec[f].name' + JSON.stringify(ifdt));
                                            var numberOfScores = 0;
                                            if (ifdt.properties.CDamages.length > 0) {
                                                for (score in form.formulaSpec[f].MainFactor.Damages.scoring) {
                                                    // debug(score.toString.toUpperCase)
                                                    if (score !== undefined && score !== null) {
                                                        // debug('score ' + score.toString().toUpperCase());
                                                        // debug('ifdt.CDamages ' + score.toString().toUpperCase());
                                                        if (ifdt.properties.CDamages.toString().toUpperCase().indexOf(score.toString().toUpperCase()) >= 0) {
                                                            totalScoring = totalScoring < form.formulaSpec[f].MainFactor.Damages.scoring[score] ?
                                                                totalScoring : form.formulaSpec[f].MainFactor.Damages.scoring[score];
                                                            numberOfScores++;
                                                            // debug(form.formulaSpec[f].MainFactor.Damages.scoring + ' ' + form.formulaSpec[f].MainFactor.Damages.scoring[score]);
                                                        }
                                                    }
                                                }
                                            } else {
                                                totalScoring = 100;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? 0 : totalScoring;
                                            // debug(totalScoring);

                                            if (numberOfScores > 2) {
                                                totalScoring *= 0.9;
                                            } else {
                                                // existance of several damages
                                                totalScoring *= (-0.1 * numberOfScores) / 3 + 1;
                                            }

                                            //  clearing required
                                            if (ifdt.properties.Cclearing[i].length > 0) {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.ClearingRequired.scoring) {
                                                    // debug(score.toString.toUpperCase)
                                                    if (score !== undefined && score !== null) {
                                                        // debug('score ' + score.toString().toUpperCase());
                                                        // debug('ifdt.Cclearing ' + score.toString().toUpperCase());
                                                        if (ifdt.properties.Cclearing[i].toString().toUpperCase().indexOf(score.toString().toUpperCase()) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.ClearingRequired.scoring[score]
                                                            // debug(form.formulaSpec[f].MainFactor.Damages.scoring + ' ' + form.formulaSpec[f].MainFactor.Damages.scoring[score]);
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }
                                            } else {

                                                totalScoring *= 0.98;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? null : totalScoring;
                                            valueconditionsr.push(totalScoring / 100);
                                            //debug(totalScoring + '\n');
                                        } else {
                                            valueconditionsr.push("");
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }



                    }
                    tracksUpdated++;
                    debug(ifdt._id);
                    debug(valueconditionsr.toString());
                    debug(tracksUpdated);

                    var conditions = {
                        _id: ifdt._id
                    };

                    var query = {
                        $set: {
                            "properties.Ccondition": valueconditionsr
                        }
                    }

                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {
                            debug(err.message);
                        }
                        // debug(iup);  

                    });





                }

                // res.status(200).jsonp(ret);
            });

            tracksUpdated2 = tracksUpdated;
            ret.tracksUpdated = tracksUpdated;
            debug(tracksUpdated);
            res.status(200).jsonp(ret);
            break;
        case 'Retaining_Walls':
            // debug(form);
            // Infodatatrack.find({}, selectjson).exec(function (err, ifdts) {
            await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }

                for (var ifdt of ifdts) {
                    tracksUpdated2++;
                    //debug(ifdt._id);
                    // debug(ifdt.geometry.coordinates);
                    var valueconditionsr = [];
                    debug('tracksUpdated2: ' + tracksUpdated2);
                    debug(ifdt._id);

                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        var coincidencias = 0;
                        //debug(form.formulaSpec.length);
                        for (var f = 0; f < form.formulaSpec.length; f++) {
                            var totalScoring = Number.MAX_VALUE;
                            switch (form.formulaSpec[f].name) {
                                case 'Retaining_Walls':
                                    //////////////////////INICIO///////////////////////////////
                                    // debug('ifdt.properties.gcode.length: ' + ifdt.properties.gcode.length);
                                    if (ifdt.properties.gcode.length > 0) {
                                        if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode !== [] &&
                                            ifdt.properties.gcode[i] !== null &&
                                            ifdt.properties.gcode[i] !== "") {
                                            // debug(ifdt.properties.gcode);
                                            // TODO: calculo de la formula para Pavements -- Sacarlo a un service
                                            // debug('form.formulaSpec[f].name' + JSON.stringify(ifdt));
                                            var numberOfScores = 0;
                                            var numberOfTypeOfFailureProcess = 0;
                                            // debug(ifdt.properties.gtypefailure.length);
                                            if (ifdt.properties.gtypefailure.length > 0) {
                                                for (TypeOfFailureProcess1 in form.formulaSpec[f].Damages.TypeOfFailureProcess) {
                                                    form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight
                                                    // debug('1  ' + Object.keys(form.formulaSpec[f].Damages.TypeOfFailureProcess));
                                                    // debug('1.1 ' + Object.keys(form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1]));
                                                    // debug('1.1 ' + form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight);
                                                    // debug('1.1 ' + Object.keys(form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring));
                                                    // debug('1.1 ' + form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring['Unknown']);
                                                    // debug('2  ' + TypeOfFailureProcess1.toString().toUpperCase());
                                                    // debug('3  ' + ifdt.properties.gtypefailure[i]);
                                                    if (TypeOfFailureProcess1 !== undefined && TypeOfFailureProcess1 !== null) {
                                                        // debug('5  ' + TypeOfFailureProcess1.scoring);
                                                        for (score in form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring) {
                                                            // while (true) { ; }
                                                            // debug('6.0.0  ' + score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                            // debug('6.0.1  ' + ifdt.properties.gintensityfailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                            // debug('6.1.0  ' + TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                            // debug('6.1.1  ' + ifdt.properties.gtypefailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));

                                                            if (ifdt.properties.gtypefailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                // debug(ifdt.properties.gtypefailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')));
                                                                // debug(ifdt.properties.gintensityfailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')));

                                                                if (ifdt.properties.gintensityfailure[i].toString().toUpperCase().indexOf(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                    // while (true) { ; };
                                                                    debug('6.0.0  ' + score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                                    debug('6.0.1  ' + ifdt.properties.gintensityfailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                                    debug('6.1.0  ' + TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                                    debug('6.1.1  ' + ifdt.properties.gtypefailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));

                                                                    coincidencias++;
                                                                    debug(coincidencias);
                                                                    debug('score:  ' + form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')]);
                                                                    debug('weight:  ' + form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight);

                                                                    totalScoring = totalScoring < form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight ?
                                                                        totalScoring : form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight;
                                                                    esnull = true;
                                                                    debug('totalScoring1:  ' + totalScoring);

                                                                    numberOfScores++;
                                                                    totalScoring *= (Number(ifdt.properties.gextentfailure[i]) !== ifdt.properties.gextentfailure[i] || ifdt.properties.gextentfailure[i] === 0) ? 1.00 : (
                                                                        (ifdt.properties.gextentfailure[i] <= 0.2) ? 1 : ((ifdt.properties.gextentfailure[i] <= 0.4) ? 9 : (
                                                                            (ifdt.properties.gextentfailure[i] <= 0.6) ? 0.8 : ((ifdt.properties.gextentfailure[i] <= 0.8) ? 0.7 : (0.5)))));
                                                                    debug('totalScoring2:  ' + totalScoring);

                                                                    debug('gextentfailure: ' + ifdt.properties.gextentfailure[i]);


                                                                }

                                                            }







                                                        }


                                                    }
                                                }
                                                debug('totalScoring: ' + totalScoring);
                                            } else {
                                                totalScoring = 100;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? 0 : totalScoring;
                                            // debug(totalScoring);

                                            // Existance of several damages
                                            if (numberOfScores > 2) {
                                                totalScoring *= 0.9;
                                            } else {
                                                // existance of several damages
                                                totalScoring *= (-0.1 * numberOfScores) / 3 + 1;
                                            }

                                            // debug('ifdt.properties.gnature:    ' + ifdt.properties.gnature);
                                            // debug('ifdt.properties.gmaterial:    ' + ifdt.properties.gmaterial);
                                            //  CORRECTIVE FACTORS - MATERIAL
                                            if (ifdt.properties.gmaterial !== undefined &&
                                                ifdt.properties.gmaterial.length > 0 &&
                                                ifdt.properties.gmaterial[i] !== null &&
                                                ifdt.properties.gmaterial[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.Material.NA.scoring) {
                                                    // debug(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''))
                                                    if (score !== undefined && score !== null) {
                                                        // debug('score ' + score);
                                                        // debug('ifdt.gmaterial ' + ifdt.properties.gmaterial[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                        if (ifdt.properties.gmaterial[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.Material.NA.scoring[score];
                                                            // debug(score + ' ' + form.formulaSpec[f].CorrectiveFactors.Material.NA.scoring[score]);
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }

                                            } else {

                                                totalScoring *= 0.98;
                                            }
                                    //  CORRECTIVE FACTORS - VEGETATION
                                    if (ifdt.properties.gnature !== undefined && ifdt.properties.gnature.length > 0 &&
                                        ifdt.properties.gnature[i] !== null &&
                                        ifdt.properties.gnature[i] !== "") {
                                        for (score in form.formulaSpec[f].CorrectiveFactors.Vegetation.NA.scoring) {
                                            // debug(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''))
                                            if (score !== undefined && score !== null) {
                                                // debug('score ' + score);
                                                // debug('ifdt.gnature ' + ifdt.properties.gnature[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                if (ifdt.properties.gnature[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                    totalScoring *= form.formulaSpec[f].CorrectiveFactors.Vegetation.NA.scoring[score];
                                                    // debug(score + ' ' + form.formulaSpec[f].CorrectiveFactors.Vegetation.NA.scoring[score]);
                                                } else {

                                                    totalScoring *= 1;
                                                }
                                            }
                                        }
                                    } else {

                                        totalScoring *= 0.8;
                                    }

                                    totalScoring = (totalScoring === Number.MAX_VALUE) ? null : totalScoring;
                                    valueconditionsr.push(totalScoring);
                                    //debug(totalScoring + '\n');
                                } else {
                                    valueconditionsr.push("");
                                }
                            }
                            // debug(valueconditionsr);
                            ///////////////////////FINAL//////////////////////////////////////////////

                            break;
                                default:
                                    break;
                            }
                        }



                    }
                    // debug('coincidencias: ' + coincidencias);
                    tracksUpdated++;
                    // debug(valueconditionsr.toString());
                    // debug(tracksUpdated);

                    var conditions = {
                        _id: ifdt._id
                    };

                    var query = {
                        $set: {
                            "properties.gcondition": valueconditionsr
                        }
                    }

                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {
                            debug(err.message);
                        }
                        // debug(iup);  

                    });





                }

                // res.status(200).jsonp(ret);
            });

            tracksUpdated2 = tracksUpdated;
            ret.tracksUpdated = tracksUpdated;
            debug('tracksUpdated: ' + tracksUpdated);
            res.status(200).jsonp(ret);

            // debug(form);
            // Infodatatrack.find({}, selectjson).exec(function (err, ifdts) {
            await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }

                for (var ifdt of ifdts) {
                    tracksUpdated2++;
                    //debug(ifdt._id);
                    // debug(ifdt.geometry.coordinates);
                    var valueconditionsr = [];
                    debug('tracksUpdated2: ' + tracksUpdated2);
                    debug(ifdt._id);

                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        var coincidencias = 0;
                        //debug(form.formulaSpec.length);
                        for (var f = 0; f < form.formulaSpec.length; f++) {
                            var totalScoring = Number.MAX_VALUE;
                            switch (form.formulaSpec[f].name) {
                                case 'Retaining_Walls':
                                    //////////////////////INICIO///////////////////////////////
                                    // debug('ifdt.properties.gcode2.length: ' + ifdt.properties.gcode2.length);
                                    if (ifdt.properties.gcode2.length > 0) {
                                        if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2 !== [] &&
                                            ifdt.properties.gcode2[i] !== null &&
                                            ifdt.properties.gcode2[i] !== "") {
                                            // debug(ifdt.properties.gcode2);
                                            // TODO: calculo de la formula para Pavements -- Sacarlo a un service
                                            // debug('form.formulaSpec[f].name' + JSON.stringify(ifdt));
                                            var numberOfScores = 0;
                                            var numberOfTypeOfFailureProcess = 0;
                                            // debug(ifdt.properties.gtypefailure2.length);
                                            if (ifdt.properties.gtypefailure2.length > 0) {
                                                for (TypeOfFailureProcess1 in form.formulaSpec[f].Damages.TypeOfFailureProcess) {
                                                    form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight
                                                    // debug('1  ' + Object.keys(form.formulaSpec[f].Damages.TypeOfFailureProcess));
                                                    // debug('1.1 ' + Object.keys(form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1]));
                                                    // debug('1.1 ' + form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight);
                                                    // debug('1.1 ' + Object.keys(form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring));
                                                    // debug('1.1 ' + form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring['Unknown']);
                                                    // debug('2  ' + TypeOfFailureProcess1.toString().toUpperCase());
                                                    // debug('3  ' + ifdt.properties.gtypefailure2[i]);
                                                    if (TypeOfFailureProcess1 !== undefined && TypeOfFailureProcess1 !== null) {
                                                        // debug('5  ' + TypeOfFailureProcess1.scoring);
                                                        for (score in form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring) {
                                                            // while (true) { ; }
                                                            // debug('6.0.0  ' + score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                            // debug('6.0.1  ' + ifdt.properties.gintensityfailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                            // debug('6.1.0  ' + TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                            // debug('6.1.1  ' + ifdt.properties.gtypefailure2[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));

                                                            if (ifdt.properties.gtypefailure2[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                // debug(ifdt.properties.gtypefailure2[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')));
                                                                // debug(ifdt.properties.gintensityfailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')));

                                                                if (ifdt.properties.gintensityfailure[i].toString().toUpperCase().indexOf(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                    // while (true) { ; };
                                                                    debug('6.0.0  ' + score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                                    debug('6.0.1  ' + ifdt.properties.gintensityfailure[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                                    debug('6.1.0  ' + TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                                    debug('6.1.1  ' + ifdt.properties.gtypefailure2[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));

                                                                    coincidencias++;
                                                                    debug(coincidencias);
                                                                    debug('score:  ' + form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')]);
                                                                    debug('weight:  ' + form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight);

                                                                    totalScoring = totalScoring < form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight ?
                                                                        totalScoring : form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight;
                                                                    esnull = true;
                                                                    debug('totalScoring1:  ' + totalScoring);

                                                                    numberOfScores++;
                                                                    totalScoring *= (Number(ifdt.properties.gextentfailure2[i]) !== ifdt.properties.gextentfailure2[i] || ifdt.properties.gextentfailure2[i] === 0) ? 1.00 : (
                                                                        (ifdt.properties.gextentfailure2[i] <= 0.2) ? 1 : ((ifdt.properties.gextentfailure2[i] <= 0.4) ? 9 : (
                                                                            (ifdt.properties.gextentfailure2[i] <= 0.6) ? 0.8 : ((ifdt.properties.gextentfailure2[i] <= 0.8) ? 0.7 : (0.5)))));
                                                                    debug('totalScoring2:  ' + totalScoring);

                                                                    debug('gextentfailure2: ' + ifdt.properties.gextentfailure2[i]);


                                                                }

                                                            }







                                                        }


                                                    }
                                                }
                                                debug('totalScoring: ' + totalScoring);
                                            } else {
                                                totalScoring = 100;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? 0 : totalScoring;
                                            // debug(totalScoring);

                                            // Existance of several damages
                                            if (numberOfScores > 2) {
                                                totalScoring *= 0.9;
                                            } else {
                                                // existance of several damages
                                                totalScoring *= (-0.1 * numberOfScores) / 3 + 1;
                                            }

                                            // debug('ifdt.properties.gnature2:    ' + ifdt.properties.gnature2);
                                            // debug('ifdt.properties.gmaterial2:    ' + ifdt.properties.gmaterial2);
                                            //  CORRECTIVE FACTORS - MATERIAL
                                            if (ifdt.properties.gmaterial2 !== undefined &&
                                                ifdt.properties.gmaterial2.length > 0 &&
                                                ifdt.properties.gmaterial2[i] !== null &&
                                                ifdt.properties.gmaterial2[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.Material.NA.scoring) {
                                                    // debug(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''))
                                                    if (score !== undefined && score !== null) {
                                                        // debug('score ' + score);
                                                        // debug('ifdt.gmaterial2 ' + ifdt.properties.gmaterial2[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                        if (ifdt.properties.gmaterial2[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.Material.NA.scoring[score];
                                                            // debug(score + ' ' + form.formulaSpec[f].CorrectiveFactors.Material.NA.scoring[score]);
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }

                                            } else {

                                                totalScoring *= 0.98;
                                            }
                                            //  CORRECTIVE FACTORS - VEGETATION
                                            if (ifdt.properties.gnature2 !== undefined && ifdt.properties.gnature2.length > 0 &&
                                                ifdt.properties.gnature2[i] !== null &&
                                                ifdt.properties.gnature2[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.Vegetation.NA.scoring) {
                                                    // debug(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''))
                                                    if (score !== undefined && score !== null) {
                                                        // debug('score ' + score);
                                                        // debug('ifdt.gnature2 ' + ifdt.properties.gnature2[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, ''));
                                                        if (ifdt.properties.gnature2[i].toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toString().toUpperCase().replace(/[-+()\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.Vegetation.NA.scoring[score];
                                                            // debug(score + ' ' + form.formulaSpec[f].CorrectiveFactors.Vegetation.NA.scoring[score]);
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }
                                            } else {

                                                totalScoring *= 0.8;
                                            }

                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? null : totalScoring;
                                            valueconditionsr.push(totalScoring);
                                            //debug(totalScoring + '\n');
                                        } else {
                                            valueconditionsr.push("");
                                        }
                                    }
                                    // debug(valueconditionsr);
                                    ///////////////////////FINAL//////////////////////////////////////////////

                                    break;
                                default:
                                    break;
                            }
                        }



                    }
                    // debug('coincidencias: ' + coincidencias);
                    tracksUpdated++;
                    // debug(valueconditionsr.toString());
                    // debug(tracksUpdated);

                    var conditions = {
                        _id: ifdt._id
                    };

                    var query = {
                        $set: {
                            "properties.gcondition2": valueconditionsr
                        }
                    }

                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {
                            debug(err.message);
                        }
                        // debug(iup);  

                    });





                }

                // res.status(200).jsonp(ret);
            });

            tracksUpdated2 = tracksUpdated;
            ret.tracksUpdated = tracksUpdated;
            debug('tracksUpdated: ' + tracksUpdated);
            res.status(200).jsonp(ret);
            break;
        default:
            break;
    }

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

    debug(arrField);

    Formula.find({
        "name": arrField[0]
    }).exec(function (err, f) {
        debug('Formula.find ' + arrField[0]);
        if (err) {
            res.send(500, err.message);
        }
        /**
         * Si es Length = 3 estoy en las formulas de primer nivel
         * Para Length = 4 estoy en el segundo level
         * Para Length = 5 estoy en scoring
         */
        console.log(arrField[0]);
        switch (arrField[0]) {
            case 'Condition':
                var arrFieldShift = arrField.slice(0);
                arrFieldShift.shift();
                posicion = arrFieldShift.toString().replace(/,/g, '.');
                indiceJson = 0;
                var formSave = new Formula(f[0]);
                comando = 'formSave' + '.' + posicion + '=' + value;


                console.log('\n\n\n' + comando + '\n\n\n');
                eval(comando);

                // res.send(f);
                formSave.save(function (err, fsaved) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.status(200).jsonp(ret);

                });


                break;


            case 'AssetCriticality':
                if (arrField.length == 3) {
                    for (var [key, fspec] of Object.entries(f[0].formulaSpec)) {
                        //debug(fspec.name);
                        if (fspec.name === arrField[1]) {
                            var formSave = new Formula(f[0]);
                            // debug('formSave: \n' + JSON.stringify(formSave));
                            // debug(formSave.formulaSpec[key][arrField[2]].weight);
                            // debug(key + ' ' + value);
                            formSave.formulaSpec[key][arrField[2]].weight = value;
                            formSave.save(function (err, fsaved) {
                                if (err) {
                                    return res.status(500).send(err.message);
                                }
                                res.status(200).jsonp(ret);

                            });

                        }

                    };
                } else if (arrField.length == 4) {
                    for (var [key, fspec] of Object.entries(f[0].formulaSpec)) {
                        //debug(fspec.name);
                        if (fspec.name === arrField[1]) {
                            var formSave = new Formula(f[0]);
                            // debug('formSave: \n' + JSON.stringify(formSave));
                            // debug(formSave.formulaSpec[key][arrField[2]].weight);
                            // debug(key + ' ' + value);
                            formSave.formulaSpec[key][arrField[2]][arrField[3]].weight = value;
                            formSave.save(function (err, fsaved) {
                                if (err) {
                                    return res.status(500).send(err.message);
                                }
                                res.status(200).jsonp(ret);

                            });

                        }

                    };
                } else if (arrField.length == 5) {
                    for (var [key, fspec] of Object.entries(f[0].formulaSpec)) {
                        //debug(fspec.name);
                        if (fspec.name === arrField[1]) {
                            var formSave = new Formula(f[0]);
                            // debug('formSave: \n' + JSON.stringify(formSave));
                            // debug(formSave.formulaSpec[key][arrField[2]].weight);
                            // debug(key + ' ' + value);
                            formSave.formulaSpec[key][arrField[2]][arrField[3]].scoring[arrField[4]] = value;
                            formSave.save(function (err, fsaved) {
                                if (err) {
                                    return res.status(500).send(err.message);
                                }
                                res.status(200).jsonp(ret);

                            });

                        }

                    };
                }
                break;

            case 'AssetResponse':
                var field = field_name.replace(arrField[0] + '__', '');
                debug(field);
                var formSave = new Formula(f[0]);
                // debug(formSave);
                // Busco el campo @field en la Formula
                for (var [k, fspec] of f[0].formulaSpec.entries()) {
                    // debug(fspec.WEIGHTS);
                    // debug(fspec.score);
                    if (field === fspec.WEIGHTS.fieldname) {
                        formSave.formulaSpec[k].WEIGHTS.value = value;
                        debug(k);
                    } else if (field === fspec.score.fieldname) {
                        formSave.formulaSpec[k].score.value = value;
                        debug(k);

                    }
                }
                formSave.save(function (err, fsaved) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.status(200).jsonp(ret);

                });
                break;

            case 'AssetSensitivity':
                var field = field_name.replace(arrField[0] + '__', '');
                debug(field);
                var formSave = new Formula(f[0]);
                // debug(formSave);
                // Busco el campo @field en la Formula
                for (var [k, fspec] of f[0].formulaSpec.entries()) {
                    // debug(fspec.WEIGHTS);
                    // debug(fspec.score);
                    if (field === fspec.WEIGHTS.fieldname) {
                        formSave.formulaSpec[k].WEIGHTS.value = value;
                        debug(k);
                    }
                }
                formSave.save(function (err, fsaved) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.status(200).jsonp(ret);

                });
                break;

            default:
                break;
        }

    });

});
/* POST get_formulas_tracks */
router.post('/V1/get_formulas_tracks/', function (req, res, next) {
    // debug('API /V1/update_field/');
    var postData = extend({}, req.body);
    debug(postData);
    var ret = {
        "result": "OK"
    };

    switch (postData.formname) {
        case 'Criticality':
            debug('Criticality');
            var orArr = [];
            var orAssetArr = [];
            var andArr = [];
            var catArr = [];
            var promises = [];

            for (var f of postData.filter) {
                switch (f) {
                    case 'Bridge':
                        for (var f of postData.form) {
                            // debug(f);
                            // debug(formulasService.criticalityValue(f).score.min);
                            // debug(formulasService.criticalityValue(f).score.max);
                            orArr.push({
                                "properties.bcriticality": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.bcode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // debug(catArr);


                        break;
                    case 'Culvert':
                        for (var f of postData.form) {
                            // debug(f);
                            // debug(formulasService.criticalityValue(f).score.min);
                            // debug(formulasService.criticalityValue(f).score.max);
                            orArr.push({
                                "properties.Ccriticality": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.Ccode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // debug(catArr);

                        break;
                    case 'Geotechnical':
                        for (var f of postData.form) {
                            // debug(f);
                            // debug(formulasService.criticalityValue(f).score.min);
                            // debug(formulasService.criticalityValue(f).score.max);
                            orArr.push({
                                "properties.gcriticality": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                            orArr.push({
                                "properties.gcriticality2": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.gcode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        orAssetArr.push({
                            "properties.gcode2": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // debug(catArr);
                        break;

                    default:
                        for (var f of postData.form) {
                            // debug(f);
                            // debug(formulasService.criticalityValue(f).score.min);
                            // debug(formulasService.criticalityValue(f).score.max);
                            orArr.push({
                                "properties.rcriticality": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.rcategory": {
                                $in: postData.filterPav
                            }
                        });
                        // debug(catArr);



                        break;
                }


            }
            andArr.push({
                $or: orAssetArr
            });
            andArr.push({
                $or: orArr
            });

            debug(JSON.stringify(andArr));

            promises.push(Infodatatrack.find({
                $and: andArr

            }).exec(function (err, tracks) {
                if (err) {
                    res.send(500, err.message);
                }
                debug(tracks.length);
                return tracks;

            }));

            Promise.all(promises).then(function (values) {
                var tracks = [];
                var resultados = [];
                var ant = 0;
                var antBridge = 0;
                var antCulvert = 0;
                var antGeo = 0;
                var antGeo2 = 0;
                var geoJson = {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    properties: {
                        rcriticality: [],
                        name: ""
                    }
                };
                var geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                var geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                var geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                var geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                var geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));

                if (values.length > 0) {
                    values.forEach(function (val, index) {
                        for (var v of val) {
                            // debug(v.properties.name);
                            ant = 0;
                            antBridge = 0;
                            antCulvert = 0;
                            antGeo = 0;
                            antGeo2 = 0;
                            for (var [key, cval] of v.geometry.coordinates.entries()) {
                                for (var f of postData.form) {
                                    for (var filter of postData.filter) {
                                        switch (filter) {
                                            case 'Bridge':
                                                if (v.properties.bcriticality[key] !== null &&
                                                    v.properties.bcriticality[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.bcriticality[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (antBridge == 0) antBridge = key - 1;
                                                    if (key !== (antBridge + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonBri);
                                                        geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Bri---' + key + ' : ant ' + (antBridge + 1) + ' - ' + cval + ' #Crit: ' + v.properties.bcriticality[key] + ' - ' + f);
                                                    geoJsonBri.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    antBridge = key;
                                                }
                                                break;
                                            case 'Culvert':
                                                if (v.properties.Ccriticality[key] !== null &&
                                                    v.properties.Ccriticality[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.Ccriticality[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (antCulvert == 0) antCulvert = key - 1;
                                                    if (key !== (antCulvert + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonCul);
                                                        geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Cul---' + key + ' : ant ' + (antCulvert + 1) + ' - ' + cval + ' #Crit: ' + v.properties.Ccriticality[key] + ' - ' + f);
                                                    geoJsonCul.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonCul.geometry.coordinates.push(cval);
                                                    antCulvert = key;
                                                }
                                                break;
                                            case 'Geotechnical':
                                                if (v.properties.gcriticality[key] !== null &&
                                                    v.properties.gcriticality[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.gcriticality[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (antGeo == 0) antGeo = key - 1;
                                                    if (key !== (antGeo + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonGeo);
                                                        geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Geo---' + key + ' : ant ' + (antGeo + 1) + ' - ' + cval + ' #Crit: ' + v.properties.gcriticality[key] + ' - ' + f);
                                                    geoJsonGeo.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonGeo.geometry.coordinates.push(cval);
                                                    antGeo = key;
                                                }
                                                if (v.properties.gcriticality2[key] !== null &&
                                                    v.properties.gcriticality2[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.gcriticality2[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (antGeo2 == 0) antGeo2 = key - 1;
                                                    if (key !== (antGeo2 + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonGeo2);
                                                        geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Geo2---' + key + ' : ant ' + (antGeo2 + 1) + ' - ' + cval + ' #Crit: ' + v.properties.gcriticality2[key] + ' - ' + f);
                                                    geoJsonGeo2.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonGeo2.geometry.coordinates.push(cval);
                                                    antGeo2 = key;
                                                }
                                                break;
                                            default:
                                                if (v.properties.rcriticality[key] !== null &&
                                                    v.properties.rcriticality[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.rcriticality[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (ant == 0) ant = key - 1;
                                                    if (key !== (ant + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonPav);
                                                        geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Pav ---' + key + ' : ant ' + (ant + 1) + ' - ' + cval + ' #Crit: ' + v.properties.rcriticality[key] + ' - ' + f);
                                                    geoJsonPav.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonPav.geometry.coordinates.push(cval);
                                                    ant = key;
                                                }
                                                break;
                                        }
                                    }

                                }
                                if (key + 1 == v.geometry.coordinates.length) {
                                    // debug('-- new geojson --')
                                    tracks.push(geoJsonPav);
                                    tracks.push(geoJsonBri);
                                    tracks.push(geoJsonCul);
                                    tracks.push(geoJsonGeo);
                                    tracks.push(geoJsonGeo2);
                                    geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));
                                }

                            }
                            // tracks.push(v);
                        }
                    });
                }
                // debug(tracks.length);

                res.status(200).jsonp(tracks);

            });

            break;

        case 'Condition':
            debug('Condition');
            var orArr = [];
            var orAssetArr = [];
            var andArr = [];
            var catArr = [];
            var promises = [];

            for (var f of postData.filter) {
                switch (f) {
                    case 'Bridges':
                        for (var f of postData.form) {
                            // debug(f);
                            // debug(formulasService.conditionValue(f).score.min);
                            // debug(formulasService.conditionValue(f).score.max);
                            orArr.push({
                                "properties.bcondition": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.bcode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // debug(catArr);


                        break;
                    case 'Culverts':
                        for (var f of postData.form) {
                            // debug(f);
                            // debug(formulasService.conditionValue(f).score.min);
                            // debug(formulasService.conditionValue(f).score.max);
                            orArr.push({
                                "properties.Ccondition": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.Ccode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // debug(catArr);

                        break;
                    case 'Cuttings_Embankments':
                        for (var f of postData.form) {
                            // debug(f);
                            // debug(formulasService.conditionValue(f).score.min);
                            // debug(formulasService.conditionValue(f).score.max);
                            orArr.push({
                                "properties.gcondition": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                            orArr.push({
                                "properties.gcondition2": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.gcode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        orAssetArr.push({
                            "properties.gcode2": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // debug(catArr);
                        break;

                    default: // retainning walls
                        for (var f of postData.form) {
                            // debug(f);
                            // debug(formulasService.conditionValue(f).score.min);
                            // debug(formulasService.conditionValue(f).score.max);
                            orArr.push({
                                "properties.rcondition": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.rcategory": {
                                $in: postData.filterPav
                            }
                        });
                        // debug(catArr);



                        break;
                }


            }
            andArr.push({
                $or: orAssetArr
            });
            andArr.push({
                $or: orArr
            });

            debug(JSON.stringify(andArr));

            promises.push(Infodatatrack.find({
                $and: andArr

            }).exec(function (err, tracks) {
                if (err) {
                    res.send(500, err.message);
                }
                debug(tracks.length);
                return tracks;

            }));

            Promise.all(promises).then(function (values) {
                var tracks = [];
                var resultados = [];
                var ant = 0;
                var antBridge = 0;
                var antCulvert = 0;
                var antGeo = 0;
                var antGeo2 = 0;
                var geoJson = {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    properties: {
                        rcondition: [],
                        name: ""
                    }
                };
                var geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                var geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                var geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                var geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                var geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));

                if (values.length > 0) {
                    values.forEach(function (val, index) {
                        for (var v of val) {
                            // debug(v.properties.name);
                            ant = 0;
                            antBridge = 0;
                            antCulvert = 0;
                            antGeo = 0;
                            antGeo2 = 0;
                            for (var [key, cval] of v.geometry.coordinates.entries()) {
                                for (var f of postData.form) {
                                    for (var filter of postData.filter) {
                                        switch (filter) {
                                            case 'Bridge':
                                                if (v.properties.bcondition[key] !== null &&
                                                    v.properties.bcondition[key] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.bcondition[key] < formulasService.conditionValue(f).score.max) {
                                                    if (antBridge == 0) antBridge = key - 1;
                                                    if (key !== (antBridge + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonBri);
                                                        geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Bri---' + key + ' : ant ' + (antBridge + 1) + ' - ' + cval + ' #Crit: ' + v.properties.bcondition[key] + ' - ' + f);
                                                    geoJsonBri.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    antBridge = key;
                                                }
                                                break;
                                            case 'Culvert':
                                                if (v.properties.Ccondition[key] !== null &&
                                                    v.properties.Ccondition[key] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.Ccondition[key] < formulasService.conditionValue(f).score.max) {
                                                    if (antCulvert == 0) antCulvert = key - 1;
                                                    if (key !== (antCulvert + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonCul);
                                                        geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Cul---' + key + ' : ant ' + (antCulvert + 1) + ' - ' + cval + ' #Crit: ' + v.properties.Ccondition[key] + ' - ' + f);
                                                    geoJsonCul.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonCul.geometry.coordinates.push(cval);
                                                    antCulvert = key;
                                                }
                                                break;
                                            case 'Geotechnical':
                                                if (v.properties.gcondition[key] !== null &&
                                                    v.properties.gcondition[key] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.gcondition[key] < formulasService.conditionValue(f).score.max) {
                                                    if (antGeo == 0) antGeo = key - 1;
                                                    if (key !== (antGeo + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonGeo);
                                                        geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Geo---' + key + ' : ant ' + (antGeo + 1) + ' - ' + cval + ' #Crit: ' + v.properties.gcondition[key] + ' - ' + f);
                                                    geoJsonGeo.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonGeo.geometry.coordinates.push(cval);
                                                    antGeo = key;
                                                }
                                                if (v.properties.gcondition2[key] !== null &&
                                                    v.properties.gcondition2[key] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.gcondition2[key] < formulasService.conditionValue(f).score.max) {
                                                    if (antGeo2 == 0) antGeo2 = key - 1;
                                                    if (key !== (antGeo2 + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonGeo2);
                                                        geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Geo2---' + key + ' : ant ' + (antGeo2 + 1) + ' - ' + cval + ' #Crit: ' + v.properties.gcondition2[key] + ' - ' + f);
                                                    geoJsonGeo2.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonGeo2.geometry.coordinates.push(cval);
                                                    antGeo2 = key;
                                                }
                                                break;
                                            default:
                                                if (v.properties.rcondition[key] !== null &&
                                                    v.properties.rcondition[key] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.rcondition[key] < formulasService.conditionValue(f).score.max) {
                                                    if (ant == 0) ant = key - 1;
                                                    if (key !== (ant + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonPav);
                                                        geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Pav ---' + key + ' : ant ' + (ant + 1) + ' - ' + cval + ' #Crit: ' + v.properties.rcriticality[key] + ' - ' + f);
                                                    geoJsonPav.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonPav.geometry.coordinates.push(cval);
                                                    ant = key;
                                                }
                                                break;
                                        }
                                    }

                                }
                                if (key + 1 == v.geometry.coordinates.length) {
                                    // debug('-- new geojson --')
                                    tracks.push(geoJsonPav);
                                    tracks.push(geoJsonBri);
                                    tracks.push(geoJsonCul);
                                    tracks.push(geoJsonGeo);
                                    tracks.push(geoJsonGeo2);
                                    geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));
                                }

                            }
                            // tracks.push(v);
                        }
                    });
                }
                // debug(tracks.length);

                res.status(200).jsonp(tracks);

            });

            break;
        default:
            break;
    }



});



module.exports = router;