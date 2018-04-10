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

    for (var v of Object.keys(arr.properties)) {
        if(!arr.properties[v]) continue;
        retJson.properties[v] = arr.properties[v][index];
        // debug(v + ': ' + retJson.properties[v]);
    }
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

    var fs = require('fs');
    pixel = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDADknKzIrJDkyLjJAPTlEVo9dVk9PVq99hGiPz7ba1su2yMTk////5PP/9sTI////////////3f//////////////2wBDAT1AQFZLVqhdXaj/7Mjs////////////////////////////////////////////////////////////////////wgARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAUn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEB//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EH//2Q==';
    var file = file_path;
    if (fs.existsSync(file_path)) {
        var data = base64Img.base64Sync(file);
        // console.log(data);
        return data;
    } else {
        return pixel;
    }
}

function getPaths(folder) {
    var paths = {
        logos: "../../public/media/logos",
        att: "../../public/media/ingenierosinf/attachments",

    };
    return paths[folder];


}
exports.docPdf = function (docDefinition, config, dbfields, temp) {
    var doc_translate = JSON.stringify(docDefinition);
    for (var f of config.fields) {
        if ((f.type === 'img' || f.type.indexOf('ogo') > -1) && f.value !== '') {
            if (path.join(__dirname, '../../public', f.path, f.value).length < 65) {
                doc_translate = doc_translate.replace(new RegExp(f.name, "g"), encodeImageFileAsURL(path.join(__dirname, getPaths(f.path), f.value)));
            } else {
                doc_translate = doc_translate.replace(f.name, encodeImageFileAsURL(path.join(__dirname, '../../public/media/', f.path, f.value)));
            }

        } else if (f.type === 'dbfield') {
            var evaluation = eval('dbfields.' + f.value);
            // debug('dbfields.' + f.value + '    ' + evaluation);
            evaluation = eval('dbfields.' + f.value.replace('2', ''));
            // debug('dbfields.' + f.value.replace('2', '') + '    ' + evaluation);
            doc_translate = doc_translate.replace(new RegExp(f.name.replace('2', ''), "g"), (evaluation !== undefined && evaluation !== '' && evaluation !== null) ? evaluation : '  ');
        } else if (f.type === 'map') {
            doc_translate = doc_translate.replace(f.name, encodeImageFileAsURL(path.join(__dirname, '../../public/media/', (f.path), f.value)));
        } else {

            doc_translate = doc_translate.replace(new RegExp(f.name, "g"), f.value === '' ? '##  ##' : f.value);
        }
    }
    doc_translate = doc_translate.replace('##TITLE_HEADER##', temp.name);

    pixel = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDADknKzIrJDkyLjJAPTlEVo9dVk9PVq99hGiPz7ba1su2yMTk////5PP/9sTI////////////3f//////////////2wBDAT1AQFZLVqhdXaj/7Mjs////////////////////////////////////////////////////////////////////wgARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAUn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEB//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EH//2Q==';

    var find = ["##im\\w{2,30}##", "##dr\\w{2,30}##", "##\\w{2,70}##", "##  ##"];
    var toreplace = [pixel, pixel, '', pixel];
    var j = 0;
    for (var rep of find) {
        doc_translate = doc_translate.replace(new RegExp(rep, "g"), toreplace[j++]);
        // j++;
    }
    var fs = require('fs');
    fs.writeFile("/tmp/test", doc_translate, function (err) {
        if (err) {
            return console.log(err);
        }

    });
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

exports.tracksGroupNameRiskCond = function (trackSections, trackSectionscond, trackSectionswidth, trackpkreg, trackPavCost, trackPavCat, iup, type) {
    var tracksnamessche = [];
    var antsect = mathjs.mode(trackSections[0])[0];
    var antcond = formulasService.ConditionRating(mathjs.mode(trackSectionscond[0])[0]);
    var antcat = mathjs.mode(trackPavCat[0])[0];
    var antmaxwidth = trackSectionswidth[0].length > 0 ? mathjs.max(trackSectionswidth[0]) : 0;
    var antcost = mathjs.sum(trackPavCost[0]);
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
            /**
             * si es el primer tramo inicializo
             */
            antsect = mathjs.mode(trackSections[0])[0];
            // debug('antsect ' + antsect);
            antcost = mathjs.sum(trackPavCost[0]);
            antcond = formulasService.ConditionRating(mathjs.mode(trackSectionscond[0])[0]);
            antcat = mathjs.mode(trackPavCat[0])[0];
            antmaxwidth = trackSectionswidth[0].length > 0 ? mathjs.max(trackSectionswidth[0]) : 0;
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
            /**
             * Si no es el primer tramo, hago los calculos
             */

            // debug('antsect ' + antsect);
            // debug('setc ' + mathjs.mode(trackSections[ts])[0]);

            if (mathjs.mode(trackSections[ts])[0] !== antsect || formulasService.ConditionRating(mathjs.mode(trackSectionscond[ts])[0]) !== antcond) {
                tracknamesche += '-' + (pkfin.toString().split('.').length > 1 ? pkfin.toString().split('.')[0] : pkfin.toString()) +
                    '+' + (pkfin.toString().split('.').length > 1 ? pkfin.toString().split('.')[1].substring(0, 3) : '0') + '__R' + type + '-' + antsect + '__COND-' + antcond;
                //debug(tracknamesche);
                tracksnamessche.push({
                    code: tracknamesche,
                    length: (pkini - pkfin) < 0 ? (pkini - pkfin) * -1000 : (pkini - pkfin) * 1000,
                    width: antmaxwidth,
                    cost: antcost,
                    rcategory: antcat,
                    riskOrder: formulasService.riskRatingScaleOrderCode(tracknamesche)
                });
                // //debug(' pkfin: ' + pkfin.toString().split('.')[0] + '+' + pkfin.toString().split('.')[1].substring(0, 3)) + '__R'+type+'-' + antsect + '__COND-' + antcond;
                pkini = trackpkreg[ts][0] / 1000;
                pkfin = trackpkreg[ts][trackpkreg[ts].length - 1] / 1000;
                tracknamesche = iup.properties.rcode[0];
                tracknamesche += '__KP-' + (pkini.toString().split('.').length > 1 ? pkini.toString().split('.')[0] : pkini.toString()) +
                    '+' + (pkini.toString().split('.').length > 1 ? pkini.toString().split('.')[1].substring(0, 3) : '0');
                antcost = 0;
                // //debug('*NEW ' + mathjs.mode(trackSections[ts]) +
                //     ' pkini: ' + pkini.toString().split('.')[0] + '+' + pkini.toString().split('.')[1].substring(0, 3));
            } else {
                // //debug('++ADD ' + mathjs.mode(trackSections[ts]) +
                //     ' cond: ' + formulasService.ConditionRating(mathjs.mode(trackSectionscond[ts])));
                pkfin = trackpkreg[ts][trackpkreg[ts].length - 1] / 1000;
            }
            antsect = mathjs.mode(trackSections[ts])[0];
            antcond = formulasService.ConditionRating(mathjs.mode(trackSectionscond[ts])[0]);
            antcat = mathjs.mode(trackPavCat[ts])[0];
            antmaxwidth = trackSectionswidth[ts].length > 0 ? mathjs.max(trackSectionswidth[ts]) : 0;
            antcost += mathjs.sum(trackPavCost[ts]);

            // pkfin = trackpkreg[ts - 1][trackpkreg[ts - 1].length - 1];

        }

    }
    // //debug(' FIN pkfin: ' + pkfin);
    // //debug(tracknamesche + '-');
    tracknamesche += '-' + (pkfin.toString().split('.').length > 1 ? pkfin.toString().split('.')[0] : pkfin.toString()) +
        '+' + (pkfin.toString().split('.').length > 1 ? pkfin.toString().split('.')[1].substring(0, 3) : '0') + '__R' + type + '-' + antsect + '__COND-' + antcond;

    tracksnamessche.push({
        code: tracknamesche,
        length: (pkini - pkfin) < 0 ? (pkini - pkfin) * -1000 : (pkini - pkfin) * 1000,
        width: antmaxwidth,
        cost: antcost,
        rcategory: antcat,
        riskOrder: formulasService.riskRatingScaleOrderCode(tracknamesche)

    });

    return tracksnamessche;
}

exports.createNameSched = function (code, pkini, length, cond, risk, type) {
    var ret = "";

    var vpkini = pkini / 1000;
    var vpkfin = (parseFloat(pkini) + parseFloat(length)) / 1000;
    var vcond = formulasService.ConditionRating(cond);
    var vrisk = formulasService.NormalizeRiskRatingScale(risk);
    var ret = code + '__KP-' + (vpkini.toString().split('.').length > 1 ? vpkini.toString().split('.')[0] : vpkini.toString()) +
        '+' + (vpkini.toString().split('.').length > 1 ? vpkini.toString().split('.')[1].substring(0, 3) : '0');
    ret += '-' + (vpkfin.toString().split('.').length > 1 ? vpkfin.toString().split('.')[0] : vpkfin.toString()) +
        '+' + (vpkfin.toString().split('.').length > 1 ? vpkfin.toString().split('.')[1].substring(0, 3) : '0') + '__R' + type + '-' + vrisk + '__COND-' + vcond;


    return ret;

}

exports.getAllIndexes = function (arr, val) {
    var indexes = [],
        i;
    for (i = 0; i < arr.length; i++)
        if (arr[i].indexOf(val) >= 0)
            indexes.push(i);
    return indexes;
}

exports.getCulvertDiameterIndex = function (val) {
    var ret = -1;
    var numVal = parseFloat(val.toString().replace(',', '.'));
    // debug(numVal);

    if (numVal < 0.6) {
        ret = 0;

    } else if (numVal >= 0.6 && numVal < 0.9) {

        ret = 1;
    } else if (numVal >= 0.9 && numVal < 1.2) {

        ret = 2;
    } else if (numVal >= 1.2) {

        ret = 3;
    }
    // debug("RET: " + ret);
    return ret;
}

exports.getDistrictDictionary = function (code) {
    var codes = [];
    codes['Morne Daniel'] = this.getDistrictSiglas('Saint Paul');
    codes['Riviere Ciriques'] = this.getDistrictSiglas('Saint David');
    codes['Canefield'] = this.getDistrictSiglas('Saint Paul');
    codes['Cochrane'] = this.getDistrictSiglas('Saint Paul');
    codes['Grand Fond'] = this.getDistrictSiglas('Saint David');
    codes['Bellevue Chopin'] = this.getDistrictSiglas('Saint Patrick');
    codes['Morne Jaune'] = this.getDistrictSiglas('Saint David');
    codes['Grand Fond'] = this.getDistrictSiglas('Saint David');
    codes['Galba'] = this.getDistrictSiglas('Saint Patrick');
    codes['Bagatelle'] = this.getDistrictSiglas('Saint Patrick');
    codes['Petite Savane'] = this.getDistrictSiglas('Saint Patrick');
    codes['Campbell'] = this.getDistrictSiglas('Saint Paul');
    codes['Tête Morne'] = this.getDistrictSiglas('Saint Mark');
    codes['Roseau'] = this.getDistrictSiglas('Saint George');
    codes['Anse de Mai'] = this.getDistrictSiglas('Saint Andrew');
    codes['Castle Comfort'] = this.getDistrictSiglas('Saint George');
    codes['La Plaine'] = this.getDistrictSiglas('Saint Patrick');
    codes['Trafalgar'] = this.getDistrictSiglas('Saint George');
    codes['Fond Cani'] = this.getDistrictSiglas('Saint George');
    codes['St. Joseph'] = this.getDistrictSiglas('Saint Joseph');
    codes['Logiste'] = this.getDistrictSiglas('Saint Patrick');
    codes['Layou'] = this.getDistrictSiglas('Saint Joseph');
    codes['Louis Ville'] = this.getDistrictSiglas('Saint George');
    codes['Laudat'] = this.getDistrictSiglas('Saint George');
    codes['Creck Hall'] = this.getDistrictSiglas('Saint Paul');
    codes['Jimmit'] = this.getDistrictSiglas('Saint Paul');
    codes['Grand Bay'] = this.getDistrictSiglas('Saint Patrick');
    codes['Pointe Michel'] = this.getDistrictSiglas('Saint Luke');
    codes['Loubiere'] = this.getDistrictSiglas('Saint George');
    codes['Giraudel'] = this.getDistrictSiglas('Saint George');
    codes['More Prosper'] = this.getDistrictSiglas('Saint George');
    codes['Mahaut'] = this.getDistrictSiglas('Saint Paul');
    codes['Portsmouth'] = this.getDistrictSiglas('Saint John');
    codes['Fond Colé'] = this.getDistrictSiglas('Saint George');
    codes['Marigot'] = this.getDistrictSiglas('Saint Andrew');
    codes['Bense'] = this.getDistrictSiglas('Saint Andrew');
    codes['Wesley'] = this.getDistrictSiglas('Saint Andrew');
    codes['Enbas'] = this.getDistrictSiglas('Saint Andrew');
    codes['Penville'] = this.getDistrictSiglas('Saint Andrew');
    codes['Thibaud'] = this.getDistrictSiglas('Saint Andrew');
    codes['Cottage'] = this.getDistrictSiglas('Saint John');
    codes['Cocoyer'] = this.getDistrictSiglas('Saint John');
    codes['Clifton'] = this.getDistrictSiglas('Saint John');
    codes['Morne a Louis'] = this.getDistrictSiglas('Saint John');
    codes['Savane Paille'] = this.getDistrictSiglas('Saint John');
    codes['Toucari'] = this.getDistrictSiglas('Saint John');
    codes['Pichelin'] = this.getDistrictSiglas('Saint Patrick');
    codes["Dos D'Ane"] = this.getDistrictSiglas('Saint Andrew');
    codes['La Source'] = this.getDistrictSiglas('Saint Andrew');
    codes['Paix Bouche'] = this.getDistrictSiglas('Saint Andrew');
    codes['Tarreau'] = this.getDistrictSiglas('Saint Paul');
    codes['Petite Soufriere'] = this.getDistrictSiglas('Saint David');
    codes['Saint Sauveur'] = this.getDistrictSiglas('Saint David');
    codes['Good Hope'] = this.getDistrictSiglas('Saint David');
    codes['Mero'] = this.getDistrictSiglas('Saint Joseph');
    codes['Boetica'] = this.getDistrictSiglas('Saint Patrick');
    codes['Casibishie'] = this.getDistrictSiglas('Saint Andrew');
    codes['Bataka'] = this.getDistrictSiglas('Saint David');
    codes['Woodford Hill'] = this.getDistrictSiglas('Saint Andrew');
    codes['Pointe Baptiste'] = this.getDistrictSiglas('Saint Andrew');
    codes['Sineku'] = this.getDistrictSiglas('Saint David');
    codes['Atkinson'] = this.getDistrictSiglas('Saint David');
    codes['Castle Bruce'] = this.getDistrictSiglas('Saint David');
    codes['Salybia'] = this.getDistrictSiglas('Saint David');
    codes['St. Cyr'] = this.getDistrictSiglas('Saint David');
    codes['Gaulette'] = this.getDistrictSiglas('Saint David');
    codes['Burarati'] = this.getDistrictSiglas('Saint David');
    codes['Richmond State'] = this.getDistrictSiglas('Saint David');
    codes['Soufriere'] = this.getDistrictSiglas('Saint Mark');
    codes['Fond St. Jean'] = this.getDistrictSiglas('Saint Patrick');
    codes['Laroche'] = this.getDistrictSiglas('Saint Patrick');
    codes['Vieille Case'] = this.getDistrictSiglas('Saint Andrew');
    codes['Coulibistrie'] = this.getDistrictSiglas('Saint Joseph');
    codes['Morne Raquette'] = this.getDistrictSiglas('Saint Joseph');
    codes['SA'] = 'SA';
    codes['SD'] = 'SD';
    codes['SG'] = 'SG';
    codes['SJH'] = 'SJH';
    codes['SJP'] = 'SJP';
    codes['SL'] = 'SL';
    codes['SM'] = 'SM';
    codes['SPK'] = 'SPK';
    codes['SPL'] = 'SPL';
    codes['SPR'] = 'SPR';
    return codes[code];

}

exports.getDistrictSiglas = function (district) {
    var siglas = [];
    siglas['Saint Andrew'] = 'SA';
    siglas['Saint David'] = 'SD';
    siglas['Saint George'] = 'SG';
    siglas['Saint John'] = 'SJH';
    siglas['Saint Joseph'] = 'SJP';
    siglas['Saint Luke'] = 'SL';
    siglas['Saint Mark'] = 'SM';
    siglas['Saint Patrick'] = 'SPK';
    siglas['Saint Paul'] = 'SPL';
    siglas['Saint Peter'] = 'SPR';

    return siglas[district];
}

exports.getCoordinatesLatLong = function (arrCoor) {
    var arrRet = [];

    for (var element of arrCoor) {
        var eCoor = [];
        eCoor[0] = element[1];
        eCoor[1] = element[0];
        eCoor[2] = element[2];
        arrRet.push(eCoor);

    };

    return arrRet;


}