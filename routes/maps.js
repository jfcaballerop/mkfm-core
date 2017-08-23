var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../config/config'));
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
    var list_files = [];
    fs.readdir(path.join(__dirname, '../public/uploads'), function(err, files) {
        if (files)
            list_files = files.concat();
        list_files.forEach(function(item) {
            console.log('## Files: ' + item);
        });
        res.render('maps', { files: list_files, token: req.token, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol, api_key: config.MAPS_API_KEY });
    });
    console.log('## Files 2: ' + list_files);

});

module.exports = router;