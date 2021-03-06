var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config'));


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.cookies.jwtToken);
    res.render('index', { token: req.token, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, });
});

module.exports = router;