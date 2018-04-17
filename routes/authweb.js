var express = require('express');
var router = express.Router();
var path = require('path');
var jwt = require('jwt-simple');
var jwtweb = require('jsonwebtoken');
var moment = require('moment');
var config = require(path.join(__dirname, '../config/config'));
var bodyParser = require('body-parser');
var debug = require('debug')('debug');


router.use(bodyParser.urlencoded({
    limit: '300mb',
    extended: true
}));
router.use(bodyParser.json({
    limit: '300mb'
}));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {

    debug('### COMPROBAR AUTH WEB ### ');
    var token = req.cookies.jwtToken;
    debug('\n\n## WEB Token: ' + token + "\n\n");
    if (!token || token == undefined) {
        debug('## Cookie Token not found');
        req.flash('message', 'Session expired!');
        res.status(403).redirect('/');
    } else {
        debug('Entro: ' + config.TOKEN_SECRET);
        jwtweb.verify(token, config.TOKEN_SECRET, function (err, token) {
            if (('' + err).indexOf('TokenExpiredError') !== -1) {
                debug('## ERR1: ' + err);
                req.flash('message', 'El token ha expirado!');

                // res.status(403).redirect('/');
                res.status(401).redirect('/');
            } else if (err) {
                debug('## ERR2: ' + err);
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
                debug('## Usuario: ' + req.user_id + ' ' + req.user_login + ' ' + req.rol);
                next();
            }
        });

    }
});



// LOGIN Page
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Login',
        cname: config.client_name,
        message: req.flash('message')
    });
});

// USERS auth
router.use('/users', require(path.join(__dirname, '../app/comp/user/users')));

// GIS FUNCTIONS auth
router.use('/gis', require(path.join(__dirname, '../app/comp/gis/routes/gis')));

// GIS - ROAD FUNCTIONS auth
router.use('/road', require(path.join(__dirname, '../app/comp/gis/routes/road')));

// GIS - KOBO FUNCTIONS auth
router.use('/koboinfo', require(path.join(__dirname, '../app/comp/gis/routes/koboinfo')));

// GIS - ROADLAB FUNCTIONS auth
router.use('/roadlab', require(path.join(__dirname, '../app/comp/gis/routes/roadlab')));

// GIS - INFODATATRACK FUNCTIONS auth
router.use('/infodatatrack', require(path.join(__dirname, '../app/comp/gis/routes/infodatatrack')));

// INDEX auth
router.use('/index', require(path.join(__dirname, './index')));

// MAPS auth
router.use('/maps', require(path.join(__dirname, '../app/comp/gis/routes/maps')));

// DATA SHEET auth
router.use('/data_sheet', require(path.join(__dirname, '../app/comp/gis/routes/data_sheet')));

// ADMIN auth
router.use('/admin', require(path.join(__dirname, '../app/comp/admin/routes/formulas')));

// QUERYS auth
router.use('/query', require(path.join(__dirname, '../app/comp/query/routes/querys')));

// budgets auth
router.use('/budget', require(path.join(__dirname, '../app/comp/budget/routes/budgets')));

// pdf auth
router.use('/report', require(path.join(__dirname, '../app/comp/report/routes/reports')));

// schedule auth
router.use('/schedule', require(path.join(__dirname, '../app/comp/schedule/routes/schedules')));

module.exports = router;