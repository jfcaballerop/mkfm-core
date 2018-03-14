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


var scheduleModels = require(path.join(__dirname, '../models/schedule'));
var Schedule = mongoose.model('Schedule');
var schedulenatModels = require(path.join(__dirname, '../models/schedulenat'));
var Schedulenat = mongoose.model('Schedulenat');
var schedulephyModels = require(path.join(__dirname, '../models/schedulephy'));
var Schedulephy = mongoose.model('Schedulephy');

router.use(function timeLog(req, res, next) {
    ////// debug('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});
router.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

/*******************************************************
        WEB CALLS
**********************************************************/

/* GET Schedule */
router.get('/index', function (req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/schedule/V1/getSchedule/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };

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
            resp.render('schedule', {
                schedules: responseObject,
                token: req.token,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME
            });

        });
    });

    request.end();


});
/*******************************************************
        AJAX CALLS
**********************************************************/

router.post('/getSched/:riskType/:budget', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB getSched: ' + req.params.riskType);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/schedule/V1/getSchedule/' + req.params.riskType + '/' + req.params.budget,
        method: 'GET',
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
            // console.log('responseObject:     ' + responseObject);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});

router.post('/saveEvent/:name/:startDate/:endDate', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB saveEvent: ' + req.params.name);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/schedule/V1/saveEvent/' + req.params.name + '/' + req.params.startDate + '/' + req.params.endDate,
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
            // console.log('responseObject:     ' + responseObject);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
router.post('/completeEvent/:name', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB saveEvent: ' + req.params.name);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/schedule/V1/completeEvent/' + req.params.name,
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
            // console.log('responseObject:     ' + responseObject);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});


/*******************************************************
        API CALLS
**********************************************************/
/* GET JSON Templates listing. */
router.get('/V1/getSchedule/', function (req, res, next) {
    Schedule.find().exec(function (err, scheds) {
        if (err) {
            res.send(500, err.message);
        }
        // debug(" ### GET getSchedules ### \n" + JSON.stringify(scheds));

        res.status(200).jsonp(scheds);

    });

});
/* GET JSON Sched. */
router.get('/V1/getSchedule/:type', function (req, res, next) {
    var ret = {
        "result": "OK"
    };


    if (req.params.type === 'PHY') {
        Schedulephy.find().sort({
            "properties.riskOrder": 1
        }).exec(function (err, scheds) {
            if (err) {
                res.send(500, err.message);
            }
            // debug(" ### GET getSchedules ### \n" + JSON.stringify(scheds));
            ret['data'] = scheds;
            res.status(200).jsonp(ret);

        });
    } else if (req.params.type === 'NAT') {
        Schedulenat.find().sort({
            "properties.riskOrder": 1
        }).exec(function (err, scheds) {
            if (err) {
                res.send(500, err.message);
            }
            // debug(" ### GET getSchedules ### \n" + JSON.stringify(scheds));

            ret['data'] = scheds;
            res.status(200).jsonp(ret);
        });
    } else {
        Schedule.find().exec(function (err, scheds) {
            if (err) {
                res.send(500, err.message);
            }
            // debug(" ### GET getSchedules ### \n" + JSON.stringify(scheds));

            ret['data'] = scheds;
            res.status(200).jsonp(ret);
        });

    }

});
/* GET JSON Sched. */
router.get('/V1/getSchedule/:type/:budget', function (req, res, next) {
    var ret = {
        "result": "OK"
    };
    var limitBudget = Number(req.params.budget);


    if (req.params.type === 'PHY') {
        Schedulephy.find().sort({
            "properties.riskOrder": 1
        }).exec(function (err, scheds) {
            if (err) {
                res.send(500, err.message);
            }
            // debug(" ### GET getSchedules ### \n" + JSON.stringify(scheds));
            var total = 0;
            ret['data'] = [];
            for (var s of scheds) {
                if (total <= parseFloat(limitBudget))
                    ret['data'].push(s);
                total += parseFloat(s.properties.cost);

            }
            res.status(200).jsonp(ret);

        });
    } else if (req.params.type === 'NAT') {
        Schedulenat.find().sort({
            "properties.riskOrder": 1
        }).exec(function (err, scheds) {
            if (err) {
                res.send(500, err.message);
            }
            // debug(" ### GET getSchedules ### \n" + JSON.stringify(scheds));

            var total = 0;
            ret['data'] = [];
            for (var s of scheds) {
                if (total <= parseFloat(limitBudget))
                    ret['data'].push(s);
                total += parseFloat(s.properties.cost);

            }
            res.status(200).jsonp(ret);
        });
    } else {
        Schedule.find().exec(function (err, scheds) {
            if (err) {
                res.send(500, err.message);
            }
            // debug(" ### GET getSchedules ### \n" + JSON.stringify(scheds));

            ret['data'] = scheds;
            res.status(200).jsonp(ret);
        });

    }

});

/* GET JSON Report */
router.post('/V1/saveEvent/:name/:startDate/:endDate', function (req, res, next) {
    var ret = {
        "result": "OK"
    };
    var dbfields = {
        properties: {}
    };
    Schedule.findOneAndUpdate({
        "properties.code": req.params.name
    }, {
        $set: {
            startDate: req.params.startDate,
            endDate: req.params.endDate
        }
    }).exec(function (err, doc) {
        if (err) {
            res.send(500, err.message);
        }
        debug(doc);
        res.status(200).jsonp(ret);

    });


});
/* GET JSON Report */
router.post('/V1/completeEvent/:name', function (req, res, next) {
    var ret = {
        "result": "OK"
    };
    var dbfields = {
        properties: {}
    };
    Schedule.findOneAndUpdate({
        "properties.code": req.params.name
    }, {
        $set: {
            completed: true
        }
    }).exec(function (err, doc) {
        if (err) {
            res.send(500, err.message);
        }
        debug(doc);
        res.status(200).jsonp(ret);

    });


});

module.exports = router;