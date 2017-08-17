var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config.json'));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('### COMPROBAR AUTH WEB ### ');
    console.log(req.cookies.jwtToken);
    var cookie = req.cookies.jwtToken;
    if (!cookie || cookie == undefined) {
        console.log('## Cookie not found');
        req.flash('message', 'Session expired!');
        res.status(403).redirect('/');
    } else {
        next();
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


module.exports = router;