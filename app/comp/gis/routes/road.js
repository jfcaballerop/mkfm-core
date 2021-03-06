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
var valid = require(path.join(__dirname, '../../../services/inputValidation'));

var roadModels = require(path.join(__dirname, '../models/road'));
var Road = mongoose.model('Road');
var roadlabModels = require(path.join(__dirname, '../models/roadlab'));
var Roadlab = mongoose.model('Roadlab');


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
/* GET List roads */
router.get('/list_roads', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
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


/* GET List roads */
router.post('/list_roads/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/list_roads/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
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

/* GET List roads */
router.post('/tabular_data/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/tabular_data/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
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


/* GET List roads */
router.get('/edit_road/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/list_roads/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);

            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('data_road', { token: req.token, utm: utm, road: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //console.log(JSON.stringify(responseObject));
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});
/* GET total_traveled */
router.get('/total_traveled', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/tot_km_trav/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);

            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('data_road_total_traveled', { token: req.token, utm: utm, road_tk: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //console.log(JSON.stringify(responseObject));
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/*
UPDATE ROAD
*/

router.post('/update_road', function(req, resp, next) {
    var postData = extend({}, req.body.road);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/update_road/' + req.body.road._id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        // //console.log('STATUS: ' + res.statusCode);
        // //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            // //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            // //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/road/edit_road/' + req.body.road._id);

        });
    });
    request.on('error', function(err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});

/*******************************************************
 API REST CALLS
 **********************************************************/
/* POST road */
router.post('/V1/', function(req, res, next) {
    fu = new Road(req.body);
    fu.save(function(err, road) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(road);
    });
});

/* GET JSON Roads listing. */
router.get('/V1/', function(req, res, next) {
    Road.find().exec(function(err, roads) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(roads);
    });

});
/* GET JSON Roads listing id. */
router.get('/V1/list_id/', function(req, res, next) {
    Road.find({}, { _id: 1, "properties.name": 1 }).exec(function(err, roads) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(roads);
    });

});
router.get('/V1/list_id_not_proccesed/', function(req, res, next) {
    Road.find({ proccessed: false }, { _id: 1, "properties.name": 1 }).exec(function(err, roads) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(roads);
    });

});
/* GET JSON road by id. */
router.get('/V1/list_roads/:id', function(req, res, next) {
    Road.findById(req.params.id, function(err, road) {
        if (err) {
            res.send(500, err.message);
        }

        // Obtener para cada 

        res.status(200).jsonp(road);
    });

});
/* GET JSON road by id. */
router.get('/V1/tabular_data/:id', function(req, res, next) {
    Road.findById(req.params.id, function(err, tabdata) {
        if (err) {
            res.send(500, err.message);
        }

        // Obtener para cada coordenada el JSON del resto de colecciones.
        //ROADLAB
        var roadlabProm = new Array();
        var arrPK = new Array();
        i = -1;
        tabdata.geometry.coordinates.forEach(function(element, tabindex) {
            var utmValAct = utm.fromLatLon(element[0], element[1], 20);
            if (tabindex > 0) {
                var elemant = tabdata.geometry.coordinates[tabindex - 1];
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

            var point = { type: "Point", coordinates: [parseFloat(element[0]), parseFloat(element[1])] };
            roadlabProm[tabindex] = Roadlab.geoNear(point, { maxDistance: 100, spherical: true }, function(err, roadlabs) {
                if (err) {
                    //console.log(err);
                    return res.status(500).send(err.message);
                }
                return roadlabs[0];
            });

        });
        tabdata.properties.pk = arrPK;

        Promise.all(roadlabProm).then(function(values) {
            var arrIRI = [];
            values.forEach(function(val, index) {
                if (val.length > 0) {
                    // console.log('VAL ' + JSON.stringify(val));
                    arrIRI[index] = val[0].obj.properties.description.replace(/^(.*)IRI: (.*) Suspension(.*)$/, '$2');
                } else {
                    // console.log('UNDEFINED');
                    arrIRI[index] = '';
                }
                //console.log('PROMISE ALL ' + index + '-PROMI ? SE ALL ' + index + '- ' + JSON.stringify(val[0].obj.properties.description) :'-' );
                //rldata = JSON.parse(val);
                // tabdata.properties.IRI = v ? al[0rties.IRI = val[0].obj.properties.descriptio :'-' n;
            });
            tabdata.properties.iri = arrIRI;
            // console.log('TABDATA ' + JSON.stringify(tabdata));
            res.status(200).jsonp(tabdata);
        }).catch(function(reason) {
            console.log(reason);
            return res.status(500).send(reason);

        });
    });

});



/* DEL file */
router.post('/V1/delete/:id', function(req, res, next) {
    Road.findByIdAndRemove(req.params.id, function(err, file) {
        // console.log('## API DEL file: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        Road.find(function(err, files) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(files);
        });
    });

});

/* UPDATE Road */
router.post('/V1/update_road/:id', function(req, res, next) {
    // console.log('## UPDATE ROAD ##\nBODY: ' + JSON.stringify(req.body));
    Road.findById(req.params.id, function(err, road) {
        var saveRoad = extend({}, req.body);
        // console.log('## UPDATE ROAD ##\nsaveRoad: ' + JSON.stringify(saveRoad));

        for (var key in saveRoad) {
            // console.log(key + " = " + saveRoad[key]);
            if (saveRoad[key] !== null && typeof(saveRoad[key]) == "object") {
                // Estoy dentro de un subobjeto
                for (var key2 in saveRoad[key]) {
                    // console.log(key2 + " = " + saveRoad[key][key2]);
                    road[key][key2] = saveRoad[key][key2];

                }
            } else {
                road[key] = saveRoad[key];

            }
        }

        // console.log('## UPDATE ROAD ##\nfind&update: ' + JSON.stringify(road));
        Road.findByIdAndUpdate(req.params.id, { $set: road }, function(err, result) {
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


/* GET JSON road by id. */
router.get('/V1/tot_km_trav', function(req, res, next) {
    var resJSON = {
        roadName: [],
        roadKm: [],
        roadTime: [],
        roadTotTime: 0
    };
    var arrPK = [];
    Road.find().exec(function(err, roads) {
        if (err) {
            res.send(500, err.message);
        }
        var timetot = 0;

        var elem2 = roads[0];
        var varGood = 0;
        var varBad = 0;
        roads.forEach(function(elem, ind) {
            arrPK = [];
            // console.log(JSON.stringify(road));
            elem.geometry.coordinates.forEach(function(element, tabindex) {
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

            // with valid.elemtIsGood we are validating the contents inside de object elem
            if (valid.elemtIsGood(elem)) {
                varGood++;
                // console.log('elem.properties.name1:         ' + elem.properties.name);
                ; // we are all good!
                // since we are iterating over all the elements, we will use the last good
                // value for the bad element
                elem2 = elem;
                elem = elem2;
            } else {
                varBad++;
                console.log('elem._id:         ' + elem._id);
                //  while(true) {console.log('fck!')}// what to do here?
                // console.log(elem2);
                console.log('we are NOT all good!');
                elem = elem2;
            }
            resJSON.roadName.push(elem.properties.name); 
            resJSON.roadKm.push(arrPK[arrPK.length - 1]);            
            var time = elem.geometry.coordinates.length;
            timetot += elem.geometry.coordinates.length;
            var minutes = Math.floor(time / 60);
            var seconds = time - minutes * 60;

            function str_pad_left(string, pad, length) {
                return (new Array(length + 1).join(pad) + string).slice(-length);
            }
            var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);

            resJSON.roadTime.push(finalTime);
            var hoursTot = Math.floor(timetot / 3600);
            var minutesTot = Math.floor(timetot / 60);
            var secondsTot = timetot - minutesTot * 60;
            resJSON.roadTotTime = str_pad_left(hoursTot, '0', 2) + ':' + str_pad_left(minutesTot, '0', 2) + ':' + str_pad_left(secondsTot, '0', 2);
        });

        console.log('varGood ' + varGood);
        console.log('varBad  ' + varBad);
        res.status(200).jsonp(resJSON);
    });
    // Road.findById(req.params.id, function(err, tabdata) {
    //     if (err) {
    //         res.send(500, err.message);
    //     }

    //     // Obtener para cada coordenada el JSON del resto de colecciones.
    //     //ROADLAB
    //     var roadlabProm = new Array();
    //     var arrPK = new Array();
    //     i = -1;


    //         var point = { type: "Point", coordinates: [parseFloat(element[0]), parseFloat(element[1])] };
    //         roadlabProm[tabindex] = Roadlab.geoNear(point, { maxDistance: 100, spherical: true }, function(err, roadlabs) {
    //             if (err) {
    //                 //console.log(err);
    //                 return res.status(500).send(err.message);
    //             }
    //             return roadlabs[0];
    //         });

    //     });
    //     tabdata.properties.pk = arrPK;

    //     Promise.all(roadlabProm).then(function(values) {
    //         var arrIRI = [];
    //         values.forEach(function(val, index) {
    //             if (val.length > 0) {
    //                 // console.log('VAL ' + JSON.stringify(val));
    //                 arrIRI[index] = val[0].obj.properties.description.replace(/^(.*)IRI: (.*) Suspension(.*)$/, '$2');
    //             } else {
    //                 // console.log('UNDEFINED');
    //                 arrIRI[index] = '';
    //             }
    //             //console.log('PROMISE ALL ' + index + '-PROMI ? SE ALL ' + index + '- ' + JSON.stringify(val[0].obj.properties.description) :'-' );
    //             //rldata = JSON.parse(val);
    //             // tabdata.properties.IRI = v ? al[0rties.IRI = val[0].obj.properties.descriptio :'-' n;
    //         });
    //         tabdata.properties.iri = arrIRI;
    //         // console.log('TABDATA ' + JSON.stringify(tabdata));
    //         res.status(200).jsonp(tabdata);
    //     }).catch(function(reason) {
    //         console.log(reason);
    //         return res.status(500).send(reason);

    //     });
    // });

});
module.exports = router;