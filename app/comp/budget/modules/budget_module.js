var path = require('path');
var formulasService = require(path.join(__dirname, '../../../services/formulas'));
var services = require(path.join(__dirname, '../../../services/services'));

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
exports.investmentCategory = function (arrInv, cat, investment) {

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

    return arrInv;
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
            debug('##### Value not find: ' + risknathaz_lof + ' ' + risknathaz_cons);
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
            debug('##### Value not find: ' + risknathaz_lof + ' ' + risknathaz_cons);
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
exports.investmentKmNatural = function (ret, crit, coord1, coord2, index) {

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

exports.nRoadsCategory = function (arrInv, cat) {

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

    return arrInv;
}

exports.nInterventions = function (ret, risknathaz_lof, risknathaz_cons, asset) {

    switch (formulasService.riskRatingScale(risknathaz_lof, risknathaz_cons)) {
        case 1:
            ret['Total_bridges_interventions']++;
            ret['Total_interventions']++;
            ret['Total_culverts_interventions']++;
            ret['Total_geot_interventions']++;

            switch (asset) {
                case 'bridges':
                    ret['Total_num_brisknat1']++;

                    break;
                case 'culverts':
                    ret['Total_num_crisknat1']++;

                    break;
                case 'geot':
                    ret['Total_num_grisknat1']++;

                    break;

                default:
                    break;
            }

            break;
        case 2:
            ret['Total_bridges_interventions']++;
            ret['Total_interventions']++;
            ret['Total_culverts_interventions']++;
            ret['Total_geot_interventions']++;

            switch (asset) {
                case 'bridges':
                    ret['Total_num_brisknat2']++;

                    break;
                case 'culverts':
                    ret['Total_num_crisknat2']++;

                    break;
                case 'geot':
                    ret['Total_num_grisknat2']++;

                    break;

                default:
                    break;
            }

            break;
        case 3:
            ret['Total_bridges_interventions']++;
            ret['Total_interventions']++;
            ret['Total_culverts_interventions']++;
            ret['Total_geot_interventions']++;

            switch (asset) {
                case 'bridges':
                    ret['Total_num_brisknat3']++;

                    break;
                case 'culverts':
                    ret['Total_num_crisknat3']++;

                    break;
                case 'geot':
                    ret['Total_num_grisknat3']++;

                    break;

                default:
                    break;
            }

            break;
        case 4:
            ret['Total_bridges_interventions']++;
            ret['Total_interventions']++;
            ret['Total_culverts_interventions']++;
            ret['Total_geot_interventions']++;

            switch (asset) {
                case 'bridges':
                    ret['Total_num_brisknat4']++;

                    break;
                case 'culverts':
                    ret['Total_num_crisknat4']++;

                    break;
                case 'geot':
                    ret['Total_num_grisknat4']++;

                    break;

                default:
                    break;
            }

            break;
        case 5:
            ret['Total_bridges_interventions']++;
            ret['Total_interventions']++;
            ret['Total_culverts_interventions']++;
            ret['Total_geot_interventions']++;

            switch (asset) {
                case 'bridges':
                    ret['Total_num_brisknat5']++;

                    break;
                case 'culverts':
                    ret['Total_num_crisknat5']++;

                    break;
                case 'geot':
                    ret['Total_num_grisknat5']++;

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