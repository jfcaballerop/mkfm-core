var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config'));
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
var flash = require('connect-flash');
var userModels = require(path.join(__dirname, '../app/comp/user/models/user'));
var User = mongoose.model('User');
var service = require(path.join(__dirname, '../app/services/services'));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login', cname: config.client_name, message: req.flash('message') });
});

/* LOGIN action */
router.post('/login', function(req, res, next) {
    if (!validator.isEmpty(req.body.user_login) && !validator.isEmpty(req.body.user_passwd)) {
        User.findOne({ 'login': req.body.user_login }, function(err, user) {
            if (err) {
                res.status(500).send(err.message);
            }
            if (user.validPassword(req.body.user_passwd)) {
                //res.cookie('jwtToken', service.createToken(user));
                res.cookie('jwtToken', service.createWebToken(user));
                res.redirect('/auth/WEB/index');
            } else {
                req.flash('message', 'Error de autenticacion');
                res.status(401).redirect('/');
            }
        });
        //res.render('user', { title: 'Usuarios' });
    } else {
        res.status(401).send('Error de autenticacion');
    }
});
/* LOGOUT action */
router.get('/logout', function(req, res, next) {
    //res.cookie('jwtToken', service.createToken(user));
    res.cookie('jwtToken', '');
    req.flash('message', 'Session closed');
    res.status(401).redirect('/');

});


module.exports = router;