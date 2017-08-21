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
/* GET Form upload */
router.get('/upload', function(req, resp, next) {
    resp.render('upload', { token: req.token, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
});

/* UPLOAD File.*/
var uploading = multer({ dest: path.join(process.env.PWD, '/public/uploads/') }).single('file');
router.post('/upload', uploading, function(req, res) {
    console.log('## upload:: ');
    console.log(req.body); //form fields
    console.log(req.file); //form files
    if (!req.file)
        return res.status(400).send('No files were uploaded.');
    else {
        // SAVE File to DB
        res.send('File uploaded!');
    }


    // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    // var sampleFile = req.files.file;
    // var new_path = path.join(process.env.PWD, '/public/uploads/', files.file.name);
    // // Use the mv() method to place the file somewhere on your server 
    // sampleFile.mv(new_path, function(err) {
    //     if (err)
    //         return res.status(500).send(err);

    //     res.send('File uploaded!');
    // });

    // var form = new formidable.IncomingForm();
    // form.parse(req, function(err, fields, files) {
    //     // `file` is the name of the <input> field of type `file`
    //     var old_path = files.file.path,
    //         file_size = files.file.size,
    //         file_ext = files.file.name.split('.').pop(),
    //         index = old_path.lastIndexOf('/') + 1,
    //         file_name = old_path.substr(index),
    //         new_path = path.join(process.env.PWD, '/public/uploads/', file_name + '.' + file_ext);

    //     fs.readFile(old_path, function(err, data) {
    //         fs.writeFile(new_path, data, function(err) {
    //             fs.unlink(old_path, function(err) {
    //                 if (err) {
    //                     res.status(500);
    //                     res.json({ 'success': false });
    //                 } else {
    //                     res.status(200);
    //                     res.json({ 'success': true });
    //                 }
    //             });
    //         });
    //     });
    // });
});

/* POST API REST new user */
router.post('/new_user', function(req, resp, next) {
    // TODO: Pendiente hacer una validacion de los campos de la request.
    // //console.log("## REQ: " + JSON.stringify(req.body.user));
    var postData = extend({}, req.body.user);
    postData.admin = (req.body.user.admin == "" ? true : false);
    postData.activo = true;

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/users/V1/',
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
            resp.redirect('/auth/WEB/users/list_users');

        });
    });
    request.on('error', function(err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});

/* UPDATE API REST user */
router.post('/update_user', function(req, resp, next) {
    // TODO: Pendiente hacer una validacion de los campos de la request.
    //console.log("\n\n## REQ: " + JSON.stringify(req.body.user));
    var postData = extend({}, req.body.user);
    //console.log('postData: ' + JSON.stringify(postData));
    // postData.admin = (req.body.user.admin == "" ? true : false);
    // postData.activo = (req.body.user.activo == "" ? true : false);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/users/V1/update_user/' + req.body.user._id,
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
            resp.redirect('/auth/WEB/users/list_users');

        });
    });
    request.on('error', function(err) {
        console.error('problem with request: ${err.message}');
    });
    request.write(JSON.stringify(postData));
    request.end();
});

/* GET API REST users listing. */
router.get('/list_users', function(req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/users/V1/',
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
            resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});
/* DESACTIVATE USER */
router.post('/desactivate/:id', function(req, resp, next) {
    //console.log('## WEB DESACTIVATE USER: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/users/V1/desactivate/' + req.params.id,
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
            resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });



});

/* ACTIVATE USER */
router.post('/activate/:id', function(req, resp, next) {
    //console.log('## WEB DESACTIVATE USER: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/users/V1/activate/' + req.params.id,
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
            resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});


/* DEL USER */
router.post('/delete/:id', function(req, resp, next) {
    //console.log('## WEB DELETE USER: ' + req.params.id);
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/users/V1/delete/' + req.params.id,
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
            resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

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

/* GET JSON users listing. */
router.get('/V1/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(users);
    });

});
/* GET JSON user by login. */
router.get('/V1/:login', function(req, res, next) {
    //console.log(req.params.login);
    User.findOne({ 'login': req.params.login }, function(err, user) {
        if (err) {
            res.send(500, err.message);
        }
        res.status(200).jsonp(user);
    });

});
/* DEL user */
router.delete('/V1/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        user.remove(function(err) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(user);

        });
    });

});
/* DESACTIVATE user */
router.post('/V1/desactivate/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        //console.log('## API DESACTIVATE USER: ' + req.params.id);
        user.activo = false;
        user.save(function(err, user) {
            if (err) {
                return res.status(500).send(err.message);
            }
            User.find(function(err, users) {
                if (err) {
                    res.send(500, err.message);
                }
                res.status(200).jsonp(users);
            });
        });
    });

});
/* ACTIVATE user */
router.post('/V1/activate/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        //console.log('## API ACTIVATE USER: ' + req.params.id);
        user.activo = true;
        user.save(function(err, user) {
            if (err) {
                return res.status(500).send(err.message);
            }
            User.find(function(err, users) {
                if (err) {
                    res.send(500, err.message);
                }
                res.status(200).jsonp(users);
            });
        });
    });

});
/* DEL user */
router.post('/V1/delete/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        //console.log('## API DEL USER: ' + req.params.id);
        if (err) {
            return res.status(500).send(err.message);
        }
        User.find(function(err, users) {
            if (err) {
                res.send(500, err.message);
            }
            res.status(200).jsonp(users);
        });
    });

});

/* UPDATE user */
router.post('/V1/update_user/:id', function(req, res, next) {
    // TODO: Revisar como cambiar la password
    //console.log('\n#### UPDATE user ####');
    //console.log('BODY: ' + JSON.stringify(req.body));
    User.findById(req.params.id, function(err, user) {
        var saveUser = extend({}, req.body);
        saveUser.password = user.generateHash(req.body.password);
        //console.log('\n\n##### Update User:: ' + JSON.stringify(saveUser));

        User.findByIdAndUpdate(req.params.id, { $set: saveUser }, function(err, result) {
            if (err) {
                //console.log(err);
                return res.status(500).send(err.message);
            }
            //console.log("RESULT: " + result);
            res.status(200).jsonp(result);
            // res.send('Done')
        });
    });
});
module.exports = router;