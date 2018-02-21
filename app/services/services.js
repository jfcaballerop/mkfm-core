// services.js
var jwt = require('jwt-simple');
var jwtweb = require('jsonwebtoken');
var path = require('path');
var config = require(path.join(__dirname, '../../config/config'));
var moment = require('moment');
var utm = require('utm');
var FileReader = require('filereader');
var base64Img = require('base64-img');

exports.makeKoboGeoJson = function (arr, index, type) {
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
exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(1, 'minutes').unix(),
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};

// jsonwebtoken
exports.createWebToken = function (user) {
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
exports.calDIST = function (element, elemant) {
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
exports.invertedpk = function (arrpk) {
    var arrinvertedpk = [];

    for (var i = 0; i < arrpk.length; i++) {
        arrinvertedpk.push(arrpk[arrpk.length - 1] * 1.0 - arrpk[i] * 1.0);
    }

    return arrinvertedpk;

};

exports.mergeDeep = function (obj1, obj2) {
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
exports.docPdf = function (docDefinition, config, dbfields,temp) {
    var doc_translate = JSON.stringify(docDefinition);
    for (var f of config.fields) {
        if ((f.type === 'img' || f.type.indexOf('ogo')>-1) && f.value !== '') {
            if (path.join(__dirname, '../../public', f.path, f.value).length < 65){
                doc_translate = doc_translate.replace(new RegExp(f.name, "g"), encodeImageFileAsURL(path.join(__dirname, getPaths(f.path), f.value)));
            } else {
                console.log(__dirname, '../../public/media', f.path, f.value);
                doc_translate = doc_translate.replace(f.name ,encodeImageFileAsURL(path.join(__dirname, '../../public/media/', f.path, f.value)));
            }

        } else if (f.type === 'dbfield') {
            evaluation = eval('dbfields.' + f.value);
            doc_translate = doc_translate.replace(new RegExp(f.name, "g"), (evaluation !== undefined && evaluation !== '' && evaluation !== null ) ? evaluation : '--' );
        } else {

            doc_translate = doc_translate.replace(new RegExp(f.name, "g"), f.value === '' ? '##--##' : f.value);
        }
    }

    doc_translate = doc_translate.replace('##TITLE_HEADER##', temp.name);
    var find1 = "##im\\w{2,30}##";
    var find2 = "##\\w{2,70}##";
    var find3 = "##--##";
    pixel = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDADknKzIrJDkyLjJAPTlEVo9dVk9PVq99hGiPz7ba1su2yMTk////5PP/9sTI////////////3f//////////////2wBDAT1AQFZLVqhdXaj/7Mjs////////////////////////////////////////////////////////////////////wgARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAUn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEB//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EH//2Q==';
    doc_translate = doc_translate.replace(new RegExp(find1, "g"), pixel );
    doc_translate = doc_translate.replace(new RegExp(find2, "g"), '--');
    doc_translate = doc_translate.replace(new RegExp(find3, "g"), pixel );

    return JSON.parse(doc_translate);
};

exports.roundValue = function (value, decimals) {
    if (typeof value === 'number' && !isNaN(value)) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    } else {
        return 0;
    }
};
exports.roundValuePerCent = function (value, decimals) {
    if (typeof value === 'number' && !isNaN(value)) {
        return Number(Math.round(value * 100 + 'e' + decimals) + 'e-' + decimals);
    } else {
        return 0;
    }
};