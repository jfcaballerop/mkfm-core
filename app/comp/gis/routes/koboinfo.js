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
var utm = require('utm');

var koboinfoModels = require(path.join(__dirname, '../models/koboinfo'));
var Koboinfo = mongoose.model('Koboinfo');
var infodatatrackModels = require(path.join(__dirname, '../models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');

router.use(function timeLog(req, res, next) {
    //console.log('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
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

/*******************************************************
        WEB CALLS
**********************************************************/
/**
 * 20171031 - jfcaballero
 * Save Kobo info
 */

router.post('/save_kobo_info', function (req, resp, next) {
    var postData = extend({}, req.body.kobo);
    console.log(postData.ifdtid);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/koboinfo/V1/updateKobo/' + req.body.kobo._id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function (res) {
        // //console.log('STATUS: ' + res.statusCode);
        // //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            // //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/infodatatrack/edit_video_infodatatrack/' + req.body.kobo.ifdtid);

        });
    });
    request.on('error', function (err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});
/* GET List koboinfos */
router.get('/list_koboinfos', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/koboinfo/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            delete responseObject[_id];
            //console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});


/* GET List koboinfos */
router.post('/list_koboinfos/:id', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/koboinfo/V1/list_koboinfos/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        // console.log('KOBO ID: ' + req.params.id);
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];

            // console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});
/* GET List koboinfos */
router.get('/list_koboinfos/:id', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/koboinfo/V1/list_koboinfos/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];
            //console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});


/* GET List koboinfos */
router.get('/edit_koboinfo/:id', function (req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/koboinfo/V1/list_koboinfos/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);

            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('data_koboinfo', {
                token: req.token,
                utm: utm,
                koboinfo: responseObject,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME
            });
            //console.log(JSON.stringify(responseObject));
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});


/*
UPDATE ROAD
*/

router.post('/update_koboinfo', function (req, resp, next) {
    var postData = extend({}, req.body.koboinfo);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/koboinfo/V1/update_koboinfo/' + req.body.koboinfo._id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function (res) {
        // //console.log('STATUS: ' + res.statusCode);
        // //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            // //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            // //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/koboinfo/edit_koboinfo/' + req.body.koboinfo._id);

        });
    });
    request.on('error', function (err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});

/*******************************************************
 API REST CALLS
 **********************************************************/
/* POST koboinfo */
router.post('/V1/', function (req, res, next) {
    fu = new Koboinfo(req.body);
    fu.save(function (err, koboinfo) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(koboinfo);
    });
});

/* GET JSON Koboinfos listing. */
router.get('/V1/', function (req, res, next) {
    Koboinfo.find().exec(function (err, koboinfos) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(koboinfos);
    });

});
/* GET JSON Koboinfos listing id. */
router.get('/V1/list_id/', function (req, res, next) {
    Koboinfo.find({}, {
        _id: 1,
        "properties.name": 1
    }).exec(function (err, koboinfos) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(koboinfos);
    });

});
/* GET JSON koboinfo by id. */
router.get('/V1/list_koboinfos/:id', function (req, res, next) {
    Koboinfo.findById(req.params.id, function (err, koboinfo) {
        if (err) {
            res.send(500, err.message);
        }

        // Obtener para cada 

        res.status(200).jsonp(koboinfo);
    });

});
/* GET JSON koboinfo by phot. */
router.get('/V1/getkobobyphoto/:photoid', function (req, res, next) {
    Koboinfo.findOne({
        "properties.bphoto": {
            "$regex": req.params.photoid,
            "$options": "i"
        }
    }, function (err, koboinfo) {
        if (err) {
            res.send(500, err.message);
        }

        // Obtener para cada 

        res.status(200).jsonp(koboinfo);
    });

});


/* DEL file */
router.post('/V1/delete/:id', function (req, res, next) {
    Koboinfo.findByIdAndRemove(req.params.id, function (err, file) {
        // console.log('## API DEL file: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        Koboinfo.find(function (err, files) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(files);
        });
    });

});

/* UPDATE Koboinfo */
router.post('/V1/update_koboinfo/:id', function (req, res, next) {
    // console.log('## UPDATE ROAD ##\nBODY: ' + JSON.stringify(req.body));
    Koboinfo.findById(req.params.id, function (err, koboinfo) {
        var saveKoboinfo = extend({}, req.body);
        // console.log('## UPDATE ROAD ##\nsaveKoboinfo: ' + JSON.stringify(saveKoboinfo));

        for (var key in saveKoboinfo) {
            // console.log(key + " = " + saveKoboinfo[key]);
            if (saveKoboinfo[key] !== null && typeof (saveKoboinfo[key]) == "object") {
                // Estoy dentro de un subobjeto
                for (var key2 in saveKoboinfo[key]) {
                    // console.log(key2 + " = " + saveKoboinfo[key][key2]);
                    koboinfo[key][key2] = saveKoboinfo[key][key2];

                }
            } else {
                koboinfo[key] = saveKoboinfo[key];

            }
        }

        // console.log('## UPDATE ROAD ##\nfind&update: ' + JSON.stringify(koboinfo));
        Koboinfo.findByIdAndUpdate(req.params.id, {
            $set: koboinfo
        }, function (err, result) {
            if (err) {
                //console.log(err);
                return res.status(500).send(err.message);
            }
            //console.log("RESULT: " + result);
            res.status(200).jsonp(result);
            // res.send('Done')
        });
    });

});


/* GET JSON koboinfo by id. */
router.get('/V1/tot_km_trav', function (req, res, next) {
    var resJSON = {
        koboinfoName: [],
        koboinfoKm: []
    };
    var arrPK = [];
    Koboinfo.find().exec(function (err, koboinfos) {
        if (err) {
            res.send(500, err.message);
        }

        koboinfos.forEach(function (elem, ind) {
            arrPK = [];
            // console.log(JSON.stringify(koboinfo));
            elem.geometry.coordinates.forEach(function (element, tabindex) {
                var utmValAct = utm.fromLatLon(element[0], element[1], 20);
                if (tabindex > 0) {
                    var elemant = elem.geometry.coordinates[tabindex - 1];
                    // console.log('Coordinate ant ' + JSON.stringify(elemant));
                    var utmValAnt = utm.fromLatLon(elemant[0], elemant[1], 20);
                    var easting = utmValAct.easting - utmValAnt.easting;
                    if (easting < 0) easting *= -1;
                    var northing = utmValAct.northing - utmValAnt.northing;
                    if (northing < 0) northing *= -1;
                    pk += Math.sqrt(Math.pow(easting, 2) + Math.pow(northing, 2));
                    pk = Math.round(pk * 100) / 100;
                } else {
                    pk = 0;
                }
                //console.log('ELEMENT ' + JSON.stringify(element));
                arrPK[tabindex] = pk;
            });
            resJSON.koboinfoName.push(elem.properties.name);
            resJSON.koboinfoKm.push(arrPK[arrPK.length - 1]);


        });
        res.status(200).jsonp(resJSON);
    });

});

/* GET JSON Koboinfo labs near. */
router.get('/V1/getNear/:lng/:lat', function (req, res, next) {
    var point = {
        type: "Point",
        coordinates: [parseFloat(req.params.lng), parseFloat(req.params.lat)]
    };

    Koboinfo.geoNear(point, {
        maxDistance: config.MAXDISTANCE,
        spherical: true
    }, function (err, koboinfos) {
        if (err) {
            //console.log(err);
            return res.status(500).send(err.message);
        }
        if (koboinfos && koboinfos.length > 0) {
            res.status(200).jsonp(koboinfos[0]);
        } else {
            res.status(200).jsonp({});
        }
    });


});

/* POST JSON Koboinfo */
router.post('/V1/updateKobo/:id', function (req, res, next) {
    var datamod = extend({}, req.body);
    var arrcoord = datamod.geometry.coordinates.split(",");

    arrcoord[0] != undefined ? arrcoord[0] = parseFloat(arrcoord[0]) : false;
    arrcoord[1] != undefined ? arrcoord[1] = parseFloat(arrcoord[1]) : false;
    arrcoord[2] != undefined ? arrcoord[2] = parseFloat(arrcoord[2]) : false;

    datamod.geometry.coordinates = arrcoord;
    //console.log('\n ##KOBO Datamod: ' + JSON.stringify(datamod));
    var koboinfo = new Koboinfo(datamod);
    koboinfo.isNew = false;
    // console.log('\n## koboinfo ' + JSON.stringify(koboinfo));
    // res.status(200).jsonp(koboinfo);

    koboinfo.save(function (err, kobomod) {
        if (err) {
            return res.status(500).send(err.message);
        }
        console.log('kobomod ' + JSON.stringify(kobomod.properties.kobo_type));
        Infodatatrack.findById(datamod.ifdtid, function (err, ifdt) {
            if (err) return handleError(err);

            var arrkoboedit = [];
            var properties = [];

            var ini = datamod.ifdtini;
            var fin = datamod.ifdtfin != 0 ? datamod.ifdtfin : datamod.ifdtini;
            for (var [kprop, vprop] of Object.keys(kobomod._doc.properties).entries()) {
                if (Object.keys(ifdt._doc.properties).indexOf(vprop) >= 0) {
                    var arrprop = [];

                    /**
                     * Genero el array con el valor de los campos del Kobo a rellenar en IFDT
                     */
                    for (var [cindex, cval] of ifdt.geometry.coordinates.entries()) {
                        var newprop = '';
                        if (cindex >= ini && cindex <= fin) {
                            newprop = kobomod.properties[vprop];
                            // console.log('kobo vprop ' + vprop + ': ' + newprop);
                            arrprop.push(newprop);
                        } else {
                            if (kobomod.properties.kobo_type === "Cutting" || kobomod.properties.kobo_type === "Embankment" ||
                                kobomod.properties.kobo_type === "Retaining_walls" || kobomod.properties.kobo_type === "ford") {
                                /*
                                 * Si es GEOT, busco el lado a actualizar
                                 */
                                if (kobomod.properties.gposition === 'LEFT') {
                                    // console.log('kobo a modificar GEOT ' + kobomod.properties.kobo_type + ' LADO ' + kobomod.properties.gposition);
                                    // console.log('LEFT vprop ' + vprop + ' VAL ' + arrprop);
                                    if (ifdt.properties[vprop] != undefined && ifdt.properties[vprop].length != 0) {
                                        arrprop.push(ifdt.properties[vprop][cindex]);

                                    } else {
                                        arrprop.push(newprop);

                                    }

                                } else if (kobomod.properties.gposition === 'RIGHT') {
                                    // console.log('kobo a modificar GEOT ' + kobomod.properties.kobo_type + ' LADO ' + kobomod.properties.gposition);
                                    // var prop2 = vprop + '2';
                                    // console.log('RIGHT vprop2 ' + prop2 + ' VAL ' + arrprop);
                                    if (ifdt.properties[vprop + '2'] != undefined && ifdt.properties[vprop + '2'].length != 0) {
                                        arrprop.push(ifdt.properties[vprop + '2'][cindex]);

                                    } else {
                                        arrprop.push(newprop);

                                    }

                                }

                            } else {
                                if (ifdt.properties[vprop] != undefined && ifdt.properties[vprop].length != 0) {
                                    arrprop.push(ifdt.properties[vprop][cindex]);

                                } else {
                                    arrprop.push(newprop);

                                }
                            }

                        }

                    }
                    if (ifdt.properties[vprop] === undefined) {
                        ifdt.properties[vprop] = [];
                    }
                    if (kobomod.properties.kobo_type === "Cutting" || kobomod.properties.kobo_type === "Embankment" ||
                        kobomod.properties.kobo_type === "Retaining_walls" || kobomod.properties.kobo_type === "ford") {
                        /*
                         * Si es GEOT, busco el lado a actualizar
                         */
                        if (kobomod.properties.gposition === 'LEFT') {
                            // console.log('kobo a modificar GEOT ' + kobomod.properties.kobo_type + ' LADO ' + kobomod.properties.gposition);
                            // console.log('LEFT vprop ' + vprop + ' VAL ' + arrprop);
                            ifdt.properties[vprop] = arrprop;

                        } else if (kobomod.properties.gposition === 'RIGHT') {
                            // console.log('kobo a modificar GEOT ' + kobomod.properties.kobo_type + ' LADO ' + kobomod.properties.gposition);
                            // var prop2 = vprop + '2';
                            // console.log('RIGHT vprop2 ' + prop2 + ' VAL ' + arrprop);
                            ifdt.properties[vprop + '2'] = arrprop;

                        }

                    } else {
                        // console.log('kobo a modificar OTHER ' + kobomod.properties.kobo_type);
                        ifdt.properties[vprop] = arrprop;
                    }
                }
            }

            for (var [cindex, cval] of ifdt.geometry.coordinates.entries()) {
                var newkobo = {};
                if (cindex >= ini && cindex <= fin) {
                    newkobo.kobo_id = datamod._id;
                    newkobo.kobo_type = datamod.properties.kobo_type;
                    arrkoboedit.push(newkobo);

                } else {
                    if (ifdt.properties.koboedit !== undefined && ifdt.properties.koboedit.length != 0) {
                        arrkoboedit.push(ifdt.properties.koboedit[cindex]);

                    } else {
                        arrkoboedit.push(newkobo);

                    }
                }
                // console.log(cindex + JSON.stringify(arrkoboedit[cindex]));

            }
            ifdt.properties.koboedit = arrkoboedit;
            ifdt.isNew = false;

            ifdt.save(function (err, imod) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                // console.log('imod.properties.koboedit: ' + JSON.stringify(imod.properties.koboedit));

                res.status(200).jsonp(kobomod);
            });
        });

    });


});
module.exports = router;