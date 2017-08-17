var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config.json'));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('### COMPROBAR AUTH API### ');
    next();
});

// USERS auth
router.use('/users', require(path.join(__dirname, '../app/comp/user/users')));

// INDEX auth
router.use('/index', require(path.join(__dirname, './index')));


module.exports = router;