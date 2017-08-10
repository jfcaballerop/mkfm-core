var express = require('express');
var path = require('path');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('userView', { title: 'Usuarios' });
});

module.exports = router;