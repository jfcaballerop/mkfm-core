var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config'));


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('maps', { title: 'Home', cname: config.client_name, id: req.user_id, login: req.user_login, api_key: config.MAPS_API_KEY });
});

module.exports = router;