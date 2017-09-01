var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
var flash = require('connect-flash');
var config = require(path.join(__dirname, '../../../../config/config'));
var querystring = require('querystring');
var bodyParser = require('body-parser');
var extend = require('util')._extend;

var fileuploadModels = require(path.join(__dirname, '../models/fileupload'));
var Filetype = mongoose.model('Filetype');
var filetypeModels = require(path.join(__dirname, '../models/filetype'));
var Filetype = mongoose.model('Filetype');



router.use(function timeLog(req, res, next) {
    //console.log('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});
router.use(bodyParser.urlencoded({
    extended: true
}));
//router.use(fileUpload());
//router.use(uploading.single('foofield'));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

/*******************************************************
        WEB CALLS
**********************************************************/



/*******************************************************
 API REST CALLS
 **********************************************************/
/* POST filetype */
router.post('/V1/', function(req, res, next) {
    fu = new Filetype(req.body);
    fu.save(function(err, filetype) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(filetype);
    });
});

/* GET JSON Filetypes listing. */
router.get('/V1/', function(req, res, next) {
    Filetype.find(function(err, filetypes) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(filetypes);
    });

});
/* GET JSON filetype by id. */
router.get('/V1/:id', function(req, res, next) {
    Filetype.findById(req.params.id, function(err, fup) {
        if (err) {
            res.send(500, err.message);
        }

        res.status(200).jsonp(fup);
    });

});



/* DEL file */
router.post('/V1/delete/:id', function(req, res, next) {
    Filetype.findByIdAndRemove(req.params.id, function(err, file) {
        // console.log('## API DEL file: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        Filetype.find(function(err, files) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(files);
        });
    });

});

/* UPDATE file */
router.post('/V1/update_file/:id', function(req, res, next) {

    res.send('Upoload Filetype');

});
module.exports = router;