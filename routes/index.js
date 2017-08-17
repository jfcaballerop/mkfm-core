var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config'));


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.cookies.jwtToken);
    console.log('## User: ' + req.user);
    res.render('index', { title: 'Home', cname: config.client_name, id: req.user_id, login: req.user_login });
});

module.exports = router;