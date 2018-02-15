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

var templateModels = require(path.join(__dirname, '../models/template'));
var Template = mongoose.model('Template');
var infodatatrackModels = require(path.join(__dirname, '../../gis/models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');


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

router.get('/', function (req, res, next) {
    var doc = new PDFDocument()
    var filename = 'report1';
    // Stripping special characters
    filename = encodeURIComponent(filename) + '.pdf';
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
router.get('/pdfmake', function (req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/report/V1/getTemplates/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };

    var request = http.request(options, function (res) {
        ////// debug('STATUS: ' + res.statusCode);
        ////// debug('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            ////// debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// debug('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // debug(JSON.stringify(responseObject));
            resp.render('pdfpreview', {
                templates: responseObject,
                token: req.token,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME
            });

        });
    });

    request.end();


});
/*******************************************************
        AJAX CALLS
**********************************************************/
router.post('/generatePDF/:report/:asset/:assetType', function (req, resp) {
    var postData = extend({}, req.body);
    debug('## WEB generatePDF: ' + req.params.report);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/report/V1/generatePDF/' + req.params.report + '/' + req.params.asset + '/' + req.params.assetType,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            // console.log('responseObject:     ' + responseObject);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});


/*******************************************************
        API CALLS
**********************************************************/
/* GET JSON Templates listing. */
router.get('/V1/getTemplates/', function (req, res, next) {
    Template.find().exec(function (err, temps) {
        if (err) {
            res.send(500, err.message);
        }
        // debug(" ### GET getTemplates ### \n");

        res.status(200).jsonp(temps);

    });

});

/* GET JSON Report */
router.post('/V1/generatePDF/:reportName/:assetType/:assetCode', function (req, res, next) {
    var ret = {
        "result": "OK",
        "docDefinition": {}
    };
    var dbfields = {
        properties: {
        }
    };
    Template.findOne({
        "config.HTML.id": req.params.reportName
    }).exec(function (err, temp) {
        if (err) {
            res.send(500, err.message);
        }
        // debug(" ### GET generatePDF ### \n" + temp);
        var asscode = req.params.assetCode;
        var assetType = req.params.assetType;
        // asscode = "F6-SD-06-B-35385";
        // debug('Asset Code: ' + asscode);////////////////////////////////////////////
        // debug('Asset assetType: ' + assetType);////////////////////////////////////////////

        code='/' + asscode + '/';
        
        // while(true){;}
        var variables = [];
        if (assetType==='BRIDGE'){
            for (tem in temp.config.fields) {
                if (temp.config.fields[tem].type === 'dbfield') {
                    // console.log(temp.config.fields[tem]);
                    variables.push(temp.config.fields[tem].name);
                }
            }
            debug(variables);
            assetCode = "bcode";
        }
        // Infodatatrack.findOne({ $or: [{ "properties.bcode": /F6-SD-06-B-3585/ }, { "properties.gcode": /F6-SD-06-B-3585/ }] }, function (err, ifdts) {
        Infodatatrack.findOne({
        $or: [{
            "properties.rcode": req.params.assetCode
            },
            {
                "properties.rname": req.params.assetCode
            },
            {
                "properties.bcode": req.params.assetCode
            },
            {
                "properties.bname": req.params.assetCode
            },
            {
                "properties.gcode": req.params.assetCode
            },
            {
                "properties.gcode2": req.params.assetCode
            },
            {
                "properties.dcode": req.params.assetCode
            },
            {
                "properties.dcode2": req.params.assetCode
            },
            {
                "properties.Ccode": req.params.assetCode
            }
        ]
    }).exec( function (err, ifdt) { // literal
            if (err) {
                res.send(500, err.message);            
            }

                // debug(ifdt);
                if (ifdt !== null) {
                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        for (v in variables) {
                            if (ifdt.properties[assetCode][i] === req.params.assetCode.toString()) {
                                dbfields.properties[variables[v].replace(/#/g, '')] = ifdt.properties[variables[v].replace(/#/g, '')][i];
                            }
                        } 
                    }
                }        
            ret.docDefinition = services.docPdf(temp.docDefinition, temp.config, dbfields);

            res.status(200).jsonp(ret);
           
        });

       

    });







});

module.exports = router;