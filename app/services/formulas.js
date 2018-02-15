var debug = require('debug')('debug');
var path = require('path');
var config = require(path.join(__dirname, '../../config/config'));
var services = require(path.join(__dirname, './services'));

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
                color: "#ff0000",
                min: 60,
                max: 80
            }
        },
        "Medium": {
            score: {
                scale: 3,
                color: "#ff0000",
                min: 40,
                max: 60
            }
        },
        "Low": {
            score: {
                scale: 2,
                color: "#ff0000",
                min: 20,
                max: 40
            }
        },
        "Very Low": {
            score: {
                scale: 1,
                color: "#ff0000",
                min: 0,
                max: 20
            }
        }
    };
    return cscale[in_val];


}

exports.criticality = function (type, formula, data) {
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
    console.log('\n\n------------------------------------------');
    debug(formula)
    console.log('\n\n------------------------------------------');

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

exports.PavementCost = function (coord1, coord2, rcondrmatcost) {
    var ret = 0;
    var dist = services.calDIST(coord1, coord2);
    ret = dist * rcondrmatcost;

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
exports.LikelihoodofFailureRatingScale = function (cond_letter) {
    var ret = 1;
    var lof_rating = [];
    var lofv = 0;
    // debug('cond_letter ' + cond_letter);
    if (cond_letter === "E") {
        lofv = 10;
    } else if (cond_letter === "D") {
        lofv = 30;
    } else if (cond_letter === "C") {
        lofv = 50;
    } else if (cond_letter === "B") {
        lofv = 70;
    } else if (cond_letter === "A") {
        lofv = 90;
    }
    lof = 100 - lofv;
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
exports.riskRatingScale = function (lof, cons) {
    var ret = 1;
    var risk_rating = [];
    var lofv = "";
    // debug('lof ' + lof);
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