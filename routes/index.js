var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config.json'));


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.cookies.jwtToken);
    res.render('index', { title: 'Home', cname: config.client_name });
});

module.exports = router;