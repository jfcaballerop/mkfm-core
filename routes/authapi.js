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
            .send({
                message: "Tu petición no tiene cabecera de autorización"
            });
    }
    var token = req.headers.authorization.split(" ")[1];
    console.log('\n\n## API Token: ' + token + "\n\n");
    if (!token || token == undefined) {
        console.log('## Cookie Token not found');
        res.status(403).send('Session expired!');
    } else {
        console.log('Entro: ' + config.TOKEN_SECRET);
        jwtweb.verify(token, config.TOKEN_SECRET, function (err, token) {
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
router.use('/gis', require(path.join(__dirname, '../app/comp/gis/routes/gis')));

// ADMIN auth
router.use('/admin', require(path.join(__dirname, '../app/comp/admin/routes/formulas')));

// QUERYS auth
router.use('/query', require(path.join(__dirname, '../app/comp/query/routes/querys')));

// budgets auth
router.use('/budget', require(path.join(__dirname, '../app/comp/budget/routes/budgets')));

// FILETYPE auth
router.use('/filetype', require(path.join(__dirname, '../app/comp/gis/routes/filetype')));

// ROAD auth
router.use('/road', require(path.join(__dirname, '../app/comp/gis/routes/road')));

// KOBO auth
router.use('/koboinfo', require(path.join(__dirname, '../app/comp/gis/routes/koboinfo')));

// ROADLAB auth
router.use('/roadlab', require(path.join(__dirname, '../app/comp/gis/routes/roadlab')));

// INFODATATRACK auth
router.use('/infodatatrack', require(path.join(__dirname, '../app/comp/gis/routes/infodatatrack')));

// INDEX auth
router.use('/index', require(path.join(__dirname, './index')));


module.exports = router;