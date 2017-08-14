var express = require('express');
var path = require('path');
var router = express.Router();
var moment = require('moment');


//router.use('/users');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('user', { title: 'Usuarios' });
});

module.exports = router;