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
var multer = require('multer');
var GJV = require("geojson-validation");
var fs = require('fs');
var tj = require('togeojson');
var DOMParser = require('xmldom').DOMParser;

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

/* VALIDATE File */
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
        //// console.log('STATUS: ' + res.statusCode);
        //// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            //// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];
            //// console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
            // resp.redirect('/auth/WEB/infodatatrack/edit_video_infodatatrack/' + req.params.idifdt);

        });
    });
    request.write(JSON.stringify(postData));
    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/**
 * GET File Valid
 */
router.get('/getfile/:id', function(req, resp) {
    ////// console.log('## WEB GET File: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
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
            ////// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            resp.status(200).jsonp(responseObject);

        });
    });

    request.end();

});
/* DESACTIVATE file */
router.post('/desactivate/:id', function(req, resp, next) {
    // Obtengo la lista de extensiones de ficheros
    var ft_options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/filetype/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var requestft = http.request(ft_options, function(res) {
        ////// console.log('STATUS: ' + res.statusCode);
        ////// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            ////// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            ////// console.log('DATA ' + data.length + ' ' + data);
            filetypesObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //resp.status(200).jsonp(filetypesObject);
        });
    });
    requestft.end();
    ////// console.log('## WEB DESACTIVATE file: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/desactivate/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
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
            ////// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('upload', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('upload', { token: req.token, ft: filetypesObject, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});
/* ACTIVATE file */
router.post('/activate/:id', function(req, resp, next) {
    // Obtengo la lista de extensiones de ficheros
    var ft_options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/filetype/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var requestft = http.request(ft_options, function(res) {
        ////// console.log('STATUS: ' + res.statusCode);
        ////// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            ////// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            ////// console.log('DATA ' + data.length + ' ' + data);
            filetypesObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //resp.status(200).jsonp(filetypesObject);
        });
    });
    requestft.end();

    ////// console.log('## WEB ACTIVATE file: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/activate/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
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
            ////// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('upload', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('upload', { token: req.token, ft: filetypesObject, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});
/* DELETE file */
router.post('/delete/:id', function(req, resp, next) {
    ////// console.log('## WEB ACTIVATE file: ' + req.params.id);
    // Obtengo la lista de extensiones de ficheros
    var ft_options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/filetype/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var requestft = http.request(ft_options, function(res) {
        ////// console.log('STATUS: ' + res.statusCode);
        ////// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            ////// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            ////// console.log('DATA ' + data.length + ' ' + data);
            filetypesObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //resp.status(200).jsonp(filetypesObject);
        });
    });
    requestft.end();

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/delete/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
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
            ////// console.log('DATA DELETE:: ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('upload', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('upload', { token: req.token, ft: filetypesObject, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //resp.redirect('/auth/WEB/gis/upload');

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});



/*******************************************************
 API REST CALLS
 **********************************************************/



/* GET JSON files listing. */
router.get('/V1/formulas/', function(req, res, next) {
    Formula.find().exec(function(err, files) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(files);
        //console.log(" ### GET Formulas ### \n" + files);
    });

});


/* POST file */
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
        }
    });

});



/* GET JSON files listing active_valid. */
router.get('/V1/active_valid/', function(req, res, next) {
    Fileupload.find({ activo: true, status: 'validate' }, function(err, files) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(files);
    });

});

/* GET JSON file by id. */
router.get('/V1/:id', function(req, res, next) {
    Fileupload.findById(req.params.id, function(err, fup) {
        if (err) {
            res.send(500, err.message);
        }
        var validFeatureCollection = {};
        fs.readFile(fup.path, function(err, dataFile) {
            if (err) {
                return res.status(500).send(err.message);
            }
            // //// console.log('## File DATA:: ' + dataFile);
            validFeatureCollection = JSON.parse(dataFile);

            res.status(200).jsonp(validFeatureCollection);
        });
    });

});

/* VALIDATE File */
// TODO: Este método debería realizar la carga en BD una vez validado
router.post('/V1/validate/:id', function(req, res, next) {
    Fileupload.findById(req.params.id, function(err, fup) {
        if (fup.type === 'geojson') {
            var validFeatureCollection = {};
            fs.readFile(fup.path, function(err, dataFile) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                ////// console.log('## File DATA:: ' + dataFile);
                try {
                    validFeatureCollection = JSON.parse(dataFile);
                } catch (e) {
                    if (e) {
                        fup.status = 'error';

                    }
                }
                // console.log('ENTRO ####');
                //simple test 
                GJV.valid(validFeatureCollection, function(valid, errs) {
                    if (!valid) {
                        // console.log("this is INVALID GeoJSON! :" + errs);

                    }

                });
                if (GJV.valid(validFeatureCollection)) {
                    // console.log("this is valid GeoJSON!\n" + JSON.stringify(validFeatureCollection));
                    if (validFeatureCollection._id !== undefined) {
                        Infodatatrack.findById(validFeatureCollection._id).exec(function(err, infodatatrack) {
                            if (err) {
                                fup.status = 'error';
                                res.send(500, err.message);
                            }
                            //// console.log('\ninfodatatrack::\n' + JSON.stringify(infodatatrack));
                            //res.status(200).jsonp(infodatatrack);
                            // TODO: Añadir poder modificar el resto de opciones
                            // Por ahora solo modifico las Coordenadas

                            // Paso 1. Comprobar longitud de las Coordenadas
                            if (validFeatureCollection.geometry.coordinates.length !== infodatatrack.geometry.coordinates.length) {
                                fup.status = 'error';
                                //// console.log('Error en longitud de coordenadas');
                            } else {
                                infodatatrack.geometry.coordinates = validFeatureCollection.geometry.coordinates;
                                infodatatrack.save(function(err, info) {
                                    if (err) {
                                        //// console.log('Error en grabar infodatatrack');
                                        fup.status = 'error';
                                        // return res.status(500).send(err.message);
                                    }
                                    //// console.log('infodatatrack grabado OK !!!');
                                    fup.status = 'validate';
                                    //// console.log('## API ACTIVATE file: ' + req.params.id);
                                    //// console.log('## API RES STATUS: ' + fup.status);
                                    fup.save(function(err, file) {
                                        if (err) {
                                            return res.status(500).send(err.message);
                                        }
                                        Fileupload.find(function(err, fup) {
                                            if (err) {
                                                res.send(500, err.message);
                                            }
                                            res.status(200).jsonp(fup);
                                        });
                                    });
                                });
                            }

                        });
                    }

                } else {
                    GJV.isGeoJSONObject(validFeatureCollection, function(valid, errs) {
                        if (!valid) {
                            // console.log('## API ERROR isGeoJSONObject: ' + errs);
                        }
                        fup.status = 'error';
                        // console.log('## API ACTIVATE file: ' + req.params.id + ' STATUS: ' + fup.status);
                        fup.save(function(err, file) {
                            if (err) {
                                return res.status(500).send(err.message);
                            }
                            Fileupload.find(function(err, fup) {
                                if (err) {
                                    res.send(500, err.message);
                                }
                                res.status(200).jsonp(fup);
                            });
                        });
                    });
                }

            });
        } else if ((fup.type === 'gpx') || (fup.type === 'kml')) {
            // Primero: transformar el fichero GPX a GeoJson
            var fileConv = new DOMParser().parseFromString(fs.readFileSync(fup.path, 'utf8'));
            var fconv;
            var fconvwithstyles;
            if (fup.type === 'gpx') {
                fconv = tj.gpx(fileConv);
                fconvwithstyles = tj.gpx(fileConv, { styles: true });
            } else {
                fconv = tj.kml(fileConv);
                fconvwithstyles = tj.kml(fileConv, { styles: true });
            }

            //// console.log('## FILE CONV:: ' + JSON.stringify(fconv));
            //// console.log('## FILE CONV STYLES:: ' + JSON.stringify(fconvwithstyles));
            ////// console.log('ENTRO ####');
            //simple test 
            if (GJV.valid(fconvwithstyles)) {
                //// console.log("this is valid GeoJSON!");
                fup.status = 'validate';
            } else {
                fup.status = 'error';
            }
            fup.activo = false;
            fup.save(function(err, file) {
                if (err) {
                    return res.status(500).send(err.message);
                }

            });
            // Guardo un nuevo File en formato GeoJson
            var fname_new = fup.filename + moment().format('YYYYMMDDHHmmss');
            fs.writeFile(path.join(process.env.PWD, '/public/uploads/', fname_new), JSON.stringify(fconvwithstyles), function(err) {
                if (err) {
                    return //// console.log(err);
                }
                //// console.log("The file was saved!");
                var fname_new_noext = fup.originalname.split('.');
                fname_new_noext.pop();
                var new_fu = new Fileupload({
                    "size": Buffer.byteLength(JSON.stringify(fconvwithstyles)),
                    "path": path.join(process.env.PWD, '/public/uploads/', fname_new),
                    "filename": fname_new,
                    "destination": path.join(process.env.PWD, '/public/uploads/'),
                    "mimetype": "application/octet-stream",
                    "originalname": fname_new_noext + '.geojson',
                    "owner": fup.owner,
                    "type": "geojson",
                    "status": "validate"
                });
                new_fu.save(function(err, file) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    //// console.log(' SAVE Documento ' + new_fu);
                    // res.status(200).jsonp(file);
                    Fileupload.find(function(err, fup) {
                        if (err) {
                            res.send(500, err.message);
                        }
                        res.status(200).jsonp(fup);
                    });
                });
            });
        }
    });

});
/* GET JSON file by login. */
router.get('/V1/:originalname', function(req, res, next) {
    Fileupload.findOne({ 'name': req.params.originalname }, function(err, file) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(file);
    });

});

/* ACTIVATE file */
router.post('/V1/activate/:id', function(req, res, next) {
    Fileupload.findById(req.params.id, function(err, file) {
        ////// console.log('## API ACTIVATE file: ' + req.params.id);
        file.activo = true;
        file.save(function(err, file) {
            if (err) {
                return res.status(500).send(err.message);
            }
            Fileupload.find(function(err, files) {
                if (err) {
                    res.send(500, err.message);
                }
                res.status(200).jsonp(files);
            });
        });
    });

});
/* DESACTIVATE file */
router.post('/V1/desactivate/:id', function(req, res, next) {
    Fileupload.findById(req.params.id, function(err, file) {
        ////// console.log('## API DESACTIVATE file: ' + req.params.id);
        file.activo = false;
        file.save(function(err, file) {
            if (err) {
                return res.status(500).send(err.message);
            }
            Fileupload.find(function(err, files) {
                if (err) {
                    res.send(500, err.message);
                }
                res.status(200).jsonp(files);
            });
        });
    });

});

/* DEL file */
router.post('/V1/delete/:id', function(req, res, next) {
    Fileupload.findByIdAndRemove(req.params.id, function(err, file) {
        ////// console.log('## API DEL file: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        ////// console.log('### File located: ' + file.path);
        fs.unlink(file.path, function(ferr) {
            if (ferr) {
                //throw ferr;
                ////// console.log('Error: ' + ferr);
                res.status(400).jsonp(file);

            }
            Fileupload.find(function(err, files) {
                ////// console.log('Locate files:: ' + files);
                if (err) {
                    res.send(500, err.message);
                }
                ////// console.log('Send files:: ' + files);
                res.status(200).jsonp(files);
            });
        });
    });

});

/* UPDATE file */
router.post('/V1/update_file/:id', function(req, res, next) {

    res.send('Upoload File');

});
module.exports = router;