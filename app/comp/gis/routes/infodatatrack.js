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
var service = require(path.join(__dirname, '../../../services/services'));

var infodatatrackModels = require(path.join(__dirname, '../models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');
var roadModels = require(path.join(__dirname, '../models/road'));
var Road = mongoose.model('Road');
var koboinfoModels = require(path.join(__dirname, '../models/koboinfo'));
var Koboinfo = mongoose.model('Koboinfo');



router.use(function timeLog(req, res, next) {
    //// console.log('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});
router.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 1000000
}));
router.use(bodyParser.json({ limit: 1024 * 1024 * 200, type: 'application/json', parameterLimit: 1000000 }));

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
 * SAVE DATA
 */
router.post('/save_tabular_data/', function(req, resp, next) {

    var postData = extend({}, req.body);
    // console.log('INFODATA TRACK postData ' + JSON.stringify(req.body));

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/save_tabular_data/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function(res) {
        // // console.log('STATUS: ' + res.statusCode);
        // // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            // // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //delete responseObject[_id];
            //// console.log(JSON.stringify(responseObject));
            resp.status(200).jsonp(responseObject);
        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});


/* GET List infodatatracks */
router.get('/list_infodatatrack/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});
/* GET List infodatatracks */
router.get('/list_infodatatrackbyid/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/list_byid/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/* GET Near infodatatracks */
router.post('/list_infodatatracks/:lng/:lat', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/getNear/' + req.params.lng + '/' + req.params.lat,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/* GET List infodatatracks */
router.post('/list_infodatatracks/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/* EDIT List infodatatracks */
router.get('/edit_infodatatrack/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/list_infobyid/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
            // 'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            resp.set({
                'Content-Length': Buffer.byteLength(JSON.stringify(responseObject)),
                'Content-Type': 'text/html'
            });

            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('data_infodatatrack', { token: req.token, utm: utm, infodatatrack: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //// console.log(JSON.stringify(responseObject));
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

router.get('/edit_video_infodatatrack/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/list_infobyid/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
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
            // 'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            resp.set({
                'Content-Length': Buffer.byteLength(JSON.stringify(responseObject)),
                'Content-Type': 'text/html'
            });

            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('data_infodatatrack_jquery', { token: req.token, utm: utm, infodatatrack: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //// console.log(JSON.stringify(responseObject));
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});


router.post('/update_infodatatrack', function(req, resp, next) {
    var postData = extend({}, req.body.infodatatrack);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/update_infodatatrack/' + req.body.infodatatrack._id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        // //// console.log('STATUS: ' + res.statusCode);
        // //// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            // //// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            // //// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/infodatatrack/edit_infodatatrack/' + req.body.infodatatrack._id);

        });
    });
    request.on('error', function(err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});


router.post('/update_videoinfodatatrack', function(req, resp, next) {
    var postData = extend({}, req.body.infodatatrack);
    var arrOneCoord = [];
    var arrCoord = [];
    var arrPK = [];
    // Comprobar si trae geometry
    if (postData.geometry !== undefined) {
        // console.log('## WEB/update_videoinfodatatrack geometry ##');
        if (postData.geometry.coordinates !== undefined) {
            //console.log(JSON.stringify(postData.geometry.coordinates));
            postData.geometry.coordinates.forEach(function(element, index) {
                arrOneCoord = element.replace('[ ', '').replace(' ]', '').split(',');
                arrOneCoord.forEach(function(e, i) {
                    arrOneCoord[i] = parseFloat(e.trim());
                });
                arrCoord[index] = arrOneCoord;
                if (index > 0) {
                    arrPK[index] = Math.round((arrPK[index - 1] + service.calPK(arrCoord[index], arrCoord[index - 1])) * 100) / 100;
                } else {
                    arrPK[index] = 0;
                }
            });
            postData.geometry.coordinates = arrCoord;
            postData.properties.pk = arrPK;

            //TODO: si se modifican las COORD, hay que recalcular los PK/UTM
            // console.log(JSON.stringify(postData.properties));
        }
    }

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/update_infodatatrack/' + req.body.infodatatrack._id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        // //// console.log('STATUS: ' + res.statusCode);
        // //// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            // //// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            // //// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/infodatatrack/edit_video_infodatatrack/' + req.body.infodatatrack._id);

        });
    });
    request.on('error', function(err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});


/*
UPDATE ROAD
*/

router.post('/update_infodatatrack', function(req, resp, next) {
    var postData = extend({}, req.body.infodatatrack);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/update_infodatatrack/' + req.body.infodatatrack._id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        // //// console.log('STATUS: ' + res.statusCode);
        // //// console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            // //// console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            // //// console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/infodatatrack/edit_infodatatrack/' + req.body.infodatatrack._id);

        });
    });
    request.on('error', function(err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});

/**
 * duplicate rows
 */
router.post('/duplicate_rows', function(req, resp, next) {
    var _id = req.body._id;
    // console.log('## WEB/duplicate_rows ID ##:: ' + _id);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/duplicate_rows/' + _id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };

    var request = http.request(options, function(res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            // console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function() {
            // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // console.log('postData:: ' + JSON.stringify(postData));
            //success(data);
            // resp.redirect('/auth/WEB/infodatatrack/edit_video_infodatatrack/' + _id);
            resp.status(200).jsonp(responseObject);

        });
    });
    request.on('error', function(err) {
        console.error('problem with request: ${err.message}');
    });
    // request.write(JSON.stringify(postData));
    request.end();
});


/*******************************************************
 API REST CALLS
 **********************************************************/
/* POST infodatatrack */
router.post('/V1/', function(req, res, next) {
    idata = new Infodatatrack(req.body);
    idata.save(function(err, infodatatrack) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(infodatatrack);
    });
});

/* GET JSON Infodatatracks listing. */
router.get('/V1/', function(req, res, next) {
    Infodatatrack.find().exec(function(err, infodatatracks) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatracks);
    });

});
/* GET JSON Infodatatracks listing. */
router.get('/V1/list_order', function(req, res, next) {
    Infodatatrack.find().sort({ 'updated_at': -1 }).exec(function(err, infodatatracks) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatracks);
    });

});

/* GET JSON Infodatatracks listing. */
router.get('/V1/list_info/:id', function(req, res, next) {
    Infodatatrack.find().exec(function(err, infodatatracks) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatracks);
    });

});


/* GET JSON Infodatatracks listing. */
router.get('/V1/:id_video', function(req, res, next) {
    Infodatatrack.findOne({ 'properties.video_roads': req.params.id_video }).sort({ "updated_at": -1 }).exec(function(err, infodatatracks) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatracks);
    });

});
/* GET JSON Infodatatracks listing. */
router.get('/V1/list_byid/:id', function(req, res, next) {
    Infodatatrack.findById(req.params.id).exec(function(err, infodatatrack) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatrack);
    });

});
/* GET JSON Infodatatracks listing id. */
router.get('/V1/list_id/', function(req, res, next) {
    Infodatatrack.find({}, { _id: 1, "properties.name": 1 }).exec(function(err, infodatatracks) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(infodatatracks);
    });

});
/* GET JSON infodatatrack by id. */
router.get('/V1/list_infobyid/:id', function(req, res, next) {
    Infodatatrack.findById(req.params.id).exec(function(err, infodatatrack) {
        if (err) {
            res.send(500, err.message);
        }
        // console.log(JSON.stringify(infodatatrack));
        // TODO: cargar la info de los Kobos
        var koboProm = new Array();

        infodatatrack.geometry.coordinates.forEach(function(element, tabindex) {

            var point = { type: "Point", coordinates: [parseFloat(element[0]), parseFloat(element[1])] };
            koboProm[tabindex] = Koboinfo.geoNear(point, { maxDistance: config.QUERYMAXDISTANCE, spherical: true }, function(err, kobos) {
                if (err) {
                    //console.log(err);
                    return res.status(500).send(err.message);
                }
                return kobos[0];
            });
        });

        Promise.all(koboProm).then(function(values) {
            var koboarr = [];
            values.forEach(function(val, index) {
                if (val.length > 0) {
                    // console.log('VAL: ' + val[0].dis);
                    koboarr[index] = {
                        kobo_id: val[0].obj._id,
                        kobo_type: val[0].obj.properties.kobo_type.toUpperCase()
                    };
                } else {
                    // console.log('UNDEFINED');
                    koboarr[index] = undefined;
                }
                //console.log('PROMISE ALL ' + index + '-PROMI ? SE ALL ' + index + '- ' + JSON.stringify(val[0].obj.properties.description) :'-' );
                //rldata = JSON.parse(val);
                // tabdata.properties.IRI = v ? al[0rties.IRI = val[0].obj.properties.descriptio :'-' n;
            });
            infodatatrack.properties.kobo = koboarr;
            // console.log('TABDATA ' + JSON.stringify(tabdata));
            res.status(200).jsonp(infodatatrack);
        }).catch(function(reason) {
            console.log(reason);
            return res.status(500).send(reason);

        });

        // res.status(200).jsonp(infodatatrack);
    });

});



/* DEL file */
router.post('/V1/delete/:id', function(req, res, next) {
    Infodatatrack.findByIdAndRemove(req.params.id, function(err, file) {
        // // console.log('## API DEL file: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        Infodatatrack.find(function(err, files) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(files);
        });
    });

});

/* UPDATE Infodatatrack */
router.post('/V1/update_infodatatrack/:id', function(req, res, next) {
    //console.log('## UPDATE Infodatatrack ##\nBODY: ' + JSON.stringify(req.body));
    Infodatatrack.findById(req.params.id, function(err, infodatatrack) {
        var saveInfodatatrack = extend({}, req.body);
        for (var key in saveInfodatatrack) {
            //console.log(key + ": " + saveInfodatatrack[key]);
            if (typeof saveInfodatatrack[key] === 'object') {
                // estoy dentro de properties
                for (var key2 in saveInfodatatrack[key]) {
                    //console.log(key2 + ": " + saveInfodatatrack[key][key2]);
                    infodatatrack[key][key2] = saveInfodatatrack[key][key2];
                }
            } else {
                infodatatrack[key] = saveInfodatatrack[key];
            }
        }

        //console.log('## UPDATE Infodatatrack ##\nfind&update: ' + JSON.stringify(infodatatrack));
        infodatatrack.updated_at = new Date();
        infodatatrack.save(function(err, data) {
            if (err) {
                return res.status(500).send(err.message);
            }
            //console.log('RESULT OK :\n' + JSON.stringify(data));
            res.status(200).jsonp(data);
        });
        // Infodatatrack.findByIdAndUpdate(req.params.id, { $set: saveInfodatatrack }, function(err, result) {
        //     if (err) {
        //         //// console.log(err);
        //         return res.status(500).send(err.message);
        //     }
        //     //// console.log("RESULT: " + result);
        //     res.status(200).jsonp(result);
        //     // res.send('Done')
        // });
    });

});
/* GET JSON Infodatatracks near. */
router.get('/V1/getNear/:lng/:lat', function(req, res, next) {
    var point = { type: "Point", coordinates: [parseFloat(req.params.lng), parseFloat(req.params.lat)] };

    Infodatatrack.geoNear(point, { maxDistance: config.MAXDISTANCE, spherical: true }, function(err, infodatatracks) {
        if (err) {
            //// console.log(err);
            return res.status(500).send(err.message);
        }
        if (infodatatracks && infodatatracks.length > 0) {
            res.status(200).jsonp(infodatatracks[0]);
        } else {
            res.status(200).jsonp({});
        }
    });


});

/* POST Data Road Track */
router.post('/V1/save_tabular_data/', function(req, res, next) {
    // console.log('API save_tabular_data ' + JSON.stringify(req.body));
    infodatatrack = new Infodatatrack(req.body);
    infodatatrack.save(function(err, data) {
        if (err) {
            return res.status(500).send(err.message);
        }

        Road.find({ "properties.name": infodatatrack.properties.name }).exec(function(err, roads) {
            if (err) {
                res.send(500, err.message);
            }
            roads.forEach(function(road, index) {
                road.proccessed = true;
                road.save(function(err2, data2) {
                    if (err2) {
                        return res.status(500).send(err2.message);
                    }
                    console.log('ROAD modified ' + JSON.stringify(data2._id));

                });
            });
        });

        res.status(200).jsonp(data);
    });
});
/**
 * Duplicate ROWS
 */
router.post('/V1/duplicate_rows/:id', function(req, res, next) {
    console.log('## duplicate_rows Infodatatrack ## ' + req.params.id);
    Infodatatrack.findById(req.params.id, function(err, infodatatrack) {
        //console.log('infodatatrack:: \n' + infodatatrack._id);
        //console.log('infodatatrack2:: \n' + JSON.stringify(infodatatrack));

        for (var key in infodatatrack) {
            if (key === "_doc") {
                for (var key2 in infodatatrack[key]) {
                    //console.log(key2 + " : " + infodatatrack[key2]);
                    // Hay que duplicar Properties y geometry
                    if (key2 === "geometry") {
                        var coordinatesNew = infodatatrack.geometry.coordinates.slice(0);
                        coordinatesNew.push(infodatatrack.geometry.coordinates[infodatatrack.geometry.coordinates.length - 1]);
                        coordinatesNew.unshift(infodatatrack.geometry.coordinates[0]);
                        // console.log('Entro:: ' + coordinatesNew);
                        infodatatrack.geometry.coordinates = coordinatesNew.slice(0);

                    } else if (key2 === "properties") {
                        for (var key3 in infodatatrack.properties) {
                            //console.log("ANTES: " + key2 + " - " + key3 + " : " + (infodatatrack.properties[key3] !== undefined ? infodatatrack.properties[key3].length : ''));
                            if (infodatatrack.properties[key3] !== undefined &&
                                Array.isArray(infodatatrack.properties[key3]) &&
                                infodatatrack.properties[key3].length > 0) {

                                var arrNew = infodatatrack.properties[key3].slice(0);
                                arrNew.push(infodatatrack.properties[key3][infodatatrack.properties[key3].length - 1]);
                                arrNew.unshift(infodatatrack.properties[key3][0]);
                                //console.log(arrNew);
                                // console.log(typeof infodatatrack.properties[key3]);
                                // console.log(typeof arrNew);

                                infodatatrack.properties[key3] = arrNew;
                                //console.log("DESP: " + key3 + " : " + infodatatrack.properties[key3].length);
                            }

                        }

                    }
                }

            }
            // if (typeof saveInfodatatrack[key] === 'object') {
            //     // estoy dentro de properties
            //     for (var key2 in saveInfodatatrack[key]) {
            //         //console.log(key2 + ": " + saveInfodatatrack[key][key2]);
            //         infodatatrack[key][key2] = saveInfodatatrack[key][key2];
            //     }
            // } else {
            //     infodatatrack[key] = saveInfodatatrack[key];
            // }
        }

        //console.log('## UPDATE Infodatatrack ##\nfind&update: ' + infodatatrack);
        infodatatrack.updated_at = new Date();
        infodatatrack.save(function(err, data) {
            if (err) {
                return res.status(500).send(err.message);
            }
            //console.log('RESULT OK :\n' + JSON.stringify(data));
            res.status(200).jsonp(data);
        });
        // Infodatatrack.findByIdAndUpdate(req.params.id, { $set: saveInfodatatrack }, function(err, result) {
        //     if (err) {
        //         //// console.log(err);
        //         return res.status(500).send(err.message);
        //     }
        //     //// console.log("RESULT: " + result);
        //     res.status(200).jsonp(result);
        //     // res.send('Done')
        // });
    });

});
module.exports = router;