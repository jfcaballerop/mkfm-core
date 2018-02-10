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
var services = require(path.join(__dirname, '../../../services/services'));

var PDFDocument = require('pdfkit');


router.use(function timeLog(req, res, next) {
    ////// debug('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});
router.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

/*******************************************************
        WEB CALLS
**********************************************************/

router.get('/', function(req, res, next) {
    var doc = new PDFDocument()
    var filename = 'report1';
    // Stripping special characters
    filename = encodeURIComponent(filename) + '.pdf'
        // Setting response to 'attachment' (download).
        // If you use 'inline' here it will automatically open the PDF
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    var content = 'Esto es una prueba';
    doc.y = 300;
    doc.text(content, 50, 50);
    doc.pipe(res);
    doc.end();

});

/* GET PDF Maker */
router.get('/pdfmake', function(req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/query/V1/get_one_config/',
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
    //         var responseObject = JSON.parse(data);

    //         var filters = Infodatatrack.schema.tree.properties;
    //         var filtersOff = ['time', 'name', 'proccessed', 'kobo', 'koboedit', 'video_roads', 'surveyor', 'datesurvey', 'coordTimes'];
    //         debug(filters);
    //         for (var foff of filtersOff) {
    //             delete filters[foff];
    //         };

    //         //debug(responseObject.config.properties);

    resp.render('pdfpreview', {
        token: req.token,
        moment: moment,
        title: config.CLIENT_NAME + '-' + config.APP_NAME,
        cname: config.CLIENT_NAME,
        api_key: config.MAPS_API_KEY,
        maps_center: config.MAPS_CENTER_POS,
        maps_zoom: config.MAPS_CENTER_ZOOM
    });

    // });
    // });

    // request.end();
    // resp.render('admin_panel_formulas', { token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

});


module.exports = router;