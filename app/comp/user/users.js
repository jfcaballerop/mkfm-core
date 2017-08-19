var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
var flash = require('connect-flash');
var userModels = require(path.join(__dirname, './models/user'));
var config = require(path.join(__dirname, '../../../config/config'));
var User = mongoose.model('User');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var extend = require('util')._extend;



router.use(function timeLog(req, res, next) {
    console.log('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
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

/* POST API REST new user */
router.post('/new_user', function(req, resp, next) {
    // TODO: Pendiente hacer una validacion de los campos de la request.
    // console.log("## REQ: " + JSON.stringify(req.body.user));
    var postData = extend({}, req.body.user);
    postData.admin = (req.body.user.admin == "" ? true : false);
    postData.activo = true;

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/users/V1/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
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
            data = chunk;

        });
        res.on('end', function() {
            // console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //success(data);
            resp.redirect('/auth/WEB/users/list_users');

        });
    });
    request.on('error', function(err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});

/* GET API REST users listing. */
router.get('/list_users', function(req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/users/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
            data = chunk;

        });
        res.on('end', function() {
            console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});
/* GET DESACTIVATE USER */
router.get('/desactivate/:id', function(req, resp, next) {
    console.log('## WEB DESACTIVATE USER: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/users/V1/desactivate/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
            data = chunk;

        });
        res.on('end', function() {
            console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});


/*******************************************************
        API REST CALLS
**********************************************************/
/* GET JSON users listing. */
router.get('/V1/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(users);
    });

});
/* GET JSON user by login. */
router.get('/V1/:login', function(req, res, next) {
    console.log(req.params.login);
    User.findOne({ 'login': req.params.login }, function(err, user) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(user);
    });

});
/* POST user */
router.post('/V1/', function(req, res, next) {
    user = new User(req.body);
    user.password = user.generateHash(req.body.password);
    user.save(function(err, user) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(user);
    });
});
/* DEL user */
router.delete('/V1/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        user.remove(function(err) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(user);

        });
    });

});
/* DESACTIVATE user */
router.post('/V1/desactivate/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        console.log('## API DESACTIVATE USER: ' + req.params.id);
        user.activo = false;
        user.save(function(err, user) {
            if (err) {
                return res.status(500).send(err.message);
            }
            User.find(function(err, users) {
                if (err) {
                    res.send(500, err.message);
                }
                res.status(200).jsonp(users);
            });
        });
    });

});

module.exports = router;