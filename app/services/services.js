// services.js
var jwt = require('jwt-simple');
var jwtweb = require('jsonwebtoken');
var path = require('path');
var config = require(path.join(__dirname, '../../config/config'));
var moment = require('moment');

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, 'minutes').unix(),
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};

// jsonwebtoken
exports.createWebToken = function(user) {
    var u = {
        login: user.login,
        id: user._id
    };
    var pass = config.TOKEN_SECRET;
    return jwtweb.sign(u, config.TOKEN_SECRET, { expiresIn: config.SESSION_TTL }); // expiresIn: sec

};