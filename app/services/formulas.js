var path = require('path');
var config = require(path.join(__dirname, '../../config/config'));

exports.criticalityValue = function(in_val) {

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

exports.criticality = function(type, formula, data) {
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
                    if (data[l2key] != undefined) {
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
                                    if (rk * 1.0 <= data[l2key]) {
                                        // console.log('entro1');
                                        val += level2.scoring[rk] * level2.weight / 100;

                                    }
                                } else {
                                    var valRango = rk.split('-');
                                    if (valRango[0] * 1.0 < data[l2key] && valRango[1] * 1.0 > data[l2key]) {
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