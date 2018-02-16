// DEBUG APP
var debug = require('debug')('mkfw-corev1');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var i18n = require("i18n");
//var i18n = require('./config/i18n');
//var i18n = require('i18n');
var methodOverride = require("method-override");
var flash = require('connect-flash');
//var cors = require('cors');
var jwt = require('jwt-simple');
var bodyParser = require('body-parser');


// CONFIG de la APP
var configDB = require((path.join(__dirname, '/config/database.js')));
var configAPP = require(path.join(__dirname, '/config/config'));

// APP EXPRESS INIT
var app = express();

// TEMPLATE VIEW engine setup
/* Añadir cada directorio de vistas por separado */
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, '/app/comp/user/views'),
    path.join(__dirname, '/app/comp/gis/views'),
    path.join(__dirname, '/app/comp/admin/views'),
    path.join(__dirname, '/app/comp/query/views'),
    path.join(__dirname, '/app/comp/budget/views'),
    path.join(__dirname, '/app/comp/report/views')
]);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
// TRANSLATE CONFIG

i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '/app/translate/i18n'),
    defaultLocale: 'en',
    autoReload: true,
    cookie: 'ulang',
    api: {
        '__': 'trans', //now req.__ becomes req.t 
        '__n': 'tn' //and req.__n can be called as req.tn 
    }

});
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    limit: 1024 * 1024 * 300,
    extended: true,
    parameterLimit: 100000000
}));
app.use(bodyParser.json({
    limit: 1024 * 1024 * 300,
    type: 'application/json',
    parameterLimit: 100000000
}));
app.use(bodyParser.raw({
    inflate: true,
    limit: 1024 * 1024 * 300
}));

app.use(session({
    cookie: {
        path: "/",
        httpOnly: true,
        secure: false, //change TRUE with SSL connections
        maxAge: configAPP.SESSION_TTL * 1000 // 1800000 ms = 30 mins
    },
    secret: configAPP.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "id"

}));

app.use(flash());
app.use(methodOverride());
//app.use(cors());

// DB Connect
//Set up default mongoose connection
mongoose.connect(configDB.url, {
    server: {
        "socketOptions": {
            "socketTimeoutMS": 300000,
            "keepAlive": 10000,
            "connectTimeoutMS": 30000
        }
    }
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connect', console.debug.bind(console, 'MongoDB CONNECTION OK!'));

/*********************************
 *  URL - Routes 
 * *******************************/
// Require ROUTES de la aplicacion
var login = require('./routes/login');
var index = require('./routes/index');
var install = require('./routes/install');
var auth_web = require('./routes/authweb');
var auth_api = require('./routes/authapi');

// AUTH de puntos de entrada
app.use('/auth/WEB', auth_web);
app.use('/auth/API', auth_api);
// HOME General
app.use('/', login);

// INSTALL
app.use('/install', install);

// END URL - Routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;