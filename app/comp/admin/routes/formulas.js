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
/* GET Control panel */
router.get('/formulas', function(req, resp, next) {
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


    var request = http.request(options, function(res) {
        ////// console.log('STATUS: ' + res.statusCode);
        ////// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            ////// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            //// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // console.log(JSON.stringify(responseObject));
            resp.render('admin_panel_formulas', { formula: responseObject, token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

        });
    });

    request.end();
    // resp.render('admin_panel_formulas', { token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

});

/* get_formulas_tracks */
/**
 * Proceso AJAX que recibe la peticion de mostrar todos los tracks afectados por la formular seleccionada
 */
router.post('/get_formulas_tracks/', function(req, resp) {
    var postData = extend({}, req.body);
    console.log('## WEB get_formulas_tracks ' + JSON.stringify(postData));

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



    var request = http.request(options, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();
    // resp.status(200).jsonp({});

});
/* update_formulas_tracks */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks/:formula/:asset', function(req, resp) {
    var postData = extend({}, req.body);
    console.log('## WEB update_formulas_tracks: ' + req.params.formula + ' - ' + req.params.asset + '\n\n\n');

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



    var request = http.request(options, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
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
router.post('/update_field/:field/:value', function(req, resp) {
    var postData = extend({}, req.body);
    console.log('## WEB update_field: ' + req.params.field + '\n\n\n');

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



    var request = http.request(options, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
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
router.get('/V1/formulas/', function(req, res, next) {
    Formula.find().exec(function(err, files) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(files);
        //console.log(" ### GET Formulas ### \n" + files);
    });

});


/* POST update_formulas_tracks */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks/:formula/:asset', async function(req, res, next) {
    // console.log('API /V1/update_formulas_tracks/');
    var postData = extend({}, req.body);
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    // console.log(postData);
    var asset = postData[Object.keys(postData)[0]];
    var formula = Object.keys(postData)[0];
    var sendData = {};
    var formResult = [];
    var formResultLeft = [];
    var formResultRight = [];
    var tracks;
    var tracksUpdated = 0;
    console.log('formula: ' + formula + ' asset: ' + asset);

    Formula.find({ "name": formula }).exec(async function(err, f) {
        if (err) {
            res.send(500, err.message);
        }
        await Infodatatrack.find().exec(function(err, rtracks) {
            if (err) {
                res.send(500, err.message);
            }
            tracks = rtracks;
        });

        for (var track of tracks) {
            // var track = { "_id": "59c91c60100b7d4adb8ea9ec" };
            await Infodatatrack.findById(track._id).exec(function(err, ifdt) {
                if (err) {
                    res.send(500, err.message);
                }
                // console.log(ifdt.properties.name);
                var index = 0;
                // console.log(ifdt._id);
                formResult = new Array(ifdt.geometry.coordinates.length);
                formResultLeft = new Array(ifdt.geometry.coordinates.length);
                formResultRight = new Array(ifdt.geometry.coordinates.length);
                for (index = 0; index < ifdt.geometry.coordinates.length; index++) {
                    // console.log(index);
                    var calcularValue = false;
                    /**
                     * debo comprobar que el asset elegido tenga CODE para poder actualizarlo
                     * Solo sucederá en aquellos casos que esté completado
                     */
                    switch (asset) {
                        case 'Pavements':
                            if (ifdt.properties.rcode != undefined &&
                                ifdt.properties.rcode != null &&
                                ifdt.properties.rcode != [] &&
                                ifdt.properties.rcode[index] != undefined &&
                                ifdt.properties.rcode[index] != "") {
                                calcularValue = true;
                                // console.log(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                            } else {
                                // console.log(fieldkey + ' : UNDEFINED');
                                calcularValue = false;
                            }
                            break;
                        case 'Bridges':
                            if (ifdt.properties.bcode != undefined &&
                                ifdt.properties.bcode != null &&
                                ifdt.properties.bcode != [] &&
                                ifdt.properties.bcode[index] != undefined &&
                                ifdt.properties.bcode[index] != "") {
                                calcularValue = true;
                                // console.log(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                            } else {
                                // console.log(fieldkey + ' : UNDEFINED');
                                calcularValue = false;
                            }
                            break;
                        case 'Culverts':
                            if (ifdt.properties.Ccode != undefined &&
                                ifdt.properties.Ccode != null &&
                                ifdt.properties.Ccode != [] &&
                                ifdt.properties.Ccode[index] != undefined &&
                                ifdt.properties.Ccode[index] != "") {
                                calcularValue = true;
                                // console.log(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                            } else {
                                // console.log(fieldkey + ' : UNDEFINED');
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
                                // console.log(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                            } else {
                                // console.log(fieldkey + ' : UNDEFINED');
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
                                // console.log(index + ': ' + ifdt.properties.gtype[index] + ' : ' + ifdt.properties.gtype2[index]);
                            } else {
                                // console.log(index + ' : UNDEFINED');
                                calcularValue = false;
                            }
                            break;

                        default:
                            break;
                    }

                    if (calcularValue) {
                        for (var fspec of f[0].formulaSpec) {
                            if (fspec.name === asset) {
                                // console.log(fspec);
                                for (var [l1key, level1] of Object.entries(fspec)) {
                                    if (typeof level1 === 'object') {
                                        for (var [fieldkey, field] of Object.entries(level1)) {
                                            if (typeof field === 'object') {
                                                /**
                                                 * En este nivel tengo los campos de la formula
                                                 * Debo comprobar que tienen valor para poder aplicar la formula
                                                 */
                                                if (ifdt.properties[fieldkey] != undefined &&
                                                    ifdt.properties[fieldkey] != null &&
                                                    ifdt.properties[fieldkey] != [] &&
                                                    ifdt.properties[fieldkey][index] != undefined &&
                                                    ifdt.properties[fieldkey][index] != "") {
                                                    sendData[fieldkey] = ifdt.properties[fieldkey][index];
                                                    // console.log(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                                                } else {
                                                    // console.log(fieldkey + ' : UNDEFINED');
                                                    sendData[fieldkey] = undefined;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // console.log(sendData);
                    // console.log(fspec);       

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

                            //console.log('\n\n\n-----------------------------------------------------------------------------------------');
                            //console.log(fspec);
                            var fspec1 = extend({}, fspec);
                            for (var [leftkey, leftfield] of Object.entries(fspec1)) {
                                if (leftkey.indexOf('2') >= 0) {
                                    // si el campo tiene un 2, lo quito de la formula por ser el lado dcho
                                    delete fspec1[leftkey];
                                }
                            }
                            //console.log(fspec1);
                            var fspec2 = extend({}, fspec);
                            for (var [rightkey, rightfield] of Object.entries(fspec2)) {
                                if (rightkey.indexOf('2') >= 0) {
                                    // si el campo tiene un 2, quito de la formula el que no tiene un 2 por ser el izdo
                                    delete fspec2[rightkey.replace('2', '')];
                                }
                            }
                            //console.log(fspec2);

                            if (
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
                                ifdt.properties.gtype[index] === "Retaining_walls"
                            ) {
                                // en este caso estoy en la izda
                                if (calcularValue) {
                                    formResultLeft[index] = formulasService.criticality('Retaining_Walls', fspec1, sendData);
                                } else {
                                    if (ifdt.properties.gcriticality != undefined &&
                                        ifdt.properties.gcriticality != null &&
                                        ifdt.properties.gcriticality[index] != undefined &&
                                        ifdt.properties.gcriticality[index] != null
                                    ) {
                                        formResultLeft[index] = ifdt.properties.gcriticality[index];

                                    } else {
                                        formResultLeft[index] = undefined;

                                    }
                                }

                            } else {
                                if (ifdt.properties.gcode != undefined &&
                                    ifdt.properties.gcode != null &&
                                    ifdt.properties.gcode != [] &&
                                    ifdt.properties.gcode[index] != undefined &&
                                    ifdt.properties.gcode[index] != "" &&
                                    ifdt.properties.gcriticality != undefined &&
                                    ifdt.properties.gcriticality != null &&
                                    ifdt.properties.gcriticality[index] != undefined &&
                                    ifdt.properties.gcriticality[index] != null
                                ) {
                                    formResultLeft[index] = ifdt.properties.gcriticality[index];

                                } else {
                                    formResultLeft[index] = undefined;

                                }
                            }
                            if (
                                ifdt.properties.gtype2 != undefined &&
                                ifdt.properties.gtype2 != null &&
                                ifdt.properties.gtype2 != [] &&
                                ifdt.properties.gtype2[index] != undefined &&
                                ifdt.properties.gtype2[index] != "" &&
                                ifdt.properties.gtype2[index] === "Retaining_walls"
                            ) {
                                // en este caso estoy en la dcha
                                if (calcularValue) {
                                    formResultRight[index] = formulasService.criticality('Retaining_Walls', fspec2, sendData);
                                } else {
                                    if (ifdt.properties.gcriticality2 != undefined &&
                                        ifdt.properties.gcriticality2 != null &&
                                        ifdt.properties.gcriticality2[index] != undefined &&
                                        ifdt.properties.gcriticality2[index] != null
                                    ) {
                                        formResultRight[index] = ifdt.properties.gcriticality2[index];

                                    } else {
                                        formResultRight[index] = undefined;

                                    }
                                }

                            } else {

                                if (ifdt.properties.gcode2 != undefined &&
                                    ifdt.properties.gcode2 != null &&
                                    ifdt.properties.gcode2 != [] &&
                                    ifdt.properties.gcode2[index] != undefined &&
                                    ifdt.properties.gcode2[index] != "" &&
                                    ifdt.properties.gcriticality2 != undefined &&
                                    ifdt.properties.gcriticality2 != null &&
                                    ifdt.properties.gcriticality2[index] != undefined &&
                                    ifdt.properties.gcriticality2[index] != null
                                ) {
                                    formResultRight[index] = ifdt.properties.gcriticality2[index];

                                } else {
                                    formResultRight[index] = undefined;

                                }
                            }
                            break;
                        case 'Earthworks':

                            //console.log('\n\n\n-----------------------------------------------------------------------------------------');
                            //console.log(fspec);
                            var fspec1 = extend({}, fspec);
                            for (var [leftkey, leftfield] of Object.entries(fspec1)) {
                                if (leftkey.indexOf('2') >= 0) {
                                    // si el campo tiene un 2, lo quito de la formula por ser el lado dcho
                                    delete fspec1[leftkey];
                                }
                            }
                            //console.log(fspec1);
                            var fspec2 = extend({}, fspec);
                            for (var [rightkey, rightfield] of Object.entries(fspec2)) {
                                if (rightkey.indexOf('2') >= 0) {
                                    // si el campo tiene un 2, quito de la formula el que no tiene un 2 por ser el izdo
                                    delete fspec2[rightkey.replace('2', '')];
                                }
                            }
                            //console.log(fspec2);

                            if (
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

                            ) {
                                // en este caso estoy en la izda
                                if (calcularValue) {
                                    formResultLeft[index] = formulasService.criticality('Earthworks', fspec1, sendData);
                                } else {
                                    if (
                                        ifdt.properties.gcriticality != undefined &&
                                        ifdt.properties.gcriticality != null &&
                                        ifdt.properties.gcriticality[index] != undefined &&
                                        ifdt.properties.gcriticality[index] != null
                                    ) {
                                        formResultLeft[index] = ifdt.properties.gcriticality[index];

                                    } else {
                                        formResultLeft[index] = undefined;

                                    }
                                }

                            } else {

                                if (
                                    ifdt.properties.gcode != undefined &&
                                    ifdt.properties.gcode != null &&
                                    ifdt.properties.gcode != [] &&
                                    ifdt.properties.gcode[index] != undefined &&
                                    ifdt.properties.gcode[index] != "" &&
                                    ifdt.properties.gcriticality != undefined &&
                                    ifdt.properties.gcriticality != null &&
                                    ifdt.properties.gcriticality[index] != undefined &&
                                    ifdt.properties.gcriticality[index] != null
                                ) {
                                    formResultLeft[index] = ifdt.properties.gcriticality[index];

                                } else {
                                    formResultLeft[index] = undefined;

                                }
                            }
                            if (
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
                            ) {
                                // en este caso estoy en la dcha
                                if (calcularValue) {
                                    formResultRight[index] = formulasService.criticality('Earthworks', fspec2, sendData);
                                } else {
                                    if (ifdt.properties.gcriticality2 != undefined &&
                                        ifdt.properties.gcriticality2 != null &&
                                        ifdt.properties.gcriticality2[index] != undefined &&
                                        ifdt.properties.gcriticality2[index] != null
                                    ) {
                                        formResultRight[index] = ifdt.properties.gcriticality2[index];

                                    } else {
                                        formResultRight[index] = undefined;

                                    }
                                }

                            } else {
                                if (
                                    ifdt.properties.gcode2 != undefined &&
                                    ifdt.properties.gcode2 != null &&
                                    ifdt.properties.gcode2 != [] &&
                                    ifdt.properties.gcode2[index] != undefined &&
                                    ifdt.properties.gcode2[index] != "" &&
                                    ifdt.properties.gcriticality2 != undefined &&
                                    ifdt.properties.gcriticality2 != null &&
                                    ifdt.properties.gcriticality2[index] != undefined &&
                                    ifdt.properties.gcriticality2[index] != null
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
                ifdt.save(function(err, isaved) {
                    if (err) {
                        res.send(500, err.message);
                    }
                    tracksUpdated++;
                });
            });
        }
        ret.tracksUpdated = tracksUpdated;
        console.log(tracksUpdated);
        res.status(200).jsonp(ret);

    });

});
/* POST update_field */
router.post('/V1/update_field/', function(req, res, next) {
    // console.log('API /V1/update_field/');
    var postData = extend({}, req.body);
    var ret = {
        "result": "OK"
    };
    //console.log(postData);
    var value = postData[Object.keys(postData)[0]];
    var field_name = Object.keys(postData)[0];
    // console.log(field_name + ": " + value);
    var sendData = {};
    var arrField = field_name.split('__');

    // console.log(arrField);

    Formula.find({ "name": arrField[0] }).exec(function(err, f) {
        if (err) {
            res.send(500, err.message);
        }
        /**
         * Si es Length = 3 estoy en las formulas de primer nivel
         * Para Length = 4 estoy en el segundo level
         * Para Length = 5 estoy en scoring
         */
        if (arrField.length == 3) {
            for (var [key, fspec] of Object.entries(f[0].formulaSpec)) {
                //console.log(fspec.name);
                if (fspec.name === arrField[1]) {
                    var formSave = new Formula(f[0]);
                    // console.log('formSave: \n' + JSON.stringify(formSave));
                    // console.log(formSave.formulaSpec[key][arrField[2]].weight);
                    // console.log(key + ' ' + value);
                    formSave.formulaSpec[key][arrField[2]].weight = value;
                    formSave.save(function(err, fsaved) {
                        if (err) {
                            return res.status(500).send(err.message);
                        }
                        res.status(200).jsonp(ret);

                    });

                }

            };
        } else if (arrField.length == 4) {
            for (var [key, fspec] of Object.entries(f[0].formulaSpec)) {
                //console.log(fspec.name);
                if (fspec.name === arrField[1]) {
                    var formSave = new Formula(f[0]);
                    // console.log('formSave: \n' + JSON.stringify(formSave));
                    // console.log(formSave.formulaSpec[key][arrField[2]].weight);
                    // console.log(key + ' ' + value);
                    formSave.formulaSpec[key][arrField[2]][arrField[3]].weight = value;
                    formSave.save(function(err, fsaved) {
                        if (err) {
                            return res.status(500).send(err.message);
                        }
                        res.status(200).jsonp(ret);

                    });

                }

            };
        } else if (arrField.length == 5) {
            for (var [key, fspec] of Object.entries(f[0].formulaSpec)) {
                //console.log(fspec.name);
                if (fspec.name === arrField[1]) {
                    var formSave = new Formula(f[0]);
                    // console.log('formSave: \n' + JSON.stringify(formSave));
                    // console.log(formSave.formulaSpec[key][arrField[2]].weight);
                    // console.log(key + ' ' + value);
                    formSave.formulaSpec[key][arrField[2]][arrField[3]].scoring[arrField[4]] = value;
                    formSave.save(function(err, fsaved) {
                        if (err) {
                            return res.status(500).send(err.message);
                        }
                        res.status(200).jsonp(ret);

                    });

                }

            };
        }
    });

});
/* POST get_formulas_tracks */
router.post('/V1/get_formulas_tracks/', function(req, res, next) {
    // console.log('API /V1/update_field/');
    var postData = extend({}, req.body);
    console.log(postData);
    var ret = {
        "result": "OK"
    };

    switch (postData.formname) {
        case 'Criticality':
            console.log('Criticality');
            var orArr = [];
            var orAssetArr = [];
            var andArr = [];
            var catArr = [];
            var promises = [];

            for (var f of postData.filter) {
                switch (f) {
                    case 'Bridge':
                        for (var f of postData.form) {
                            // console.log(f);
                            // console.log(formulasService.criticalityValue(f).score.min);
                            // console.log(formulasService.criticalityValue(f).score.max);
                            orArr.push({ "properties.bcriticality": { $gte: formulasService.criticalityValue(f).score.min, $lt: formulasService.criticalityValue(f).score.max } });
                        }
                        orAssetArr.push({ "properties.bcode": { $elemMatch: { $nin: [""] } } });
                        // console.log(catArr);


                        break;
                    case 'Culvert':
                        for (var f of postData.form) {
                            // console.log(f);
                            // console.log(formulasService.criticalityValue(f).score.min);
                            // console.log(formulasService.criticalityValue(f).score.max);
                            orArr.push({ "properties.Ccriticality": { $gte: formulasService.criticalityValue(f).score.min, $lt: formulasService.criticalityValue(f).score.max } });
                        }
                        orAssetArr.push({ "properties.Ccode": { $elemMatch: { $nin: [""] } } });
                        // console.log(catArr);

                        break;
                    case 'Geotechnical':
                        for (var f of postData.form) {
                            // console.log(f);
                            // console.log(formulasService.criticalityValue(f).score.min);
                            // console.log(formulasService.criticalityValue(f).score.max);
                            orArr.push({ "properties.gcriticality": { $gte: formulasService.criticalityValue(f).score.min, $lt: formulasService.criticalityValue(f).score.max } });
                            orArr.push({ "properties.gcriticality2": { $gte: formulasService.criticalityValue(f).score.min, $lt: formulasService.criticalityValue(f).score.max } });
                        }
                        orAssetArr.push({ "properties.gcode": { $elemMatch: { $nin: [""] } } });
                        orAssetArr.push({ "properties.gcode2": { $elemMatch: { $nin: [""] } } });
                        // console.log(catArr);
                        break;

                    default:
                        for (var f of postData.form) {
                            // console.log(f);
                            // console.log(formulasService.criticalityValue(f).score.min);
                            // console.log(formulasService.criticalityValue(f).score.max);
                            orArr.push({ "properties.rcriticality": { $gte: formulasService.criticalityValue(f).score.min, $lt: formulasService.criticalityValue(f).score.max } });
                        }
                        orAssetArr.push({ "properties.rcategory": { $in: postData.filterPav } });
                        // console.log(catArr);



                        break;
                }


            }
            andArr.push({ $or: orAssetArr });
            andArr.push({ $or: orArr });

            console.log(JSON.stringify(andArr));

            promises.push(Infodatatrack.find({
                $and: andArr

            }).exec(function(err, tracks) {
                if (err) {
                    res.send(500, err.message);
                }
                console.log(tracks.length);
                return tracks;

            }));

            Promise.all(promises).then(function(values) {
                var tracks = [];
                var resultados = [];
                var ant = 0;
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

                if (values.length > 0) {
                    values.forEach(function(val, index) {
                        for (var v of val) {
                            console.log(v.properties.name);
                            ant = 0;
                            for (var [key, cval] of v.geometry.coordinates.entries()) {
                                for (var f of postData.form) {
                                    if (v.properties.rcriticality[key] >= formulasService.criticalityValue(f).score.min &&
                                        v.properties.rcriticality[key] < formulasService.criticalityValue(f).score.max) {
                                        if (ant == 0) ant = key - 1;
                                        if (key != (ant + 1)) {
                                            console.log('-- new geojson --');
                                            tracks.push(geoJson);
                                            geoJson = {
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
                                        }
                                        console.log('--- Add Coord ---' + key + ' : ant ' + (ant + 1) + ' - ' + cval + ' #Crit: ' + v.properties.rcriticality[key] + ' - ' + f);
                                        geoJson.properties.name = v.properties.name + ' - ' + f;
                                        geoJson.geometry.coordinates.push(cval);
                                        ant = key;
                                    }
                                }
                                if (key + 1 == v.geometry.coordinates.length) {
                                    console.log('-- new geojson --')
                                    tracks.push(geoJson);
                                    geoJson = {
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
                                }

                            }
                            // tracks.push(v);
                        }
                    });
                }
                console.log(tracks.length);

                res.status(200).jsonp(tracks);

            });

            break;

        default:
            break;
    }



});



module.exports = router;