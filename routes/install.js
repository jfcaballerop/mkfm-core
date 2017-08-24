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

/* GET JSON user by login. */
router.get('/V1/:login', function(req, res, next) {
    console.log(req.params.login);
    User.findOne({ 'login': req.params.login }, function(err, user) {
        if (err) {
            res.send(500, err.message);
        }
        console.log('## User Encontrado para la install::' + user);
        if (user.admin && !user.activo) {
            user.password = user.generateHash(user.password);
            user.activo = true;
            console.log('## USER Install: ' + JSON.stringify(user));
            user.save(function(err, updateduser) {
                if (err) return handleError(err);
                res.status(200).jsonp(updateduser);

            });

        } else {
            res.status(403).send('ERROR en la instalacion');

        }
    });

});

module.exports = router;