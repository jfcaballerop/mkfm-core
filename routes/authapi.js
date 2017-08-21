var express = require('express');
var router = express.Router();
var path = require('path');
var jwt = require('jwt-simple');
var jwtweb = require('jsonwebtoken');
var moment = require('moment');
var config = require(path.join(__dirname, '../config/config'));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('### COMPROBAR AUTH API### ');
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Tu petición no tiene cabecera de autorización" });
    }
    var token = req.headers.authorization.split(" ")[1];
    console.log('\n\n## API Token: ' + token + "\n\n");
    if (!token || token == undefined) {
        console.log('## Cookie Token not found');
        res.status(403).send('Session expired!');
    } else {
        console.log('Entro: ' + config.TOKEN_SECRET);
        jwtweb.verify(token, config.TOKEN_SECRET, function(err, token) {
            if (('' + err).indexOf('TokenExpiredError') !== -1) {
                console.log('## ERR1: ' + err);
                res.status(403).send('El token ha expirado!');
            } else if (err) {
                console.log('## ERR2: ' + err);
                res.status(403).send(err);
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

// USERS auth
router.use('/users', require(path.join(__dirname, '../app/comp/user/users')));

// GIS auth
router.use('/gis', require(path.join(__dirname, '../app/comp/gis/gis')));

// INDEX auth
router.use('/index', require(path.join(__dirname, './index')));


module.exports = router;