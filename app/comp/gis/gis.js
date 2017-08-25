var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
var flash = require('connect-flash');
var config = require(path.join(__dirname, '../../../config/config'));
var querystring = require('querystring');
var bodyParser = require('body-parser');
var extend = require('util')._extend;
var multer = require('multer');
var GJV = require("geojson-validation");
var fs = require('fs');

var fileuploadModels = require(path.join(__dirname, './models/fileupload'));
var Fileupload = mongoose.model('Fileupload');



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
/* GET List Files */
router.get('/list_files', function(req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data = chunk;

        });
        res.on('end', function() {
            console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            resp.status(200).jsonp(responseObject);
        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});
/* GET Form upload */
router.get('/upload', function(req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data = chunk;

        });
        res.on('end', function() {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/* UPLOAD File.*/
var uploading = multer({ dest: path.join(process.env.PWD, '/public/uploads/') }).single('file');
router.post('/upload', uploading, function(req, resp) {
    console.log('## upload:: ');
    if (!req.file)
        return resp.status(400).send('No files were uploaded.');
    else {
        console.log(req.body); //form fields
        console.log(req.file); //form files
        // SAVE File to DB
        var postData = extend({}, req.file);
        postData.owner = req.user_login;
        postData.type = req.body.type;
        postData.status = 'pending';

        console.log('## FUP DATA ::' + JSON.stringify(postData)); //form files
        var options = {
            host: config.HOST_API,
            port: config.PORT_API,
            path: config.PATH_API + '/gis/V1/fileupload/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
                'Authorization': 'Bearer ' + req.cookies.jwtToken
            }
        };
        var request = http.request(options, function(res) {
            // //console.log('STATUS: ' + res.statusCode);
            // //console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            var data = '';
            res.on('data', function(chunk) {
                // //console.log('BODY: ' + chunk);
                data = chunk;

            });
            res.on('end', function() {
                // //console.log('DATA ' + data.length + ' ' + data);
                var responseObject = JSON.parse(data);
                //success(data);
                resp.redirect('/auth/WEB/gis/upload');
                //resp.send('File uploaded!');

            });
        });
        request.on('error', function(err) {
            console.error('problem with request: ${err.message}');
        });
        request.write(JSON.stringify(postData));
        request.end();

    }

});

/* VALIDATE File */
router.post('/validate/:id', function(req, resp) {
    console.log('## WEB Validate File: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/validate/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data = chunk;

        });
        res.on('end', function() {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

        });
    });

    request.end();

});

/**
 * GET File Valid
 */
router.get('/getfile/:id', function(req, resp) {
    console.log('## WEB GET File: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/' + req.params.id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data = chunk;

        });
        res.on('end', function() {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            resp.status(200).jsonp(responseObject);

        });
    });

    request.end();

});
/* DESACTIVATE file */
router.post('/desactivate/:id', function(req, resp, next) {
    //console.log('## WEB DESACTIVATE file: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/desactivate/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data = chunk;

        });
        res.on('end', function() {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('upload', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});
/* ACTIVATE file */
router.post('/activate/:id', function(req, resp, next) {
    //console.log('## WEB ACTIVATE file: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/activate/' + req.params.id,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(options, function(res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk) {
            //console.log('BODY: ' + chunk);
            data = chunk;

        });
        res.on('end', function() {
            //console.log('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // resp.render('upload', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});



/*******************************************************
 API REST CALLS
 **********************************************************/
/* POST file */
router.post('/V1/fileupload/', function(req, res, next) {
    fu = new Fileupload(req.body);
    fu.save(function(err, file) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(file);
    });
});

/* GET JSON files listing. */
router.get('/V1/', function(req, res, next) {
    Fileupload.find(function(err, files) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(files);
    });

});
/* GET JSON files listing active_valid. */
router.get('/V1/active_valid/', function(req, res, next) {
    Fileupload.find({ activo: true, status: 'validate' }, function(err, files) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(files);
    });

});

/* GET JSON file by id. */
router.get('/V1/:id', function(req, res, next) {
    Fileupload.findById(req.params.id, function(err, fup) {
        if (err) {
            res.send(500, err.message);
        }
        var validFeatureCollection = {};
        fs.readFile(fup.path, function(err, dataFile) {
            if (err) {
                return res.status(500).send(err.message);
            }
            // console.log('## File DATA:: ' + dataFile);
            validFeatureCollection = JSON.parse(dataFile);

            res.status(200).jsonp(validFeatureCollection);
        });
    });

});

/* VALIDATE File */
router.post('/V1/validate/:id', function(req, res, next) {
    Fileupload.findById(req.params.id, function(err, fup) {
        var validFeatureCollection = {};
        fs.readFile(fup.path, function(err, dataFile) {
            if (err) {
                return res.status(500).send(err.message);
            }
            console.log('## File DATA:: ' + dataFile);
            try {
                validFeatureCollection = JSON.parse(dataFile);
            } catch (e) {
                if (e) {
                    fup.status = 'error';

                }
            }
            console.log('ENTRO ####');
            //simple test 
            if (GJV.valid(validFeatureCollection)) {
                console.log("this is valid GeoJSON!");
                fup.status = 'validate';
            } else {
                fup.status = 'error';
            }
            //console.log('## API ACTIVATE file: ' + req.params.id);
            fup.save(function(err, file) {
                if (err) {
                    return res.status(500).send(err.message);
                }
                Fileupload.find(function(err, fup) {
                    if (err) {
                        res.send(500, err.message);
                    }
                    res.status(200).jsonp(fup);
                });
            });
        });
    });

});
/* GET JSON file by login. */
router.get('/V1/:originalname', function(req, res, next) {
    Fileupload.findOne({ 'name': req.params.originalname }, function(err, file) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(file);
    });

});
/* DEL file */
router.delete('/V1/:id', function(req, res, next) {
    Fileupload.findById(req.params.id, function(err, file) {
        file.remove(function(err) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(file);

        });
    });

});

/* ACTIVATE file */
router.post('/V1/activate/:id', function(req, res, next) {
    Fileupload.findById(req.params.id, function(err, file) {
        //console.log('## API ACTIVATE file: ' + req.params.id);
        file.activo = true;
        file.save(function(err, file) {
            if (err) {
                return res.status(500).send(err.message);
            }
            Fileupload.find(function(err, files) {
                if (err) {
                    res.send(500, err.message);
                }
                res.status(200).jsonp(files);
            });
        });
    });

});
/* DESACTIVATE file */
router.post('/V1/desactivate/:id', function(req, res, next) {
    Fileupload.findById(req.params.id, function(err, file) {
        //console.log('## API DESACTIVATE file: ' + req.params.id);
        file.activo = false;
        file.save(function(err, file) {
            if (err) {
                return res.status(500).send(err.message);
            }
            Fileupload.find(function(err, files) {
                if (err) {
                    res.send(500, err.message);
                }
                res.status(200).jsonp(files);
            });
        });
    });

});
/* DEL file */
router.post('/V1/delete/:id', function(req, res, next) {
    Fileupload.findByIdAndRemove(req.params.id, function(err, file) {
        //console.log('## API DEL file: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        Fileupload.find(function(err, files) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(files);
        });
    });

});

/* UPDATE file */
router.post('/V1/update_file/:id', function(req, res, next) {

    res.send('Upoload File');

});
module.exports = router;