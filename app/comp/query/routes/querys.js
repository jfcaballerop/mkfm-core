//DEBUG
var debug = require('debug')('debug');

var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var config = require(path.join(__dirname, '../../../../config/config'));
var bodyParser = require('body-parser');
var extend = require('util')._extend;
var multer = require('multer');
var formulasService = require(path.join(__dirname, '../../../services/formulas'));

var fileuploadModels = require(path.join(__dirname, '../../gis/models/fileupload'));
var Fileupload = mongoose.model('Fileupload');
var filetypeModels = require(path.join(__dirname, '../../gis/models/filetype'));
var Filetype = mongoose.model('Filetype');
var infodatatrackModels = require(path.join(__dirname, '../../gis/models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');


router.use(function timeLog(req, res, next) {
    ////// debug('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
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

/*
 * Global VBLES
 */
var filetypesObject = {};

/*******************************************************
        WEB CALLS
**********************************************************/
/* GET Control panel */
router.get('/consultas', function(req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/query/V1/consultas/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    // // Peticiones 


    // var request = http.request(options, function(res) {
    //     ////// debug('STATUS: ' + res.statusCode);
    //     ////// debug('HEADERS: ' + JSON.stringify(res.headers));
    //     res.setEncoding('utf8');
    //     var data = '';
    //     res.on('data', function(chunk) {
    //         ////// debug('BODY: ' + chunk);
    //         data += chunk;

    //     });
    //     res.on('end', function() {
    //         //// debug('DATA ' + data.length + ' ' + data);
    // var responseObject = JSON.parse(data);
    var filters = Infodatatrack.schema.tree.properties;
    var filtersOff = ['time', 'proccessed', 'kobo', 'koboedit', 'video_roads', 'surveyor', 'datesurvey', 'coordTimes'];
    debug(filters);
    for (var foff of filtersOff) {
        delete filters[foff];
    };
    resp.render('querys', { filters: filters, token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

    // });
    // });

    // request.end();
    // resp.render('admin_panel_formulas', { token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

});





/*******************************************************
 API REST CALLS
 **********************************************************/



/* GET JSON formulas listing. */
router.get('/V1/consultas/', function(req, res, next) {
    Infodatatrack.find().exec(function(err, ifdts) {
        if (err) {
            res.send(500, err.message);
        }
        //debug(" ### GET Querys ### \n" + JSON.stringify(ifdts));

        res.status(200).jsonp(ifdts);
    });

});



module.exports = router;