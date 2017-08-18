var express = require('express');
var router = express.Router();
var path = require('path');
var jwt = require('jwt-simple');
var jwtweb = require('jsonwebtoken');
var moment = require('moment');
var config = require(path.join(__dirname, '../config/config'));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('### COMPROBAR AUTH WEB ### ');
    var token = req.cookies.jwtToken;
    console.log('## Token: ' + token);
    if (!token || token == undefined) {
        console.log('## Cookie Token not found');
        req.flash('message', 'Session expired!');
        res.status(403).redirect('/');
    } else {
        console.log('Entro: ' + config.TOKEN_SECRET);
        jwtweb.verify(token, config.TOKEN_SECRET, function(err, token) {
            if (('' + err).indexOf('TokenExpiredError') !== -1) {
                console.log('## ERR1: ' + err);
                req.flash('message', 'El token ha expirado!');
                res.status(403).redirect('/');
            } else if (err) {
                console.log('## ERR2: ' + err);
                req.flash('message', err);
                res.status(403).redirect('/');
            } else {
                req.token = token;
                req.user_id = token.id;
                req.user_login = token.login;
                if (token.admin)
                    req.rol = 'admin';
                else
                    req.user = 'user';
                console.log('## Usuario: ' + req.user_id + ' ' + req.user_login + ' ' + req.rol);
                next();
            }
        });

    }
});

// LOGIN Page
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login', cname: config.client_name, message: req.flash('message') });
});

// USERS auth
router.use('/users', require(path.join(__dirname, '../app/comp/user/users')));

// INDEX auth
router.use('/index', require(path.join(__dirname, './index')));

// MAPS auth
router.use('/maps', require(path.join(__dirname, './maps')));


module.exports = router;