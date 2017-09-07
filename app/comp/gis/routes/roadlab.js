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
/* GET List roadlabs */
router.get('/list_roadlabs', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/roadlab/V1/',
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

/* GET Near roadlabs */
router.post('/list_roadlabs/:lng/:lat', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/roadlab/V1/getNear/' + req.params.lng + '/' + req.params.lat,
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

/* GET List roadlabs */
router.post('/list_roadlabs/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/roadlab/V1/' + req.params.id,
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
            data = chunk;

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

/* GET List roadlabs */
router.get('/edit_roadlab/:id', function(req, resp, next) {

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/roadlab/V1/' + req.params.id,
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
            data = chunk;

        });
        res.on('end', function() {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);

            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('data_roadlab', { token: req.token, utm: utm, roadlab: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //console.log(JSON.stringify(responseObject));
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/*
UPDATE ROAD
*/

router.post('/update_roadlab', function(req, resp, next) {
    var postData = extend({}, req.body.roadlab);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/roadlab/V1/update_roadlab/' + req.body.roadlab._id,
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
            data = chunk;

        });
        res.on('end', function() {
            // //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/roadlab/edit_roadlab/' + req.body.roadlab._id);

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
/* POST roadlab */
router.post('/V1/', function(req, res, next) {
    fu = new Roadlab(req.body);
    fu.save(function(err, roadlab) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(roadlab);
    });
});

/* GET JSON Roadlabs listing. */
router.get('/V1/', function(req, res, next) {
    Roadlab.find().exec(function(err, roadlabs) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(roadlabs);
    });

});
/* GET JSON Roadlabs listing id. */
router.get('/V1/list_id/', function(req, res, next) {
    Roadlab.find({}, { _id: 1, "properties.name": 1 }).exec(function(err, roadlabs) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(roadlabs);
    });

});
/* GET JSON roadlab by id. */
router.get('/V1/:id', function(req, res, next) {
    Roadlab.findById(req.params.id, function(err, roadlab) {
        if (err) {
            res.send(500, err.message);
        }

        res.status(200).jsonp(roadlab);
    });

});



/* DEL file */
router.post('/V1/delete/:id', function(req, res, next) {
    Roadlab.findByIdAndRemove(req.params.id, function(err, file) {
        // console.log('## API DEL file: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        Roadlab.find(function(err, files) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(files);
        });
    });

});

/* UPDATE Roadlab */
router.post('/V1/update_roadlab/:id', function(req, res, next) {
    // console.log('## UPDATE ROAD ##\nBODY: ' + JSON.stringify(req.body));
    Roadlab.findById(req.params.id, function(err, roadlab) {
        var saveRoadlab = extend({}, req.body);
        // console.log('## UPDATE ROAD ##\nsaveRoadlab: ' + JSON.stringify(saveRoadlab));

        for (var key in saveRoadlab) {
            // console.log(key + " = " + saveRoadlab[key]);
            if (saveRoadlab[key] !== null && typeof(saveRoadlab[key]) == "object") {
                // Estoy dentro de un subobjeto
                for (var key2 in saveRoadlab[key]) {
                    // console.log(key2 + " = " + saveRoadlab[key][key2]);
                    roadlab[key][key2] = saveRoadlab[key][key2];

                }
            } else {
                roadlab[key] = saveRoadlab[key];

            }
        }

        // console.log('## UPDATE ROAD ##\nfind&update: ' + JSON.stringify(roadlab));
        Roadlab.findByIdAndUpdate(req.params.id, { $set: roadlab }, function(err, result) {
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
/* GET JSON Roadlabs near. */
router.get('/V1/getNear/:lng/:lat', function(req, res, next) {
    var point = { type: "Point", coordinates: [parseFloat(req.params.lng), parseFloat(req.params.lat)] };

    Roadlab.geoNear(point, { maxDistance: config.MAXDISTANCE, spherical: true }, function(err, roadlabs) {
        if (err) {
            //console.log(err);
            return res.status(500).send(err.message);
        }
        if (roadlabs && roadlabs.length > 0) {
            res.status(200).jsonp(roadlabs[0]);
        } else {
            res.status(200).jsonp({});
        }
    });


});

module.exports = router;