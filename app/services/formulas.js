var debug = require('debug')('debug');
var path = require('path');
var config = require(path.join(__dirname, '../../config/config'));
var services = require(path.join(__dirname, './services'));


exports.getRangeValues = function (scorerangeval) {
    var operador = "";
    var minval = 0;
    var maxval = 0;
    scorerangeval.indexOf('MIN') >= 0 ? operador = "MIN" : false;
    scorerangeval.indexOf('MAY') >= 0 ? operador = "MAY" : false;
    scorerangeval.indexOf('EQ') >= 0 ? operador = "EQ" : false;
    switch (operador) {
        case 'MIN':
            minval = Number.MIN_VALUE;
            maxval = scorerangeval.substr(scorerangeval.indexOf('MIN') + 3, scorerangeval.length - 1) * 1.0;
            break;
        case 'MAY':
            maxval = Number.MAX_VALUE;
            minval = scorerangeval.substr(scorerangeval.indexOf('MAY') + 3, scorerangeval.length - 1) * 1.0;
            break;
        case 'EQ':
            maxval = scorerangeval.substr(scorerangeval.indexOf('EQ') + 2, scorerangeval.length - 1) * 1.0;
            minval = scorerangeval.substr(0, scorerangeval.indexOf('EQ')) * 1.0;
            break;

        default:
            break;
    }

    return [minval, maxval, operador]
}
exports.criticalityValue = function (in_val) {

    cscale = {
        "Very High": {
            score: {
                scale: 5,
                color: "#ff0000",
                min: 80,
                max: 101
            }
        },
        "High": {
            score: {
                scale: 4,
                color: "#f79646",
                min: 60,
                max: 80
            }
        },
        "Medium": {
            score: {
                scale: 3,
                color: "#ffff00",
                min: 40,
                max: 60
            }
        },
        "Low": {
            score: {
                scale: 2,
                color: "#92d050",
                min: 20,
                max: 40
            }
        },
        "Very Low": {
            score: {
                scale: 1,
                color: "#00b050",
                min: 0,
                max: 20
            }
        }
    };
    return cscale[in_val];


}

exports.criticality = function (type, formula, data, ifdt, index) {
    // console.log('## formulas criticality ##');
    var retCriticality = 0;

    //console.log('\n\n------------------------------------------');
    for (var [l1key, level1] of Object.entries(formula)) {
        if (typeof level1 === 'object') {
            //console.log(l1key);
            var val = 0;
            for (var [l2key, level2] of Object.entries(level1)) {
                if (typeof level2 === 'object') {
                    //console.log(l2key);
                    if (data[l2key] != undefined && data[l2key] != null) {
                        if (level2.type === 'select') {
                            val += level2.scoring[data[l2key]] * level2.weight / 100;
                        } else if (level2.type === 'range') {
                            for (var [rk, rango] of Object.entries(level2.scoring)) {
                                /**
                                 * compruebo que tenga o no guion para definir el rango y si es el primer o no elemento
                                 */
                                // console.log('Rango: ' + rk + ' ' + data[l2key] + ' Scoring ' + level2.scoring[rk]);
                                if (rk.indexOf('-') == -1) {
                                    //Ultimo valor del rango
                                    if (rk * 1.0 <= data[l2key] * 1) {
                                        // console.log('entro1');
                                        val += level2.scoring[rk] * level2.weight / 100;

                                    }
                                } else {
                                    var valRango = rk.split('-');
                                    if (valRango[0] * 1.0 < data[l2key] * 1.0 && valRango[1] * 1.0 > data[l2key] * 1.0) {
                                        // console.log('entro2');
                                        val += level2.scoring[rk] * level2.weight / 100;
                                        // console.log('Rango: ' + rk + ' ' + data[l2key] + ' Scoring ' + level2.scoring[rk]);
                                    }
                                }
                            }

                            // console.log('Rango: ' + data[l2key]);

                        }
                        //console.log('Val: ' + val);
                    } else {
                        val += 0;
                    }

                }
                // if (ifdt.properties.gcode[index] === 'S8-SG-01-RWL-2081') {
                //     debug(' index:               ' + index);
                //     debug(' bcode[index]:        ' + ifdt.properties.gcode[index]);
                //     debug(' rcategory:           ' + ifdt.properties.rcategory[index]);
                //     debug(' rdendritic:          ' + ifdt.properties.rdendritic[index]);
                //     debug(' ralternatitinerary:  ' + ifdt.properties.ralternatitinerary[index]);
                //     debug(' rinfrint:            ' + ifdt.properties.rinfrint[index]);
                //     debug(' rtourism:            ' + ifdt.properties.rtourism[index]);
                //     debug(' rindustrydist:       ' + ifdt.properties.rindustrydist[index]);
                //     debug(' rindustry:           ' + ifdt.properties.rindustry[index]);
                //     debug(' rhealth:             ' + ifdt.properties.rhealth[index]);
                //     debug(' renvironment:        ' + ifdt.properties.renvironment[index]);
                //     debug(' rwaste:              ' + ifdt.properties.rwaste[index]);
                //     debug(' rwidth:              ' + ifdt.properties.rwidth[index]);
                //     debug(' rmaterial:           ' + ifdt.properties.rmaterial[index]);
                //     debug(' rdateconstruct:      ' + ifdt.properties.rdateconstruct[index]);
                //     debug(' gmaterial:           ' + ifdt.properties.gmaterial[index]);
                //     debug(' gmaterial2:          ' + ifdt.properties.gmaterial2[index]);
                //     debug(' gheight:             ' + ifdt.properties.gheight[index]);
                //     debug(' gheight2:            ' + ifdt.properties.gheight2[index]);
                //     debug(' glength:             ' + ifdt.properties.glength[index]);
                //     debug(' glength2:            ' + ifdt.properties.glength2[index]);
                //     debug('l1key:                ' + l1key);
                //     debug('level1:               ');
                //     debug(level1);
                //     debug('l2key:                ' + l2key);
                //     debug('level2:               ');
                //     debug(level2);
                //     debug('rk:                   ' + rk);
                //     debug('rango:                ' + rango);
                //     // while (true) { ; };
                // }
            }
            retCriticality += val * level1.weight / 100;
            // console.log('retCriticality: ' + retCriticality);
        }

    }



    return retCriticality * 100;

}

exports.condition = function (type, formula, data) {
    // console.log('## formulas condition ##');
    var retCondition = 1.0 * 1.0 - 1.0;
    // console.log('\n\n------------------------------------------');
    // debug(formula)
    // console.log('\n\n------------------------------------------');

    weight = 1.0 * 1;
    scoring = 0.0 * 1;
    for (var [l1key, level1] of Object.entries(formula)) {
        if (typeof level1 === 'object') {
            //console.log(l1key);
            var val = 0;
            for (var [l2key, level2] of Object.entries(level1)) {

                for (var [l3key, level3] of Object.entries(level2)) {

                    for (var [l4key, level4] of Object.entries(level3)) {

                        for (var [l5key, level5] of Object.entries(level4)) {

                            for (var [l6key, level6] of Object.entries(level5)) {
                                // console.log('level1.weight: ' + level1.weight);
                                if (level1.weight !== undefined) {
                                    weight = level1.weight * 1;
                                }
                                // console.log('level1.scoring: ' + level1.scoring);
                                if (level1.scoring !== undefined) {
                                    scoring = level1.scoring;
                                    lkey = l2key;
                                }

                                // console.log('level2.weight: ' + level2.weight);
                                if (level2.weight !== undefined) {
                                    weight = level2.weight * 1;
                                }
                                // console.log('level2.scoring: ' + level2.scoring);
                                if (level2.scoring !== undefined) {
                                    scoring = level2.scoring;
                                    lkey = l3key;
                                }

                                // console.log('level3.weight: ' + level3.weight);
                                if (level3.weight !== undefined) {
                                    weight = level3.weight * 1;
                                }
                                // console.log('level3.scoring: ' + level3.scoring);
                                if (level3.scoring !== undefined) {
                                    scoring = level3.scoring;
                                    lkey = l4key;
                                }

                                // console.log('level4.weight: ' + level4.weight);
                                if (level4.weight !== undefined) {
                                    weight = level4.weight * 1;
                                }
                                // console.log('level4.scoring: ' + level4.scoring);
                                if (level4.scoring !== undefined) {
                                    scoring = level4.scoring;
                                    lkey = l5key;
                                }

                                // console.log('level5.weight: ' + level5.weight);
                                if (level5.weight !== undefined) {
                                    weight = level5.weight * 1;
                                }
                                // console.log('level5.scoring: ' + level5.scoring);
                                if (level5.scoring !== undefined) {
                                    scoring = level5.scoring;
                                    lkey = l6key;
                                }

                                // console.log('level6.weight: ' + level6.weight);
                                if (level6.weight !== undefined) {
                                    weight = level6.weight * 1;
                                }
                                // console.log('level6.scoring: ' + level6.scoring);
                                if (level6.scoring !== undefined) {
                                    scoring = level6.scoring;
                                    lkey = l7key;
                                }


                                // for (var [l2key, level2] of Object.entries(level1)) {
                                //     if (typeof level2 === 'object') {
                                //         //console.log(l2key);
                                //         if (data[l2key] != undefined && data[l2key] != null) {
                                //             if (level2.type === 'select') {
                                //                 val += level2.scoring[data[l2key]] * level2.weight / 100;
                                //             } else if (level2.type === 'range') {
                                //                 for (var [rk, rango] of Object.entries(level2.scoring)) {

                                if (scoring !== undefined && weight !== undefined) {
                                    for (var [rk, rango] of Object.entries(scoring)) {
                                        // console.log('weight: ' + weight);
                                        // console.log('scoring: ' + scoring[rk]);


                                        if (rk.indexOf('-') == -1) {
                                            //Ultimo valor del rango
                                            if (rk * 1.0 <= data[lkey] * 1) {
                                                console.log('entro1');
                                                val += scoring[rk] * weight / 100;

                                            }
                                        } else {
                                            var valRango = rk.split('-');
                                            if (valRango[0] * 1.0 < data[lkey] * 1.0 && valRango[1] * 1.0 > data[lkey] * 1.0) {
                                                console.log('entro2');
                                                val += scoring[rk] * weight / 100;
                                                // console.log('Rango: ' + rk + ' ' + data[lkey] + ' Scoring ' + scoring[rk]);
                                            }
                                        }


                                        // if (Number(scoring[rk]) == scoring[rk] && Number(weight) == weight) {
                                        //      val += scoring[rk] * weight / 100.0; 
                                        //     }



                                        console.log('data[lkey]: ' + data[lkey]);
                                    }
                                }
                            }

                        }

                    }

                }

            }
        }
        if (Number(val) == val && Number(weight) == weight) {
            retCondition += val * weight / 100;
            // console.log('retCondition: ' + parseFloat(retCondition));
        }

        // }

    }



    console.log('retCondition: ' + retCondition * 100);
    // return retCondition * 100;
    return retCondition * 100;

}

exports.PavementCost = function (coord1, coord2, rcondrmatcost, rwidth) {
    var ret = 0;
    var dist = services.calDIST(coord1, coord2);
    ret = dist * rwidth * rcondrmatcost;

    // debug('Distancia ' + dist + ' cost: ' + ret + ' rcondrmatcost ' + rcondrmatcost);
    return ret;

}
exports.PavementCostGroup = function (dist, rcondrmatcost, rwidth) {
    var ret = 0;
    ret = dist * rwidth * rcondrmatcost;

    return ret;

}
exports.BridgesCost = function (dist, bcondrmatcost, bwidth) {
    var ret = 0;
    // var dist = services.calDIST(coord1, coord2);
    ret = dist * bwidth * bcondrmatcost;

    // debug('Distancia ' + dist + ' cost: ' + ret + ' rcondrmatcost ' + rcondrmatcost);
    return ret;

}
exports.CulvertsCost = function (length, Ccondrmatcost) {
    var ret = 0;
    // var dist = services.calDIST(coord1, coord2);
    ret = length * Ccondrmatcost;

    // debug('Distancia ' + dist + ' cost: ' + ret + ' rcondrmatcost ' + rcondrmatcost);
    return ret;

}
exports.GeotCost = function (length, gcondrmatcost, gheight) {
    var ret = 0;
    // var dist = services.calDIST(coord1, coord2);
    ret = length * gheight * gcondrmatcost;

    // debug('Distancia ' + dist + ' cost: ' + ret + ' rcondrmatcost ' + rcondrmatcost);
    return ret;

}

exports.criticalityRatingScale = function (lof) {
    var ret = 1;
    var crit_rating = [];
    var lofv = "";
    // debug('lof ' + lof);
    lof = lof * 1;
    if (lof >= 0 && lof < 20) {
        lofv = '0-20';
    } else if (lof >= 20 && lof < 40) {
        lofv = '20-40';
    } else if (lof >= 40 && lof < 60) {
        lofv = '40-60';
    } else if (lof >= 60 && lof < 80) {
        lofv = '60-80';
    } else if (lof >= 80 && lof <= 100) {
        lofv = '80-100';
    }

    crit_rating['0-20'] = [];
    crit_rating['0-20'] = 1;
    crit_rating['20-40'] = [];
    crit_rating['20-40'] = 2;
    crit_rating['40-60'] = [];
    crit_rating['40-60'] = 3;
    crit_rating['60-80'] = [];
    crit_rating['60-80'] = 4;
    crit_rating['80-100'] = [];
    crit_rating['80-100'] = 5;

    ret = crit_rating[lofv];

    return ret;
}
exports.criticalityRatingScaleLetter = function (lof) {
    var ret = 1;
    var crit_rating = [];
    var lofv = "";
    // debug('lof ' + lof);
    // lof = lof * 1;
    if (lof === 'A') {
        lofv = '0-20';
    } else if (lof === 'B') {
        lofv = '20-40';
    } else if (lof === 'C') {
        lofv = '40-60';
    } else if (lof === 'D') {
        lofv = '60-80';
    } else if (lof === 'E') {
        lofv = '80-100';
    }
    // debug('lofv ' + lofv);

    crit_rating['0-20'] = [];
    crit_rating['0-20'] = 1; //Negligible
    crit_rating['20-40'] = [];
    crit_rating['20-40'] = 2; //Minor
    crit_rating['40-60'] = [];
    crit_rating['40-60'] = 3; //Moderate
    crit_rating['60-80'] = [];
    crit_rating['60-80'] = 4; //Serious
    crit_rating['80-100'] = [];
    crit_rating['80-100'] = 5; //Catastrophic

    ret = crit_rating[lofv];

    return ret;
}

exports.criticalityRatingLetterScale = function (critNumVal) {
    var ret = 1;
    var crit_rating = [];
    var critNumValv = "";
    // debug('critNumVal ' + critNumVal);
    critNumVal = critNumVal * 1;
    if (critNumVal >= 0 && critNumVal < 20) {
        critNumValv = '0-20';
    } else if (critNumVal >= 20 && critNumVal < 40) {
        critNumValv = '20-40';
    } else if (critNumVal >= 40 && critNumVal < 60) {
        critNumValv = '40-60';
    } else if (critNumVal >= 60 && critNumVal < 80) {
        critNumValv = '60-80';
    } else if (critNumVal >= 80 && critNumVal <= 100) {
        critNumValv = '80-100';
    }

    crit_rating['0-20'] = [];
    crit_rating['0-20'] = "A";
    crit_rating['20-40'] = [];
    crit_rating['20-40'] = "B";
    crit_rating['40-60'] = [];
    crit_rating['40-60'] = "C";
    crit_rating['60-80'] = [];
    crit_rating['60-80'] = "D";
    crit_rating['80-100'] = [];
    crit_rating['80-100'] = "E";

    ret = crit_rating[critNumValv];

    return ret;
}
exports.LikelihoodofFailureRatingScale = function (lofv) {
    // var ret = 1;
    var lof_rating = [];
    // var lofv = 0;
    // // debug('cond_letter ' + cond_letter);
    // if (cond_letter === "E") {
    //     lofv = 10;
    // } else if (cond_letter === "D") {
    //     lofv = 30;
    // } else if (cond_letter === "C") {
    //     lofv = 50;
    // } else if (cond_letter === "B") {
    //     lofv = 70;
    // } else if (cond_letter === "A") {
    //     lofv = 90;
    // }
    // lof = 100 - lofv;
    // if (lof >= 0 && lof < 20) {
    //     lofv = '0-20';
    // } else if (lof >= 20 && lof < 40) {
    //     lofv = '20-40';
    // } else if (lof >= 40 && lof < 60) {
    //     lofv = '40-60';
    // } else if (lof >= 60 && lof < 80) {
    //     lofv = '60-80';
    // } else if (lof >= 80 && lof <= 100) {
    //     lofv = '80-100';
    // }
    lof_rating['0-20'] = [];
    lof_rating['0-20'] = 1;
    lof_rating['20-40'] = [];
    lof_rating['20-40'] = 2;
    lof_rating['40-60'] = [];
    lof_rating['40-60'] = 3;
    lof_rating['60-80'] = [];
    lof_rating['60-80'] = 4;
    lof_rating['80-100'] = [];
    lof_rating['80-100'] = 5;

    ret = lof_rating[lofv];

    return ret;
}
exports.ConditionRating = function (vcond) {
    var lof = vcond * 100;
    var condition = [];
    if (lof >= 0 && lof < 20) {
        cv = '0-20';
    } else if (lof >= 20 && lof < 40) {
        cv = '20-40';
    } else if (lof >= 40 && lof < 60) {
        cv = '40-60';
    } else if (lof >= 60 && lof < 80) {
        cv = '60-80';
    } else if (lof >= 80 && lof <= 100) {
        cv = '80-100';
    }
    condition['80-100'] = 'A'; //  Excellent
    condition['60-80'] = 'B'; //  Good
    condition['40-60'] = 'C'; //  Fair
    condition['20-40'] = 'D'; //  Poor
    condition['0-20'] = 'E'; //  Very poor

    return condition[cv];
}
exports.conditionValueScale = function (condv) {
    var ret = 1;
    var cond_rating = [];
    // debug('cond ' + cond);

    cond_rating['A'] = [];
    cond_rating['A'] = 1;
    cond_rating['B'] = [];
    cond_rating['B'] = 2;
    cond_rating['C'] = [];
    cond_rating['C'] = 3;
    cond_rating['D'] = [];
    cond_rating['D'] = 4;
    cond_rating['E'] = [];
    cond_rating['E'] = 5;

    ret = cond_rating[condv];

    return ret;
}
exports.NormalizeRiskRatingScale = function (risk_value) {
    var lofv = risk_value.split('__')[0];
    // debug('lof ' + lof + ' cons ' + cons);
    var lof = lofv * 1.0;
    if (lof >= 0 && lof < 20) {
        return '0-20__' + risk_value.split('__')[1];
    } else if (lof >= 20 && lof < 40) {
        return '20-40__' + risk_value.split('__')[1];
    } else if (lof >= 40 && lof < 60) {
        return '40-60__' + risk_value.split('__')[1];
    } else if (lof >= 60 && lof < 80) {
        return '60-80__' + risk_value.split('__')[1];
    } else if (lof >= 80 && lof <= 100) {
        return '80-100__' + risk_value.split('__')[1];
    }
}
exports.riskRatingScale = function (lof, cons) {
    var ret = 1;
    var risk_rating = [];
    var lofv = "";
    // debug('lof ' + lof + ' cons ' + cons);
    var lof = lof * 1;
    if (lof >= 0 && lof < 20) {
        lofv = '0-20';
    } else if (lof >= 20 && lof < 40) {
        lofv = '20-40';
    } else if (lof >= 40 && lof < 60) {
        lofv = '40-60';
    } else if (lof >= 60 && lof < 80) {
        lofv = '60-80';
    } else if (lof >= 80 && lof <= 100) {
        lofv = '80-100';
    } else {
        return 0;
    }

    risk_rating['0-20'] = [];
    risk_rating['0-20']['A'] = 1;
    risk_rating['0-20']['B'] = 1;
    risk_rating['0-20']['C'] = 2;
    risk_rating['0-20']['D'] = 2;
    risk_rating['0-20']['E'] = 3;
    risk_rating['20-40'] = [];
    risk_rating['20-40']['A'] = 1;
    risk_rating['20-40']['B'] = 2;
    risk_rating['20-40']['C'] = 2;
    risk_rating['20-40']['D'] = 3;
    risk_rating['20-40']['E'] = 3;
    risk_rating['40-60'] = [];
    risk_rating['40-60']['A'] = 2;
    risk_rating['40-60']['B'] = 3;
    risk_rating['40-60']['C'] = 3;
    risk_rating['40-60']['D'] = 3;
    risk_rating['40-60']['E'] = 4;
    risk_rating['60-80'] = [];
    risk_rating['60-80']['A'] = 2;
    risk_rating['60-80']['B'] = 3;
    risk_rating['60-80']['C'] = 3;
    risk_rating['60-80']['D'] = 4;
    risk_rating['60-80']['E'] = 5;
    risk_rating['80-100'] = [];
    risk_rating['80-100']['A'] = 3;
    risk_rating['80-100']['B'] = 3;
    risk_rating['80-100']['C'] = 4;
    risk_rating['80-100']['D'] = 5;
    risk_rating['80-100']['E'] = 5;

    ret = risk_rating[lofv][cons];

    return ret;
}
exports.riskRatingScaleString = function (lofv, cons) {
    var ret = 1;
    var risk_rating = [];


    risk_rating['0-20'] = [];
    risk_rating['0-20']['A'] = 1;
    risk_rating['0-20']['B'] = 1;
    risk_rating['0-20']['C'] = 2;
    risk_rating['0-20']['D'] = 2;
    risk_rating['0-20']['E'] = 3;
    risk_rating['20-40'] = [];
    risk_rating['20-40']['A'] = 1;
    risk_rating['20-40']['B'] = 2;
    risk_rating['20-40']['C'] = 2;
    risk_rating['20-40']['D'] = 3;
    risk_rating['20-40']['E'] = 3;
    risk_rating['40-60'] = [];
    risk_rating['40-60']['A'] = 2;
    risk_rating['40-60']['B'] = 3;
    risk_rating['40-60']['C'] = 3;
    risk_rating['40-60']['D'] = 3;
    risk_rating['40-60']['E'] = 4;
    risk_rating['60-80'] = [];
    risk_rating['60-80']['A'] = 2;
    risk_rating['60-80']['B'] = 3;
    risk_rating['60-80']['C'] = 3;
    risk_rating['60-80']['D'] = 4;
    risk_rating['60-80']['E'] = 5;
    risk_rating['80-100'] = [];
    risk_rating['80-100']['A'] = 3;
    risk_rating['80-100']['B'] = 3;
    risk_rating['80-100']['C'] = 4;
    risk_rating['80-100']['D'] = 5;
    risk_rating['80-100']['E'] = 5;

    ret = risk_rating[lofv][cons];

    return ret;
}
exports.riskRatingScaleStringLof = function (lofv) {
    var ret = 1;
    var risk_rating = [];


    risk_rating['0-20'] = [];
    risk_rating['0-20'] = 1;

    risk_rating['20-40'] = [];
    risk_rating['20-40'] = 2;

    risk_rating['40-60'] = [];
    risk_rating['40-60'] = 3;

    risk_rating['60-80'] = [];
    risk_rating['60-80'] = 4;

    risk_rating['80-100'] = [];
    risk_rating['80-100'] = 5;


    ret = risk_rating[lofv];

    return ret;
}
exports.riskRatingScaleOrder = function (risk_value) {
    var ret = 1;
    var risk_rating = [];
    var lof = parseFloat(risk_value.split("__")[0]);
    var cons = risk_value.split("__")[1];

    console.log('lof ' + lof);
    console.log('cons ' + cons);
    var lof = lof * 1;
    if (lof >= 0 && lof < 20) {
        lofv = '0-20';
    } else if (lof >= 20 && lof < 40) {
        lofv = '20-40';
    } else if (lof >= 40 && lof < 60) {
        lofv = '40-60';
    } else if (lof >= 60 && lof < 80) {
        lofv = '60-80';
    } else if (lof >= 80 && lof <= 100) {
        lofv = '80-100';
    }

    risk_rating['0-20'] = [];
    risk_rating['20-40'] = [];
    risk_rating['40-60'] = [];
    risk_rating['60-80'] = [];
    risk_rating['80-100'] = [];
    risk_rating['80-100']['E'] = 1;
    risk_rating['80-100']['D'] = 2;
    risk_rating['60-80']['E'] = 3;
    risk_rating['60-80']['D'] = 4;
    risk_rating['80-100']['C'] = 5;
    risk_rating['40-60']['E'] = 6;
    risk_rating['60-80']['C'] = 7;
    risk_rating['40-60']['D'] = 8;
    risk_rating['80-100']['B'] = 9;
    risk_rating['20-40']['E'] = 10;
    risk_rating['40-60']['C'] = 11;
    risk_rating['60-80']['B'] = 12;
    risk_rating['20-40']['D'] = 13;
    risk_rating['40-60']['B'] = 14;
    risk_rating['80-100']['A'] = 15;
    risk_rating['0-20']['E'] = 16;
    risk_rating['60-80']['A'] = 17;
    risk_rating['0-20']['D'] = 18;
    risk_rating['40-60']['A'] = 19;
    risk_rating['20-40']['C'] = 20;
    risk_rating['0-20']['C'] = 21;
    risk_rating['20-40']['B'] = 22;
    risk_rating['20-40']['A'] = 23;
    risk_rating['0-20']['B'] = 24;
    risk_rating['0-20']['A'] = 25;

    ret = risk_rating[lofv][cons];

    return ret;
}
exports.riskRatingScaleOrderCode = function (code) {
    var arrcode = code.split('__');
    var risk_value = arrcode[2].split('-')[1] + '-' + arrcode[2].split('-')[2] + '__' + arrcode[3];
    // debug(risk_value);
    var ret = 1;
    var risk_rating = [];
    var lof = parseFloat(risk_value.split("__")[0]);
    var cons = risk_value.split("__")[1];

    // console.log('lof ' + lof);
    // console.log('cons ' + cons);
    var lof = lof * 1;
    if (lof >= 0 && lof < 20) {
        lofv = '0-20';
    } else if (lof >= 20 && lof < 40) {
        lofv = '20-40';
    } else if (lof >= 40 && lof < 60) {
        lofv = '40-60';
    } else if (lof >= 60 && lof < 80) {
        lofv = '60-80';
    } else if (lof >= 80 && lof <= 100) {
        lofv = '80-100';
    }

    risk_rating['0-20'] = [];
    risk_rating['20-40'] = [];
    risk_rating['40-60'] = [];
    risk_rating['60-80'] = [];
    risk_rating['80-100'] = [];
    risk_rating['80-100']['E'] = 1;
    risk_rating['80-100']['D'] = 2;
    risk_rating['60-80']['E'] = 3;
    risk_rating['60-80']['D'] = 4;
    risk_rating['80-100']['C'] = 5;
    risk_rating['40-60']['E'] = 6;
    risk_rating['60-80']['C'] = 7;
    risk_rating['40-60']['D'] = 8;
    risk_rating['80-100']['B'] = 9;
    risk_rating['20-40']['E'] = 10;
    risk_rating['40-60']['C'] = 11;
    risk_rating['60-80']['B'] = 12;
    risk_rating['20-40']['D'] = 13;
    risk_rating['40-60']['B'] = 14;
    risk_rating['80-100']['A'] = 15;
    risk_rating['0-20']['E'] = 16;
    risk_rating['60-80']['A'] = 17;
    risk_rating['0-20']['D'] = 18;
    risk_rating['40-60']['A'] = 19;
    risk_rating['20-40']['C'] = 20;
    risk_rating['0-20']['C'] = 21;
    risk_rating['20-40']['B'] = 22;
    risk_rating['20-40']['A'] = 23;
    risk_rating['0-20']['B'] = 24;
    risk_rating['0-20']['A'] = 25;

    ret = risk_rating[lofv][cons];

    return ret;
}


exports.pavCondScale = function (value) {
    var ret = "";

    if (value < 2.5)
        return "A";
    else if (value >= 2.5 && value < 5)
        return "B";
    else if (value >= 5 && value < 8)
        return "C";
    else if (value >= 8 && value < 11)
        return "D";
    else
        return "E";


}

exports.pavCondScaleNum = function (value) {
    var ret = "";

    if (value < 2.5)
        return "A";
    else if (value >= 2.5 && value < 5)
        return "B";
    else if (value >= 5 && value < 8)
        return "C";
    else if (value >= 8 && value < 11)
        return "D";
    else
        return "E";


}

exports.pavCondScaleNumIri = function (value) {
    var ret = "";

    if (value < 2.5)
        return 0.9;
    else if (value >= 2.5 && value < 5)
        return 0.7;
    else if (value >= 5 && value < 8)
        return 0.5;
    else if (value >= 8 && value < 11)
        return 0.3;
    else
        return 0.1;


}

exports.pavCondScaleLetter = function (letter) {
    var ret = "";

    if (letter === "A")
        return 0.9;
    else if (letter === "B")
        return 0.7;
    else if (letter === "C")
        return 0.5;
    else if (letter === "D")
        return 0.3;
    else
        return 0.1;


}