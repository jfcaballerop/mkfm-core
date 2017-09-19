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

var infodatatrackModels = require(path.join(__dirname, '../models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');



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
router.post('/update_videoinfodatatrack', function(req, resp, next) {
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
            resp.redirect('/auth/WEB/infodatatrack/edit_video_infodatatrack/' + req.body.infodatatrack._id);

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
        res.status(200).jsonp(infodatatrack);
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
    console.log('## UPDATE Infodatatrack ##\nBODY: ' + JSON.stringify(req.body));
    Infodatatrack.findById(req.params.id, function(err, infodatatrack) {
        var saveInfodatatrack = extend({}, req.body);
        for (var key in saveInfodatatrack) {
            console.log(key + ": " + saveInfodatatrack[key]);
            if (typeof saveInfodatatrack[key] === 'object') {
                // estoy dentro de properties
                for (var key2 in saveInfodatatrack[key]) {
                    // console.log(key2 + ": " + saveInfodatatrack[key][key2]);
                    infodatatrack[key][key2] = saveInfodatatrack[key][key2];

                }
            } else {
                infodatatrack[key] = saveInfodatatrack[key];
            }
        }

        console.log('## UPDATE Infodatatrack ##\nfind&update: ' + JSON.stringify(infodatatrack));
        infodatatrack.updated_at = new Date();
        infodatatrack.save(function(err, data) {
            if (err) {
                return res.status(500).send(err.message);
            }
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
        res.status(200).jsonp(data);
    });
});

module.exports = router;