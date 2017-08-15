var express = require('express');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var userModels = require(path.join(__dirname, './models/user'));
var User = mongoose.model('User');


//router.use('/users');

router.use(function timeLog(req, res, next) {
    console.log('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('user', { title: 'Usuarios' });
});
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

        })
    });

});

module.exports = router;