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
var templateGeneration = require(path.join(__dirname, '../../../services/templates'));
var services = require(path.join(__dirname, '../../../services/services'));

var PDFDocument = require('pdfkit');

var templateModels = require(path.join(__dirname, '../models/template'));
var Template = mongoose.model('Template');
var infodatatrackModels = require(path.join(__dirname, '../../gis/models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');
var koboinfoModels = require(path.join(__dirname, '../../gis/models/koboinfo'));
var Koboinfo = mongoose.model('Koboinfo');

function simpleStringify(object) {
    var simpleObject = {};
    for (var prop in object) {
        if (!object.hasOwnProperty(prop)) {
            continue;
        }
        if (typeof (object[prop]) == 'object') {
            continue;
        }
        if (typeof (object[prop]) == 'function') {
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

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
    // debug('## WEB generatePDF: ' + req.params.report);
    var encoded_url = encodeURI(config.PATH_API + '/report/V1/generatePDF/' + req.params.report + '/' + req.params.asset + '/' + req.params.assetType);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: encoded_url,
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
router.post('/V1/generatePDF/:reportName/:assetType/:assetCode', async function (req, res, next) {
    var ret = {
        "result": "OK",
        "docDefinition": {}
    };
    var dbfields = {
        properties: {}
    };


    // var temp = { docDefinition: {}, config: {}};
    var temporal = {};
    // var dbfields = "";
    var valkoboid = "";
    Template.findOne({
        "config.HTML.id": req.params.reportName
    }).exec(function (err, temp) {
        if (err) {
            res.send(500, err.message);
        }
        temp.config.fields = [temp.config.fields[0]];
        var chorizo = JSON.stringify(temp.docDefinition);

        var find = "##\\w{3,30}##";
        var regex = new RegExp(find, "g");
        var chorizoParseado = JSON.stringify(chorizo).match(regex);

        var variables = [];

        for (choricillo of chorizoParseado) {
            variables.push(choricillo.replace(/#/g, ''));
        }

        var asscode = req.params.assetCode;
        var assetType = req.params.assetType.replace(/%20/g, " ");
        var textToRender = '';
        // asscode = "F6-SD-06-B-3585";
        code = '/' + asscode + '/';
        assetCode = "bcode";
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
        }).exec(function (err, ifdt) { // literal
            var arrayJsonProp = [];
            var assetIndex = -1;
            var hasNotFound = 1;
            if (err) {
                res.send(500, err.message);
            }
            if (ifdt !== null) {
                for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                    if ((ifdt.properties.rcode[i] === req.params.assetCode ||
                            ifdt.properties.bcode[i] === req.params.assetCode ||
                            ifdt.properties.bname[i] === req.params.assetCode ||
                            ifdt.properties.gcode[i] === req.params.assetCode ||
                            ifdt.properties.gcode2[i] === req.params.assetCode ||
                            ifdt.properties.dcode[i] === req.params.assetCode ||
                            ifdt.properties.dcode2[i] === req.params.assetCode ||
                            ifdt.properties.Ccode[i] === req.params.assetCode) && hasNotFound === 1) {
                        hasNotFound = 0;
                        arrayJsonProp = [];
                        for (v in variables) {
                            if (variables[v].toString().indexOf('ogo') === -1 &&
                                variables[v].toString().indexOf('img') === -1 &&
                                ifdt.properties[variables[v]] !== undefined &&
                                ifdt.properties[assetCode][i] !== undefined &&
                                ifdt.properties[variables[v]][i] !== undefined) {
                                // &&
                                // ifdt.properties['koboedit'][i]['kobo_id'] !== ''
                                assetIndex = i;

                                if ((variables[v] === 'gcode' ||
                                        variables[v] === 'gtype' ||
                                        variables[v] === 'dcode') &&
                                    (ifdt.properties.gcode2[i] === req.params.assetCode ||
                                        ifdt.properties.dcode2[i] === req.params.assetCode)) {
                                    textToRender = ifdt.properties[variables[v] + '2'][i].toString();
                                } else {
                                    textToRender = ifdt.properties[variables[v]][i].toString();
                                }
                                // var jsontoput = JSON.parse(JSON.stringify(temp.config.fields[0]));
                                var jsontoput = {};
                                if (textToRender.split(".")[1] !== undefined &&
                                    textToRender.split(".")[0] !== undefined) {
                                    if (Number(textToRender).toString() === textToRender) {
                                        var afterDot = (textToRender.split(".")[1]).substring(0, 3);
                                        var beforeDot = (textToRender.split(".")[0]);
                                        textToRender = beforeDot + '.' + afterDot;
                                    }
                                }
                                // debug('1');
                                dbfields.properties[variables[v]] = textToRender.toString();
                                jsontoput['name'] = '##' + variables[v] + '##';
                                jsontoput['type'] = 'dbfield';
                                if ((variables[v] === 'gcode' ||
                                        variables[v] === 'gtype' ||
                                        variables[v] === 'dcode') &&
                                    (ifdt.properties.gcode2[i] === req.params.assetCode ||
                                        ifdt.properties.dcode2[i] === req.params.assetCode)) {
                                    jsontoput['value'] = 'properties.' + variables[v] + '2';
                                    dbfields.properties[variables[v] + '2'] = textToRender.toString();
                                    debug(dbfields);
                                } else {
                                    dbfields.properties[variables[v]] = textToRender.toString();
                                    jsontoput['value'] = 'properties.' + variables[v];
                                }
                                temp.config.fields.push(jsontoput);
                                // debug('jsontoput:    ' + JSON.stringify(jsontoput))
                                arrayJsonProp.push(jsontoput);
                                // debug('arrayJsonProp:    ' + JSON.stringify(arrayJsonProp))
                                // debug('************************************   ' + i + '    ' + ifdt.properties['koboedit'][i]['kobo_id']);
                                if (
                                    ifdt.properties['koboedit'] !== undefined &&
                                    ifdt.properties['koboedit'][i] !== undefined) {
                                    valkoboid = ifdt.properties['koboedit'][i]['kobo_id'];
                                }
                            }
                        }
                    }
                }
                temporal = temp;



                Koboinfo.findById(valkoboid).exec(async function (err, kobo) {
                    var nfotos = 0;
                    logotypes = {
                        "##Logo_world_bank##": "world_bank_logo.jpg",
                        "##Logo_dominica##": "Dominica_logo.png"
                    };
                    logotypesArray = ["Dominica_logo.png", "world_bank_logo.jpg"];
                    k = 0;
                    for (v in variables) {
                        if (variables[v].indexOf('ogo') > -1) {
                            k++ % logotypesArray.length;
                            k %= logotypesArray.length;
                            // nfotos++;
                            var j = 0;
                            var jsontoput2 = JSON.parse(JSON.stringify(temp.config.fields[0]));
                            dbfields.properties[variables[v]] = textToRender.toString();
                            jsontoput2['name'] = '##' + variables[v] + '##';
                            // jsontoput2['name'] = '##Logo' + k + '##';
                            jsontoput2['type'] = 'img';
                            jsontoput2['value'] = logotypesArray[k];
                            jsontoput2['style'] = '';
                            jsontoput2['path'] = 'logos';

                            temp.config.fields.push(jsontoput2);
                            arrayJsonProp.push(jsontoput2);
                        }
                        if (nfotos === 0 && variables[v].indexOf('img') > -1) {
                            var jsontoput4 = JSON.parse(JSON.stringify(temp.config.fields[0]));
                            // nfotos++;
                            dbfields.properties[variables[v]] = textToRender.toString();
                            jsontoput4['name'] = '##' + variables[v] + '##';
                            // jsontoput2['name'] = '##img' + nfotos + '##';
                            jsontoput4['type'] = 'map';
                            jsontoput4['value'] = req.params.assetCode + '.jpg';
                            jsontoput4['style'] = '';
                            jsontoput4['path'] = 'gmaps';
                            nfotos++;
                            temp.config.fields.push(jsontoput4);
                            arrayJsonProp.push(jsontoput4);
                            // debug(jsontoput4);
                        }
                        if (kobo !== null && kobo !== undefined && kobo !== '') {
                            if (variables[v].indexOf('img') > -1) {
                                if (nfotos === 0 &&
                                    kobo.properties !== undefined &&
                                    kobo.properties._attachments !== undefined && dbfields.properties !== null) {} else {
                                    if (valkoboid !== undefined && valkoboid !== null && valkoboid !== '' &&
                                        kobo.properties !== undefined && kobo.properties !== null &&
                                        dbfields.properties !== undefined && dbfields.properties !== null &&
                                        kobo.properties._attachments !== undefined &&
                                        kobo.properties._attachments.length > 0 &&
                                        nfotos <= kobo.properties._attachments.length) {
                                        var jsontoput2 = JSON.parse(JSON.stringify(temp.config.fields[0]));
                                        file = kobo.properties._attachments[nfotos - 1].split("/")[kobo.properties._attachments[nfotos - 1].split("/").length - 1];
                                        file = file.split('.')[0] + '-small.' + file.split('.')[1];
                                        address = kobo.properties._attachments[nfotos - 1].split('/').slice(2, kobo.properties._attachments[nfotos - 1].split('/').length - 1);
                                        nfotos++;
                                        dbfields.properties[variables[v]] = textToRender.toString();
                                        jsontoput2['name'] = '##' + variables[v] + '##';
                                        // jsontoput2['name'] = '##img' + nfotos + '##';
                                        jsontoput2['type'] = 'img';
                                        jsontoput2['value'] = file;
                                        jsontoput2['style'] = '';
                                        jsontoput2['path'] = address.join('/');
                                        temp.config.fields.push(jsontoput2);
                                        arrayJsonProp.push(jsontoput2);
                                    } else {
                                        if ((variables[v].indexOf('img') > -1) || (variables[v].indexOf('ogo') > -1)) {
                                            var jsontoput3 = JSON.parse(JSON.stringify(temp.config.fields[0]));
                                            dbfields.properties[variables[v]] = textToRender.toString();
                                            jsontoput3['name'] = '##' + variables[v] + '##';
                                            jsontoput3['type'] = 'img';
                                            jsontoput3['value'] = '';
                                            jsontoput3['style'] = '';
                                            jsontoput3['path'] = '';

                                            temp.config.fields.push(jsontoput3);
                                            arrayJsonProp.push(jsontoput3);
                                        }
                                    }
                                }
                            }
                        }









                        //else {
                        //     if ((variables[v].indexOf('img') > -1) || (variables[v].indexOf('ogo') > -1)) {
                        //         var jsontoput3 = JSON.parse(JSON.stringify(temp.config.fields[0]));
                        //         dbfields.properties[variables[v]] = textToRender.toString();
                        //         jsontoput3['name'] = '##' + variables[v] + '##';
                        //         jsontoput3['type'] = 'img';
                        //         jsontoput3['value'] = '';
                        //         jsontoput3['style'] = '';
                        //         jsontoput3['path'] = '';

                        //         temp.config.fields.push(jsontoput3);
                        //         arrayJsonProp.push(jsontoput3);
                        //         // S8-SG-01-CU-3020
                        //     }
                        // }

                    }


                    // debug('temp.name:  ' + temp.name);
                    ret.docDefinition = await services.docPdf(temp.docDefinition, temp.config, dbfields, temp);
                    // debug(arrayJsonProp);
                    await Template.findOneAndUpdate({
                        "config.HTML.id": req.params.reportName
                    }, {
                        $set: {
                            "config.fields": arrayJsonProp
                        }
                    }, {
                        'new': true
                    }, async function (err, doc) {
                        if (err) {
                            console.log(err + " Something wrong when updating data!");
                        }

                    });
                    await res.status(200).jsonp(ret);

                });
            } else {

                // console.log('ifdt is null');
            }
        });
    });
});

module.exports = router;