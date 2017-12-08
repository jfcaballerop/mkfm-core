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
            await Infodatatrack.findById(track._id).exec(function(err, ifdt) {
                if (err) {
                    res.send(500, err.message);
                }
                // console.log(ifdt.properties.name);
                var index = 0;
                // console.log(ifdt._id);
                formResult = new Array(ifdt.geometry.coordinates.length);
                for (index = 0; index < ifdt.geometry.coordinates.length; index++) {
                    // console.log(index);
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
                    // console.log(sendData);
                    // console.log(fspec);            
                    switch (asset) {
                        case 'Pavements':
                            formResult[index] = formulasService.criticality('Pavements', fspec, sendData);
                            break;

                        default:
                            break;
                    }

                }
                switch (asset) {
                    case 'Pavements':
                        ifdt.properties.rcriticality = formResult;
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



module.exports = router;