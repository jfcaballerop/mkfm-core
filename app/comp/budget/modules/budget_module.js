var path = require('path');
var formulasService = require(path.join(__dirname, '../../../services/formulas'));
var services = require(path.join(__dirname, '../../../services/services'));
var mathjs = require('mathjs');
var debug = require('debug')('debug');

exports.investmentDistrict = function (arrInv, district, investment) {

    switch (district) {
        case "Saint George":
            arrInv['Total_investment_Saint_George'] += investment * 1.0;
            break;
        case "Saint Paul":
            arrInv['Total_investment_Saint_Paul'] += investment * 1.0;
            break;
        case "Saint Joseph":
            arrInv['Total_investment_Saint_Joseph'] += investment * 1.0;
            break;
        case "Saint Peter":
            arrInv['Total_investment_Saint_Peter'] += investment * 1.0;
            break;
        case "Saint John":
            arrInv['Total_investment_Saint_John'] += investment * 1.0;
            break;
        case "Saint Andrew":
            arrInv['Total_investment_Saint_Andrew'] += investment * 1.0;
            break;
        case "Saint David":
            arrInv['Total_investment_Saint_David'] += investment * 1.0;
            break;
        case "Saint Patrick":
            arrInv['Total_investment_Saint_Patrick'] += investment * 1.0;
            break;
        case "Saint Mark":
            arrInv['Total_investment_Saint_Mark'] += investment * 1.0;
            break;
        case "Saint Luke":
            arrInv['Total_investment_Saint_Luke'] += investment * 1.0;
            break;

        default:
            break;
    }

    return arrInv;
}
exports.investmentCategory = function (arrInv, cat, investment, risk) {

    if (risk === 'NAT') {

        switch (cat) {
            case 'Urban':
                arrInv['Total_investment_Urban'] += investment * 1.0;

                break;
            case 'Main Road':
                arrInv['Total_investment_MainRoad'] += investment * 1.0;


                break;
            case 'Feeder':
                arrInv['Total_investment_Feeder'] += investment * 1.0;


                break;
            case 'Secondary':
                arrInv['Total_investment_Secondary'] += investment * 1.0;


                break;

            default:
                break;
        }
    } else {
        switch (cat) {
            case 'Urban':
                arrInv['Total_investment_Urban_phy'] += investment * 1.0;

                break;
            case 'Main Road':
                arrInv['Total_investment_MainRoad_phy'] += investment * 1.0;


                break;
            case 'Feeder':
                arrInv['Total_investment_Feeder_phy'] += investment * 1.0;


                break;
            case 'Secondary':
                arrInv['Total_investment_Secondary_phy'] += investment * 1.0;


                break;

            default:
                break;
        }
    }

    return arrInv;
}
exports.investmentPhysical = function (ret, riskphy_lof, riskphy_cons, investment, coord1, coord2, index) {

    switch (formulasService.riskRatingScale(riskphy_lof, riskphy_cons)) {
        case 1:
            ret['Total_investment_riskphy1'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_riskphy1'] += services.calDIST(coord1, coord2);
            }
            break;
        case 2:
            ret['Total_investment_riskphy2'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_riskphy2'] += services.calDIST(coord1, coord2);
            }

            break;
        case 3:
            ret['Total_investment_riskphy3'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_riskphy3'] += services.calDIST(coord1, coord2);
            }

            break;
        case 4:
            ret['Total_investment_riskphy4'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_riskphy4'] += services.calDIST(coord1, coord2);
            }

            break;
        case 5:
            ret['Total_investment_riskphy5'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_riskphy5'] += services.calDIST(coord1, coord2);
            }
            break;

        default:
            //debug('##### investmentPhysical Value not find: ' + riskphy_lof + ' ' + riskphy_cons);
            break;
    }

    return ret;
}
exports.investmentNatural = function (ret, risknathaz_lof, risknathaz_cons, investment, coord1, coord2, index) {

    switch (formulasService.riskRatingScale(risknathaz_lof, risknathaz_cons)) {
        case 1:
            ret['Total_investment_risknat1'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_risknat1'] += services.calDIST(coord1, coord2);
            }
            break;
        case 2:
            ret['Total_investment_risknat2'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_risknat2'] += services.calDIST(coord1, coord2);
            }

            break;
        case 3:
            ret['Total_investment_risknat3'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_risknat3'] += services.calDIST(coord1, coord2);
            }

            break;
        case 4:
            ret['Total_investment_risknat4'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_risknat4'] += services.calDIST(coord1, coord2);
            }

            break;
        case 5:
            ret['Total_investment_risknat5'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;
            if (index > 0) {
                ret['Total_km_risknat5'] += services.calDIST(coord1, coord2);
            }
            break;

        default:
            //debug('##### investmentNatural Value not find: ' + risknathaz_lof + ' ' + risknathaz_cons);
            break;
    }

    return ret;
}
exports.investmentRisk = function (ret, code, investment, type, assetype) {
    var codearr = code.split('__');
    var risk_cons = codearr[3];

    if (type === 'NAT') {
        var risk_lof = codearr[2].replace('RNAT-', '');
        //debug(risk_lof, risk_cons);
        switch (formulasService.riskRatingScaleString(risk_lof, risk_cons)) {
            case 1:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_risknat1'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_brisknat1'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_crisknat1'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_grisknat1'] += investment * 1.0;


                break;
            case 2:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_risknat2'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_brisknat2'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_crisknat2'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_grisknat2'] += investment * 1.0;

                break;
            case 3:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_risknat3'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_brisknat3'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_crisknat3'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_grisknat3'] += investment * 1.0;

                break;
            case 4:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_risknat4'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_brisknat4'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_crisknat4'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_grisknat4'] += investment * 1.0;

                break;
            case 5:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_risknat5'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_brisknat5'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_crisknat5'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_grisknat5'] += investment * 1.0;
                break;

            default:
                //debug('##### investmentNatural Value not find: ' + risknathaz_lof + ' ' + risknathaz_cons);
                break;
        }
    } else {
        var risk_lof = codearr[2].replace('RPHY-', '');
        //debug(risk_lof, risk_cons);
        switch (formulasService.riskRatingScaleString(risk_lof, risk_cons)) {
            case 1:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_riskphy1'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_briskphy1'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_criskphy1'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_griskphy1'] += investment * 1.0;

                break;
            case 2:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_riskphy2'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_briskphy2'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_criskphy2'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_griskphy2'] += investment * 1.0;

                break;
            case 3:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_riskphy3'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_briskphy3'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_criskphy3'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_griskphy3'] += investment * 1.0;

                break;
            case 4:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_riskphy4'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_briskphy4'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_criskphy4'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_griskphy4'] += investment * 1.0;

                break;
            case 5:
                if (assetype === 'PAVEMENTS')
                    ret['Total_investment_riskphy5'] += investment * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_investment_briskphy5'] += investment * 1.0;
                if (assetype === 'CULVERTS')
                    ret['Total_investment_criskphy5'] += investment * 1.0;
                if (assetype === 'GEOT')
                    ret['Total_investment_griskphy5'] += investment * 1.0;

                break;

            default:
                //debug('##### investmentNatural Value not find: ' + risknathaz_lof + ' ' + risknathaz_cons);
                break;
        }
    }

    return ret;
}
exports.nAssetsRisk = function (ret, code, length, type, assetype) {
    var codearr = code.split('__');
    var risk_cons = codearr[3];

    if (type === 'NAT') {
        var risk_lof = codearr[2].replace('RNAT-', '');
        //debug(risk_lof, risk_cons);
        switch (formulasService.riskRatingScaleString(risk_lof, risk_cons)) {
            case 1:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_risknat1'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_brisknat1']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_crisknat1']++;
                if (assetype === 'GEOT')
                    ret['Total_num_grisknat1']++;


                break;
            case 2:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_risknat2'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_brisknat2']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_crisknat2']++;
                if (assetype === 'GEOT')
                    ret['Total_num_grisknat2']++;

                break;
            case 3:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_risknat3'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_brisknat3']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_crisknat3']++;
                if (assetype === 'GEOT')
                    ret['Total_num_grisknat3']++;

                break;
            case 4:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_risknat4'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_brisknat4']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_crisknat4']++;
                if (assetype === 'GEOT')
                    ret['Total_num_grisknat4']++;

                break;
            case 5:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_risknat5'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_brisknat5']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_crisknat5']++;
                if (assetype === 'GEOT')
                    ret['Total_num_grisknat5']++;
                break;

            default:
                //debug('##### investmentNatural Value not find: ' + risknathaz_lof + ' ' + risknathaz_cons);
                break;
        }
    } else {
        var risk_lof = codearr[2].replace('RPHY-', '');
        //debug(risk_lof, risk_cons);
        switch (formulasService.riskRatingScaleString(risk_lof, risk_cons)) {
            case 1:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_riskphy1'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_briskphy1']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_criskphy1']++;
                if (assetype === 'GEOT')
                    ret['Total_num_griskphy1']++;

                break;
            case 2:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_riskphy2'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_briskphy2']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_criskphy2']++;
                if (assetype === 'GEOT')
                    ret['Total_num_griskphy2']++;

                break;
            case 3:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_riskphy3'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_briskphy3']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_criskphy3']++;
                if (assetype === 'GEOT')
                    ret['Total_num_griskphy3']++;

                break;
            case 4:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_riskphy4'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_briskphy4']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_criskphy4']++;
                if (assetype === 'GEOT')
                    ret['Total_num_griskphy4']++;

                break;
            case 5:
                if (assetype === 'PAVEMENTS')
                    ret['Total_km_riskphy5'] += length * 1.0;
                if (assetype === 'BRIDGES')
                    ret['Total_num_briskphy5']++;
                if (assetype === 'CULVERTS')
                    ret['Total_num_criskphy5']++;
                if (assetype === 'GEOT')
                    ret['Total_num_griskphy5']++;

                break;

            default:
                //debug('##### investmentNatural Value not find: ' + risknathaz_lof + ' ' + risknathaz_cons);
                break;
        }
    }

    return ret;
}
exports.investmentBridgesPhysical = function (ret, riskphyhaz_lof, riskphyhaz_cons, investment) {

    switch (formulasService.riskRatingScale(riskphyhaz_lof, riskphyhaz_cons)) {
        case 1:
            ret['Total_investment_briskphy1'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;

            break;
        case 2:
            ret['Total_investment_briskphy2'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;

            break;
        case 3:
            ret['Total_investment_briskphy3'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;

            break;
        case 4:
            ret['Total_investment_briskphy4'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;

            break;
        case 5:
            ret['Total_investment_briskphy5'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;

            break;

        default:
            //debug('##### investmentBridgesPhysical Value not find: ' + riskphyhaz_lof + ' ' + riskphyhaz_cons);
            break;
    }

    return ret;
}
exports.investmentBridgesNatural = function (ret, risknathaz_lof, risknathaz_cons, investment) {

    switch (formulasService.riskRatingScale(risknathaz_lof, risknathaz_cons)) {
        case 1:
            ret['Total_investment_brisknat1'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;

            break;
        case 2:
            ret['Total_investment_brisknat2'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;

            break;
        case 3:
            ret['Total_investment_brisknat3'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;

            break;
        case 4:
            ret['Total_investment_brisknat4'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;

            break;
        case 5:
            ret['Total_investment_brisknat5'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;

            break;

        default:
            //debug('##### Value not find: ' + risknathaz_lof + ' ' + risknathaz_cons);
            break;
    }

    return ret;
}
exports.investmentCulvertsPhysical = function (ret, riskphy_lof, riskphy_cons, investment) {

    switch (formulasService.riskRatingScale(riskphy_lof, riskphy_cons)) {
        case 1:
            ret['Total_investment_criskphy1'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;


            break;
        case 2:
            ret['Total_investment_criskphy2'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;


            break;
        case 3:
            ret['Total_investment_criskphy3'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;


            break;
        case 4:
            ret['Total_investment_criskphy4'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;

            break;
        case 5:
            ret['Total_investment_criskphy5'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;

            break;

        default:
            break;
    }
    return ret;
}
exports.investmentCulvertsNatural = function (ret, risknathaz_lof, risknathaz_cons, investment) {

    switch (formulasService.riskRatingScale(risknathaz_lof, risknathaz_cons)) {
        case 1:
            ret['Total_investment_crisknat1'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;


            break;
        case 2:
            ret['Total_investment_crisknat2'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;


            break;
        case 3:
            ret['Total_investment_crisknat3'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;


            break;
        case 4:
            ret['Total_investment_crisknat4'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;

            break;
        case 5:
            ret['Total_investment_crisknat5'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;

            break;

        default:
            break;
    }
    return ret;
}
exports.investmentGeotPhysical = function (ret, riskphy_lof, riskphy_cons, investment) {

    switch (formulasService.riskRatingScale(riskphy_lof, riskphy_cons)) {
        case 1:
            ret['Total_investment_griskphy1'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;


            break;
        case 2:
            ret['Total_investment_griskphy2'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;


            break;
        case 3:
            ret['Total_investment_griskphy3'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;


            break;
        case 4:
            ret['Total_investment_griskphy4'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;

            break;
        case 5:
            ret['Total_investment_griskphy5'] += investment * 1.0;
            ret['Total_investment_phy'] += investment * 1.0;

            break;

        default:
            break;
    }
    return ret;
}
exports.investmentGeotNatural = function (ret, risknathaz_lof, risknathaz_cons, investment) {

    switch (formulasService.riskRatingScale(risknathaz_lof, risknathaz_cons)) {
        case 1:
            ret['Total_investment_grisknat1'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;


            break;
        case 2:
            ret['Total_investment_grisknat2'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;


            break;
        case 3:
            ret['Total_investment_grisknat3'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;


            break;
        case 4:
            ret['Total_investment_grisknat4'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;

            break;
        case 5:
            ret['Total_investment_grisknat5'] += investment * 1.0;
            ret['Total_investment'] += investment * 1.0;

            break;

        default:
            break;
    }
    return ret;
}
exports.investmentKmCriticality = function (ret, crit, coord1, coord2, index) {

    switch (formulasService.criticalityRatingScale(crit)) {
        case 1:
            if (index > 0) {
                ret['Total_km_crit1'] += services.calDIST(coord1, coord2);
            }
            break;
        case 2:
            if (index > 0) {
                ret['Total_km_crit2'] += services.calDIST(coord1, coord2);
            }
            break;
        case 3:
            if (index > 0) {
                ret['Total_km_crit3'] += services.calDIST(coord1, coord2);
            }
            break;
        case 4:
            if (index > 0) {
                ret['Total_km_crit4'] += services.calDIST(coord1, coord2);
            }
            break;
        case 5:
            if (index > 0) {
                ret['Total_km_crit5'] += services.calDIST(coord1, coord2);
            }
            break;

        default:
            break;
    }

    return ret;
}
exports.KmLikelihood = function (ret, code, length, type) {
    var codearr = code.split('__');
    var vlength = Number(length);
    if (type === 'NAT') {
        var risk_lof = codearr[2].replace('RNAT-', '');
        switch (formulasService.LikelihoodofFailureRatingScale(risk_lof)) {
            case 1:
                // debug(risk_lof);
                // debug(length);
                ret['Total_km_lofnat1'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;
            case 2:
                ret['Total_km_lofnat2'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;
            case 3:
                ret['Total_km_lofnat3'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;
            case 4:
                ret['Total_km_lofnat4'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;
            case 5:
                ret['Total_km_lofnat5'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;

            default:
                break;
        }
    } else {
        var risk_lof = codearr[2].replace('RPHY-', '');
        switch (formulasService.LikelihoodofFailureRatingScale(risk_lof)) {
            case 1:
                ret['Total_km_lofphy1'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;
            case 2:
                ret['Total_km_lofphy2'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;
            case 3:
                ret['Total_km_lofphy3'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;
            case 4:
                ret['Total_km_lofphy4'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;
            case 5:
                ret['Total_km_lofphy5'] += !isNaN(Number(vlength)) ? vlength : 0;
                break;

            default:
                break;
        }
    }

    return ret;
}
exports.nLikelihood = function (ret, cond, asset, type) {

    switch (type) {
        case 'phy':
            switch (formulasService.LikelihoodofFailureRatingScale(cond)) {
                case 1:
                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_lof1']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_lof1']++;

                            break;
                        case 'geot':
                            ret['Total_geot_lof1']++;

                            break;

                        default:
                            break;
                    }
                    break;
                case 2:
                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_lof2']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_lof2']++;

                            break;
                        case 'geot':
                            ret['Total_geot_lof2']++;

                            break;

                        default:
                            break;
                    }
                    break;
                case 3:
                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_lof3']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_lof3']++;

                            break;
                        case 'geot':
                            ret['Total_geot_lof3']++;

                            break;

                        default:
                            break;
                    }
                    break;
                case 4:
                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_lof4']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_lof4']++;

                            break;
                        case 'geot':
                            ret['Total_geot_lof4']++;

                            break;

                        default:
                            break;
                    }
                    break;
                case 5:
                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_lof5']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_lof5']++;

                            break;
                        case 'geot':
                            ret['Total_geot_lof5']++;

                            break;

                        default:
                            break;
                    }
                    break;

                default:
                    break;
            }

            break;

        default:
            break;
    }

    return ret;
}
exports.nRoadsDistrict = function (arrInv, district) {

    switch (district) {
        case "Saint George":
            arrInv['Total_elements_Saint_George']++;
            break;
        case "Saint Paul":
            arrInv['Total_elements_Saint_Paul']++;
            break;
        case "Saint Joseph":
            arrInv['Total_elements_Saint_Joseph']++;
            break;
        case "Saint Peter":
            arrInv['Total_elements_Saint_Peter']++;
            break;
        case "Saint John":
            arrInv['Total_elements_Saint_John']++;
            break;
        case "Saint Andrew":
            arrInv['Total_elements_Saint_Andrew']++;
            break;
        case "Saint David":
            arrInv['Total_elements_Saint_David']++;
            break;
        case "Saint Patrick":
            arrInv['Total_elements_Saint_Patrick']++;
            break;
        case "Saint Mark":
            arrInv['Total_elements_Saint_Mark']++;
            break;
        case "Saint Luke":
            arrInv['Total_elements_Saint_Luke']++;
            break;

        default:
            break;
    }

    return arrInv;
}

exports.nRoadsCategory = function (arrInv, cat, risk) {

    if (risk === 'NAT') {

        switch (cat) {
            case 'Urban':
                arrInv['Total_roads_interventions_Urban']++;

                break;
            case 'Main Road':
                arrInv['Total_roads_interventions_MainRoad']++;


                break;
            case 'Feeder':
                arrInv['Total_roads_interventions_Feeder']++;


                break;
            case 'Secondary':
                arrInv['Total_roads_interventions_Secondary']++;


                break;


            default:
                break;
        }
    } else {
        switch (cat) {
            case 'Urban':
                arrInv['Total_roads_interventions_Urban_phy']++;

                break;
            case 'Main Road':
                arrInv['Total_roads_interventions_MainRoad_phy']++;


                break;
            case 'Feeder':
                arrInv['Total_roads_interventions_Feeder_phy']++;


                break;
            case 'Secondary':
                arrInv['Total_roads_interventions_Secondary_phy']++;


                break;


            default:
                break;
        }
    }

    return arrInv;
}

exports.nInterventions = function (ret, risk_lof, risk_cons, asset, typerisk) {


    switch (typerisk) {
        case 'nat':
            ret['Total_interventions']++;
            switch (formulasService.riskRatingScale(risk_lof, risk_cons)) {
                case 1:
                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions']++;
                            ret['Total_num_brisknat1']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_interventions']++;
                            ret['Total_num_crisknat1']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions']++;
                            ret['Total_num_grisknat1']++;

                            break;

                        default:
                            break;
                    }

                    break;
                case 2:


                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions']++;
                            ret['Total_num_brisknat2']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_interventions']++;
                            ret['Total_num_crisknat2']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions']++;
                            ret['Total_num_grisknat2']++;

                            break;

                        default:
                            break;
                    }

                    break;
                case 3:


                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions']++;
                            ret['Total_num_brisknat3']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_interventions']++;
                            ret['Total_num_crisknat3']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions']++;
                            ret['Total_num_grisknat3']++;

                            break;

                        default:
                            break;
                    }

                    break;
                case 4:


                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions']++;
                            ret['Total_num_brisknat4']++;

                            break;
                        case 'culverts':
                            ret['Total_num_crisknat4']++;
                            ret['Total_culverts_interventions']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions']++;
                            ret['Total_num_grisknat4']++;

                            break;

                        default:
                            break;
                    }

                    break;
                case 5:


                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions']++;
                            ret['Total_num_brisknat5']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_interventions']++;
                            ret['Total_num_crisknat5']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions']++;
                            ret['Total_num_grisknat5']++;

                            break;

                        default:
                            break;
                    }
                    break;

                default:
                    break;
            }
            break;

        case 'phy':
            ret['Total_interventions_phy']++;

            switch (formulasService.riskRatingScale(risk_lof, risk_cons)) {
                case 1:


                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions_phy']++;
                            ret['Total_num_briskphy1']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_interventions_phy']++;
                            ret['Total_num_criskphy1']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions_phy']++;
                            ret['Total_num_griskphy1']++;

                            break;

                        default:
                            break;
                    }

                    break;
                case 2:


                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions_phy']++;
                            ret['Total_num_briskphy2']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_interventions_phy']++;
                            ret['Total_num_criskphy2']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions_phy']++;
                            ret['Total_num_griskphy2']++;

                            break;

                        default:
                            break;
                    }

                    break;
                case 3:


                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions_phy']++;
                            ret['Total_num_briskphy3']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_interventions_phy']++;
                            ret['Total_num_criskphy3']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions_phy']++;
                            ret['Total_num_griskphy3']++;

                            break;

                        default:
                            break;
                    }

                    break;
                case 4:


                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions_phy']++;
                            ret['Total_num_briskphy4']++;

                            break;
                        case 'culverts':
                            ret['Total_num_criskphy4']++;
                            ret['Total_culverts_interventions_phy']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions_phy']++;
                            ret['Total_num_griskphy4']++;

                            break;

                        default:
                            break;
                    }

                    break;
                case 5:


                    switch (asset) {
                        case 'bridges':
                            ret['Total_bridges_interventions_phy']++;
                            ret['Total_num_briskphy5']++;

                            break;
                        case 'culverts':
                            ret['Total_culverts_interventions_phy']++;
                            ret['Total_num_criskphy5']++;

                            break;
                        case 'geot':
                            ret['Total_geot_interventions_phy']++;
                            ret['Total_num_griskphy5']++;

                            break;

                        default:
                            break;
                    }
                    break;

                default:
                    break;
            }
            break;
        default:
            break;
    }


    return ret;
}

exports.nInterventionsCriticality = function (ret, crit, asset) {
    switch (formulasService.criticalityRatingScale(crit)) {
        case 1:
            switch (asset) {
                case 'bridges':

                    ret['Total_bridges_crit1']++;

                    break;
                case 'culverts':

                    ret['Total_culverts_crit1']++;

                    break;
                case 'geot':

                    ret['Total_geot_crit1']++;

                    break;

                default:
                    break;
            }


            break;
        case 2:
            switch (asset) {
                case 'bridges':

                    ret['Total_bridges_crit2']++;

                    break;
                case 'culverts':

                    ret['Total_culverts_crit2']++;

                    break;
                case 'geot':

                    ret['Total_geot_crit2']++;

                    break;

                default:
                    break;
            }

            break;
        case 3:
            switch (asset) {
                case 'bridges':

                    ret['Total_bridges_crit3']++;

                    break;
                case 'culverts':

                    ret['Total_culverts_crit3']++;

                    break;
                case 'geot':

                    ret['Total_geot_crit3']++;

                    break;

                default:
                    break;
            }

            break;
        case 4:
            switch (asset) {
                case 'bridges':

                    ret['Total_bridges_crit4']++;

                    break;
                case 'culverts':

                    ret['Total_culverts_crit4']++;

                    break;
                case 'geot':

                    ret['Total_geot_crit4']++;

                    break;

                default:
                    break;
            }
            break;

        case 5:
            switch (asset) {
                case 'bridges':

                    ret['Total_bridges_crit5']++;

                    break;
                case 'culverts':

                    ret['Total_culverts_crit5']++;

                    break;
                case 'geot':

                    ret['Total_geot_crit5']++;

                    break;

                default:
                    break;
            }

            break;

        default:
            break;
    }
    return ret;
}

exports.pavInterv = function (ret, schnats, schphys) {

    ret['Total_interventions'] = schnats.length;
    ret['Total_interventions_phy'] = schphys.length;
    ret['Total_investment'] = 0;
    ret['Total_investment_phy'] = 0;
    ret['Total_roads_interventions'] = 0;
    ret['Total_investment_pav'] = 0;
    ret['Total_roads_interventions_phy'] = 0;
    ret['Total_investment_pav_phy'] = 0;

    ret['Total_investment'] = 0;
    ret['Total_investment_phy'] = 0;
    ret['Total_investment_risknat1'] = 0;
    ret['Total_investment_risknat2'] = 0;
    ret['Total_investment_risknat3'] = 0;
    ret['Total_investment_risknat4'] = 0;
    ret['Total_investment_risknat5'] = 0;
    ret['Total_investment_brisknat1'] = 0;
    ret['Total_investment_brisknat2'] = 0;
    ret['Total_investment_brisknat3'] = 0;
    ret['Total_investment_brisknat4'] = 0;
    ret['Total_investment_brisknat5'] = 0;
    ret['Total_investment_crisknat1'] = 0;
    ret['Total_investment_crisknat2'] = 0;
    ret['Total_investment_crisknat3'] = 0;
    ret['Total_investment_crisknat4'] = 0;
    ret['Total_investment_crisknat5'] = 0;
    ret['Total_investment_grisknat1'] = 0;
    ret['Total_investment_grisknat2'] = 0;
    ret['Total_investment_grisknat3'] = 0;
    ret['Total_investment_grisknat4'] = 0;
    ret['Total_investment_grisknat5'] = 0;
    ret['Total_investment_riskphy1'] = 0;
    ret['Total_investment_riskphy2'] = 0;
    ret['Total_investment_riskphy3'] = 0;
    ret['Total_investment_riskphy4'] = 0;
    ret['Total_investment_riskphy5'] = 0;
    ret['Total_investment_briskphy1'] = 0;
    ret['Total_investment_briskphy2'] = 0;
    ret['Total_investment_briskphy3'] = 0;
    ret['Total_investment_briskphy4'] = 0;
    ret['Total_investment_briskphy5'] = 0;
    ret['Total_investment_criskphy1'] = 0;
    ret['Total_investment_criskphy2'] = 0;
    ret['Total_investment_criskphy3'] = 0;
    ret['Total_investment_criskphy4'] = 0;
    ret['Total_investment_criskphy5'] = 0;
    ret['Total_investment_griskphy1'] = 0;
    ret['Total_investment_griskphy2'] = 0;
    ret['Total_investment_griskphy3'] = 0;
    ret['Total_investment_griskphy4'] = 0;
    ret['Total_investment_griskphy5'] = 0;
    ret['Total_km_risknat1'] = 0;
    ret['Total_km_risknat2'] = 0;
    ret['Total_km_risknat3'] = 0;
    ret['Total_km_risknat4'] = 0;
    ret['Total_km_risknat5'] = 0;
    ret['Total_km_riskphy1'] = 0;
    ret['Total_km_riskphy2'] = 0;
    ret['Total_km_riskphy3'] = 0;
    ret['Total_km_riskphy4'] = 0;
    ret['Total_km_riskphy5'] = 0;
    ret['Total_num_brisknat1'] = 0;
    ret['Total_num_brisknat2'] = 0;
    ret['Total_num_brisknat3'] = 0;
    ret['Total_num_brisknat4'] = 0;
    ret['Total_num_brisknat5'] = 0;
    ret['Total_num_crisknat1'] = 0;
    ret['Total_num_crisknat2'] = 0;
    ret['Total_num_crisknat3'] = 0;
    ret['Total_num_crisknat4'] = 0;
    ret['Total_num_crisknat5'] = 0;
    ret['Total_num_grisknat1'] = 0;
    ret['Total_num_grisknat2'] = 0;
    ret['Total_num_grisknat3'] = 0;
    ret['Total_num_grisknat4'] = 0;
    ret['Total_num_grisknat5'] = 0;
    ret['Total_num_briskphy1'] = 0;
    ret['Total_num_briskphy2'] = 0;
    ret['Total_num_briskphy3'] = 0;
    ret['Total_num_briskphy4'] = 0;
    ret['Total_num_briskphy5'] = 0;
    ret['Total_num_criskphy1'] = 0;
    ret['Total_num_criskphy2'] = 0;
    ret['Total_num_criskphy3'] = 0;
    ret['Total_num_criskphy4'] = 0;
    ret['Total_num_criskphy5'] = 0;
    ret['Total_num_griskphy1'] = 0;
    ret['Total_num_griskphy2'] = 0;
    ret['Total_num_griskphy3'] = 0;
    ret['Total_num_griskphy4'] = 0;
    ret['Total_num_griskphy5'] = 0;
    ret['Total_bridges_crit1'] = 0;
    ret['Total_bridges_crit2'] = 0;
    ret['Total_bridges_crit3'] = 0;
    ret['Total_bridges_crit4'] = 0;
    ret['Total_bridges_crit5'] = 0;
    ret['Total_culverts_crit1'] = 0;
    ret['Total_culverts_crit2'] = 0;
    ret['Total_culverts_crit3'] = 0;
    ret['Total_culverts_crit4'] = 0;
    ret['Total_culverts_crit5'] = 0;
    ret['Total_geot_crit1'] = 0;
    ret['Total_geot_crit2'] = 0;
    ret['Total_geot_crit3'] = 0;
    ret['Total_geot_crit4'] = 0;
    ret['Total_geot_crit5'] = 0;
    ret['Total_km_crit1'] = 0;
    ret['Total_km_crit2'] = 0;
    ret['Total_km_crit3'] = 0;
    ret['Total_km_crit4'] = 0;
    ret['Total_km_crit5'] = 0;

    ret['Total_roads_interventions'] = 0;
    ret['Total_bridges_interventions'] = 0;
    ret['Total_culverts_interventions'] = 0;
    ret['Total_geot_interventions'] = 0;
    ret['Total_investment_Urban'] = 0;
    ret['Total_investment_MainRoad'] = 0;
    ret['Total_investment_Feeder'] = 0;
    ret['Total_investment_Secondary'] = 0;
    ret['Total_roads_interventions_Urban'] = 0;
    ret['Total_roads_interventions_MainRoad'] = 0;
    ret['Total_roads_interventions_Feeder'] = 0;
    ret['Total_roads_interventions_Secondary'] = 0;
    ret['Total_investment_Saint_George'] = 0;
    ret['Total_investment_Saint_Paul'] = 0;
    ret['Total_investment_Saint_Joseph'] = 0;
    ret['Total_investment_Saint_Peter'] = 0;
    ret['Total_investment_Saint_John'] = 0;
    ret['Total_investment_Saint_Andrew'] = 0;
    ret['Total_investment_Saint_David'] = 0;
    ret['Total_investment_Saint_Patrick'] = 0;
    ret['Total_investment_Saint_Mark'] = 0;
    ret['Total_investment_Saint_Luke'] = 0;
    ret['Total_elements_Saint_George'] = 0;
    ret['Total_elements_Saint_Paul'] = 0;
    ret['Total_elements_Saint_Joseph'] = 0;
    ret['Total_elements_Saint_Peter'] = 0;
    ret['Total_elements_Saint_John'] = 0;
    ret['Total_elements_Saint_Andrew'] = 0;
    ret['Total_elements_Saint_David'] = 0;
    ret['Total_elements_Saint_Patrick'] = 0;
    ret['Total_elements_Saint_Mark'] = 0;
    ret['Total_elements_Saint_Luke'] = 0;

    ret['Total_bridges_interventions_phy'] = 0;
    ret['Total_culverts_interventions_phy'] = 0;
    ret['Total_geot_interventions_phy'] = 0;

    ret['Total_km_lof1'] = 0;
    ret['Total_km_lof2'] = 0;
    ret['Total_km_lof3'] = 0;
    ret['Total_km_lof4'] = 0;
    ret['Total_km_lof5'] = 0;
    ret['Total_bridges_lof1'] = 0;
    ret['Total_bridges_lof2'] = 0;
    ret['Total_bridges_lof3'] = 0;
    ret['Total_bridges_lof4'] = 0;
    ret['Total_bridges_lof5'] = 0;
    ret['Total_culverts_lof1'] = 0;
    ret['Total_culverts_lof2'] = 0;
    ret['Total_culverts_lof3'] = 0;
    ret['Total_culverts_lof4'] = 0;
    ret['Total_culverts_lof5'] = 0;
    ret['Total_geot_lof1'] = 0;
    ret['Total_geot_lof2'] = 0;
    ret['Total_geot_lof3'] = 0;
    ret['Total_geot_lof4'] = 0;
    ret['Total_geot_lof5'] = 0;

    ret['Total_investment_bridges'] = 0;
    ret['Total_investment_bridges_phy'] = 0;
    ret['Total_investment_culverts'] = 0;
    ret['Total_investment_culverts_phy'] = 0;
    ret['Total_geot_interventions'] = 0;
    ret['Total_investment_geot'] = 0;
    ret['Total_geot_interventions_phy'] = 0;
    ret['Total_investment_geot_phy'] = 0;
    ret['Total_roads_interventions_Urban_phy'] = 0;
    ret['Total_roads_interventions_MainRoad_phy'] = 0;
    ret['Total_roads_interventions_Feeder_phy'] = 0;
    ret['Total_roads_interventions_Secondary_phy'] = 0;
    ret['Total_investment_Urban_phy'] = 0;
    ret['Total_investment_MainRoad_phy'] = 0;
    ret['Total_investment_Feeder_phy'] = 0;
    ret['Total_investment_Secondary_phy'] = 0;
    ret['Total_km_lofnat1'] = 0;
    ret['Total_km_lofnat2'] = 0;
    ret['Total_km_lofnat3'] = 0;
    ret['Total_km_lofnat4'] = 0;
    ret['Total_km_lofnat5'] = 0;
    ret['Total_km_lofphy1'] = 0;
    ret['Total_km_lofphy2'] = 0;
    ret['Total_km_lofphy3'] = 0;
    ret['Total_km_lofphy4'] = 0;
    ret['Total_km_lofphy5'] = 0;


    for (var snat of schnats) {
        // debug(Number(snat.properties.cost));
        ret['Total_investment'] += (isNaN(snat.properties.cost) ? 0 : Number(snat.properties.cost));
        ret = this.investmentRisk(ret, snat.properties.code, (isNaN(snat.properties.cost) ? 0 : Number(snat.properties.cost)), 'NAT', snat.type);
        ret = this.nAssetsRisk(ret, snat.properties.code, snat.properties.length, 'NAT', snat.type);
        ret = this.KmLikelihood(ret, snat.properties.code, snat.properties.length, 'NAT');
        if (snat.type === 'PAVEMENTS') {
            ret['Total_roads_interventions']++;
            ret['Total_investment_pav'] += (isNaN(snat.properties.cost) ? 0 : Number(snat.properties.cost));


        } else if (snat.type === 'BRIDGES') {
            ret['Total_bridges_interventions']++;
            ret['Total_investment_bridges'] += (isNaN(snat.properties.cost) ? 0 : Number(snat.properties.cost));

        } else if (snat.type === 'CULVERTS') {
            ret['Total_culverts_interventions']++;
            ret['Total_investment_culverts'] += (isNaN(snat.properties.cost) ? 0 : Number(snat.properties.cost));

        } else if (snat.type === 'GEOT') {
            ret['Total_geot_interventions']++;
            ret['Total_investment_geot'] += (isNaN(snat.properties.cost) ? 0 : Number(snat.properties.cost));

        }
        ret = this.nRoadsCategory(ret, snat.properties.rcategory, 'NAT');
        ret = this.investmentCategory(ret, snat.properties.rcategory, (isNaN(snat.properties.cost) ? 0 : Number(snat.properties.cost)), 'NAT');
        //ret = this.investmentDistrict(ret, snat.properties.code, (isNaN(snat.properties.cost) ? 0 : Number(snat.properties.cost)));
    }
    for (var sphy of schphys) {

        ret['Total_investment_phy'] += (isNaN(sphy.properties.cost) ? 0 : Number(sphy.properties.cost));
        ret = this.investmentRisk(ret, sphy.properties.code, (isNaN(sphy.properties.cost) ? 0 : Number(sphy.properties.cost)), 'PHY', sphy.type);
        ret = this.nAssetsRisk(ret, sphy.properties.code, sphy.properties.length, 'PHY', sphy.type);
        ret = this.KmLikelihood(ret, sphy.properties.code, sphy.properties.length, 'PHY');
        if (sphy.type === 'PAVEMENTS') {
            ret['Total_roads_interventions_phy']++;
            ret['Total_investment_pav_phy'] += (isNaN(sphy.properties.cost) ? 0 : Number(sphy.properties.cost));

        } else if (sphy.type === 'BRIDGES') {
            ret['Total_bridges_interventions_phy']++;
            ret['Total_investment_bridges_phy'] += (isNaN(sphy.properties.cost) ? 0 : Number(sphy.properties.cost));

        } else if (sphy.type === 'CULVERTS') {
            ret['Total_culverts_interventions_phy']++;
            ret['Total_investment_culverts_phy'] += (isNaN(sphy.properties.cost) ? 0 : Number(sphy.properties.cost));

        } else if (sphy.type === 'GEOT') {
            ret['Total_geot_interventions_phy']++;
            ret['Total_investment_geot_phy'] += (isNaN(sphy.properties.cost) ? 0 : Number(sphy.properties.cost));

        }
        ret = this.nRoadsCategory(ret, sphy.properties.rcategory, 'PHY');
        ret = this.investmentCategory(ret, sphy.properties.rcategory, (isNaN(sphy.properties.cost) ? 0 : Number(sphy.properties.cost)), 'PHY');

    }
    return ret;

}