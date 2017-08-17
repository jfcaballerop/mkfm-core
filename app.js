var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var i18n = require("i18n-express");
var methodOverride = require("method-override");
var flash = require('connect-flash');
//var cors = require('cors');
var jwt = require('jwt-simple');

// CONFIG de la APP
var configDB = require((path.join(__dirname, '/config/database.js')));
var configAPP = require(path.join(__dirname, '/config/config.json'));

// APP EXPRESS INIT
var app = express();

// TEMPLATE VIEW engine setup
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, '/app/comp/user/views')
]);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    cookie: {
        path: "/",
        httpOnly: true,
        secure: false, //change TRUE with SSL connections
        maxAge: 1000 * 30 * 60 // 180000 ms = 30 mins
    },
    secret: 'mkfwcore1234',
    resave: false,
    saveUninitialized: false,
    name: "id"

}));
app.use(flash());
//app.use(cors());

// DB Connect
mongoose.connect(configDB.url, function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('MONGODB CONNECTED OK');
    }
});

// TRANSLATE CONFIG
app.use(i18n({
    translationsPath: path.join(__dirname, '/app/translate/i18n'), // <--- use here. Specify translations files path. 
    siteLangs: ["es", "en"],
    textsVarName: 'trans',
    defaultLang: 'es'
}));

/*********************************
 *  URL - Routes 
 * *******************************/
// Require ROUTES de la aplicacion
var login = require('./routes/login');
var index = require('./routes/index');
var auth_web = require('./routes/authweb');
var auth_api = require('./routes/authapi');

// AUTH de puntos de entrada
app.use('/auth/WEB', auth_web);
app.use('/auth/API', auth_api);
// HOME General
app.use('/', login);

// END URL - Routes

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;