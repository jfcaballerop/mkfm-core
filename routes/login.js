var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config.json'));


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login', cname: config.client_name });
});

module.exports = router;