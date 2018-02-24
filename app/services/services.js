// services.js
var debug = require('debug')('debug');
var jwt = require('jwt-simple');
var jwtweb = require('jsonwebtoken');
var path = require('path');
var config = require(path.join(__dirname, '../../config/config'));
var moment = require('moment');
var utm = require('utm');
var FileReader = require('filereader');
var base64Img = require('base64-img');
var mathjs = require('mathjs');
var formulasService = require('./formulas');

exports.makeKoboGeoJson = function(arr, index, type) {
    // console.log('## Services makeKoboGeoJson ##');
    //console.log(JSON.stringify(arr) + ' ' + index + ' ' + type);
    var retJson = {
        type: "Feature",
        "properties": {
            "kobo_type": type
        },
        "geometry": {
            "type": "Point",
            "coordinates": []
        }
    };
    retJson.geometry.coordinates = arr.geometry.coordinates[index];
    return retJson;

}
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
        id: user._id,
        admin: user.admin
    };
    var pass = config.TOKEN_SECRET;
    return jwtweb.sign(u, config.TOKEN_SECRET, {
        expiresIn: config.SESSION_TTL
    }); // expiresIn: sec

};

// Calculo de PK
/**
 * element: [long, lat, cot]
 * elemant: [long, lat, cot]
 * *
 */
exports.calDIST = function(element, elemant) {
    var dist = 0;

    var utmValAct = utm.fromLatLon(element[0], element[1], config.ZONE);
    var utmValAnt = utm.fromLatLon(elemant[0], elemant[1], config.ZONE);
    var easting = utmValAct.easting - utmValAnt.easting;
    if (easting < 0) easting *= -1;
    var northing = utmValAct.northing - utmValAnt.northing;
    if (northing < 0) northing *= -1;
    dist += Math.sqrt(Math.pow(easting, 2) + Math.pow(northing, 2));
    dist = Math.round(dist * 100) / 100;

    //console.log('ELEMENT ' + JSON.stringify(element));
    return dist;

};
// invertedPK
/**
 * arrayPK
 * Return arrayinverted
 * *
 */
exports.invertedpk = function(arrpk) {
    var arrinvertedpk = [];

    for (var i = 0; i < arrpk.length; i++) {
        arrinvertedpk.push(arrpk[arrpk.length - 1] * 1.0 - arrpk[i] * 1.0);
    }

    return arrinvertedpk;

};

exports.mergeDeep = function(obj1, obj2) {
    var result = {};
    Object.keys(obj1).forEach(key => result[key] = obj1[key]);
    Object.keys(obj2).forEach(key => result[key] = obj2[key]);
    return result;
};

function encodeImageFileAsURL(file_path) {

    var file = file_path;
    var data = base64Img.base64Sync(file);
    // console.log(data);
    return data;
}

function getPaths(folder) {
    var paths = {
        logos: "../../public/media/logos",
        att: "../../public/media/ingenierosinf/attachments",

    };
    return paths[folder];


}
exports.docPdf = function(docDefinition, config, dbfields, temp) {
    var doc_translate = JSON.stringify(docDefinition);
    for (var f of config.fields) {
        if ((f.type === 'img' || f.type.indexOf('ogo') > -1) && f.value !== '') {
            if (path.join(__dirname, '../../public', f.path, f.value).length < 65) {
                doc_translate = doc_translate.replace(new RegExp(f.name, "g"), encodeImageFileAsURL(path.join(__dirname, getPaths(f.path), f.value)));
            } else {
                console.log(__dirname, '../../public/media', f.path, f.value);
                doc_translate = doc_translate.replace(f.name, encodeImageFileAsURL(path.join(__dirname, '../../public/media/', f.path, f.value)));
            }

        } else if (f.type === 'dbfield') {
            evaluation = eval('dbfields.' + f.value);
            doc_translate = doc_translate.replace(new RegExp(f.name, "g"), (evaluation !== undefined && evaluation !== '' && evaluation !== null) ? evaluation : '--');
        } else {

            doc_translate = doc_translate.replace(new RegExp(f.name, "g"), f.value === '' ? '##--##' : f.value);
        }
    }
    doc_translate = doc_translate.replace('##TITLE_HEADER##', temp.name);

    pixel = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDADknKzIrJDkyLjJAPTlEVo9dVk9PVq99hGiPz7ba1su2yMTk////5PP/9sTI////////////3f//////////////2wBDAT1AQFZLVqhdXaj/7Mjs////////////////////////////////////////////////////////////////////wgARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAUn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEB//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EH//2Q==';

    var find = ["##im\\w{2,30}##", "##dr\\w{2,30}##", "##\\w{2,70}##", "##--##"];
    var toreplace = [pixel, pixel, '', pixel];
    var j = 0;
    for (var rep of find) {
        doc_translate = doc_translate.replace(new RegExp(rep, "g"), toreplace[j++]);
        // j++;
    }
    var fs = require('fs');
    fs.writeFile("/tmp/test", doc_translate, function(err) {
        if (err) {
            return console.log(err);
        }

    });
    return JSON.parse(doc_translate);

};

exports.roundValue = function(value, decimals) {
    if (typeof value === 'number' && !isNaN(value)) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    } else {
        return 0;
    }
};
exports.roundValuePerCent = function(value, decimals) {
    if (typeof value === 'number' && !isNaN(value)) {
        return Number(Math.round(value * 100 + 'e' + decimals) + 'e-' + decimals);
    } else {
        return 0;
    }
};

exports.tracksGroupNameRiskCond = function(trackSections, trackSectionscond, trackpkreg, iup, type) {
    var tracksnamessche = [];
    var antsect = mathjs.mode(trackSections[0])[0];
    var antcond = formulasService.ConditionRating(mathjs.mode(trackSectionscond[0])[0]);
    var pkiniant = trackpkreg[0][0];
    var pkfinant = trackpkreg[0][trackpkreg[0].length - 1];
    var pkini;
    var pkfin;
    var tracknamesche = iup.properties.rcode[0];

    for (var ts in trackSections) {
        //TODO: cuidado que la moda puede devolver 2 valores si son iguales
        //debug(typeof (ts));
        ts = Number(ts);
        if (ts === 0) {
            antsect = mathjs.mode(trackSections[0])[0];
            // debug('antsect ' + antsect);
            antcond = formulasService.ConditionRating(mathjs.mode(trackSectionscond[0])[0]);
            pkiniant = trackpkreg[0][0];
            pkfinant = trackpkreg[0][trackpkreg[0].length - 1];
            pkini = pkiniant / 1000;
            pkfin = pkfinant / 1000;
            //debug('pkini ' + pkini);
            //debug('pkfin ' + pkfin);
            tracknamesche += '__KP-' + (pkini.toString().split('.').length > 1 ? pkini.toString().split('.')[0] : pkini.toString()) +
                '+' + (pkini.toString().split('.').length > 1 ? pkini.toString().split('.')[1].substring(0, 3) : '0');
            // //debug('*NEW ' + mathjs.mode(trackSections[ts]) +
            //     ' pkini: ' + pkini.toString().split('.')[0] + '+' + pkini.toString().split('.')[1].substring(0, 3));
        } else {
            // debug('antsect ' + antsect);
            // debug('setc ' + mathjs.mode(trackSections[ts])[0]);

            if (mathjs.mode(trackSections[ts])[0] !== antsect || formulasService.ConditionRating(mathjs.mode(trackSectionscond[ts])[0]) !== antcond) {
                tracknamesche += '-' + (pkfin.toString().split('.').length > 1 ? pkfin.toString().split('.')[0] : pkfin.toString()) +
                    '+' + (pkfin.toString().split('.').length > 1 ? pkfin.toString().split('.')[1].substring(0, 3) : '0') + '__R' + type + '-' + antsect + '__COND-' + antcond;
                //debug(tracknamesche);
                tracksnamessche.push(tracknamesche);
                // //debug(' pkfin: ' + pkfin.toString().split('.')[0] + '+' + pkfin.toString().split('.')[1].substring(0, 3)) + '__R'+type+'-' + antsect + '__COND-' + antcond;
                pkini = trackpkreg[ts][0] / 1000;
                pkfin = trackpkreg[ts][trackpkreg[ts].length - 1] / 1000;
                tracknamesche = iup.properties.rcode[0];
                tracknamesche += '__KP-' + (pkini.toString().split('.').length > 1 ? pkini.toString().split('.')[0] : pkini.toString()) +
                    '+' + (pkini.toString().split('.').length > 1 ? pkini.toString().split('.')[1].substring(0, 3) : '0');
                // //debug('*NEW ' + mathjs.mode(trackSections[ts]) +
                //     ' pkini: ' + pkini.toString().split('.')[0] + '+' + pkini.toString().split('.')[1].substring(0, 3));
            } else {
                // //debug('++ADD ' + mathjs.mode(trackSections[ts]) +
                //     ' cond: ' + formulasService.ConditionRating(mathjs.mode(trackSectionscond[ts])));
                pkfin = trackpkreg[ts][trackpkreg[ts].length - 1] / 1000;
            }
            antsect = mathjs.mode(trackSections[ts])[0];
            antcond = formulasService.ConditionRating(mathjs.mode(trackSectionscond[ts])[0]);
            // pkfin = trackpkreg[ts - 1][trackpkreg[ts - 1].length - 1];

        }

    }
    // //debug(' FIN pkfin: ' + pkfin);
    // //debug(tracknamesche + '-');
    tracknamesche += '-' + (pkfin.toString().split('.').length > 1 ? pkfin.toString().split('.')[0] : pkfin.toString()) +
        '+' + (pkfin.toString().split('.').length > 1 ? pkfin.toString().split('.')[1].substring(0, 3) : '0') + '__R' + type + '-' + antsect + '__COND-' + antcond;
    tracksnamessche.push(tracknamesche);

    return tracksnamessche;
}