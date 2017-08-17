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


router.use(function timeLog(req, res, next) {
    console.log('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});


/*******************************************************
        WEB CALLS
**********************************************************/

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('user', { title: 'Usuarios' });
});

/* GET API REST users listing. */
router.get('/list_users', function(req, resp, next) {
    var options = {
        host: 'localhost',
        port: 3000,
        path: '/auth/API/users/V1/',
        method: 'GET'
    };
    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
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
            resp.render('user', { users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

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

module.exports = router;