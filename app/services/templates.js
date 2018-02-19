var debug = require('debug')('debug');
var path = require('path');
var config = require(path.join(__dirname, '../../config/config'));
var services = require(path.join(__dirname, './services'));

exports.templateGeneration = function (tokenString, temp, req, ifdt) {
    var tempParsed = JSON.stringify(temp);

    var find = "##\\w{3,30}##";
    var regex = new RegExp(find, "g");
    var parsedString = JSON.stringify(tempParsed).match(regex);

    var variables = [];
    var variablesJson ={};
    for (oneMatch in parsedString) {
        variables.push(parsedString[oneMatch].replace(/#/g, ''));
        debug(parsedString[oneMatch].replace(/#/g, ''));

        switch (parsedString[oneMatch]) {
            case 'string':
                variablesJson.type = 'string';
                variablesJson.value = 'properties.' + variables[v];
                break;

            case 'db':
                variablesJson.name = oneMatch;

                variablesJson.type = 'string';
                
                if (textToRender.split(".")[1] !== undefined &&
                    textToRender.split(".")[0] !== undefined) {
                    if (Number(textToRender).toString() === textToRender) {
                        var afterDot = (textToRender.split(".")[1]).substring(0, 3);
                        var beforeDot = (textToRender.split(".")[0]);
                        textToRender = beforeDot + '.' + afterDot;
                        variablesJson.type = 'number';
                    }
                }
                
                variablesJson.style = 'string';
                variablesJson.value = 'properties.' + variables[v];

                break;

            case 'img':

                break;

            case 'fun':

                break;

            case 'num':

                break;

            default:
                break;
        }



    }
    



    return variablesJson;

};