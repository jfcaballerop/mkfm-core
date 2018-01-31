exports.hello = function () {
    return 'hello!';
}
exports.goodbye = function () {
    return 'goodbye!';
}

exports.investmentDistrict = function (arrInv, district, investment) {

    switch (district) {
        case "Saint George":
            arrInv['Total_investment_Saint_George'] += investment;
            break;
        case "Saint Paul":
            arrInv['Total_investment_Saint_Paul'] += investment;
            break;
        case "Saint Joseph":
            arrInv['Total_investment_Saint_Joseph'] += investment;
            break;
        case "Saint Peter":
            arrInv['Total_investment_Saint_Peter'] += investment;
            break;
        case "Saint John":
            arrInv['Total_investment_Saint_John'] += investment;
            break;
        case "Saint Andrew":
            arrInv['Total_investment_Saint_Andrew'] += investment;
            break;
        case "Saint David":
            arrInv['Total_investment_Saint_David'] += investment;
            break;
        case "Saint Patrick":
            arrInv['Total_investment_Saint_Patrick'] += investment;
            break;
        case "Saint Mark":
            arrInv['Total_investment_Saint_Mark'] += investment;
            break;
        case "Saint Luke":
            arrInv['Total_investment_Saint_Luke'] += investment;
            break;

        default:
            break;
    }

    return arrInv;
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