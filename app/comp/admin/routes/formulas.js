//DEBUG
var debug = require('debug')('debug');
var ObjectId = require('mongoose').Types.ObjectId;

var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var moment = require('moment');
var mongoose = require('mongoose');
var config = require(path.join(__dirname, '../../../../config/config'));
var bodyParser = require('body-parser');
var extend = require('util')._extend;
var multer = require('multer');
var formulasService = require(path.join(__dirname, '../../../services/formulas'));
var serviceService = require(path.join(__dirname, '../../../services/services'));

var fileuploadModels = require(path.join(__dirname, '../../gis/models/fileupload'));
var Fileupload = mongoose.model('Fileupload');
var filetypeModels = require(path.join(__dirname, '../../gis/models/filetype'));
var Filetype = mongoose.model('Filetype');
var infodatatrackModels = require(path.join(__dirname, '../../gis/models/infodatatrack'));
var Infodatatrack = mongoose.model('Infodatatrack');
var formulaModels = require(path.join(__dirname, '../models/formula'));
var Formula = mongoose.model('Formula');
var conditionFormulaModels = require(path.join(__dirname, '../models/formcondition'));
var conditionFormula = mongoose.model('Formcondition');
var schedulenatModels = require(path.join(__dirname, '../../schedule/models/schedulenat'));
var Schedulenat = mongoose.model('Schedulenat');
var schedulephyModels = require(path.join(__dirname, '../../schedule/models/schedulephy'));
var Schedulephy = mongoose.model('Schedulephy');
var mathjs = require('mathjs');

var diccKoboToDominica = {
    "si": "Yes",
    "no": "No",
    "NA": "NA",
    "Unknown": "Unknown",
    "Girder": "Girder",
    "Slab": "Slab",
    "Truss": "Truss",
    "Arch": "Arch",
    "Composite": "Composite",
    "Cantilever": "Cantilever",
    "Masonry_arch": "Masonry arch",
    "Cable_stayed": "Cable stayed",
    "Suspension": "Suspension",
    "Submersible": "Submersible",
    "Truss_arch": "Truss arch",
    "Bailey": "Bailey",
    "Other": "Other",
    "Unknown": "Unknown",
    "Straight": "Straight",
    "Skewed": "Skewed",
    "Curved": "Curved",
    "Other": "Other",
    "NA": "NA",
    "Bridge": "Bridge",
    "ODT": "Culvert",
    "ford": "Ford",
    "Concrete": "Concrete",
    "Steel": "Steel",
    "Composite": "Composite",
    "Timber": "Timber",
    "Masonry": "Masonry",
    "Pre_concrete": "Pre-stressed concrete",
    "Other": "Other",
    "Unknown": "Unknown",
    "Concrete": "Concrete",
    "Steel": "Steel",
    "Masonry": "Masonry",
    "mplate": "Metal plate",
    "Other": "Other",
    "Unknown": "Unknown",
    "Concrete": "Concrete",
    "Steel": "Steel",
    "Timber": "Timber",
    "Pre_concrete": "Pre-stressed concrete",
    "Other": "Other",
    "Unknown": "Unknown",
    "Concrete": "Concrete",
    "Masonry": "Masonry",
    "Other": "Other",
    "Unknown": "Unknown",
    "Concrete": "Concrete",
    "Steel": "Steel",
    "Masonry": "Masonry",
    "Other": "Other",
    "Unknown": "Unknown",
    "Deep": "Deep",
    "Shallow": "Shallow",
    "NA": "NA",
    "Unknown": "Unknown",
    "Box": "Box",
    "Pipe": "Pipe",
    "Ford": "Ford",
    "NA": "NA",
    "Unknown": "Unknown",
    "urbano": "Urban",
    "rural": "Rural",
    "industrial": "Industrial",
    "maritimo": "Maritime",
    "otros": "Other",
    "Unknown": "Unknown",
    "Arroyo": "River/Water stream",
    "Barranco": "Rugged Topography",
    "Calle": "Road",
    "Camino": "Railway",
    "Canal": "Pedestrian way",
    "Carretera": "Other",
    "Cauce": "Unknown",
    "fabrica_de_ladrillo": "Girder",
    "fabrica_de_mamposteria": "Slab",
    "fabrica_de_silleria": "Truss",
    "hormigon_en_masa": "Arch",
    "hormigon_a": "Composite",
    "hormigon_con_a": "Cantilever",
    "hormigon_post": "Masonry arch",
    "hormigon_pret": "Cable stayed",
    "hormigon_c_g_c": "Suspension",
    "metalico_soldado": "Submersible",
    "metalico_atornillado": "Truss arch",
    "metalico_roblonado": "Bailey",
    "otro": "Other",
    "Unknown": "Unknown",
    "High": "High",
    "Moderate": "Moderate",
    "Low": "Low",
    "NA": "NA",
    "Unknown": "Unknown",
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
    "E": "E",
    "NA": "N/A",
    "Unknown": "Unknown",
    "danotipo_cimentacion": "Damages on foundations",
    "danotipo_estructura": "Damages on structural elements",
    "danotipo_funcionales": "Damages on non structural elements",
    "no_danos": "No damages",
    "dcimentacion1": "Damages from foundation-ground decay",
    "dcimentacion2": "Damages from foundation decay",
    "C1G": "General scouring",
    "C1LP": "Scouring on piers",
    "C1lE": "Scouring on abutments",
    "otros": "Others",
    "d_losas": "Damage on slab",
    "d_pila": "Damage on piers",
    "d_vigas": "Damage on beams and braces",
    "d_apoyos": "Damage on bearings",
    "d_estrib": "Damage on abutments",
    "d_aletas": "Damage on side walls",
    "d_bov": "Damage on vaults and arches",
    "d_timp": "Damage on spandrel wall",
    "d_zonas": "Damage on special areas",
    "bovd_resistentes": "Mechanical defects",
    "bovd_durables": "Durable Defects",
    "importcrit": "Very high",
    "importhight": "High",
    "importmedium": "Medium",
    "importlow": "Low",
    "importunknwn": "Unknown",
    "importcrit": "Very high",
    "importhight": "High",
    "importmedium": "Medium",
    "importlow": "Low",
    "importunknwn": "Unknown",
    "bovh_resistentes": "Mechanical defects",
    "bovh_durables": "Durable Defects",
    "pild_resistentes": "Mechanical defects",
    "pild_durables": "Durable Defects",
    "timd_resistentes": "Mechanical defects",
    "timd_durables": "Durable Defects",
    "estd_resistentes": "Mechanical defects",
    "estd_durables": "Durable Defects",
    "aled_resistentes": "Mechanical defects",
    "aled_durables": "Durable Defects",
    "losa_resistentes": "Mechanical defects",
    "losa_durables": "Durable Defects",
    "vigas_resistentes": "Mechanical defects",
    "vigas_durables": "Durable Defects",
    "AP2INX": "No bearings",
    "AP2DES": "Bearings displaced ",
    "Bdecay": "Bearings decay",
    "otros": "Other damages",
    "ES2CTE": "Cracking by stress concentration",
    "otros": "Other damages",
    "silting": "Silting",
    "breaking": "Breaking",
    "smashing": "Smashing",
    "displazaments": "Displazaments",
    "open_joints": "Open joints",
    "scouring": "Scouring",
    "loss": "Loss of drainage mouth",
    "collapse": "Collapse",
    "No_damages": "No damages",
    "Other": "Other",
    "Unknown": "Unknown",
    "single": "Single",
    "multiple": "Multiple"
};

var diccDominicaToKobo = {
    "FoundationDecay": "FoundationDecay",
    "Yes": "si",
    "No": "no",
    "Na": "NA",
    "Unknown": "Unknown",
    "Girder": "fabrica_de_ladrillo",
    "Slab": "fabrica_de_mamposteria",
    "Truss": "fabrica_de_silleria",
    "Arch": "hormigon_en_masa",
    "Composite": "hormigon_a",
    "Cantilever": "hormigon_con_a",
    "MasonryArch": "hormigon_post",
    "CableStayed": "hormigon_pret",
    "Suspension": "hormigon_c_g_c",
    "Submersible": "metalico_soldado",
    "TrussArch": "metalico_atornillado",
    "Bailey": "metalico_roblonado",
    "Other": "Other",
    "Straight": "Straight",
    "Skewed": "Skewed",
    "Curved": "Curved",
    "Bridge": "Bridge",
    "Culvert": "ODT",
    "Ford": "Ford",
    "Concrete": "Concrete",
    "Steel": "Steel",
    "Timber": "Timber",
    "Masonry": "Masonry",
    "PreStressedConcrete": "Pre_concrete",
    "MetalPlate": "mplate",
    "Pre_concrete": "Pre-stressed concrete",
    "Deep": "Deep",
    "Shallow": "Shallow",
    "Box": "Box",
    "Pipe": "Pipe",
    "Urban": "urbano",
    "Rural": "rural",
    "Industrial": "industrial",
    "Maritime": "maritimo",
    "River/waterStream": "Arroyo",
    "RuggedTopography": "Barranco",
    "Road": "Calle",
    "Railway": "Camino",
    "PedestrianWay": "Canal",
    "High": "importhight",
    "Moderate": "Moderate",
    "Low": "importlow",
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
    "E": "E",
    "DamagesOnFoundations": "danotipo_cimentacion",
    "DamagesOnStructuralElements": "danotipo_estructura",
    "DamagesOnNonStructuralElements": "danotipo_funcionales",
    "NoDamages": "No_damages",
    "DamagesFromFoundationGroundDecay": "dcimentacion1",
    "DamagesFromFoundationDecay": "dcimentacion2",
    "GeneralScouring": "C1G",
    "ScouringOnPiers": "C1LP",
    "ScouringOnAbutments": "C1lE",
    "Others": "otros",
    "DamageOnSlab": "d_losas",
    "DamageOnPiers": "d_pila",
    "DamageOnBeamsAndBraces": "d_vigas",
    "DamageOnBearings": "d_apoyos",
    "DamageOnAbutments": "d_estrib",
    "DamageOnSideWalls": "d_aletas",
    "DamageOnVaultsAndArches": "d_bov",
    "DamageOnSpandrelWall": "d_timp",
    "DamageOnSpecialAreas": "d_zonas",
    "MechanicalDefects": "vigas_resistentes",
    "DurabilityDefects": "vigas_durables",
    "VeryHigh": "importcrit",
    "Medium": "importmedium",
    "NoBearings": "AP2INX",
    "BearingsDisplaced": "AP2DES",
    "BearingsDecay": "Bdecay",
    "OtherDamages": "otros",
    "CrackingByStressConcentration": "ES2CTE",
    "Silting": "silting",
    "Breaking": "breaking",
    "Smashing": "smashing",
    "Displazaments": "displazaments",
    "OpenJoints": "open_joints",
    "Scouring": "scouring",
    "LossOfDrainageMouth": "loss",
    "Collapse": "collapse",
    "Single": "single",
    "Multiple": "multiple"
};

function capitalizeFirstLetter(string) {
    if (string !== undefined) {
        var OutPut = ''
        if (string.indexOf(' ') >= -1) {
            var WordList = string.split(' ');
        }
        if (WordList !== undefined && WordList.length > 0) {
            WordList.forEach(function (element) {
                OutPut += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()).replace(' ', '');
            });
        }
        return OutPut;
    } else {
        return "";

    }
}

router.use(function timeLog(req, res, next) {
    ////// //debug('Fecha: ', moment().format("YYYYMMDD - hh:mm:ss"));
    next();
});
router.use(bodyParser.urlencoded({
    extended: true
}));
//router.use(fileUpload());
//router.use(uploading.single('foofield'));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

/*
 * Global VBLES
 */
var filetypesObject = {};

/*******************************************************
        WEB CALLS
**********************************************************/
/* GET Control panel */
router.get('/formulas', function (req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/formulas/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    // // Peticiones 


    var request = http.request(options, function (res) {
        ////// //debug('STATUS: ' + res.statusCode);
        ////// //debug('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            ////// //debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //// //debug('DATA ' + data.length + ' ' + data);
            var responseObject = JSON.parse(data);
            // //debug(JSON.stringify(responseObject));
            resp.render('admin_panel_formulas', {
                formula: responseObject,
                token: req.token,
                moment: moment,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME
            });

        });
    });

    request.end();
    // resp.render('admin_panel_formulas', { token: req.token, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });

});

/* get_formulas_tracks */
/**
 * Proceso AJAX que recibe la peticion de mostrar todos los tracks afectados por la formular seleccionada
 */
router.post('/get_formulas_tracks/', function (req, resp) {
    var postData = extend({}, req.body);
    //debug('## WEB get_formulas_tracks ' + JSON.stringify(postData));

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/get_formulas_tracks/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// //debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();
    // resp.status(200).jsonp({});

});
/* update_formulas_tracks_risk */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks_risk/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    //debug('## WEB update_formulas_tracks_risk: ' + req.params.formula + ' - ' + req.params.asset);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks_risk/' + req.params.formula + '/' + req.params.asset + '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// //debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
/* update_formulas_tracks_likelihood */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks_likelihood/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    //debug('## WEB update_formulas_tracks_likelihood: ' + req.params.formula + ' - ' + req.params.asset);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks_likelihood/' + req.params.formula + '/' + req.params.asset + '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// //debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
/* update_formulas_tracks_sensitivity */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks_sensitivity/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    //debug('## WEB update_formulas_tracks_sensitivity: ' + req.params.formula + ' - ' + req.params.asset);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks_sensitivity/' + req.params.formula + '/' + req.params.asset + '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// //debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
/* update_formulas_tracks_response */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks_response/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    //debug('## WEB update_formulas_tracks_response: ' + req.params.formula + ' - ' + req.params.asset);

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks_response/' + req.params.formula + '/' + req.params.asset + '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// //debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
/* update_formulas_tracks */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    //debug('## WEB update_formulas_tracks: ' + +' - ' + req.params.asset + '\n\n\n' + '----------------------------');

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks/' + req.params.formula + '/' + req.params.asset + '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// //debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
/* update_formulas_tracks_condition */
/**
 * Proceso AJAX que recibe la peticion de actualizar todos los tracks afectados por la formular señeccionada
 * @param formula
 * @param asset
 */
router.post('/update_formulas_tracks_condition/:formula/:asset', function (req, resp) {
    var postData = extend({}, req.body);
    //debug('## WEB update_formulas_tracks_condition: ' + '' + ' - ' + req.params.asset + '\n\n\n' + '----------------------------');

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_formulas_tracks_condition/' + req.params.formula + '/' + req.params.asset + '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// //debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);
            // resp.status(200).jsonp({ "result": "OK" });

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});
/* Update field*/
/**
 * Proceso AJAX que recibe la peticion de actualizar un campo de una formula en modo arbol con 3 niveles
 */
router.post('/update_field/:field/:value', function (req, resp) {
    var postData = extend({}, req.body);
    //debug('## WEB update_field: ' + req.params.field + '\n\n\n');

    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/admin/V1/update_field/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };



    var request = http.request(options, function (res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //// //debug('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            var responseObject = JSON.parse(data);
            resp.status(200).jsonp(responseObject);

        });
    });
    request.write(JSON.stringify(postData));
    request.end();

});




/*******************************************************
 API REST CALLS
 **********************************************************/



/* GET JSON formulas listing. */
router.get('/V1/formulas/', function (req, res, next) {
    conditionFormula.find({}).exec(function (err, formcs) {
        if (err) {
            res.send(500, err.message);
        }
        Formula.find({}).sort({
            "properties.HTML.id": -1
        }).exec(function (err, forms) {
            if (err) {
                res.send(500, err.message);
            }
            //debug(" ### GET Formulas ### \n" + JSON.stringify(formcs));

            res.status(200).jsonp(forms);
        });
    });

});
/* POST update_formulas_tracks_risk */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks_risk/:formula/:asset', async function (req, res, next) {
    //debug('API /V1/update_formulas_tracks_risk/');
    var postData = extend({}, req.body);
    var tracksUpdated = 0;
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };

    var sectionlength = 50; //val min por defecto

    //debug(postData);
    var form;
    var formula = Object.keys(postData)[0];
    //debug(formula);

    /**
     * Localizar Formula para aplicar
     * @sectionlenth: es para dividir en tramos los PAV afectados
     */


    await Formula.find({
        "name": formula
    }).exec(async function (err, f) {
        if (err) {
            res.send(500, err.message);
        }
        form = f[0];
        for (var fv of form.formulaSpec) {
            if (fv.WEIGHTS !== undefined) {
                sectionlength = fv.WEIGHTS.value;
            }
        }
    });
    //debug('sectionlength ' + sectionlength);
    var wherearr = [];

    //add codes asset
    wherearr.push('rcriticality');
    wherearr.push('bcriticality');
    wherearr.push('Ccriticality');
    wherearr.push('gcriticality');
    wherearr.push('gcriticality2');
    wherearr.push('rlofnatural');
    wherearr.push('rlofphysical');
    wherearr.push('blofnatural');
    wherearr.push('blofphysical');
    wherearr.push('Clofnatural');
    wherearr.push('Clofphysical');
    wherearr.push('glofnatural');
    wherearr.push('glofphysical');
    wherearr.push('glofnatural2');
    wherearr.push('glofphysical2');

    var selectjson = {
        "geometry.coordinates": 1,
        "inverted": 1,
        properties: []
    };
    for (var w of wherearr) {
        selectjson.properties[w] = 1;
    }
    //debug(selectjson);
    var ifdts;

    /**
     * @selectjson: Me traigo solo los campos necesarios
     */

    await Infodatatrack.find({}, selectjson).exec(async function (err, values) {
        if (err) {
            res.send(500, err.message);
        }
        // Arr de valores a updatear
        ifdts = values;
    });
    /**
     * Cada vez que se actualice el RIKS se regenera los Schedule
     */
    await Schedulenat.remove({}, function (err) {
        if (err) return handleError(err);
        // removed!
    });
    await Schedulephy.remove({}, function (err) {
        if (err) return handleError(err);
        // removed!
    });



    var fin = 0;
    var arrGroupTrackNat = [];
    var arrGroupTrackPhy = [];
    var arrPromises = [];

    /**
     * Calculo el riesgo de cada Track y cada punto
     */
    for (var ifdt of ifdts) {
        var valuerrisknaturalarr = [];
        var valuerriskphysicalarr = [];
        var valuebrisknaturalarr = [];
        var valuebriskphysicalarr = [];
        var valueCrisknaturalarr = [];
        var valueCriskphysicalarr = [];
        var valuegrisknaturalarr = [];
        var valuegriskphysicalarr = [];
        var valuegrisknaturalarr2 = [];
        var valuegriskphysicalarr2 = [];

        /**
         * Calculo del riesgo por punto
         */
        for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
            var rlofphy;
            var rlofnat;
            var rcrit;
            var blofphy;
            var blofnat;
            var bcrit;
            var Clofphy;
            var Clofnat;
            var Ccrit;
            var glofphy;
            var glofnat;
            var gcrit;
            var glofphy2;
            var glofnat2;
            var gcrit2;
            var existsbcode = false;
            var existsCcode = false;
            var existsgcode = false;
            var existsgcode2 = false;

            /**
             * PAVEMENTS
             */
            if (ifdt.properties.rlofphysical[i] !== undefined) {
                if (typeof ifdt.properties.rlofphysical[i] === "string") {
                    ifdt.properties.rlofphysical[i] === "" ? rlofphy = 0 : rlofphy = parseFloat(ifdt.properties.rlofphysical[i].replace(",", "."));
                } else if (typeof ifdt.properties.rlofphysical[i] === "number") {
                    rlofphy = ifdt.properties.rlofphysical[i];
                } else {
                    rlofphy = 0;
                }
            }
            if (ifdt.properties.rlofnatural[i] !== undefined) {
                if (typeof ifdt.properties.rlofnatural[i] === "string") {
                    ifdt.properties.rlofnatural[i] === "" ? rlofnat = 0 : rlofnat = parseFloat(ifdt.properties.rlofnatural[i].replace(",", "."));
                } else if (typeof ifdt.properties.rlofnatural[i] === "number") {
                    rlofnat = ifdt.properties.rlofnatural[i];
                } else {
                    rlofnat = 0;
                }
            }
            if (ifdt.properties.rcriticality[i] !== undefined) {
                if (typeof ifdt.properties.rcriticality[i] === "string") {
                    ifdt.properties.rcriticality[i] === "" ? rcrit = 0 : rcrit = parseFloat(ifdt.properties.rcriticality[i].replace(",", "."));
                } else if (typeof ifdt.properties.rcriticality[i] === "number") {
                    rcrit = ifdt.properties.rcriticality[i];
                } else {
                    rcrit = 0;
                }
            }


            /**
             *  Revisamos que exista el código del asset
             * */
            if (ifdt.properties.bcode !== undefined && ifdt.properties.bcode !== [] && ifdt.properties.bcode.length > 0 &&
                ifdt.properties.bcode[i] !== undefined && ifdt.properties.bcode[i] !== null && ifdt.properties.bcode[i] !== "") {
                existsbcode = true;
            }
            if (ifdt.properties.Ccode !== undefined && ifdt.properties.Ccode !== [] && ifdt.properties.Ccode.length > 0 &&
                ifdt.properties.Ccode[i] !== undefined && ifdt.properties.Ccode[i] !== null && ifdt.properties.Ccode[i] !== "") {
                existsCcode = true;
            }
            if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode !== [] && ifdt.properties.gcode.length > 0 &&
                ifdt.properties.gcode[i] !== undefined && ifdt.properties.gcode[i] !== null && ifdt.properties.gcode[i] !== "") {
                existsgcode = true;
            }
            if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2 !== [] && ifdt.properties.gcode2.length > 0 &&
                ifdt.properties.gcode2[i] !== undefined && ifdt.properties.gcode2[i] !== null && ifdt.properties.gcode2[i] !== "") {
                existsgcode2 = true;
            }

            /**
             * BRIDGES
             */
            if (existsbcode) {

                if (ifdt.properties.blofnatural[i] !== undefined) {
                    if (typeof ifdt.properties.blofnatural[i] === "string") {
                        ifdt.properties.blofnatural[i] === "" ? blofnat = 0 : blofnat = parseFloat(ifdt.properties.blofnatural[i].replace(",", "."));
                        // //debug('ifdt.properties.blofnatural[i] ' + ifdt.properties.blofnatural[i]);
                    } else if (typeof ifdt.properties.blofnatural[i] === "number") {
                        blofnat = ifdt.properties.blofnatural[i];
                    } else {
                        blofnat = 0;
                    }
                }


                if (ifdt.properties.blofphysical[i] !== undefined) {
                    if (typeof ifdt.properties.blofphysical[i] === "string") {
                        ifdt.properties.blofphysical[i] === "" ? blofphy = 0 : blofphy = parseFloat(ifdt.properties.blofphysical[i].replace(",", "."));
                    } else if (typeof ifdt.properties.blofphysical[i] === "number") {
                        blofphy = ifdt.properties.blofphysical[i];
                    } else {
                        blofphy = 0;
                    }
                }
                if (ifdt.properties.bcriticality[i] !== undefined) {
                    if (typeof ifdt.properties.bcriticality[i] === "string") {
                        ifdt.properties.bcriticality[i] === "" ? bcrit = 0 : bcrit = parseFloat(ifdt.properties.bcriticality[i].replace(",", "."));
                    } else if (typeof ifdt.properties.bcriticality[i] === "number") {
                        bcrit = ifdt.properties.bcriticality[i];
                    } else {
                        bcrit = 0;
                    }
                }
            }
            /**
             * CULVERTS
             */
            if (existsCcode) {

                if (ifdt.properties.Clofnatural[i] !== undefined) {
                    if (typeof ifdt.properties.Clofnatural[i] === "string") {
                        ifdt.properties.Clofnatural[i] === "" ? Clofnat = 0 : Clofnat = parseFloat(ifdt.properties.Clofnatural[i].replace(",", "."));
                        // //debug('ifdt.properties.Clofnatural[i] ' + ifdt.properties.Clofnatural[i]);
                    } else if (typeof ifdt.properties.Clofnatural[i] === "number") {
                        Clofnat = ifdt.properties.Clofnatural[i];
                    } else {
                        Clofnat = 0;
                    }
                }


                if (ifdt.properties.Clofphysical[i] !== undefined) {
                    if (typeof ifdt.properties.Clofphysical[i] === "string") {
                        ifdt.properties.Clofphysical[i] === "" ? Clofphy = 0 : Clofphy = parseFloat(ifdt.properties.Clofphysical[i].replace(",", "."));
                    } else if (typeof ifdt.properties.Clofphysical[i] === "number") {
                        Clofphy = ifdt.properties.Clofphysical[i];
                    } else {
                        Clofphy = 0;
                    }
                }
                if (ifdt.properties.Ccriticality[i] !== undefined) {
                    if (typeof ifdt.properties.Ccriticality[i] === "string") {
                        ifdt.properties.Ccriticality[i] === "" ? Ccrit = 0 : Ccrit = parseFloat(ifdt.properties.Ccriticality[i].replace(",", "."));
                    } else if (typeof ifdt.properties.Ccriticality[i] === "number") {
                        Ccrit = ifdt.properties.Ccriticality[i];
                    } else {
                        Ccrit = 0;
                    }
                }
            }
            /**
             * GEOT
             */
            if (existsgcode) {

                if (ifdt.properties.glofnatural[i] !== undefined) {
                    if (typeof ifdt.properties.glofnatural[i] === "string") {
                        ifdt.properties.glofnatural[i] === "" ? glofnat = 0 : glofnat = parseFloat(ifdt.properties.glofnatural[i].replace(",", "."));
                        // //debug('ifdt.properties.glofnatural[i] ' + ifdt.properties.glofnatural[i]);
                    } else if (typeof ifdt.properties.glofnatural[i] === "number") {
                        glofnat = ifdt.properties.glofnatural[i];
                    } else {
                        glofnat = 0;
                    }
                }

                if (ifdt.properties.glofphysical[i] !== undefined) {
                    if (typeof ifdt.properties.glofphysical[i] === "string") {
                        ifdt.properties.glofphysical[i] === "" ? glofphy = 0 : glofphy = parseFloat(ifdt.properties.glofphysical[i].replace(",", "."));
                    } else if (typeof ifdt.properties.glofphysical[i] === "number") {
                        glofphy = ifdt.properties.glofphysical[i];
                    } else {
                        glofphy = 0;
                    }
                }
                if (ifdt.properties.gcriticality[i] !== undefined) {
                    if (typeof ifdt.properties.gcriticality[i] === "string") {
                        ifdt.properties.gcriticality[i] === "" ? gcrit = 0 : gcrit = parseFloat(ifdt.properties.gcriticality[i].replace(",", "."));
                    } else if (typeof ifdt.properties.gcriticality[i] === "number") {
                        gcrit = ifdt.properties.gcriticality[i];
                    } else {
                        gcrit = 0;
                    }
                }
            }
            if (existsgcode2) {

                if (ifdt.properties.glofnatural2[i] !== undefined) {
                    if (typeof ifdt.properties.glofnatural2[i] === "string") {
                        ifdt.properties.glofnatural2[i] === "" ? glofnat2 = 0 : glofnat2 = parseFloat(ifdt.properties.glofnatural2[i].replace(",", "."));
                        // //debug('ifdt.properties.glofnatural2[i] ' + ifdt.properties.glofnatural2[i]);
                    } else if (typeof ifdt.properties.glofnatural2[i] === "number") {
                        glofnat2 = ifdt.properties.glofnatural2[i];
                    } else {
                        glofnat2 = 0;
                    }
                }

                if (ifdt.properties.glofphysical2[i] !== undefined) {
                    if (typeof ifdt.properties.glofphysical2[i] === "string") {
                        ifdt.properties.glofphysical2[i] === "" ? glofphy2 = 0 : glofphy2 = parseFloat(ifdt.properties.glofphysical2[i].replace(",", "."));
                    } else if (typeof ifdt.properties.glofphysical2[i] === "number") {
                        glofphy2 = ifdt.properties.glofphysical2[i];
                    } else {
                        glofphy2 = 0;
                    }
                }
                if (ifdt.properties.gcriticality2[i] !== undefined) {
                    if (typeof ifdt.properties.gcriticality2[i] === "string") {
                        ifdt.properties.gcriticality2[i] === "" ? gcrit2 = 0 : gcrit2 = parseFloat(ifdt.properties.gcriticality2[i].replace(",", "."));
                    } else if (typeof ifdt.properties.gcriticality2[i] === "number") {
                        gcrit2 = ifdt.properties.gcriticality2[i];
                    } else {
                        gcrit2 = 0;
                    }
                }
            }

            valuerriskphysicalarr[i] = serviceService.roundValuePerCent(rlofphy, 2) + '__' + formulasService.criticalityRatingLetterScale(rcrit);
            valuerrisknaturalarr[i] = serviceService.roundValuePerCent(rlofnat, 2) + '__' + formulasService.criticalityRatingLetterScale(rcrit);
            valuebriskphysicalarr[i] = serviceService.roundValuePerCent(blofphy, 2) + '__' + formulasService.criticalityRatingLetterScale(bcrit);
            valuebrisknaturalarr[i] = serviceService.roundValuePerCent(blofnat, 2) + '__' + formulasService.criticalityRatingLetterScale(bcrit);
            valueCriskphysicalarr[i] = serviceService.roundValuePerCent(Clofphy, 2) + '__' + formulasService.criticalityRatingLetterScale(Ccrit);
            valueCrisknaturalarr[i] = serviceService.roundValuePerCent(Clofnat, 2) + '__' + formulasService.criticalityRatingLetterScale(Ccrit);
            valuegriskphysicalarr[i] = serviceService.roundValuePerCent(glofphy, 2) + '__' + formulasService.criticalityRatingLetterScale(gcrit);
            valuegrisknaturalarr[i] = serviceService.roundValuePerCent(glofnat, 2) + '__' + formulasService.criticalityRatingLetterScale(gcrit);
            valuegriskphysicalarr2[i] = serviceService.roundValuePerCent(glofphy2, 2) + '__' + formulasService.criticalityRatingLetterScale(gcrit2);
            valuegrisknaturalarr2[i] = serviceService.roundValuePerCent(glofnat2, 2) + '__' + formulasService.criticalityRatingLetterScale(gcrit2);


        }



        // Update DB
        var conditions = {
            _id: ifdt._id
        };
        var query = {
            $set: {
                "properties.rriskphysical": valuerriskphysicalarr,
                "properties.rrisknatural": valuerrisknaturalarr,
                "properties.briskphysical": valuebriskphysicalarr,
                "properties.brisknatural": valuebrisknaturalarr,
                "properties.CRISKphysical": valueCriskphysicalarr,
                "properties.CRISKnatural": valueCrisknaturalarr,
                "properties.griskphysical": valuegriskphysicalarr,
                "properties.grisknatural": valuegrisknaturalarr,
                "properties.griskphysical2": valuegriskphysicalarr2,
                "properties.grisknatural2": valuegrisknaturalarr2
            }
        };

        /**
         * UPDATEDB con los riesgos
         * Se hace de manera que se resuelvan todas las promesas a la vez, para poder calcular
         * los tramos a aplicar en la obtencion de los SCHED
         */
        arrPromises.push(new Promise(function (resolve, reject) {



            Infodatatrack.findByIdAndUpdate(ifdt._id, query, function (err, iup) {
                if (err) {
                    //debug(err.message);
                    reject(err);
                }
                tracksUpdated++;

                var trackSectionsphy = [];
                var sectionsphy = [];
                var trackSectionsnat = [];
                var sectionsnat = [];
                var trackSectionscond = [];
                var trackSectionswidth = [];
                var sectionscond = [];
                var sectionswidth = [];
                var nsections = 1;
                var pkreg = [];
                var pavCost = [];
                var pavCategory = [];
                var trackpkreg = [];
                var trackPavCost = [];
                var trackPavCat = [];
                var bridgesTrackPhy = [];
                var bridgesTrackNat = [];
                var culvertsTrackPhy = [];
                var culvertsTrackNat = [];
                var geotsTrackPhy = [];
                var geotsTrackNat = [];
                /** 
                 * Guardo aquellos assets ya visitados para no volver a mostrarlos
                 * a tener en cuenta que los CODEs deberían ser únicos.
                 */
                var assetsVisited = [];

                var valini = iup.properties.pk[0]; //cojo el primer valo del PK

                /**
                 * Se comprueba si el PK es creciente o decreciente
                 * Despues se generan las secciones con el RISK normalizado dentro de los rangos 0-20, 20-40, etc...
                 * Dividimos los PAV por sections
                 * SOLO LOS PAVEMENTS ESTAN SECCIONADOS, EL RESTOD DE ASSETS LOS TRAMOS DE MANERA DISCRETA EN SU PUNTO INICIAL !!!
                 */
                if (iup.inverted) {
                    sectionlength *= -1;
                    var ns = 0;
                    var pkini = iup.properties.pk[0];

                    for (var i = 0; i < iup.geometry.coordinates.length; i++) {
                        /**
                         * GEOT
                         */
                        if (iup.properties.gcode !== undefined && iup.properties.gcode !== [] && iup.properties.gcode.length > 0 &&
                            iup.properties.gcode[i] !== undefined && iup.properties.gcode[i] !== null && iup.properties.gcode[i] !== "" &&
                            iup.properties.glength !== undefined && iup.properties.glength !== [] && iup.properties.glength.length > 0 &&
                            iup.properties.glength[i] !== undefined && iup.properties.glength[i] !== null && iup.properties.glength[i] !== "" &&
                            !assetsVisited.includes(iup.properties.gcode[i])) {
                            assetsVisited.push(iup.properties.gcode[i]);

                            var code = serviceService.createNameSched(iup.properties.gcode[i], iup.properties.pk[i], iup.properties.glength[i],
                                iup.properties.gcondition[i], iup.properties.griskphysical[i], 'PHY');
                            geotsTrackPhy.push({
                                code: code,
                                length: iup.properties.glength[i],
                                height: iup.properties.gheight[i],
                                cost: iup.properties.rginvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                            var code = serviceService.createNameSched(iup.properties.gcode[i], iup.properties.pk[i], iup.properties.glength[i],
                                iup.properties.gcondition[i], iup.properties.grisknatural[i], 'NAT');
                            geotsTrackNat.push({
                                code: code,
                                length: iup.properties.glength[i],
                                height: iup.properties.gheight[i],
                                cost: iup.properties.rginvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                        }
                        if (iup.properties.gcode2 !== undefined && iup.properties.gcode2 !== [] && iup.properties.gcode2.length > 0 &&
                            iup.properties.gcode2[i] !== undefined && iup.properties.gcode2[i] !== null && iup.properties.gcode2[i] !== "" &&
                            iup.properties.glength2 !== undefined && iup.properties.glength2 !== [] && iup.properties.glength2.length > 0 &&
                            iup.properties.glength2[i] !== undefined && iup.properties.glength2[i] !== null && iup.properties.glength2[i] !== "" &&
                            !assetsVisited.includes(iup.properties.gcode2[i])) {
                            assetsVisited.push(iup.properties.gcode2[i]);
                            var code = serviceService.createNameSched(iup.properties.gcode2[i], iup.properties.pk[i], iup.properties.glength2[i],
                                iup.properties.gcondition2[i], iup.properties.griskphysical2[i], 'PHY');
                            geotsTrackPhy.push({
                                code: code,
                                length: iup.properties.glength2[i],
                                height: iup.properties.gheight2[i],
                                cost: iup.properties.rginvestmentrequired2[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)

                            });

                            var code = serviceService.createNameSched(iup.properties.gcode2[i], iup.properties.pk[i], iup.properties.glength2[i],
                                iup.properties.gcondition2[i], iup.properties.grisknatural2[i], 'NAT');
                            geotsTrackNat.push({
                                code: code,
                                length: iup.properties.glength2[i],
                                height: iup.properties.gheight2[i],
                                cost: iup.properties.rginvestmentrequired2[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)

                            });

                        }
                        /**
                         * CULVERTS
                         */
                        if (iup.properties.Ccode !== undefined && iup.properties.Ccode !== [] && iup.properties.Ccode.length > 0 &&
                            iup.properties.Ccode[i] !== undefined && iup.properties.Ccode[i] !== null && iup.properties.Ccode[i] !== "" &&
                            iup.properties.Clength !== undefined && iup.properties.Clength !== [] && iup.properties.Clength.length > 0 &&
                            iup.properties.Clength[i] !== undefined && iup.properties.Clength[i] !== null && iup.properties.Clength[i] !== "" &&
                            !assetsVisited.includes(iup.properties.Ccode[i])) {
                            assetsVisited.push(iup.properties.Ccode[i]);
                            var code = serviceService.createNameSched(iup.properties.Ccode[i], iup.properties.pk[i], iup.properties.Clength[i],
                                iup.properties.Ccondition[i], iup.properties.CRISKphysical[i], 'PHY');
                            culvertsTrackPhy.push({
                                code: code,
                                length: iup.properties.Clength[i],
                                cost: iup.properties.Cinvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)

                            });

                            var code = serviceService.createNameSched(iup.properties.Ccode[i], iup.properties.pk[i], iup.properties.Clength[i],
                                iup.properties.Ccondition[i], iup.properties.CRISKnatural[i], 'NAT')
                            culvertsTrackNat.push({
                                code: code,
                                length: iup.properties.Clength[i],
                                cost: iup.properties.Cinvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)

                            });

                        }
                        /**
                         * BRIDGES
                         */
                        if (iup.properties.bcode !== undefined && iup.properties.bcode !== [] && iup.properties.bcode.length > 0 &&
                            iup.properties.bcode[i] !== undefined && iup.properties.bcode[i] !== null && iup.properties.bcode[i] !== "" &&
                            iup.properties.blenght !== undefined && iup.properties.blenght !== [] && iup.properties.blenght.length > 0 &&
                            iup.properties.blenght[i] !== undefined && iup.properties.blenght[i] !== null && iup.properties.blenght[i] !== "" &&
                            !assetsVisited.includes(iup.properties.bcode[i])) {
                            assetsVisited.push(iup.properties.bcode[i]);
                            var code = serviceService.createNameSched(iup.properties.bcode[i], iup.properties.pk[i], iup.properties.blenght[i],
                                iup.properties.bcondition[i], iup.properties.briskphysical[i], 'PHY');
                            bridgesTrackPhy.push({
                                code: code,
                                length: iup.properties.blenght[i],
                                width: iup.properties.bwidth[i],
                                cost: iup.properties.binvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                            var code = serviceService.createNameSched(iup.properties.bcode[i], iup.properties.pk[i], iup.properties.blenght[i],
                                iup.properties.bcondition[i], iup.properties.brisknatural[i], 'NAT');
                            bridgesTrackNat.push({
                                code: code,
                                length: iup.properties.blenght[i],
                                width: iup.properties.bwidth[i],
                                cost: iup.properties.binvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                        }

                        /**
                         * PAVEMENTS
                         */

                        sectionsphy[ns] = formulasService.NormalizeRiskRatingScale(iup.properties.rriskphysical[i]);
                        sectionsnat[ns] = formulasService.NormalizeRiskRatingScale(iup.properties.rrisknatural[i]);
                        sectionscond[ns] = iup.properties.rcondition[i];
                        sectionswidth[ns] = iup.properties.rwidth[i] !== undefined ? iup.properties.rwidth[i] : '';
                        pkreg[ns] = iup.properties.pk[i];
                        pavCost[ns] = (iup.properties.rinvestmentrequired[i] !== undefined && iup.properties.rinvestmentrequired[i] !== '') ? iup.properties.rinvestmentrequired[i] : 0;
                        pavCategory[ns] = (iup.properties.rcategory[i] !== undefined && iup.properties.rcategory[i] !== '') ? iup.properties.rcategory[i] : '';

                        if (iup.properties.pk[i] <= pkini + sectionlength * nsections || i + 1 === iup.geometry.coordinates.length) {
                            // //debug(nsections);
                            trackSectionsphy.push(sectionsphy);
                            trackSectionsnat.push(sectionsnat);
                            trackSectionscond.push(sectionscond);
                            trackSectionswidth.push(sectionswidth);
                            trackpkreg.push(pkreg);
                            trackPavCost.push(pavCost);
                            trackPavCat.push(pavCategory);
                            sectionsphy = [];
                            sectionsnat = [];
                            sectionscond = [];
                            sectionswidth = [];
                            pkreg = [];
                            pavCost = [];
                            pavCategory = [];
                            nsections++;
                            ns = 0;
                        } else {
                            ns++;
                        }
                    }
                    var l = 0;
                    for (var ts of trackSectionsphy) {
                        l += ts.length;
                    }


                } else {
                    var ns = 0;
                    for (var i = 0; i < iup.geometry.coordinates.length; i++) {
                        /**
                         * GEOT
                         */
                        if (iup.properties.gcode !== undefined && iup.properties.gcode !== [] && iup.properties.gcode.length > 0 &&
                            iup.properties.gcode[i] !== undefined && iup.properties.gcode[i] !== null && iup.properties.gcode[i] !== "" &&
                            iup.properties.glength !== undefined && iup.properties.glength !== [] && iup.properties.glength.length > 0 &&
                            iup.properties.glength[i] !== undefined && iup.properties.glength[i] !== null && iup.properties.glength[i] !== "" &&
                            !assetsVisited.includes(iup.properties.gcode[i])) {
                            assetsVisited.push(iup.properties.gcode[i]);

                            var code = serviceService.createNameSched(iup.properties.gcode[i], iup.properties.pk[i], iup.properties.glength[i],
                                iup.properties.gcondition[i], iup.properties.griskphysical[i], 'PHY');
                            geotsTrackPhy.push({
                                code: code,
                                length: iup.properties.glength[i],
                                height: iup.properties.gheight[i],
                                cost: iup.properties.rginvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                            var code = serviceService.createNameSched(iup.properties.gcode[i], iup.properties.pk[i], iup.properties.glength[i],
                                iup.properties.gcondition[i], iup.properties.grisknatural[i], 'NAT');
                            geotsTrackNat.push({
                                code: code,
                                length: iup.properties.glength[i],
                                height: iup.properties.gheight[i],
                                cost: iup.properties.rginvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                        }
                        if (iup.properties.gcode2 !== undefined && iup.properties.gcode2 !== [] && iup.properties.gcode2.length > 0 &&
                            iup.properties.gcode2[i] !== undefined && iup.properties.gcode2[i] !== null && iup.properties.gcode2[i] !== "" &&
                            iup.properties.glength2 !== undefined && iup.properties.glength2 !== [] && iup.properties.glength2.length > 0 &&
                            iup.properties.glength2[i] !== undefined && iup.properties.glength2[i] !== null && iup.properties.glength2[i] !== "" &&
                            !assetsVisited.includes(iup.properties.gcode2[i])) {
                            assetsVisited.push(iup.properties.gcode2[i]);
                            var code = serviceService.createNameSched(iup.properties.gcode2[i], iup.properties.pk[i], iup.properties.glength2[i],
                                iup.properties.gcondition2[i], iup.properties.griskphysical2[i], 'PHY');
                            geotsTrackPhy.push({
                                code: code,
                                length: iup.properties.glength2[i],
                                height: iup.properties.gheight2[i],
                                cost: iup.properties.rginvestmentrequired2[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                            var code = serviceService.createNameSched(iup.properties.gcode2[i], iup.properties.pk[i], iup.properties.glength2[i],
                                iup.properties.gcondition2[i], iup.properties.grisknatural2[i], 'NAT')
                            geotsTrackNat.push({
                                code: code,
                                length: iup.properties.glength2[i],
                                height: iup.properties.gheight2[i],
                                cost: iup.properties.rginvestmentrequired2[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                        }
                        /**
                         * CULVERTS
                         */
                        if (iup.properties.Ccode !== undefined && iup.properties.Ccode !== [] && iup.properties.Ccode.length > 0 &&
                            iup.properties.Ccode[i] !== undefined && iup.properties.Ccode[i] !== null && iup.properties.Ccode[i] !== "" &&
                            iup.properties.Clength !== undefined && iup.properties.Clength !== [] && iup.properties.Clength.length > 0 &&
                            iup.properties.Clength[i] !== undefined && iup.properties.Clength[i] !== null && iup.properties.Clength[i] !== "" &&
                            !assetsVisited.includes(iup.properties.Ccode[i])) {
                            assetsVisited.push(iup.properties.Ccode[i]);
                            var code = serviceService.createNameSched(iup.properties.Ccode[i], iup.properties.pk[i], iup.properties.Clength[i],
                                iup.properties.Ccondition[i], iup.properties.CRISKphysical[i], 'PHY');
                            culvertsTrackPhy.push({
                                code: code,
                                length: iup.properties.Clength[i],
                                cost: iup.properties.Cinvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                            var code = serviceService.createNameSched(iup.properties.Ccode[i], iup.properties.pk[i], iup.properties.Clength[i],
                                iup.properties.Ccondition[i], iup.properties.CRISKnatural[i], 'NAT');
                            culvertsTrackNat.push({
                                code: code,
                                length: iup.properties.Clength[i],
                                cost: iup.properties.Cinvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                        }
                        /**
                         * BRIDGES
                         */
                        if (iup.properties.bcode !== undefined && iup.properties.bcode !== [] && iup.properties.bcode.length > 0 &&
                            iup.properties.bcode[i] !== undefined && iup.properties.bcode[i] !== null && iup.properties.bcode[i] !== "" &&
                            iup.properties.blenght !== undefined && iup.properties.blenght !== [] && iup.properties.blenght.length > 0 &&
                            iup.properties.blenght[i] !== undefined && iup.properties.blenght[i] !== null && iup.properties.blenght[i] !== "" &&
                            !assetsVisited.includes(iup.properties.bcode[i])) {
                            assetsVisited.push(iup.properties.bcode[i]);
                            var code = serviceService.createNameSched(iup.properties.bcode[i], iup.properties.pk[i], iup.properties.blenght[i],
                                iup.properties.bcondition[i], iup.properties.briskphysical[i], 'PHY');
                            bridgesTrackPhy.push({
                                code: code,
                                length: iup.properties.blenght[i],
                                width: iup.properties.bwidth[i],
                                cost: iup.properties.binvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                            var code = serviceService.createNameSched(iup.properties.bcode[i], iup.properties.pk[i], iup.properties.blenght[i],
                                iup.properties.bcondition[i], iup.properties.brisknatural[i], 'NAT');
                            bridgesTrackNat.push({
                                code: code,
                                length: iup.properties.blenght[i],
                                width: iup.properties.bwidth[i],
                                cost: iup.properties.binvestmentrequired[i],
                                rcategory: iup.properties.rcategory[i],
                                riskOrder: formulasService.riskRatingScaleOrderCode(code)
                            });

                        }
                        sectionsphy[ns] = formulasService.NormalizeRiskRatingScale(iup.properties.rriskphysical[i]);
                        sectionsnat[ns] = formulasService.NormalizeRiskRatingScale(iup.properties.rrisknatural[i]);
                        sectionscond[ns] = iup.properties.rcondition[i];
                        sectionswidth[ns] = iup.properties.rwidth[i] !== undefined ? iup.properties.rwidth[i] : '';
                        pkreg[ns] = iup.properties.pk[i];
                        pavCost[ns] = (iup.properties.rinvestmentrequired[i] !== undefined && iup.properties.rinvestmentrequired[i] !== '') ? iup.properties.rinvestmentrequired[i] : 0;
                        pavCategory[ns] = (iup.properties.rcategory[i] !== undefined && iup.properties.rcategory[i] !== '') ? iup.properties.rcategory[i] : '';

                        if (iup.properties.pk[i] >= sectionlength * nsections || i + 1 === iup.geometry.coordinates.length) {
                            // //debug(nsections);
                            trackSectionsphy.push(sectionsphy);
                            trackSectionsnat.push(sectionsnat);
                            trackSectionscond.push(sectionscond);
                            trackSectionswidth.push(sectionswidth);
                            trackpkreg.push(pkreg);
                            trackPavCost.push(pavCost);
                            trackPavCat.push(pavCategory);
                            pavCost = [];
                            pavCategory = [];
                            pkreg = [];
                            sectionsphy = [];
                            sectionsnat = [];
                            sectionscond = [];
                            sectionswidth = [];

                            nsections++;
                            ns = 0;
                        } else {
                            ns++;
                        }
                    }


                }
                // debug(trackPavCat);
                var tgphys = serviceService.tracksGroupNameRiskCond(trackSectionsphy, trackSectionscond, trackSectionswidth, trackpkreg, trackPavCost, trackPavCat, iup, 'PHY');
                var tgnats = serviceService.tracksGroupNameRiskCond(trackSectionsnat, trackSectionscond, trackSectionswidth, trackpkreg, trackPavCost, trackPavCat, iup, 'NAT');
                resolve([tgphys, tgnats, bridgesTrackPhy, bridgesTrackNat, culvertsTrackPhy, culvertsTrackNat, geotsTrackPhy, geotsTrackNat]);
            })
        }));

    }





    Promise.all(arrPromises).then(function (values) {
        var arrPromises2 = [];
        ret['schedphy'] = [];
        ret['schednat'] = [];


        //debug('Values Length ' + values.length);
        // //debug('Values ' + values);
        for (var val of values) {
            // //debug('Promise phy: ' + val[0].length);
            for (var gt of val[0]) {
                ret['schedphy'].push(gt);
                arrPromises2.push(new Promise(function (resolve, reject) {
                    var sphy = new Schedulephy();
                    sphy.properties = Object.assign({}, gt);
                    // sphy.properties['code'] = gt.code;
                    sphy.type = 'PAVEMENTS';
                    sphy.config = {};
                    sphy.config['color'] = 'grey';

                    sphy.save(function (err, ssaved) {
                        if (err) {
                            reject(err);
                            // res.send(500, err.message);
                        }
                        resolve(gt);
                        // tracksUpdated++;
                    });

                }));
            }
            // //debug('Promise nat: ' + val[1].length);
            for (var gt of val[1]) {
                ret['schednat'].push(gt);

                arrPromises2.push(new Promise(function (resolve, reject) {
                    var snat = new Schedulenat();
                    snat.properties = Object.assign({}, gt);
                    // snat.properties['code'] = gt.code;
                    snat.type = 'PAVEMENTS';
                    snat.config = {};
                    snat.config['color'] = 'grey';

                    snat.save(function (err, ssaved) {
                        if (err) {
                            reject(err);
                            // res.send(500, err.message);
                        }
                        resolve(gt);
                        // tracksUpdated++;
                    });

                }));
            }

            // //debug('Promise phy: ' + val[0].length);
            for (var gt of val[2]) {
                ret['schedphy'].push(gt);
                arrPromises2.push(new Promise(function (resolve, reject) {
                    var sphy = new Schedulephy();
                    sphy.properties = Object.assign({}, gt);
                    // sphy.properties['code'] = gt.code;
                    sphy.type = 'BRIDGES';
                    sphy.config = {};
                    sphy.config['color'] = '#ff00aa';

                    sphy.save(function (err, ssaved) {
                        if (err) {
                            reject(err);
                            // res.send(500, err.message);
                        }
                        resolve(gt);
                        // tracksUpdated++;
                    });

                }));
            }
            // //debug('Promise nat: ' + val[1].length);
            for (var gt of val[3]) {
                ret['schednat'].push(gt);

                arrPromises2.push(new Promise(function (resolve, reject) {
                    var snat = new Schedulenat();
                    snat.properties = Object.assign({}, gt);
                    // snat.properties['code'] = gt.code;
                    snat.type = 'BRIDGES';
                    snat.config = {};
                    snat.config['color'] = '#ff00aa';

                    snat.save(function (err, ssaved) {
                        if (err) {
                            reject(err);
                            // res.send(500, err.message);
                        }
                        resolve(gt);
                        // tracksUpdated++;
                    });

                }));
            }
            for (var gt of val[4]) {
                ret['schedphy'].push(gt);
                arrPromises2.push(new Promise(function (resolve, reject) {
                    var sphy = new Schedulephy();
                    sphy.properties = Object.assign({}, gt);
                    // sphy.properties['code'] = gt.code;
                    sphy.type = 'CULVERTS';
                    sphy.config = {};
                    sphy.config['color'] = 'blue';

                    sphy.save(function (err, ssaved) {
                        if (err) {
                            reject(err);
                            // res.send(500, err.message);
                        }
                        resolve(gt);
                        // tracksUpdated++;
                    });

                }));
            }
            // //debug('Promise nat: ' + val[1].length);
            for (var gt of val[5]) {
                ret['schednat'].push(gt);

                arrPromises2.push(new Promise(function (resolve, reject) {
                    var snat = new Schedulenat();
                    snat.properties = Object.assign({}, gt);
                    // snat.properties['code'] = gt.code;
                    snat.type = 'CULVERTS';
                    snat.config = {};
                    snat.config['color'] = 'blue';

                    snat.save(function (err, ssaved) {
                        if (err) {
                            reject(err);
                            // res.send(500, err.message);
                        }
                        resolve(gt);
                        // tracksUpdated++;
                    });

                }));
            }
            for (var gt of val[6]) {
                // debug(gt);

                ret['schedphy'].push(gt);
                arrPromises2.push(new Promise(function (resolve, reject) {
                    var sphy = new Schedulephy();
                    sphy.properties = Object.assign({}, gt);
                    // sphy.properties['code'] = gt.code;
                    sphy.type = 'GEOT';
                    sphy.config = {};
                    sphy.config['color'] = 'green';

                    sphy.save(function (err, ssaved) {
                        if (err) {
                            reject(err);
                            // res.send(500, err.message);
                        }
                        resolve(gt);
                        // tracksUpdated++;
                    });

                }));
            }
            // //debug('Promise nat: ' + val[1].length);
            for (var gt of val[7]) {
                ret['schednat'].push(gt);

                arrPromises2.push(new Promise(function (resolve, reject) {
                    var snat = new Schedulenat();
                    snat.properties = Object.assign({}, gt);
                    // snat.properties['code'] = gt.code;
                    snat.type = 'GEOT';
                    snat.config = {};
                    snat.config['color'] = 'green';

                    snat.save(function (err, ssaved) {
                        if (err) {
                            reject(err);
                            // res.send(500, err.message);
                        }
                        resolve(gt);
                        // tracksUpdated++;
                    });

                }));
            }
        }

        Promise.all(arrPromises2).then(function (values2) {

            //debug('values2 ' + values2.length);

            ret.tracksUpdated = tracksUpdated;
            res.status(200).jsonp(ret);
        }).catch(function (reason2) {
            // console.log(reason2);
            return res.status(500).send(reason2);

        });

    }).catch(function (reason) {
        // console.log(reason);
        return res.status(500).send(reason);

    });

});


/* POST update_formulas_tracks_likelihood */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks_likelihood/:formula/:asset', async function (req, res, next) {
    //debug('API /V1/update_formulas_tracks_likelihood/');
    var postData = extend({}, req.body);
    var tracksUpdated = 0;
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    //debug(postData);
    var form;
    var formula = Object.keys(postData)[0];
    //debug(formula);
    await Formula.find({
        "name": formula
    }).exec(async function (err, f) {
        if (err) {
            res.send(500, err.message);
        }
        form = f[0];
    });
    // //debug(form);
    var wherearr = [];

    //add codes asset
    wherearr.push('rcondition');
    wherearr.push('rresphazard');
    wherearr.push('bcode');
    wherearr.push('bcondition');
    wherearr.push('bresphazard');
    wherearr.push('Ccondition');
    wherearr.push('CRespHazard');
    wherearr.push('gcondition');
    wherearr.push('gresphazard');
    wherearr.push('gcondition2');
    wherearr.push('gresphazard2');
    wherearr.push('bcode');
    wherearr.push('Ccode');
    wherearr.push('gcode');
    wherearr.push('gcode2');
    wherearr.push('rlandslide');
    wherearr.push('rflood');
    wherearr.push('blandslide');
    wherearr.push('bflood');
    wherearr.push('glandslide');
    wherearr.push('gflood');
    wherearr.push('glandslide2');
    wherearr.push('gflood2');
    wherearr.push('CLandslide');
    wherearr.push('CFlood');
    wherearr.push('rsensitivity');
    wherearr.push('bsensitivity');
    wherearr.push('Csensitivity');
    wherearr.push('gsensitivity');
    wherearr.push('gsensitivity2');

    var selectjson = {
        "geometry.coordinates": 1,
        properties: []
    };
    for (var w of wherearr) {
        selectjson.properties[w] = 1;
    }
    //debug(selectjson);
    await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
        if (err) {
            res.send(500, err.message);
        }
        // Arr de valores a updatear


        for (var ifdt of ifdts) {
            var valuerlofnaturalarr = [];
            var valuerlofphysicalarr = [];
            var valueblofnaturalarr = [];
            var valueblofphysicalarr = [];
            var valueClofnaturalarr = [];
            var valueClofphysicalarr = [];
            var valueglofnaturalarr = [];
            var valueglofphysicalarr = [];
            var valueglofnaturalarr2 = [];
            var valueglofphysicalarr2 = [];
            //     ////debug(ifdt._id);
            //     // //debug(ifdt.geometry.coordinates);
            tracksUpdated++;
            for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                var valuerlofnatural = 0;
                var valuerlofphysical = 0;
                var valueblofnatural = 0;
                var valueblofphysical = 0;
                var valueClofnatural = 0;
                var valueClofphysical = 0;
                var valueglofnatural = 0;
                var valueglofphysical = 0;
                var valueglofnatural2 = 0;
                var valueglofphysical2 = 0;
                var existsbcode = false;
                var existsCcode = false;
                var existsgcode = false;
                var existsgcode2 = false;

                //         // Revisamos que exista el código del asset
                if (ifdt.properties.bcode !== undefined && ifdt.properties.bcode !== [] && ifdt.properties.bcode.length > 0 &&
                    ifdt.properties.bcode[i] !== undefined && ifdt.properties.bcode[i] !== null && ifdt.properties.bcode[i] !== "") {
                    existsbcode = true;
                }
                if (ifdt.properties.Ccode !== undefined && ifdt.properties.Ccode !== [] && ifdt.properties.Ccode.length > 0 &&
                    ifdt.properties.Ccode[i] !== undefined && ifdt.properties.Ccode[i] !== null && ifdt.properties.Ccode[i] !== "") {
                    existsCcode = true;
                }
                if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode !== [] && ifdt.properties.gcode.length > 0 &&
                    ifdt.properties.gcode[i] !== undefined && ifdt.properties.gcode[i] !== null && ifdt.properties.gcode[i] !== "") {
                    existsgcode = true;
                }
                if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2 !== [] && ifdt.properties.gcode2.length > 0 &&
                    ifdt.properties.gcode2[i] !== undefined && ifdt.properties.gcode2[i] !== null && ifdt.properties.gcode2[i] !== "") {
                    existsgcode2 = true;
                }
                //         var valweigths = 0;
                var valrlofphy = 0;
                var valblofphy = 0;
                var valClofphy = 0;
                var valglofphy = 0;
                var valglofphy2 = 0;
                var valrlofnat = 0;
                var valblofnat = 0;
                var valClofnat = 0;
                var valglofnat = 0;
                var valglofnat2 = 0;

                if (ifdt.properties.rcondition[i] !== undefined) {
                    if (typeof ifdt.properties.rcondition[i] === "string") {
                        ifdt.properties.rcondition[i] === "" ? valrlofphy = 0 : valrlofphy = parseFloat(ifdt.properties.rcondition[i].replace(",", "."));
                        // //debug('ifdt.properties.rcondition[i] ' + ifdt.properties.rcondition[i]);
                    } else if (typeof ifdt.properties.rcondition[i] === "number") {
                        valrlofphy = ifdt.properties.rcondition[i];
                    } else {
                        valrlofphy = 0;
                    }
                }
                var rsens;
                var rlands;

                if (ifdt.properties.rsensitivity[i] !== undefined) {
                    if (typeof ifdt.properties.rsensitivity[i] === "string") {
                        ifdt.properties.rsensitivity[i] === "" ? rsens = 0 : rsens = parseFloat(ifdt.properties.rsensitivity[i].replace(",", "."));
                    } else if (typeof ifdt.properties.rsensitivity[i] === "number") {
                        rsens = ifdt.properties.rsensitivity[i];
                    } else {
                        rsens = 0;
                    }
                }
                if (ifdt.properties.rlandslide[i] !== undefined) {
                    if (typeof ifdt.properties.rlandslide[i] === "string") {
                        ifdt.properties.rlandslide[i] === "" ? rlands = 0 : rlands = parseFloat(ifdt.properties.rlandslide[i].replace(",", "."));
                    } else if (typeof ifdt.properties.rlandslide[i] === "number") {
                        rlands = ifdt.properties.rlandslide[i];
                    } else {
                        rlands = 0;
                    }
                }


                if (existsbcode) {

                    if (ifdt.properties.bcondition[i] !== undefined) {
                        if (typeof ifdt.properties.bcondition[i] === "string") {
                            ifdt.properties.bcondition[i] === "" ? valblofphy = 0 : valblofphy = parseFloat(ifdt.properties.bcondition[i].replace(",", "."));
                            // //debug('ifdt.properties.bcondition[i] ' + ifdt.properties.bcondition[i]);
                        } else if (typeof ifdt.properties.bcondition[i] === "number") {
                            valblofphy = ifdt.properties.bcondition[i];
                        } else {
                            valblofphy = 0;
                        }
                    }
                    var bsens;
                    var bfl;

                    if (ifdt.properties.bsensitivity[i] !== undefined) {
                        if (typeof ifdt.properties.bsensitivity[i] === "string") {
                            ifdt.properties.bsensitivity[i] === "" ? bsens = 0 : bsens = parseFloat(ifdt.properties.bsensitivity[i].replace(",", "."));
                        } else if (typeof ifdt.properties.bsensitivity[i] === "number") {
                            bsens = ifdt.properties.bsensitivity[i];
                        } else {
                            bsens = 0;
                        }
                    }
                    if (ifdt.properties.bflood[i] !== undefined) {
                        if (typeof ifdt.properties.bflood[i] === "string") {
                            ifdt.properties.bflood[i] === "" ? bfl = 0 : bfl = parseFloat(ifdt.properties.bflood[i].replace(",", "."));
                        } else if (typeof ifdt.properties.bflood[i] === "number") {
                            bfl = ifdt.properties.bflood[i];
                        } else {
                            bfl = 0;
                        }
                    }
                }
                if (existsCcode) {

                    if (ifdt.properties.Ccondition[i] !== undefined) {
                        if (typeof ifdt.properties.Ccondition[i] === "string") {
                            ifdt.properties.Ccondition[i] === "" ? valClofphy = 0 : valClofphy = parseFloat(ifdt.properties.Ccondition[i].replace(",", "."));
                            // //debug('ifdt.properties.Ccondition[i] ' + ifdt.properties.Ccondition[i]);
                        } else if (typeof ifdt.properties.Ccondition[i] === "number") {
                            valClofphy = ifdt.properties.Ccondition[i];
                        } else {
                            valClofphy = 0;
                        }
                    }
                    var Csens;
                    var CFl;

                    if (ifdt.properties.Csensitivity[i] !== undefined) {
                        if (typeof ifdt.properties.Csensitivity[i] === "string") {
                            ifdt.properties.Csensitivity[i] === "" ? Csens = 0 : Csens = parseFloat(ifdt.properties.Csensitivity[i].replace(",", "."));
                        } else if (typeof ifdt.properties.Csensitivity[i] === "number") {
                            Csens = ifdt.properties.Csensitivity[i];
                        } else {
                            Csens = 0;
                        }
                    }
                    if (ifdt.properties.CFlood[i] !== undefined) {
                        if (typeof ifdt.properties.CFlood[i] === "string") {
                            ifdt.properties.CFlood[i] === "" ? CFl = 0 : CFl = parseFloat(ifdt.properties.CFlood[i].replace(",", "."));
                        } else if (typeof ifdt.properties.CFlood[i] === "number") {
                            CFl = ifdt.properties.CFlood[i];
                        } else {
                            CFl = 0;
                        }
                    }

                }
                if (existsgcode) {

                    if (ifdt.properties.gcondition[i] !== undefined) {
                        if (typeof ifdt.properties.gcondition[i] === "string") {
                            ifdt.properties.gcondition[i] === "" ? valglofphy = 0 : valglofphy = parseFloat(ifdt.properties.gcondition[i].replace(",", "."));
                            // //debug('ifdt.properties.gcondition[i] ' + ifdt.properties.gcondition[i]);
                        } else if (typeof ifdt.properties.gcondition[i] === "number") {
                            valglofphy = ifdt.properties.gcondition[i];
                        } else {
                            valglofphy = 0;
                        }
                    }
                    var gsens;
                    var glands;

                    if (ifdt.properties.gsensitivity[i] !== undefined) {
                        if (typeof ifdt.properties.gsensitivity[i] === "string") {
                            ifdt.properties.gsensitivity[i] === "" ? gsens = 0 : gsens = parseFloat(ifdt.properties.gsensitivity[i].replace(",", "."));
                        } else if (typeof ifdt.properties.gsensitivity[i] === "number") {
                            gsens = ifdt.properties.gsensitivity[i];
                        } else {
                            gsens = 0;
                        }
                    }
                    if (ifdt.properties.glandslide[i] !== undefined) {
                        if (typeof ifdt.properties.glandslide[i] === "string") {
                            ifdt.properties.glandslide[i] === "" ? glands = 0 : glands = parseFloat(ifdt.properties.glandslide[i].replace(",", "."));
                        } else if (typeof ifdt.properties.glandslide[i] === "number") {
                            glands = ifdt.properties.glandslide[i];
                        } else {
                            glands = 0;
                        }
                    }
                }
                if (existsgcode2) {

                    if (ifdt.properties.gcondition2[i] !== undefined) {
                        if (typeof ifdt.properties.gcondition2[i] === "string") {
                            ifdt.properties.gcondition2[i] === "" ? valglofphy2 = 0 : valglofphy2 = parseFloat(ifdt.properties.gcondition2[i].replace(",", "."));
                            // //debug('ifdt.properties.gcondition2[i] ' + ifdt.properties.gcondition2[i]);
                        } else if (typeof ifdt.properties.gcondition2[i] === "number") {
                            valglofphy2 = ifdt.properties.gcondition2[i];
                        } else {
                            valglofphy2 = 0;
                        }
                    }
                    var gsens2;
                    var glands2;

                    if (ifdt.properties.gsensitivity2[i] !== undefined) {
                        if (typeof ifdt.properties.gsensitivity2[i] === "string") {
                            ifdt.properties.gsensitivity2[i] === "" ? gsens2 = 0 : gsens2 = parseFloat(ifdt.properties.gsensitivity2[i].replace(",", "."));
                        } else if (typeof ifdt.properties.gsensitivity2[i] === "number") {
                            gsens2 = ifdt.properties.gsensitivity2[i];
                        } else {
                            gsens2 = 0;
                        }
                    }
                    if (ifdt.properties.glandslide2[i] !== undefined) {
                        if (typeof ifdt.properties.glandslide2[i] === "string") {
                            ifdt.properties.glandslide2[i] === "" ? glands2 = 0 : glands2 = parseFloat(ifdt.properties.glandslide2[i].replace(",", "."));
                        } else if (typeof ifdt.properties.glandslide2[i] === "number") {
                            glands2 = ifdt.properties.glandslide2[i];
                        } else {
                            glands2 = 0;
                        }
                    }
                }

                // En el caso de ser LOFPhysical se iguala a condition
                // PAVEMENTS //
                // //debug ("MIN(" + valrcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                valuerlofphysical = parseFloat(valrlofphy);
                valueblofphysical = parseFloat(valblofphy);
                valueClofphysical = parseFloat(valClofphy);
                valueglofphysical = parseFloat(valglofphy);
                valueglofphysical2 = parseFloat(valglofphy2);

                // En el caso de ser LOFNatural se aplica la formula

                for (var f = 0; f < form.formulaSpec.length; f++) {

                    switch (form.formulaSpec[f]["FORM_COEF"]) {

                        case 'firstcoef':
                            // PAVEMENTS //
                            if (rlands === 3) {
                                valuerlofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * rsens;
                            }

                            // BRIDGES //
                            if (existsbcode) {

                                if (bfl === 3) {
                                    valueblofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * bsens;
                                }

                            }
                            // CULVERTS //
                            if (existsCcode) {
                                if (CFl === 3) {
                                    valueClofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * Csens;
                                }
                            }
                            // GEOT //
                            if (existsgcode) {
                                if (glands === 3) {
                                    valueglofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * gsens;
                                }

                            }
                            if (existsgcode2) {
                                if (glands2 === 3) {
                                    valueglofnatural2 = parseFloat(form.formulaSpec[f].WEIGHTS.value) * gsens2;
                                }

                            }

                            break;
                            // PAVEMENTS //
                        case 'secondcoef':
                            if (rlands === 2) {
                                valuerlofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * rsens;
                            }
                            // BRIDGES //
                            if (existsbcode) {
                                if (bfl === 2) {
                                    valueblofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * bsens;
                                }
                            }
                            // CULVERTS //
                            if (existsCcode) {
                                if (CFl === 2) {
                                    valueClofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * Csens;
                                }
                            }
                            // GEOT //
                            if (existsgcode) {
                                if (glands === 2) {
                                    valueglofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * gsens;
                                }

                            }
                            if (existsgcode2) {
                                if (glands2 === 2) {
                                    valueglofnatural2 = parseFloat(form.formulaSpec[f].WEIGHTS.value) * gsens2;
                                }

                            }
                            break;
                        case 'thirdcoef':
                            if (rlands === 1) {
                                valuerlofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * rsens;
                            }
                            // BRIDGES //
                            if (existsbcode) {
                                if (bfl === 1) {
                                    valueblofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * bsens;
                                }
                            }
                            // CULVERTS //
                            if (existsCcode) {
                                if (CFl === 1) {
                                    valueClofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * Csens;
                                }
                            }
                            // GEOT //
                            if (existsgcode) {
                                if (glands === 1) {
                                    valueglofnatural = parseFloat(form.formulaSpec[f].WEIGHTS.value) * gsens;
                                }

                            }
                            if (existsgcode2) {
                                if (glands2 === 1) {
                                    valueglofnatural2 = parseFloat(form.formulaSpec[f].WEIGHTS.value) * gsens2;
                                }

                            }
                            break;

                        default:
                            break;
                    }
                }
                // //debug("valuerlofnatural " + valuerlofnatural);

                valuerlofphysicalarr[i] = 1 - valuerlofphysical;
                valuerlofnaturalarr[i] = valuerlofnatural;

                if (existsbcode) {
                    valueblofphysicalarr[i] = 1 - valueblofphysical;
                    valueblofnaturalarr[i] = 1 - valueblofnatural;
                } else {
                    valueblofphysicalarr[i] = "";
                    valueblofnaturalarr[i] = "";
                }
                if (existsCcode) {
                    valueClofphysicalarr[i] = 1 - valueClofphysical;
                    valueClofnaturalarr[i] = 1 - valueClofnatural;
                } else {
                    valueClofphysicalarr[i] = "";
                    valueClofnaturalarr[i] = "";

                }
                if (existsgcode) {
                    valueglofphysicalarr[i] = 1 - valueglofphysical;
                    valueglofnaturalarr[i] = 1 - valueglofnatural;
                } else {
                    valueglofphysicalarr[i] = "";
                    valueglofnaturalarr[i] = "";
                }
                if (existsgcode2) {
                    valueglofphysicalarr2[i] = 1 - valueglofphysical2;
                    valueglofnaturalarr2[i] = 1 - valueglofnatural2;

                } else {
                    valueglofphysicalarr2[i] = "";
                    valueglofnaturalarr2[i] = "";

                }
            }

            var conditions = {
                _id: ifdt._id
            };
            var query = {
                $set: {
                    "properties.rlofphysical": valuerlofphysicalarr,
                    "properties.rlofnatural": valuerlofnaturalarr,
                    "properties.blofphysical": valueblofphysicalarr,
                    "properties.blofnatural": valueblofnaturalarr,
                    "properties.Clofphysical": valueClofphysicalarr,
                    "properties.Clofnatural": valueClofnaturalarr,
                    "properties.glofphysical": valueglofphysicalarr,
                    "properties.glofphysical2": valueglofphysicalarr2,
                    "properties.glofnatural": valueglofnaturalarr,
                    "properties.glofnatural2": valueglofnaturalarr2
                }
            };
            await Infodatatrack.update(conditions, query, function (err, iup) {
                if (err) {
                    //debug(err.message);
                }
                // //debug(iup);

            });
        }
    });

    ret.tracksUpdated = tracksUpdated;
    //debug(tracksUpdated);
    res.status(200).jsonp(ret);


});


/* POST update_formulas_tracks_sensitivity */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks_sensitivity/:formula/:asset', async function (req, res, next) {
    //debug('API /V1/update_formulas_tracks_sensitivity/');
    var postData = extend({}, req.body);
    var tracksUpdated = 0;
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    //debug(postData);
    var form;
    var formula = Object.keys(postData)[0];
    //debug(formula);
    await Formula.find({
        "name": formula
    }).exec(async function (err, f) {
        if (err) {
            res.send(500, err.message);
        }
        form = f[0];
    });
    // //debug(form);
    var wherearr = [];

    //add codes asset
    wherearr.push('rcondition');
    wherearr.push('rresphazard');
    wherearr.push('bcode');
    wherearr.push('bcondition');
    wherearr.push('bresphazard');
    wherearr.push('Ccondition');
    wherearr.push('CRespHazard');
    wherearr.push('gcondition');
    wherearr.push('gresphazard');
    wherearr.push('gcondition2');
    wherearr.push('gresphazard2');
    wherearr.push('bcode');
    wherearr.push('Ccode');
    wherearr.push('gcode');
    wherearr.push('gcode2');


    var selectjson = {
        "geometry.coordinates": 1,
        properties: []
    };
    for (var w of wherearr) {
        selectjson.properties[w] = 1;
    }
    //debug(selectjson);
    await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
        if (err) {
            res.send(500, err.message);
        }
        // Arr de valores a updatear


        for (var ifdt of ifdts) {
            var valuersensitivityarr = [];
            var valuebsensitivityarr = [];
            var valueCsensitivityarr = [];
            var valuegsensitivityarr = [];
            var valuegsensitivityarr2 = [];
            ////debug(ifdt._id);
            // //debug(ifdt.geometry.coordinates);
            tracksUpdated++;
            var bcodeant = "";
            for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                var valuersensitivity = 0;
                var valuebsensitivity = 0;
                var valueCsensitivity = 0;
                var valuegsensitivity = 0;
                var valuegsensitivity2 = 0;
                var existsbcode = false;
                var existsCcode = false;
                var existsgcode = false;
                var existsgcode2 = false;

                // Revisamos que exista el código del asset
                if (ifdt.properties.bcode !== undefined && ifdt.properties.bcode !== [] && ifdt.properties.bcode.length > 0 &&
                    ifdt.properties.bcode[i] !== undefined && ifdt.properties.bcode[i] !== null && ifdt.properties.bcode[i] !== "") {
                    existsbcode = true;
                }
                if (ifdt.properties.Ccode !== undefined && ifdt.properties.Ccode !== [] && ifdt.properties.Ccode.length > 0 &&
                    ifdt.properties.Ccode[i] !== undefined && ifdt.properties.Ccode[i] !== null && ifdt.properties.Ccode[i] !== "") {
                    existsCcode = true;
                }
                if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode !== [] && ifdt.properties.gcode.length > 0 &&
                    ifdt.properties.gcode[i] !== undefined && ifdt.properties.gcode[i] !== null && ifdt.properties.gcode[i] !== "") {
                    existsgcode = true;
                }
                if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2 !== [] && ifdt.properties.gcode2.length > 0 &&
                    ifdt.properties.gcode2[i] !== undefined && ifdt.properties.gcode2[i] !== null && ifdt.properties.gcode2[i] !== "") {
                    existsgcode2 = true;
                }
                var valweigths = 0;
                var valrcond = 0;
                var valrresphazard = 0;
                var valbcond = 0;
                var valbresphazard = 0;
                var valCcond = 0;
                var valCRespHazard = 0;
                var valgcond = 0;
                var valgresphazard = 0;
                var valgcond2 = 0;
                var valgresphazard2 = 0;

                if (ifdt.properties.rcondition[i] !== undefined) {
                    if (typeof ifdt.properties.rcondition[i] === "string") {
                        ifdt.properties.rcondition[i] === "" ? valrcond = 0 : valrcond = parseFloat(ifdt.properties.rcondition[i].replace(",", "."));
                        // //debug('ifdt.properties.rcondition[i] ' + ifdt.properties.rcondition[i]);
                    } else if (typeof ifdt.properties.rcondition[i] === "number") {
                        valrcond = ifdt.properties.rcondition[i];
                    } else {
                        valrcond = 0;
                    }
                }
                if (ifdt.properties.rresphazard[i] !== undefined) {
                    if (typeof ifdt.properties.rresphazard[i] === "string") {
                        ifdt.properties.rresphazard[i] === "" ? valrresphazard = 0 : valrresphazard = parseFloat(ifdt.properties.rresphazard[i].replace(",", "."));
                    } else if (typeof ifdt.properties.rresphazard[i] === "number") {
                        valrresphazard = ifdt.properties.rresphazard[i];
                    } else {
                        valrresphazard = 0;
                    }
                }
                if (existsbcode) {

                    if (ifdt.properties.bcondition[i] !== undefined) {
                        if (typeof ifdt.properties.bcondition[i] === "string") {
                            ifdt.properties.bcondition[i] === "" ? valbcond = 0 : valbcond = parseFloat(ifdt.properties.bcondition[i].replace(",", "."));
                            // //debug('ifdt.properties.bcondition[i] ' + ifdt.properties.bcondition[i]);
                        } else if (typeof ifdt.properties.bcondition[i] === "number") {
                            valbcond = ifdt.properties.bcondition[i];
                        } else {
                            valbcond = 0;
                        }
                    }
                    if (ifdt.properties.bresphazard[i] !== undefined) {
                        if (typeof ifdt.properties.bresphazard[i] === "string") {
                            ifdt.properties.bresphazard[i] === "" ? valbresphazard = 0 : valbresphazard = parseFloat(ifdt.properties.bresphazard[i].replace(",", "."));
                        } else if (typeof ifdt.properties.bresphazard[i] === "number") {
                            valbresphazard = ifdt.properties.bresphazard[i];
                        } else {
                            valbresphazard = 0;
                        }
                    }
                }
                if (existsCcode) {

                    if (ifdt.properties.Ccondition[i] !== undefined) {
                        if (typeof ifdt.properties.Ccondition[i] === "string") {
                            ifdt.properties.Ccondition[i] === "" ? valCcond = 0 : valCcond = parseFloat(ifdt.properties.Ccondition[i].replace(",", "."));
                            // //debug('ifdt.properties.Ccondition[i] ' + ifdt.properties.Ccondition[i]);
                        } else if (typeof ifdt.properties.Ccondition[i] === "number") {
                            valCcond = ifdt.properties.Ccondition[i];
                        } else {
                            valCcond = 0;
                        }
                    }
                    if (ifdt.properties.CRespHazard[i] !== undefined) {
                        if (typeof ifdt.properties.CRespHazard[i] === "string") {
                            ifdt.properties.CRespHazard[i] === "" ? valCRespHazard = 0 : valCRespHazard = parseFloat(ifdt.properties.CRespHazard[i].replace(",", "."));
                        } else if (typeof ifdt.properties.CRespHazard[i] === "number") {
                            valCRespHazard = ifdt.properties.CRespHazard[i];
                        } else {
                            valCRespHazard = 0;
                        }
                    }
                }
                if (existsgcode) {

                    if (ifdt.properties.gcondition[i] !== undefined) {
                        if (typeof ifdt.properties.gcondition[i] === "string") {
                            ifdt.properties.gcondition[i] === "" ? valgcond = 0 : valgcond = parseFloat(ifdt.properties.gcondition[i].replace(",", "."));
                            // //debug('ifdt.properties.gcondition[i] ' + ifdt.properties.gcondition[i]);
                        } else if (typeof ifdt.properties.gcondition[i] === "number") {
                            valgcond = ifdt.properties.gcondition[i];
                        } else {
                            valgcond = 0;
                        }
                    }
                    if (ifdt.properties.gresphazard[i] !== undefined) {
                        if (typeof ifdt.properties.gresphazard[i] === "string") {
                            ifdt.properties.gresphazard[i] === "" ? valgresphazard = 0 : valgresphazard = parseFloat(ifdt.properties.gresphazard[i].replace(",", "."));
                        } else if (typeof ifdt.properties.gresphazard[i] === "number") {
                            valgresphazard = ifdt.properties.gresphazard[i];
                        } else {
                            valgresphazard = 0;
                        }
                    }
                }
                if (existsgcode2) {

                    if (ifdt.properties.gcondition2[i] !== undefined) {
                        if (typeof ifdt.properties.gcondition2[i] === "string") {
                            ifdt.properties.gcondition2[i] === "" ? valgcond2 = 0 : valgcond2 = parseFloat(ifdt.properties.gcondition2[i].replace(",", "."));
                            // //debug('ifdt.properties.gcondition2[i] ' + ifdt.properties.gcondition2[i]);
                        } else if (typeof ifdt.properties.gcondition2[i] === "number") {
                            valgcond2 = ifdt.properties.gcondition2[i];
                        } else {
                            valgcond2 = 0;
                        }
                    }
                    if (ifdt.properties.gresphazard2[i] !== undefined) {
                        if (typeof ifdt.properties.gresphazard2[i] === "string") {
                            ifdt.properties.gresphazard2[i] === "" ? valgresphazard2 = 0 : valgresphazard2 = parseFloat(ifdt.properties.gresphazard2[i].replace(",", "."));
                        } else if (typeof ifdt.properties.gresphazard2[i] === "number") {
                            valgresphazard2 = ifdt.properties.gresphazard2[i];
                        } else {
                            valgresphazard2 = 0;
                        }
                    }
                }
                for (var f = 0; f < form.formulaSpec.length; f++) {

                    switch (form.formulaSpec[f]["FORM_COEF"]) {

                        case 'firstcoef':
                            // PAVEMENTS //
                            // //debug ("MIN(" + valrcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                            if (valrcond <= valrresphazard) {
                                valuersensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valrcond;
                                // //debug(valrcond + ' MIN1 ' + valrresphazard +
                                // ' valuersensitivity ' + parseFloat(valuersensitivity));
                            } else {
                                valuersensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valrresphazard;
                                // //debug(valrcond + ' MIN2 ' + valrresphazard + ' valuersensitivity ' + parseFloat(valuersensitivity));

                            }
                            if (existsbcode) {

                                // BRIDGES //
                                // //debug ("MIN(" + valbcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                                if (valbcond <= valbresphazard) {
                                    valuebsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valbcond;
                                    // //debug(valbcond + ' MIN1 ' + valbresphazard +
                                    // ' valuebsensitivity ' + parseFloat(valuebsensitivity));
                                } else {
                                    valuebsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valbresphazard;
                                    // //debug(valbcond + ' MIN2 ' + valbresphazard + ' valuebsensitivity ' + parseFloat(valuebsensitivity));

                                }
                            }
                            if (existsCcode) {
                                // CULVERTS //
                                // //debug ("MIN(" + valCcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                                if (valCcond <= valCRespHazard) {
                                    valueCsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valCcond;
                                    // //debug(valCcond + ' MIN1 ' + valCRespHazard +
                                    // ' valueCsensitivity ' + parseFloat(valueCsensitivity));
                                } else {
                                    valueCsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valCRespHazard;
                                    // //debug(valCcond + ' MIN2 ' + valCRespHazard + ' valueCsensitivity ' + parseFloat(valueCsensitivity));

                                }
                            }
                            if (existsgcode) {

                                // GEOT //
                                // //debug ("MIN(" + valbcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                                if (valgcond <= valgresphazard) {
                                    valuegsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valgcond;
                                    // //debug(valgcond + ' MIN1 ' + valgresphazard +
                                    // ' valuegsensitivity ' + parseFloat(valuegsensitivity));
                                } else {
                                    valuegsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valgresphazard;
                                    // //debug(valgcond + ' MIN2 ' + valgresphazard + ' valuegsensitivity ' + parseFloat(valuebsensitivity));

                                }
                            }
                            if (existsgcode2) {

                                // GEOT //
                                // //debug ("MIN(" + valbcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                                if (valgcond2 <= valgresphazard2) {
                                    valuegsensitivity2 += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valgcond2;
                                    // //debug(valgcond2 + ' MIN1 ' + valgresphazard2 +
                                    // ' valuegsensitivity2 ' + parseFloat(valuegsensitivity2));
                                } else {
                                    valuegsensitivity2 += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valgresphazard2;
                                    // //debug(valgcond2 + ' MIN2 ' + valgresphazard2 + ' valuegsensitivity2 ' + parseFloat(valuegsensitivity2));

                                }
                            }
                            break;
                        case 'secondcoef':
                            // PAVEMENTS //
                            // //debug("MAX(" + valrcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                            if (valrcond >= valrresphazard) {
                                valuersensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valrcond;
                                // //debug(valrcond + ' MAX1 ' + valrresphazard + ' valuersensitivity ' + parseFloat(valuersensitivity));
                            } else {
                                valuersensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valrresphazard;
                                // //debug(valrcond + ' MAX2 ' + valrresphazard + ' valuersensitivity ' + parseFloat(valuersensitivity));

                            }
                            if (existsbcode) {
                                // BRIDGES //
                                // //debug("MAX(" + valbcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                                if (valbcond >= valbresphazard) {
                                    valuebsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valbcond;
                                    // //debug(valbcond + ' MAX1 ' + valbresphazard + ' valuebsensitivity ' + parseFloat(valuebsensitivity));
                                } else {
                                    valuebsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valbresphazard;
                                    // //debug(valbcond + ' MAX2 ' + valbresphazard + ' valuebsensitivity ' + parseFloat(valuebsensitivity));

                                }
                            }
                            if (existsCcode) {
                                // CULVERTS //
                                // //debug("MAX(" + valCcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                                if (valCcond >= valCRespHazard) {
                                    valueCsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valCcond;
                                    // //debug(valCcond + ' MAX1 ' + valCRespHazard + ' valueCsensitivity ' + parseFloat(valueCsensitivity));
                                } else {
                                    valueCsensitivity += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valCRespHazard;
                                    // //debug(valCcond + ' MAX2 ' + valCRespHazard + ' valueCsensitivity ' + parseFloat(valueCsensitivity));

                                }
                            }
                            if (existsgcode) {

                                // GEOT //
                                // //debug ("MIN(" + valbcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                                if (valgcond >= valgresphazard) {
                                    valuegsensitivity2 += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valgcond;
                                    // //debug(valgcond + ' MIN1 ' + valgresphazard +
                                    // ' valuegsensitivity2 ' + parseFloat(valuegsensitivity2));
                                } else {
                                    valuegsensitivity2 += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valgresphazard;
                                    // //debug(valgcond + ' MIN2 ' + valgresphazard + ' valuegsensitivity2 ' + parseFloat(valuegsensitivity2));

                                }
                            }
                            if (existsgcode2) {

                                // GEOT //
                                // //debug ("MIN(" + valbcond + "; " + valrresphazard + ")" + parseFloat(form.formulaSpec[f].WEIGHTS.value));
                                if (valgcond2 >= valgresphazard2) {
                                    valuegsensitivity2 += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valgcond2;
                                    // //debug(valgcond2 + ' MIN1 ' + valgresphazard2 +
                                    // ' valuegsensitivity2 ' + parseFloat(valuegsensitivity2));
                                } else {
                                    valuegsensitivity2 += parseFloat(form.formulaSpec[f].WEIGHTS.value) * valgresphazard2;
                                    // //debug(valgcond2 + ' MIN2 ' + valgresphazard2 + ' valuegsensitivity2 ' + parseFloat(valuegsensitivity2));

                                }
                            }
                            break;

                        default:
                            break;
                    }
                }
                valuersensitivityarr[i] = 1 - valuersensitivity;
                if (existsbcode) {
                    valuebsensitivityarr[i] = 1 - valuebsensitivity;
                } else {
                    valuebsensitivityarr[i] = "";
                }
                if (existsCcode) {
                    valueCsensitivityarr[i] = 1 - valueCsensitivity;
                } else {
                    valueCsensitivityarr[i] = "";

                }
                if (existsgcode) {
                    valuegsensitivityarr[i] = 1 - valuegsensitivity;
                } else {
                    valuegsensitivityarr[i] = "";
                }
                if (existsgcode2) {
                    valuegsensitivityarr2[i] = 1 - valuegsensitivity2;
                } else {
                    valuegsensitivityarr2[i] = "";

                }
            }

            var conditions = {
                _id: ifdt._id
            };
            var query = {
                $set: {
                    "properties.rsensitivity": valuersensitivityarr,
                    "properties.bsensitivity": valuebsensitivityarr,
                    "properties.Csensitivity": valueCsensitivityarr,
                    "properties.gsensitivity": valuegsensitivityarr,
                    "properties.gsensitivity2": valuegsensitivityarr2
                }
            };
            await Infodatatrack.update(conditions, query, function (err, iup) {
                if (err) {
                    //debug(err.message);
                }
                // //debug(iup);

            });
        }
    });

    ret.tracksUpdated = tracksUpdated;
    //debug(tracksUpdated);
    res.status(200).jsonp(ret);


});

/* POST update_formulas_tracks_response */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks_response/:formula/:asset', async function (req, res, next) {
    //debug('API /V1/update_formulas_tracks_response/');
    var postData = extend({}, req.body);
    var tracksUpdated = 0;
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    //debug(postData);
    var form;
    var formula = Object.keys(postData)[0];
    //debug(formula);
    await Formula.find({
        "name": formula
    }).exec(async function (err, f) {
        if (err) {
            res.send(500, err.message);
        }
        form = f[0];
    });
    // //debug(form);
    var wherearr = [];
    for (var fv of form.formulaSpec) {
        if (wherearr.indexOf(fv.WEIGHTS.dbfield) < 0 && fv.WEIGHTS.dbfield !== '--')
            wherearr.push(fv.WEIGHTS.dbfield);
    }

    //add codes asset
    wherearr.push('bcode');
    wherearr.push('Ccode');
    wherearr.push('gcode');
    wherearr.push('gcode2');

    var selectjson = {
        "geometry.coordinates": 1,
        properties: []
    };
    for (var w of wherearr) {
        selectjson.properties[w] = 1;
    }
    //debug(selectjson);
    // //debug(form);
    await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
        if (err) {
            res.send(500, err.message);
        }


        for (var ifdt of ifdts) {
            // Arr de valores a updatear
            var valuerresphazardarr = [];
            var valuebresphazardarr = [];
            var valueCresphazardarr = [];
            var valuegresphazardarr = [];
            var valuegresphazardarr2 = [];
            ////debug(ifdt._id);
            // //debug(ifdt.geometry.coordinates);
            tracksUpdated++;
            var bcodeant = "";
            for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                ////debug(form.formulaSpec.length);
                var valuerresphazard = 0;
                var valuebresphazard = 0;
                var valueCresphazard = 0;
                var valuegresphazard = 0;
                var valuegresphazard2 = 0;

                for (var f = 0; f < form.formulaSpec.length; f++) {
                    switch (form.formulaSpec[f]["ASSET TYPE"]) {
                        case 'Pavement':
                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                valuerresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                // //debug(form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                //     form.formulaSpec[f].score.value + ' valuerresphazard ' + valuerresphazard);
                            }

                            break;
                        case 'Bridges':
                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties.bcode !== undefined && ifdt.properties.bcode !== [] &&
                                ifdt.properties.bcode[i] !== undefined && ifdt.properties.bcode[i] !== null && ifdt.properties.bcode[i] !== "") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuebresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // //debug(ifdt.properties.bcode[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        //form.formulaSpec[f].score.value + ' valuebresphazard ' + valuebresphazard);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // //debug(minval + ' ' + operador + ' ' + maxval);
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            //form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuebresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }

                            break;
                        case 'Cross drainage':
                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties.Ccode !== undefined && ifdt.properties.Ccode.length > 0 &&
                                ifdt.properties.Ccode[i] !== undefined && ifdt.properties.Ccode[i] !== null && ifdt.properties.Ccode[i] !== "") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valueCresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        ////debug(ifdt.properties.Ccode[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        //  form.formulaSpec[f].score.value + ' valueCresphazard ' + valueCresphazard);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            ////debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            ////debug(minval + ' ' + operador + ' ' + maxval);
                                            ////debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            // form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valueCresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }

                            break;
                        case 'Earthworks':
                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode.length > 0 &&
                                ifdt.properties.gcode[i] !== undefined && ifdt.properties.gcode[i] !== null && ifdt.properties.gcode[i] !== "" &&
                                ifdt.properties.gtype !== undefined && ifdt.properties.gtype.length > 0 &&
                                ifdt.properties.gtype[i] !== undefined && ifdt.properties.gtype[i] !== null && ifdt.properties.gtype[i] !== "" &&
                                ifdt.properties.gtype[i] !== "Cutting" && ifdt.properties.gtype[i] !== "Embankment") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuegresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // //debug(ifdt.properties.gcode[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        // form.formulaSpec[f].score.value + ' valuegresphazard ' + valuegresphazard);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // //debug(minval + ' ' + operador + ' ' + maxval);
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            // form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuegresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }
                            if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2.length > 0 &&
                                ifdt.properties.gcode2[i] !== undefined && ifdt.properties.gcode2[i] !== null && ifdt.properties.gcode2[i] !== "" &&
                                ifdt.properties.gtype2 !== undefined && ifdt.properties.gtype2.length > 0 &&
                                ifdt.properties.gtype2[i] !== undefined && ifdt.properties.gtype2[i] !== null && ifdt.properties.gtype2[i] !== "" &&
                                ifdt.properties.gtype2[i] !== "Cutting" && ifdt.properties.gtype2[i] !== "Embankment") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuegresphazard2 += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // //debug(ifdt.properties.gcode2[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        //     form.formulaSpec[f].score.value + ' valuegresphazard2 ' + valuegresphazard2);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // //debug(minval + ' ' + operador + ' ' + maxval);
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            //     form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuegresphazard2 += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }

                            break;

                        case 'Retaining walls':
                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i]);
                            if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode.length > 0 &&
                                ifdt.properties.gcode[i] !== undefined && ifdt.properties.gcode[i] !== null && ifdt.properties.gcode[i] !== "" &&
                                ifdt.properties.gtype !== undefined && ifdt.properties.gtype.length > 0 &&
                                ifdt.properties.gtype[i] !== undefined && ifdt.properties.gtype[i] !== null && ifdt.properties.gtype[i] !== "" &&
                                ifdt.properties.gtype[i] !== "Retaining_walls") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuegresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // //debug(ifdt.properties.gcode[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        // form.formulaSpec[f].score.value + ' valuegresphazard ' + valuegresphazard);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // //debug(minval + ' ' + operador + ' ' + maxval);
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            // form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuegresphazard += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }
                            if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2.length > 0 &&
                                ifdt.properties.gcode2[i] !== undefined && ifdt.properties.gcode2[i] !== null && ifdt.properties.gcode2[i] !== "" &&
                                ifdt.properties.gtype2 !== undefined && ifdt.properties.gtype2.length > 0 &&
                                ifdt.properties.gtype2[i] !== undefined && ifdt.properties.gtype2[i] !== null && ifdt.properties.gtype2[i] !== "" &&
                                ifdt.properties.gtype2[i] !== "Retaining_walls") {


                                if (form.formulaSpec[f].score.type === "select") {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] === form.formulaSpec[f]["SCORING CRITERIA"]) {
                                        valuegresphazard2 += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        // //debug(ifdt.properties.gcode2[i] + ' ' + form.formulaSpec[f].WEIGHTS.dbfield + ' ' + form.formulaSpec[f]["SCORING CRITERIA"] + '*' +
                                        // form.formulaSpec[f].score.value + ' valuegresphazard2 ' + valuegresphazard2);
                                    }
                                } else {
                                    if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] !== undefined) {
                                        var indexscorerangeval = form.formulaSpec[f].score.fieldname.lastIndexOf('__');
                                        var scorerangeval = form.formulaSpec[f].score.fieldname.substr(indexscorerangeval + 2, form.formulaSpec[f].score.fieldname.length);
                                        var operador = "";


                                        minval = formulasService.getRangeValues(scorerangeval)[0];
                                        maxval = formulasService.getRangeValues(scorerangeval)[1];
                                        operador = formulasService.getRangeValues(scorerangeval)[2];

                                        if (ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 >= minval &&
                                            ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 < maxval) {
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] + ' scorerangeval ' + scorerangeval);
                                            // //debug(minval + ' ' + operador + ' ' + maxval);
                                            // //debug(ifdt.properties[form.formulaSpec[f].WEIGHTS.dbfield][i] * 1.0 + ' --> ' + form.formulaSpec[f].score.value + ' * ' +
                                            // form.formulaSpec[f].WEIGHTS.value + ' = ' + form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value);
                                            valuegresphazard2 += form.formulaSpec[f].score.value * form.formulaSpec[f].WEIGHTS.value * 1.0;
                                        }

                                    }
                                }

                            }

                            break;

                        default:
                            break;
                    }
                }
                /**
                 * jfcp: lo guardo en tanto por 1
                 */
                valuerresphazardarr[i] = valuerresphazard / 100;
                valuebresphazardarr[i] = valuebresphazard / 100;
                valueCresphazardarr[i] = valueCresphazard / 100;
                valuegresphazardarr[i] = valuegresphazard / 100;
                valuegresphazardarr2[i] = valuegresphazard2 / 100;
            }
            var conditions = {
                _id: ifdt._id
            };
            var query = {
                $set: {
                    "properties.rresphazard": valuerresphazardarr,
                    "properties.bresphazard": valuebresphazardarr,
                    "properties.gresphazard": valuegresphazardarr,
                    "properties.gresphazard2": valuegresphazardarr2,
                    "properties.CRespHazard": valueCresphazardarr
                }
            };
            await Infodatatrack.update(conditions, query, function (err, iup) {
                if (err) {
                    //debug(err.message);
                }
                // //debug(iup);

            });
        }

    });
    ret.tracksUpdated = tracksUpdated;
    //debug(tracksUpdated);
    res.status(200).jsonp(ret);

});

/* POST update_formulas_tracks */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks/:formula/:asset', async function (req, res, next) {
    //debug('API /V1/update_formulas_tracks/');
    var postData = extend({}, req.body);
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    //debug(postData);
    var asset = postData[Object.keys(postData)[0]];
    var formula = Object.keys(postData)[0];
    var sendData = {};
    var formResult = [];
    var formResultLeft = [];
    var formResultRight = [];
    var tracks;
    var tracksUpdated = 0;
    var f;
    //debug('formula: ' + formula + ' asset: ' + asset);

    await Formula.find({
        "name": formula
    }).exec(async function (err, form) {
        if (err) {
            res.send(500, err.message);
        }
        f = form;
    });

    //debug(f);
    var wherearr = [];
    //add codes asset
    wherearr.push('rcode');
    wherearr.push('bcode');
    wherearr.push('Ccode');
    wherearr.push('gcode');
    wherearr.push('gcode2');
    wherearr.push('gtype');
    wherearr.push('gtype2');
    wherearr.push('gcriticality');
    wherearr.push('gcriticality2');
    wherearr.push('rcriticality');
    wherearr.push('bcriticality');
    wherearr.push('Ccriticality');
    wherearr.push('gheight');
    wherearr.push('glength');
    wherearr.push('gmaterial');
    wherearr.push('gheight2');
    wherearr.push('glength2');
    wherearr.push('gmaterial2');
    wherearr.push('renvironment');
    wherearr.push('rwaste');
    wherearr.push('rcategory');
    wherearr.push('rdendritic');
    wherearr.push('ralternatitinerary');
    wherearr.push('rinfrint');
    wherearr.push('rtourism');
    wherearr.push('rhealth');
    wherearr.push('rindustry');
    wherearr.push('rindustrydist');
    wherearr.push('Ctype');
    wherearr.push('Clocation');
    wherearr.push('Cfeeding');
    wherearr.push('Clength');
    wherearr.push('Cdiameter');
    wherearr.push('Cmaterial');
    wherearr.push('blenght');
    wherearr.push('bobstaclesaved');
    wherearr.push('bmaterialdeck');
    wherearr.push('bmaterialgirder');
    wherearr.push('bmaterialpiers');
    wherearr.push('bmaterialabutments');
    wherearr.push('byearconstruc');
    wherearr.push('blastinspection');
    wherearr.push('bsurrounding');
    wherearr.push('rwidth');
    wherearr.push('rmaterial');
    wherearr.push('rdateconstruct');
    wherearr.push('rlastoverlay');

    var selectjson = {
        "geometry.coordinates": 1,
        properties: []
    };
    for (var w of wherearr) {
        selectjson.properties[w] = 1;
    }
    //debug(selectjson);

    await Infodatatrack.find({}, selectjson).exec(function (err, rtracks) {
        if (err) {
            res.send(500, err.message);
        }
        tracks = rtracks;
    });

    //debug('tracks.length ' + tracks.length);
    for (var ifdt of tracks) {
        // var track = { "_id": "59c91c60100b7d4adb8ea9ec" };

        // //debug(ifdt.properties.name);
        var index = 0;
        // //debug(ifdt._id);
        formResult = new Array(ifdt.geometry.coordinates.length);
        formResultLeft = new Array(ifdt.geometry.coordinates.length);
        formResultRight = new Array(ifdt.geometry.coordinates.length);

        for (index = 0; index < ifdt.geometry.coordinates.length; index++) {
            // //debug(index);
            var calcularValue = false;
            /**
             * debo comprobar que el asset elegido tenga CODE para poder actualizarlo
             * Solo sucederá en aquellos casos que esté completado
             */
            switch (asset) {
                case 'Pavements':
                    if (ifdt.properties.rcode !== undefined &&
                        ifdt.properties.rcode !== null &&
                        ifdt.properties.rcode !== [] &&
                        ifdt.properties.rcode[index] !== undefined &&
                        ifdt.properties.rcode[index] !== "") {
                        calcularValue = true;
                        // //debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                    } else {
                        // //debug(fieldkey + ' : UNDEFINED');
                        calcularValue = false;
                    }
                    break;
                case 'Bridges':
                    if (ifdt.properties.bcode !== undefined &&
                        ifdt.properties.bcode !== null &&
                        ifdt.properties.bcode !== [] &&
                        ifdt.properties.bcode.length > 0 &&
                        ifdt.properties.bcode[index] !== undefined &&
                        ifdt.properties.bcode[index] !== "") {
                        calcularValue = true;
                        // //debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                    } else {
                        // //debug(fieldkey + ' : UNDEFINED');
                        calcularValue = false;
                    }
                    break;
                case 'Culverts':
                    if (ifdt.properties.Ccode !== undefined &&
                        ifdt.properties.Ccode !== null &&
                        ifdt.properties.Ccode !== [] &&
                        ifdt.properties.Ccode[index] !== undefined &&
                        ifdt.properties.Ccode[index] !== "") {
                        calcularValue = true;
                        // //debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                    } else {
                        // //debug(fieldkey + ' : UNDEFINED');
                        calcularValue = false;
                    }
                    break;
                case 'Retaining_Walls':
                    if ((
                            ifdt.properties.gcode != undefined &&
                            ifdt.properties.gcode != null &&
                            ifdt.properties.gcode != [] &&
                            ifdt.properties.gcode[index] != undefined &&
                            ifdt.properties.gcode[index] != "" &&
                            ifdt.properties.gtype != undefined &&
                            ifdt.properties.gtype != null &&
                            ifdt.properties.gtype != [] &&
                            ifdt.properties.gtype[index] != undefined &&
                            ifdt.properties.gtype[index] != "" &&
                            ifdt.properties.gtype[index] === "Retaining_walls") || (
                            ifdt.properties.gcode2 != undefined &&
                            ifdt.properties.gcode2 != null &&
                            ifdt.properties.gcode2 != [] &&
                            ifdt.properties.gcode2[index] != undefined &&
                            ifdt.properties.gcode2[index] != "" &&
                            ifdt.properties.gtype2 != undefined &&
                            ifdt.properties.gtype2 != null &&
                            ifdt.properties.gtype2 != [] &&
                            ifdt.properties.gtype2[index] != undefined &&
                            ifdt.properties.gtype2[index] != "" &&
                            ifdt.properties.gtype2[index] === "Retaining_walls"
                        )) {
                        calcularValue = true;
                        // //debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);
                    } else {
                        // //debug(fieldkey + ' : UNDEFINED');
                        calcularValue = false;
                    }
                    break;
                case 'Earthworks':
                    if ((
                            ifdt.properties.gcode != undefined &&
                            ifdt.properties.gcode != null &&
                            ifdt.properties.gcode != [] &&
                            ifdt.properties.gcode[index] != undefined &&
                            ifdt.properties.gcode[index] != "" &&
                            ifdt.properties.gtype != undefined &&
                            ifdt.properties.gtype != null &&
                            ifdt.properties.gtype != [] &&
                            ifdt.properties.gtype[index] != undefined &&
                            ifdt.properties.gtype[index] != "" && (
                                ifdt.properties.gtype[index] === "Cutting" || ifdt.properties.gtype[index] === "Embankment"
                            )
                        ) || (
                            ifdt.properties.gcode2 != undefined &&
                            ifdt.properties.gcode2 != null &&
                            ifdt.properties.gcode2 != [] &&
                            ifdt.properties.gcode2[index] != undefined &&
                            ifdt.properties.gcode2[index] != "" &&
                            ifdt.properties.gtype2 != undefined &&
                            ifdt.properties.gtype2 != null &&
                            ifdt.properties.gtype2 != [] &&
                            ifdt.properties.gtype2[index] != undefined &&
                            ifdt.properties.gtype2[index] != "" && (
                                ifdt.properties.gtype2[index] === "Cutting" || ifdt.properties.gtype2[index] === "Embankment"
                            )
                        )) {
                        calcularValue = true;
                        // //debug(index + ': ' + ifdt.properties.gtype[index] + ' : ' + ifdt.properties.gtype2[index]);
                    } else {
                        // //debug(index + ' : UNDEFINED');
                        calcularValue = false;
                    }
                    break;

                default:
                    break;
            }

            var fspecSendData = {};
            if (calcularValue) {
                if (f[0].formulaSpec !== undefined) {
                    for (var fspec of f[0].formulaSpec) {
                        if (fspec.name === asset) {
                            // debug('CalcularValue ' + fspec.name + ' asset ' + asset);
                            fspecSendData = fspec;
                            for (var [l1key, level1] of Object.entries(fspec)) {
                                if (typeof level1 === 'object') {
                                    for (var [fieldkey, field] of Object.entries(level1)) {
                                        if (typeof field === 'object') {
                                            /**
                                             * En este nivel tengo los campos de la formula
                                             * Debo comprobar que tienen valor para poder aplicar la formula
                                             */
                                            if (ifdt.properties[fieldkey] !== undefined &&
                                                ifdt.properties[fieldkey] !== null &&
                                                ifdt.properties[fieldkey] !== [] &&
                                                ifdt.properties[fieldkey][index] !== undefined &&
                                                ifdt.properties[fieldkey][index] !== "") {
                                                sendData[fieldkey] = ifdt.properties[fieldkey][index];
                                                // //debug(fieldkey + ' : ' + ifdt.properties[fieldkey][index]);

                                            } else {
                                                // //debug(fieldkey + ' : UNDEFINED');
                                                sendData[fieldkey] = undefined;
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (calcularValue) {

                // //debug(sendData);
                // debug('END CalcularValue ' + ' asset ' + asset);
                // debug('END CalcularValue ' + ' fname ' + fspec.name);
                // debug('END CalcularValue ' + ' fspecSendData ' + fspecSendData.name);

                switch (asset) {
                    case 'Pavements':
                        formResult[index] = calcularValue ? formulasService.criticality('Pavements', fspecSendData, sendData, ifdt, index) : undefined;
                        break;
                    case 'Bridges':
                        formResult[index] = calcularValue ? formulasService.criticality('Bridges', fspecSendData, sendData, ifdt, index) : undefined;
                        break;
                    case 'Culverts':
                        formResult[index] = calcularValue ? formulasService.criticality('Culverts', fspecSendData, sendData, ifdt, index) : undefined;
                        break;
                    case 'Retaining_Walls':

                        ////debug('\n\n\n-----------------------------------------------------------------------------------------');
                        ////debug(fspecSendData);
                        var fspec1 = extend({}, fspecSendData);
                        for (var [leftkey, leftfield] of Object.entries(fspec1)) {
                            if (leftkey.indexOf('2') >= 0) {
                                // si el campo tiene un 2, lo quito de la formula por ser el lado dcho
                                delete fspec1[leftkey];
                            }
                        }
                        ////debug(fspec1);
                        var fspec2 = extend({}, fspecSendData);
                        for (var [rightkey, rightfield] of Object.entries(fspec2)) {
                            if (rightkey.indexOf('2') >= 0) {
                                // si el campo tiene un 2, quito de la formula el que no tiene un 2 por ser el izdo
                                delete fspec2[rightkey.replace('2', '')];
                            }
                        }
                        ////debug(fspec2);

                        if (
                            ifdt.properties.gcode !== undefined &&
                            ifdt.properties.gcode !== null &&
                            ifdt.properties.gcode !== [] &&
                            ifdt.properties.gcode[index] !== undefined &&
                            ifdt.properties.gcode[index] !== "" &&
                            ifdt.properties.gtype !== undefined &&
                            ifdt.properties.gtype !== null &&
                            ifdt.properties.gtype !== [] &&
                            ifdt.properties.gtype[index] !== undefined &&
                            ifdt.properties.gtype[index] !== "" &&
                            ifdt.properties.gtype[index] === "Retaining_walls"
                        ) {
                            // en este caso estoy en la izda
                            if (calcularValue) {
                                formResultLeft[index] = formulasService.criticality('Retaining_Walls', fspec1, sendData, ifdt, index);
                            } else {
                                if (ifdt.properties.gcriticality !== undefined &&
                                    ifdt.properties.gcriticality !== null &&
                                    ifdt.properties.gcriticality[index] !== undefined &&
                                    ifdt.properties.gcriticality[index] !== null
                                ) {
                                    formResultLeft[index] = ifdt.properties.gcriticality[index];

                                } else {
                                    formResultLeft[index] = undefined;

                                }
                            }

                        } else {
                            if (ifdt.properties.gcode !== undefined &&
                                ifdt.properties.gcode !== null &&
                                ifdt.properties.gcode !== [] &&
                                ifdt.properties.gcode[index] !== undefined &&
                                ifdt.properties.gcode[index] !== "" &&
                                ifdt.properties.gcriticality !== undefined &&
                                ifdt.properties.gcriticality !== null &&
                                ifdt.properties.gcriticality[index] !== undefined &&
                                ifdt.properties.gcriticality[index] !== null
                            ) {
                                formResultLeft[index] = ifdt.properties.gcriticality[index];

                            } else {
                                formResultLeft[index] = undefined;

                            }
                        }
                        if (
                            ifdt.properties.gtype2 !== undefined &&
                            ifdt.properties.gtype2 !== null &&
                            ifdt.properties.gtype2 !== [] &&
                            ifdt.properties.gtype2[index] !== undefined &&
                            ifdt.properties.gtype2[index] !== "" &&
                            ifdt.properties.gtype2[index] === "Retaining_walls"
                        ) {
                            // en este caso estoy en la dcha
                            if (calcularValue) {
                                formResultRight[index] = formulasService.criticality('Retaining_Walls', fspec2, sendData, ifdt, index);
                            } else {
                                if (ifdt.properties.gcriticality2 !== undefined &&
                                    ifdt.properties.gcriticality2 !== null &&
                                    ifdt.properties.gcriticality2[index] !== undefined &&
                                    ifdt.properties.gcriticality2[index] !== null
                                ) {
                                    formResultRight[index] = ifdt.properties.gcriticality2[index];

                                } else {
                                    formResultRight[index] = undefined;

                                }
                            }

                        } else {

                            if (ifdt.properties.gcode2 !== undefined &&
                                ifdt.properties.gcode2 !== null &&
                                ifdt.properties.gcode2 !== [] &&
                                ifdt.properties.gcode2[index] !== undefined &&
                                ifdt.properties.gcode2[index] !== "" &&
                                ifdt.properties.gcriticality2 !== undefined &&
                                ifdt.properties.gcriticality2 !== null &&
                                ifdt.properties.gcriticality2[index] !== undefined &&
                                ifdt.properties.gcriticality2[index] !== null
                            ) {
                                formResultRight[index] = ifdt.properties.gcriticality2[index];

                            } else {
                                formResultRight[index] = undefined;

                            }
                        }
                        break;
                    case 'Earthworks':

                        ////debug('\n\n\n-----------------------------------------------------------------------------------------');
                        ////debug(fspecSendData);
                        var fspec1 = extend({}, fspecSendData);
                        for (var [leftkey, leftfield] of Object.entries(fspec1)) {
                            if (leftkey.indexOf('2') >= 0) {
                                // si el campo tiene un 2, lo quito de la formula por ser el lado dcho
                                delete fspec1[leftkey];
                            }
                        }
                        ////debug(fspec1);
                        var fspec2 = extend({}, fspecSendData);
                        for (var [rightkey, rightfield] of Object.entries(fspec2)) {
                            if (rightkey.indexOf('2') >= 0) {
                                // si el campo tiene un 2, quito de la formula el que no tiene un 2 por ser el izdo
                                delete fspec2[rightkey.replace('2', '')];
                            }
                        }
                        ////debug(fspec2);

                        if (
                            ifdt.properties.gcode !== undefined &&
                            ifdt.properties.gcode !== null &&
                            ifdt.properties.gcode !== [] &&
                            ifdt.properties.gcode[index] !== undefined &&
                            ifdt.properties.gcode[index] !== "" &&
                            ifdt.properties.gtype !== undefined &&
                            ifdt.properties.gtype !== null &&
                            ifdt.properties.gtype !== [] &&
                            ifdt.properties.gtype[index] !== undefined &&
                            ifdt.properties.gtype[index] !== "" && (
                                ifdt.properties.gtype[index] === "Cutting" || ifdt.properties.gtype[index] === "Embankment"
                            )

                        ) {
                            // en este caso estoy en la izda
                            if (calcularValue) {
                                formResultLeft[index] = formulasService.criticality('Earthworks', fspec1, sendData);
                            } else {
                                if (
                                    ifdt.properties.gcriticality !== undefined &&
                                    ifdt.properties.gcriticality !== null &&
                                    ifdt.properties.gcriticality[index] !== undefined &&
                                    ifdt.properties.gcriticality[index] !== null
                                ) {
                                    formResultLeft[index] = ifdt.properties.gcriticality[index];

                                } else {
                                    formResultLeft[index] = undefined;

                                }
                            }

                        } else {

                            if (
                                ifdt.properties.gcode !== undefined &&
                                ifdt.properties.gcode !== null &&
                                ifdt.properties.gcode !== [] &&
                                ifdt.properties.gcode[index] !== undefined &&
                                ifdt.properties.gcode[index] !== "" &&
                                ifdt.properties.gcriticality !== undefined &&
                                ifdt.properties.gcriticality !== null &&
                                ifdt.properties.gcriticality[index] !== undefined &&
                                ifdt.properties.gcriticality[index] !== null
                            ) {
                                formResultLeft[index] = ifdt.properties.gcriticality[index];

                            } else {
                                formResultLeft[index] = undefined;

                            }
                        }
                        if (
                            ifdt.properties.gcode2 !== undefined &&
                            ifdt.properties.gcode2 !== null &&
                            ifdt.properties.gcode2 !== [] &&
                            ifdt.properties.gcode2[index] !== undefined &&
                            ifdt.properties.gcode2[index] !== "" &&
                            ifdt.properties.gtype2 !== undefined &&
                            ifdt.properties.gtype2 !== null &&
                            ifdt.properties.gtype2 !== [] &&
                            ifdt.properties.gtype2[index] !== undefined &&
                            ifdt.properties.gtype2[index] !== "" && (
                                ifdt.properties.gtype2[index] === "Cutting" || ifdt.properties.gtype2[index] === "Embankment"
                            )
                        ) {
                            // en este caso estoy en la dcha
                            if (calcularValue) {
                                formResultRight[index] = formulasService.criticality('Earthworks', fspec2, sendData);
                            } else {
                                if (ifdt.properties.gcriticality2 !== undefined &&
                                    ifdt.properties.gcriticality2 !== null &&
                                    ifdt.properties.gcriticality2[index] !== undefined &&
                                    ifdt.properties.gcriticality2[index] !== null
                                ) {
                                    formResultRight[index] = ifdt.properties.gcriticality2[index];

                                } else {
                                    formResultRight[index] = undefined;

                                }
                            }

                        } else {
                            if (
                                ifdt.properties.gcode2 !== undefined &&
                                ifdt.properties.gcode2 !== null &&
                                ifdt.properties.gcode2 !== [] &&
                                ifdt.properties.gcode2[index] !== undefined &&
                                ifdt.properties.gcode2[index] !== "" &&
                                ifdt.properties.gcriticality2 !== undefined &&
                                ifdt.properties.gcriticality2 !== null &&
                                ifdt.properties.gcriticality2[index] !== undefined &&
                                ifdt.properties.gcriticality2[index] !== null
                            ) {
                                formResultRight[index] = ifdt.properties.gcriticality2[index];

                            } else {
                                formResultRight[index] = undefined;

                            }
                        }
                        break;
                    default:
                        break;
                }
            }

        }
        var query = {};
        switch (asset) {
            case 'Pavements':
                query = {
                    $set: {
                        "properties.rcriticality": formResult
                    }
                }
                break;
            case 'Bridges':
                query = {
                    $set: {
                        "properties.bcriticality": formResult
                    }
                }
                break;
            case 'Culverts':
                query = {
                    $set: {
                        "properties.Ccriticality": formResult
                    }
                }
                break;
            case 'Retaining_Walls':
                query = {
                    $set: {
                        "properties.gcriticality": formResultLeft,
                        "properties.gcriticality2": formResultRight
                    }
                }
                break;
            case 'Earthworks':
                query = {
                    $set: {
                        "properties.gcriticality": formResultLeft,
                        "properties.gcriticality2": formResultRight
                    }
                }
                break;

            default:
                break;
        }
        ifdt.updated_at = new Date();
        var conditions = {
            _id: ifdt._id
        };
        tracksUpdated++;

        await Infodatatrack.update(conditions, query, function (err, iup) {
            if (err) {
                //debug(err.message);
            }
            // //debug(iup);

        });
        // ifdt.save(function (err, isaved) {
        //     if (err) {
        //         res.send(500, err.message);
        //     }
        //     tracksUpdated++;
        // });
    }
    ret.tracksUpdated = tracksUpdated;
    //debug(tracksUpdated);
    res.status(200).jsonp(ret);


});
/* POST update_formulas_tracks_condition */
/**
 * Metodo para modificar los valores devueltos por las formulas
 */
router.post('/V1/update_formulas_tracks_condition/:formula/:asset', async function (req, res, next) {
    var postData = extend({}, req.body);
    var tracksUpdated = 0;
    var ret = {
        "result": "OK",
        "tracksUpdated": 0
    };
    var form;
    var asset = req.params.asset;
    var formula = 'Condition';
    await Formula.find({
        "name": formula
    }).exec(async function (err, f) {
        if (err) {
            res.send(500, err.message);
        }
        form = f[0];
    });
    var wherearr = [];
    var selectjson = {
        "geometry.coordinates": 1,
        properties: []
    };
    wherearr.push('Ccode');
    wherearr.push('bcode');
    wherearr.push('gcode');
    wherearr.push('gcode2');
    for (var w of wherearr) {
        selectjson.properties[w] = 1;
    }
    var tracksUpdated2 = 0;
    switch (asset) {
        case 'Pavements':
            await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }
                for (var ifdt of ifdts) {
                    var rcond = [];
                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        if (ifdt.properties.iri !== undefined &&
                            ifdt.properties.iri !== [] &&
                            ifdt.properties.iri[i] !== undefined && ifdt.properties.iri[i] !== null &&
                            ifdt.properties.iri[i] !== "") {
                            rcond[i] = formulasService.pavCondScaleNumIri(ifdt.properties.iri[i]);
                        } else if (ifdt.properties.rvcondition !== undefined &&
                            ifdt.properties.rvcondition !== [] &&
                            ifdt.properties.rvcondition[i] !== undefined && ifdt.properties.rvcondition[i] !== null &&
                            ifdt.properties.rvcondition[i] !== "") {

                            rcond[i] = formulasService.pavCondScaleLetter(ifdt.properties.rvcondition[i]);
                        } else {
                            rcond[i] = "";
                        }
                    }
                    var conditions = {
                        _id: ifdt._id
                    };
                    var query = {
                        $set: {
                            "properties.rcondition": rcond
                        }
                    }
                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {}
                    });
                }
            });
            res.status(200).jsonp(ret);
            break;
        case 'Culverts':
            await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }
                for (var ifdt of ifdts) {
                    tracksUpdated2++;
                    var valueconditionsr = [];
                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        for (var f = 0; f < form.formulaSpec.length; f++) {
                            var totalScoring = Number.MAX_VALUE;
                            switch (form.formulaSpec[f].name) {
                                case 'Culverts':
                                    if (ifdt.properties.Ccode.length > 0) {
                                        if (ifdt.properties.Ccode !== undefined &&
                                            ifdt.properties.Ccode !== [] &&
                                            ifdt.properties.Ccode[i] !== null &&
                                            ifdt.properties.Ccode[i] !== "") {
                                            var numberOfScores = 0;
                                            if (ifdt.properties.CDamages.length > 0) {
                                                for (score in form.formulaSpec[f].MainFactor.Damages.scoring) {
                                                    if (score !== undefined && score !== null) {
                                                        if (ifdt.properties.CDamages[i].toString().toUpperCase().indexOf(
                                                                (score.toUpperCase() === 'LOSSOFDRAINAGEMOUTH' ? 'LOSS' : score.toUpperCase()) /// gnapa due to db values inconsistency
                                                            ) >= 0) {
                                                            totalScoring = totalScoring < form.formulaSpec[f].MainFactor.Damages.scoring[score] ?
                                                                totalScoring : form.formulaSpec[f].MainFactor.Damages.scoring[score];
                                                            numberOfScores++;
                                                        }
                                                    }
                                                }
                                            } else {
                                                totalScoring = 100;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? 100 : totalScoring;
                                            if (numberOfScores > 2) {
                                                totalScoring *= 0.9;
                                            } else {
                                                // existance of several damages
                                                totalScoring *= (-0.1 * numberOfScores) / 3 + 1;
                                            }
                                            //  clearing required
                                            if (ifdt.properties.Cclearing[i].length > 0) {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.ClearingRequired.scoring) {
                                                    if (score !== undefined && score !== null) {
                                                        if (ifdt.properties.Cclearing[i].toString().toUpperCase().indexOf(score.toUpperCase()) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.ClearingRequired.scoring[score];
                                                            numberOfScores++;
                                                        } else {
                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }
                                            } else {

                                                totalScoring *= 0.98;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? null : totalScoring;
                                            valueconditionsr.push(totalScoring / 100);
                                        } else {
                                            valueconditionsr.push("");
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    tracksUpdated++;
                    var conditions = {
                        _id: ifdt._id
                    };

                    var query = {
                        $set: {
                            "properties.Ccondition": valueconditionsr
                        }
                    }

                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {}
                    });
                }
                // res.status(200).jsonp(ret);
            });
            tracksUpdated2 = tracksUpdated;
            ret.tracksUpdated = tracksUpdated;
            res.status(200).jsonp(ret);
            break;
        case 'Retaining_Walls':
            await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }
                for (var ifdt of ifdts) {
                    tracksUpdated2++;
                    var valueconditionsr = [];
                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        var coincidencias = 0;
                        ////debug(form.formulaSpec.length);
                        for (var f = 0; f < form.formulaSpec.length; f++) {
                            var totalScoring = Number.MAX_VALUE;
                            switch (form.formulaSpec[f].name) {
                                case 'Retaining_Walls':
                                    //////////////////////INICIO///////////////////////////////
                                    // //debug('ifdt.properties.gcode.length: ' + ifdt.properties.gcode.length);
                                    if (ifdt.properties.gcode.length > 0) {
                                        if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode !== [] &&
                                            ifdt.properties.gcode[i] !== null &&
                                            ifdt.properties.gcode[i] !== "") {
                                            // //debug(ifdt.properties.gcode);
                                            // //debug('form.formulaSpec[f].name' + JSON.stringify(ifdt));
                                            var numberOfScores = 0;
                                            var numberOfTypeOfFailureProcess = 0;
                                            // //debug(ifdt.properties.gtypefailure.length);
                                            if (ifdt.properties.gtypefailure.length > 0) {
                                                for (TypeOfFailureProcess1 in form.formulaSpec[f].Damages.TypeOfFailureProcess) {
                                                    form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight
                                                    if (TypeOfFailureProcess1 !== undefined && TypeOfFailureProcess1 !== null) {
                                                        for (score in form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring) {
                                                            if (ifdt.properties.gtypefailure[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                if (ifdt.properties.gintensityfailure[i].toString().toUpperCase().indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                    coincidencias++;
                                                                    totalScoring = totalScoring < form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight ?
                                                                        totalScoring : form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight;
                                                                    esnull = true;
                                                                    numberOfScores++;
                                                                    totalScoring *= (Number(ifdt.properties.gextentfailure[i]) != ifdt.properties.gextentfailure[i] || ifdt.properties.gextentfailure[i] === 0) ? 1.00 : (
                                                                        (ifdt.properties.gextentfailure[i] <= 0.2 * 100) ? 1 : ((ifdt.properties.gextentfailure[i] <= 0.4 * 100) ? 0.9 : (
                                                                            (ifdt.properties.gextentfailure[i] <= 0.6 * 100) ? 0.8 : ((ifdt.properties.gextentfailure[i] <= 0.8 * 100) ? 0.7 : (0.5)))));
                                                                }
                                                            }

                                                            // if (ifdt.properties.gcode ==='S8-SG-01-RWL-2909'){
                                                            //     debug();
                                                            // }




                                                        }


                                                    }
                                                }
                                                //debug('totalScoring: ' + totalScoring);
                                            } else {
                                                totalScoring = 100;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? 100 : totalScoring;
                                            // //debug(totalScoring);

                                            // Existance of several damages
                                            if (numberOfScores > 2) {
                                                totalScoring *= 0.9;
                                            } else {
                                                // existance of several damages
                                                totalScoring *= (-0.1 * numberOfScores) / 3 + 1;
                                            }

                                            // //debug('ifdt.properties.gtypevegetation:    ' + ifdt.properties.gtypevegetation);
                                            // //debug('ifdt.properties.gmaterial:    ' + ifdt.properties.gmaterial);
                                            //  CORRECTIVE FACTORS - MATERIAL
                                            if (ifdt.properties.gmaterial !== undefined &&
                                                ifdt.properties.gmaterial.length > 0 &&
                                                ifdt.properties.gmaterial[i] !== null &&
                                                ifdt.properties.gmaterial[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.Material.Na.scoring) {
                                                    // //debug(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, ''))
                                                    if (score !== undefined && score !== null) {
                                                        // //debug('score ' + score);
                                                        // //debug('ifdt.gmaterial ' + ifdt.properties.gmaterial[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, ''));
                                                        if (ifdt.properties.gmaterial[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.Material.Na.scoring[score];
                                                            // //debug(score + ' ' + form.formulaSpec[f].CorrectiveFactors.Material.Na.scoring[score]);
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }

                                            } else {

                                                totalScoring *= 0.98;
                                            }
                                            //  CORRECTIVE FACTORS - VEGETATION
                                            if (ifdt.properties.gtypevegetation !== undefined && ifdt.properties.gtypevegetation.length > 0 &&
                                                ifdt.properties.gtypevegetation[i] !== null &&
                                                ifdt.properties.gtypevegetation[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.Vegetation.Na.scoring) {
                                                    // //debug(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, ''))
                                                    if (score !== undefined && score !== null) {
                                                        // //debug('score ' + score);
                                                        // //debug('ifdt.gtypevegetation ' + ifdt.properties.gtypevegetation[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, ''));
                                                        if (ifdt.properties.gtypevegetation[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.Vegetation.Na.scoring[score];
                                                            // //debug(score + ' ' + form.formulaSpec[f].CorrectiveFactors.Vegetation.Na.scoring[score]);
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }
                                            } else {

                                                totalScoring *= 0.8;
                                            }

                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? null : totalScoring;
                                            valueconditionsr.push(totalScoring / 100);
                                            ////debug(totalScoring + '\n');
                                        } else {
                                            valueconditionsr.push("");
                                        }
                                    }
                                    // //debug(valueconditionsr);
                                    ///////////////////////FINAL//////////////////////////////////////////////

                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    tracksUpdated++;
                    var conditions = {
                        _id: ifdt._id
                    };
                    var query = {
                        $set: {
                            "properties.gcondition": valueconditionsr
                        }
                    }
                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {}
                    });
                }
                // res.status(200).jsonp(ret);
            });
            tracksUpdated2 = tracksUpdated;
            ret.tracksUpdated = tracksUpdated;
            await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }
                for (var ifdt of ifdts) {
                    tracksUpdated2++;
                    var valueconditionsr = [];
                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        var coincidencias = 0;
                        for (var f = 0; f < form.formulaSpec.length; f++) {
                            var totalScoring = Number.MAX_VALUE;
                            switch (form.formulaSpec[f].name) {
                                case 'Retaining_Walls':
                                    //////////////////////INICIO///////////////////////////////
                                    if (ifdt.properties.gcode2.length > 0) {
                                        if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2 !== [] &&
                                            ifdt.properties.gcode2[i] !== null &&
                                            ifdt.properties.gcode2[i] !== "") {
                                            var numberOfScores = 0;
                                            var numberOfTypeOfFailureProcess = 0;
                                            if (ifdt.properties.gtypefailure2.length > 0) {
                                                for (TypeOfFailureProcess1 in form.formulaSpec[f].Damages.TypeOfFailureProcess) {
                                                    form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight
                                                    if (TypeOfFailureProcess1 !== undefined && TypeOfFailureProcess1 !== null) {
                                                        for (score in form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring) {
                                                            if (ifdt.properties.gtypefailure2[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                if (ifdt.properties.gintensityfailure[i].toString().toUpperCase().indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                    coincidencias++;
                                                                    totalScoring = totalScoring < form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight ?
                                                                        totalScoring : form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight;
                                                                    esnull = true;
                                                                    numberOfScores++;
                                                                    totalScoring *= (Number(ifdt.properties.gextentfailure2[i]) != ifdt.properties.gextentfailure2[i] || ifdt.properties.gextentfailure2[i] === 0) ? 1.00 : (
                                                                        (ifdt.properties.gextentfailure2[i] <= 0.2 * 100) ? 1 : ((ifdt.properties.gextentfailure2[i] <= 0.4 * 100) ? 0.9 : (
                                                                            (ifdt.properties.gextentfailure2[i] <= 0.6 * 100) ? 0.8 : ((ifdt.properties.gextentfailure2[i] <= 0.8 * 100) ? 0.7 : (0.5)))));
                                                                }

                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                totalScoring = 100;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? 100 : totalScoring;
                                            // Existance of several damages
                                            if (numberOfScores > 2) {
                                                totalScoring *= 0.9;
                                            } else {
                                                // existance of several damages
                                                totalScoring *= (-0.1 * numberOfScores) / 3 + 1;
                                            }
                                            //  CORRECTIVE FACTORS - MATERIAL
                                            if (ifdt.properties.gmaterial2 !== undefined &&
                                                ifdt.properties.gmaterial2.length > 0 &&
                                                ifdt.properties.gmaterial2[i] !== null &&
                                                ifdt.properties.gmaterial2[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.Material.Na.scoring) {
                                                    if (score !== undefined && score !== null) {
                                                        if (ifdt.properties.gmaterial2[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.Material.Na.scoring[score];
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }

                                            } else {

                                                totalScoring *= 0.98;
                                            }
                                            //  CORRECTIVE FACTORS - VEGETATION
                                            if (ifdt.properties.gtypevegetation2 !== undefined && ifdt.properties.gtypevegetation2.length > 0 &&
                                                ifdt.properties.gtypevegetation2[i] !== null &&
                                                ifdt.properties.gtypevegetation2[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.Vegetation.Na.scoring) {
                                                    if (score !== undefined && score !== null) {
                                                        if (ifdt.properties.gtypevegetation2[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.Vegetation.Na.scoring[score];
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }
                                            } else {
                                                totalScoring *= 0.8;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? null : totalScoring;
                                            valueconditionsr.push(totalScoring / 100);
                                        } else {
                                            valueconditionsr.push("");
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    tracksUpdated++;
                    var conditions = {
                        _id: ifdt._id
                    };

                    var query = {
                        $set: {
                            "properties.gcondition2": valueconditionsr
                        }
                    }

                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {
                            //debug(err.message);
                        }
                        // //debug(iup);  
                    });
                }
                // res.status(200).jsonp(ret);
            });

            tracksUpdated2 = tracksUpdated;
            ret.tracksUpdated = tracksUpdated;
            res.status(200).jsonp(ret);
            break;
        case 'Cuttings_Embankments':
            await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }
                for (var ifdt of ifdts) {
                    tracksUpdated2++;
                    var valueconditionsr = [];
                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        var coincidencias = 0;
                        for (var f = 0; f < form.formulaSpec.length; f++) {
                            var totalScoring = Number.MAX_VALUE;
                            switch (form.formulaSpec[f].name) {
                                case 'Cuttings_Embankments':
                                    if (ifdt.properties.gcode.length > 0) {
                                        if (ifdt.properties.gcode !== undefined && ifdt.properties.gcode !== [] &&
                                            ifdt.properties.gcode[i] !== null &&
                                            ifdt.properties.gcode[i] !== "") {

                                            var numberOfScores = 0;
                                            var numberOfTypeOfFailureProcess = 0;
                                            if (ifdt.properties.gtypefailure.length > 0) {
                                                for (TypeOfFailureProcess1 in form.formulaSpec[f].Damages.TypeOfFailureProcess) {
                                                    if (TypeOfFailureProcess1 !== undefined && TypeOfFailureProcess1 !== null) {
                                                        for (score in form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring) {
                                                            if (ifdt.properties.gtypefailure[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                if (ifdt.properties.gintensityfailure[i].toString().toUpperCase().indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                    coincidencias++;
                                                                    totalScoring = totalScoring < form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight ?
                                                                        totalScoring : form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight;
                                                                    esnull = true;
                                                                    numberOfScores++;
                                                                    totalScoring *= (Number(ifdt.properties.gextentfailure[i]) != ifdt.properties.gextentfailure[i] || ifdt.properties.gextentfailure[i] === 0) ? 1.00 : (
                                                                        (ifdt.properties.gextentfailure[i] <= 0.2 * 100) ? 1 : ((ifdt.properties.gextentfailure[i] <= 0.4 * 100) ? 0.9 : (
                                                                            (ifdt.properties.gextentfailure[i] <= 0.6 * 100) ? 0.8 : ((ifdt.properties.gextentfailure[i] <= 0.8 * 100) ? 0.7 : (0.5)))));
                                                                }

                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                totalScoring = 100;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? 100 : totalScoring;
                                            // Existance of several damages
                                            if (numberOfScores > 2) {
                                                totalScoring *= 0.9;
                                            } else {
                                                // existance of several damages
                                                totalScoring *= (-0.1 * numberOfScores) / 3 + 1;
                                            }
                                            //  CORRECTIVE FACTORS - SizeOfBlocks
                                            if (ifdt.properties.gblocks !== undefined &&
                                                ifdt.properties.gblocks.length > 0 &&
                                                ifdt.properties.gblocks[i] !== null &&
                                                ifdt.properties.gblocks[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.SizeOfBlocks.Na.scoring) {
                                                    if (score !== undefined && score !== null) {
                                                        if (ifdt.properties.gblocks[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.SizeOfBlocks.Na.scoring[score];
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }

                                            } else {

                                                totalScoring *= 0.98;
                                            }
                                            //  CORRECTIVE FACTORS - VEGETATION
                                            if (ifdt.properties.gtypevegetation !== undefined && ifdt.properties.gtypevegetation.length > 0 &&
                                                ifdt.properties.gtypevegetation[i] !== null &&
                                                ifdt.properties.gtypevegetation[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.Vegetation.Na.scoring) {
                                                    if (score !== undefined && score !== null) {
                                                        if (ifdt.properties.gtypevegetation[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.Vegetation.Na.scoring[score];
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }
                                            } else {

                                                totalScoring *= 0.8;
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? null : totalScoring;
                                            valueconditionsr.push(totalScoring / 100);
                                        } else {
                                            valueconditionsr.push("");
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    tracksUpdated++;
                    var conditions = {
                        _id: ifdt._id
                    };
                    var query = {
                        $set: {
                            "properties.gcondition": valueconditionsr
                        }
                    }
                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {}
                    });
                }
            });

            tracksUpdated2 = tracksUpdated;
            ret.tracksUpdated = tracksUpdated;
            await Infodatatrack.find({}, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }
                for (var ifdt of ifdts) {
                    tracksUpdated2++;
                    var valueconditionsr = [];
                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        var coincidencias = 0;
                        ////debug(form.formulaSpec.length);
                        for (var f = 0; f < form.formulaSpec.length; f++) {
                            var totalScoring = Number.MAX_VALUE;
                            switch (form.formulaSpec[f].name) {
                                case 'Cuttings_Embankments':
                                    var AssetADebugear2 = 'S8-SG-01-CR-3213'
                                    if (ifdt.properties.gcode2 === AssetADebugear2) {
                                        debug('------------');
                                        debug('totalScoring1: ' + totalScoring);
                                    }
                                    if (ifdt.properties.gcode2 === AssetADebugear2) {
                                        debug('ifdt.properties.gcode2    :' + ifdt.properties.gcode2);
                                        debug('ifdt.properties.gtypefailure2    :' + ifdt.properties.gtypefailure2);
                                        debug('ifdt.properties.gintensityfailure2    :' + ifdt.properties.gintensityfailure2);
                                        debug('ifdt.properties.gextentfailure2    :' + ifdt.properties.gextentfailure2);
                                        debug('ifdt.properties.gblocks2    :' + ifdt.properties.gblocks2);
                                        debug('ifdt.properties.gtypevegetation2    :' + ifdt.properties.gtypevegetation2);                               
                                    }
                                    if (ifdt.properties.gcode2 === AssetADebugear2) {
                                        debug('totalScoring2: ' + totalScoring);
                                    }
                                    if (ifdt.properties.gcode2.length > 0) {
                                        if (ifdt.properties.gcode2 !== undefined && ifdt.properties.gcode2 !== [] &&
                                            ifdt.properties.gcode2[i] !== null &&
                                            ifdt.properties.gcode2[i] !== "") {
                                            var numberOfScores = 0;
                                            var numberOfTypeOfFailureProcess = 0;
                                            if (ifdt.properties.gtypefailure2.length > 0) {
                                                for (TypeOfFailureProcess1 in form.formulaSpec[f].Damages.TypeOfFailureProcess) {
                                                    if (TypeOfFailureProcess1 !== undefined && TypeOfFailureProcess1 !== null) {
                                                        for (score in form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring) {
                                                            if (ifdt.properties.gtypefailure2[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(TypeOfFailureProcess1.toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {

                                                                if (ifdt.properties.gintensityfailure2[i].toString().toUpperCase().indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                                    coincidencias++;
                                                                    totalScoring = totalScoring < form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight ?
                                                                        totalScoring : form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].scoring[score] * form.formulaSpec[f].Damages.TypeOfFailureProcess[TypeOfFailureProcess1].weight;
                                                                    esnull = true;
                                                                    numberOfScores++;
                                                                    totalScoring *= ((Number(ifdt.properties.gextentfailure2[i]) != ifdt.properties.gextentfailure2[i]) || ifdt.properties.gextentfailure2[i] === 0) ? 1.00 : (
                                                                        (ifdt.properties.gextentfailure2[i] <= 0.2 * 100) ? 1 : ((ifdt.properties.gextentfailure2[i] <= 0.4 * 100) ? 0.9 : (
                                                                            (ifdt.properties.gextentfailure2[i] <= 0.6 * 100) ? 0.8 : ((ifdt.properties.gextentfailure2[i] <= 0.8 * 100) ? 0.7 : (0.5)))));

                                                                    if (ifdt.properties.gcode2 === AssetADebugear2) {
                                                                        debug('totalScoring3: ' + totalScoring);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                totalScoring = 100;
                                            }
                                            if (ifdt.properties.gcode2 === AssetADebugear2) {
                                                debug('totalScoring4: ' + totalScoring);
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? 100 : totalScoring;
                                            // Existance of several damages
                                            if (numberOfScores > 2) {
                                                totalScoring *= 0.9;
                                            } else {
                                                // existance of several damages
                                                totalScoring *= (-0.1 * numberOfScores) / 3 + 1;
                                            }
                                            if (ifdt.properties.gcode2 === AssetADebugear2) {
                                                debug('totalScoring5: ' + totalScoring);
                                            }
                                            //  CORRECTIVE FACTORS - SizeOfBlocks
                                            if (ifdt.properties.gblocks2 !== undefined &&
                                                ifdt.properties.gblocks2.length > 0 &&
                                                ifdt.properties.gblocks2[i] !== null &&
                                                ifdt.properties.gblocks2[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.SizeOfBlocks.Na.scoring) {
                                                    if (score !== undefined && score !== null) {
                                                        if (ifdt.properties.gblocks2[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.SizeOfBlocks.Na.scoring[score];
                                                        } else {

                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }
                                            } else {
                                                totalScoring *= 0.98;
                                            }
                                            if (ifdt.properties.gcode2 === AssetADebugear2) {
                                                debug('totalScoring6: ' + totalScoring);
                                            }
                                            //  CORRECTIVE FACTORS - VEGETATION
                                            if (ifdt.properties.gtypevegetation2 !== undefined && ifdt.properties.gtypevegetation2.length > 0 &&
                                                ifdt.properties.gtypevegetation2[i] !== null &&
                                                ifdt.properties.gtypevegetation2[i] !== "") {
                                                for (score in form.formulaSpec[f].CorrectiveFactors.Vegetation.Na.scoring) {
                                                    if (score !== undefined && score !== null) {
                                                        if (ifdt.properties.gtypevegetation2[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.Vegetation.Na.scoring[score];
                                                        } else {
                                                            totalScoring *= 1;
                                                        }
                                                    }
                                                }
                                            } else {

                                                totalScoring *= 0.8;
                                            }
                                            if (ifdt.properties.gcode2 === AssetADebugear2) {
                                                debug('totalScoring7: ' + totalScoring);
                                            }
                                            totalScoring = (totalScoring === Number.MAX_VALUE) ? null : totalScoring;
                                            valueconditionsr.push(totalScoring / 100);
                                        } else {
                                            valueconditionsr.push("");
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    tracksUpdated++;
                    var conditions = {
                        _id: ifdt._id
                    };

                    var query = {
                        $set: {
                            "properties.gcondition2": valueconditionsr
                        }
                    }

                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {}
                    });
                }
            });

            tracksUpdated2 = tracksUpdated;
            ret.tracksUpdated = tracksUpdated;
            //debug('tracksUpdated: ' + tracksUpdated);
            res.status(200).jsonp(ret);
            break;



        case 'Bridges':
            // //debug(form);
            // Infodatatrack.find({}, selectjson).exec(function (err, ifdts) {
            await Infodatatrack.find({
                // _id: ObjectId("59ca119c100b7d4adb8ecb9a")
            }, selectjson).exec(async function (err, ifdts) {
                if (err) {
                    res.send(500, err.message);
                }
                AssetADebugear = 'S8-SG-01-B-15-NOENTRES';
                for (var ifdt of ifdts) {
                    tracksUpdated2++;
                    var valueconditionsr = [];

                    for (var i = 0; i < ifdt.geometry.coordinates.length; i++) {
                        // console.log('i:     ' + i);
                        var coincidencias = 0;
                        var coincidenciasMechanical = 0;
                        var coincidenciasDurable = 0;
                        ////debug(form.formulaSpec.length);
                        for (var f = 0; f < form.formulaSpec.length; f++) {
                            var totalScoring = Number.MAX_VALUE;
                            switch (form.formulaSpec[f].name) {
                                case 'Bridges':

                                    if (ifdt.properties.bcode[i] === AssetADebugear) {
                                        debug('bcode:   ' + ifdt.properties.bcode[i]);
                                        debug('bdamagesfoundationsgeneraltype:   ' + ifdt.properties.bdamagesfoundationsgeneraltype[i]);
                                        debug('bdamagesfoundationsdetailedtype:   ' + ifdt.properties.bdamagesfoundationsdetailedtype[i]);
                                        debug('BDamagesslabSeverity:   ' + ifdt.properties.BDamagesslabSeverity[i]);
                                        debug('bdamagesfoundationsdetailedtype:   ' + ifdt.properties.bdamagesfoundationsdetailedtype[i]);
                                        debug('bdamagesfoundationsdetailedtype:   ' + ifdt.properties.bdamagesfoundationsdetailedtype[i]);
                                        debug('BDamagesslabSeverity:   ' + ifdt.properties.BDamagesslabSeverity[i]);
                                        debug('BDamagesPiersSeverity:   ' + ifdt.properties.BDamagesPiersSeverity[i]);
                                        debug('BDamagesBearingsSeverity:   ' + ifdt.properties.BDamagesBearingsSeverity[i]);
                                        debug('BDamagesAbutmentsSeverity:   ' + ifdt.properties.BDamagesAbutmentsSeverity[i]);
                                        debug('BDamagessidewallsSeverity:   ' + ifdt.properties.BDamagessidewallsSeverity[i]);
                                        debug('BDamagesVaultArchesSeverity:   ' + ifdt.properties.BDamagesVaultArchesSeverity[i]);
                                        debug('BDamagesSpandrelSeverity:   ' + ifdt.properties.BDamagesSpandrelSeverity[i]);
                                        debug('BDamagesSpecialareasSeverity:   ' + ifdt.properties.BDamagesSpecialareasSeverity[i]);
                                        debug('BDamagesBeamsSeverity:   ' + ifdt.properties.BDamagesBeamsSeverity[i]);
                                        debug('BDamagesSlab:   ' + ifdt.properties.BDamagesSlab[i]);
                                        debug('BDamagesPiers:   ' + ifdt.properties.BDamagesPiers[i]);
                                        debug('BDamagesBearings:   ' + ifdt.properties.BDamagesBearings[i]);
                                        debug('BDamagesAbutments:   ' + ifdt.properties.BDamagesAbutments[i]);
                                        debug(' form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay:               ' + form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay);
                                        debug(' ifdt.properties.bdamagesfoundationsgeneraltype:               ' + ifdt.properties.bdamagesfoundationsgeneraltype[i]);
                                        debug(' ifdt.properties.bdamagesfoundationsdetailedtype:               ' + ifdt.properties.bdamagesfoundationsdetailedtype[i]);
                                        debug(ifdt.properties.bcode !== undefined);
                                        debug(ifdt.properties.bcode !== null);
                                        debug(ifdt.properties.bcode.length !== 0);
                                        debug(ifdt.properties.bcode[i] !== undefined);
                                        debug(ifdt.properties.bcode[i] !== null);
                                        debug(ifdt.properties.bcode[i] !== "");
                                        debug(ifdt.properties.bcode[i].length !== 0);
                                        debug(' ifdt.properties.bdamagesfoundationsgeneraltype:               ' + ifdt.properties.bdamagesfoundationsgeneraltype[i]);
                                    }
                                    //////////////////////INICIO///////////////////////////////
                                    // //debug('ifdt.properties.bcode.length: ' + ifdt.properties.bcode.length);
                                    // if (true) {

                                    if (ifdt.properties.bcode !== undefined &&
                                        ifdt.properties.bcode !== null &&
                                        ifdt.properties.bcode.length !== 0 &&
                                        ifdt.properties.bcode[i] !== undefined &&
                                        ifdt.properties.bcode[i] !== null &&
                                        ifdt.properties.bcode[i] !== "" &&
                                        ifdt.properties.bcode[i].length !== 0) {
                                        var numberOfScores = 0;
                                        var numberOfTypeOfFailureProcess = 0;
                                        if (form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay !== undefined &&
                                            form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay.scoring[0] !== undefined &&
                                            ifdt.properties.bdamagesfoundationsgeneraltype !== undefined && ifdt.properties.bdamagesfoundationsgeneraltype.length !== 0 &&
                                            ifdt.properties.bdamagesfoundationsgeneraltype[i] !== undefined && ifdt.properties.bdamagesfoundationsgeneraltype[i].length !== 0) {
                                            //debug(form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay.scoring);
                                            for (x in form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay.scoring) {
                                                if (x.toString() !== undefined &&
                                                    ifdt.properties.bdamagesfoundationsdetailedtype[x.toString()] === undefined) {
                                                    // totalScoring = 0.85 * form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay.weight;
                                                } else {

                                                    if (x.toString().indexOf("echanical") > -1) {
                                                        coincidenciasMechanical++;
                                                    } else if (x.toString().indexOf("urable") > -1) {
                                                        coincidenciasDurable++;
                                                    }
                                                    coincidencias++;
                                                    totalScoring = totalScoring < form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay.scoring[x] * form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay.weight ?
                                                        totalScoring : form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay.scoring[x] * form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationGroundDecay.weight;

                                                    if (ifdt.properties.bcode[i] === AssetADebugear) {
                                                        debug(' totalScoring1:            ' + totalScoring);
                                                        debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                                        debug(' coincidenciasDurable:    ' + coincidenciasDurable);

                                                    }
                                                    if (ifdt.properties.bcode[i] === AssetADebugear) {
                                                        debug(' ifdt.properties.BDamagesslabSeverity[i]:               ' + ifdt.properties.BDamagesslabSeverity[i]);
                                                        debug(' ifdt.properties.bdamagesfoundationsdetailedtype[x.toString()]:               ' + ifdt.properties.bdamagesfoundationsdetailedtype[x.toString()]);

                                                    }
                                                }
                                            }
                                        }
                                        // debug('totalScoring2:  ' + totalScoring);
                                        if (form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationDecay !== undefined &&
                                            form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationDecay.scoring[0] !== undefined &&
                                            ifdt.properties.BDamagesslabSeverity !== undefined && ifdt.properties.BDamagesslabSeverity.length > 0 &&
                                            ifdt.properties.BDamagesslabSeverity[i] !== undefined && ifdt.properties.BDamagesslabSeverity[i].length !== 0) {
                                            for (x in form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationDecay.scoring) {
                                                if (x.toString() !== undefined &&
                                                    ifdt.properties.bdamagesfoundationsdetailedtype[x.toString()] === undefined) {;
                                                } else {

                                                    if (x.toString().indexOf("echanical") > -1) {
                                                        coincidenciasMechanical++;
                                                    } else if (x.toString().indexOf("urable") > -1) {
                                                        coincidenciasDurable++;
                                                    }
                                                    coincidencias++;
                                                    totalScoring = totalScoring < form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationDecay.scoring[x] * form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationDecay.weight ?
                                                        totalScoring : form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationDecay.scoring[x] * form.formulaSpec[f].MainFactor.Damages.DamagesOnFoundations.FromFoundationDecay.weight;
                                                    if (ifdt.properties.bcode[i] === AssetADebugear) {
                                                        debug(' totalScoring2:            ' + totalScoring);
                                                        debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                                        debug(' coincidenciasDurable:    ' + coincidenciasDurable);

                                                    }
                                                }
                                            }
                                        }
                                        // debug('totalScoring3:  ' + totalScoring);
                                        // Mechanical Defects, Durable Defects
                                        var z1 = ["BDamagesSlab", "BDamagesPiers", "BDamagesBearings", "BDamagesAbutments", "BDamagesSidewalls", "bdamagesvaultsarchesmechanicaldurable", "BDamagesSpandrel", "BDamagesSpecialareas", "BDamagesBeams"];

                                        //  Very High, High, Medium, Low, Unknown 
                                        var z2 = ["BDamagesslabSeverity", "BDamagesPiersSeverity", "BDamagesBearingsSeverity", "BDamagesAbutmentsSeverity", "BDamagessidewallsSeverity", "BDamagesVaultArchesSeverity", "BDamagesSpandrelSeverity", "BDamagesSpecialareasSeverity", "BDamagesBeamsSeverity"];
                                        var k = 0;
                                        if (ifdt.properties.bcode[i] === AssetADebugear) {
                                            debug('form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements:');
                                            debug(form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements)
                                        }
                                        for (y in form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements) {
                                            var FACTOR = Number.MAX_VALUE;
                                            if (ifdt.properties.bcode[i] === AssetADebugear) {
                                                debug('----------' + k);
                                                debug(y);
                                                debug(z2[k]);
                                                debug(' ifdt.properties[z2[k]][i]:            ' + ifdt.properties[z2[k]][i]);
                                                debug(z1[k]);
                                                debug(' ifdt.properties[z1[k]][i]: ' + ifdt.properties[z1[k]][i]);
                                                debug(ifdt.properties[z2[k]][i] !== undefined);
                                                debug(ifdt.properties[z1[k]][i] !== undefined);
                                                debug(ifdt.properties[z2[k]][i] !== '');
                                                debug(ifdt.properties[z1[k]][i] !== '');
                                                debug(capitalizeFirstLetter(ifdt.properties[z2[k]][i]) !== undefined);
                                                debug(capitalizeFirstLetter(ifdt.properties[z1[k]][i]) !== undefined);
                                                // debug(ifdt.properties[z1[k]][i].replace('Durability','Durable'));
                                                debug(capitalizeFirstLetter(ifdt.properties[z1[k]][i]));
                                                debug(form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements[y]);
                                                // debug(form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements[y][capitalizeFirstLetter(ifdt.properties[z1[k]][i].replace('Durability', 'Durable'))] !== undefined);
                                            }
                                            if (
                                                ifdt.properties[z2[k]][i] !== undefined &&
                                                ifdt.properties[z1[k]][i] !== undefined &&
                                                ifdt.properties[z2[k]][i] !== '' &&
                                                ifdt.properties[z1[k]][i] !== '' &&
                                                capitalizeFirstLetter(ifdt.properties[z2[k]][i]) !== undefined &&
                                                capitalizeFirstLetter(ifdt.properties[z1[k]][i]) !== undefined &&
                                                form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements[y][capitalizeFirstLetter(ifdt.properties[z1[k]][i].replace('Durability', 'Durable'))] !== undefined
                                            ) {
                                                FACTOR = form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements[y].weight * form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements[y][capitalizeFirstLetter(ifdt.properties[z1[k]][i].replace('Durability', 'Durable'))].scoring[capitalizeFirstLetter(ifdt.properties[z2[k]][i])];
                                                coincidencias++;
                                                if (ifdt.properties[z1[k]][i].indexOf("echan") > -1 ||
                                                    ifdt.properties[z1[k]][i].indexOf("o bearing") > -1 ||
                                                    ifdt.properties[z1[k]][i].indexOf("rings displac") > -1) {
                                                    coincidenciasMechanical++;
                                                } else if (ifdt.properties[z1[k]][i].indexOf("urab") > -1 ||
                                                    ifdt.properties[z1[k]][i].indexOf("rings de") > -1 ||
                                                    ifdt.properties[z1[k]][i].indexOf("ther da") > -1) {
                                                    coincidenciasDurable++;
                                                }
                                                totalScoring = totalScoring < FACTOR ? totalScoring : FACTOR;
                                                if (ifdt.properties.bcode[i] === AssetADebugear) {
                                                    debug(' totalScoring3:            ' + totalScoring);
                                                    debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                                    debug(' coincidenciasDurable:    ' + coincidenciasDurable);
                                                    debug(' z1[k]:    ' + z1[k]);
                                                    debug(' z2[k]:    ' + z2[k]);
                                                    // debug('form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements' + JSON.stringify(form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements));
                                                    // debug(form.formulaSpec[f].MainFactor.Damages.DamagesOnStructuralElements[y][capitalizeFirstLetter(ifdt.properties[z1[k]][i]));

                                                }
                                            } else {

                                            }
                                            k++;
                                        }

                                        //debug('coincidencias despues: ' + coincidencias)
                                        // **************************
                                        // debug('totalScoring3.1:  ' + totalScoring);
                                        if (ifdt.properties.bdamagesnonstructural[i] === undefined) {
                                            totalScoring = 0.85 * form.formulaSpec[f].MainFactor.Damages.DamagesOnNonStructuralElements.DamagesOnNonStructuralElement.weight;
                                        } else {

                                            coincidencias++;
                                            if (ifdt.properties.bdamagesnonstructural[i] === 'NoDamages') {
                                                totalScoring = totalScoring < 100 ? totalScoring : 100;
                                            } else {
                                                totalScoring = totalScoring < 95 ? totalScoring : 95;
                                            }
                                            if (ifdt.properties.bcode[i] === AssetADebugear) {
                                                debug(' totalScoring4:            ' + totalScoring);
                                                debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                                debug(' coincidenciasDurable:    ' + coincidenciasDurable);

                                            }
                                        }
                                        // debug('totalScoring4:  ' + totalScoring);
                                        /////////////////////////////////////////////////////////////////
                                        // =(0.0018 * (x) ^ 3) - 0.0305 * (x) ^ 2) + 0.0302 * (x) + 0.9862) * L101
                                        //
                                        if (coincidenciasMechanical !== 0) {
                                            totalScoring *= 0.0018000000000 * Math.pow(coincidenciasMechanical, 3) - 0.0305000000000 * Math.pow(coincidenciasMechanical, 2) + 0.0302000000000 * Math.pow(coincidenciasMechanical, 1) + 0.9862000000000;
                                        }
                                        if (coincidenciasDurable > 2) {
                                            totalScoring *= -0.0214 * coincidenciasDurable + 1.0643;
                                        }
                                        if (ifdt.properties.bcode[i] === AssetADebugear) {
                                            debug(' totalScoring5:            ' + totalScoring);
                                            debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                            debug(' coincidenciasDurable:    ' + coincidenciasDurable);

                                        }
                                        // 
                                        /////////////////////////////////////////////////////////////////

                                        totalScoring = (totalScoring === Number.MAX_VALUE) ? 100 : totalScoring;
                                        if (ifdt.properties.bcode[i] === AssetADebugear) {
                                            debug(' totalScoring6:            ' + totalScoring);
                                            debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                            debug(' coincidenciasDurable:    ' + coincidenciasDurable);

                                        }
                                        // debug('totalScoring5:  ' + totalScoring);
                                        // //debug(totalScoring);
                                        //  CORRECTIVE FACTORS - Bridge type
                                        if (ifdt.properties.btype !== undefined &&
                                            ifdt.properties.btype.length !== 0 &&
                                            ifdt.properties.btype[i] !== undefined &&
                                            ifdt.properties.btype[i] !== null &&
                                            ifdt.properties.btype[i] !== "") {
                                            for (score in form.formulaSpec[f].CorrectiveFactors.BridgeType.scoring) {
                                                if (score !== undefined && score !== null &&
                                                    ifdt.properties.btype[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '') !== undefined) {
                                                    if (ifdt.properties.btype[i].toString().toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '').indexOf(score.toUpperCase().replace(/[-+(.,)\s]/g, '').replace(/[^\w ]/, '')) >= 0) {
                                                        totalScoring *= form.formulaSpec[f].CorrectiveFactors.BridgeType.scoring[score];
                                                        if (ifdt.properties.bcode[i] === AssetADebugear) {
                                                            debug(score);

                                                        }
                                                    } else {

                                                        totalScoring *= 1;
                                                    }
                                                    if (ifdt.properties.bcode[i] === AssetADebugear) {
                                                        debug(' totalScoring7:            ' + totalScoring);
                                                        debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                                        debug(' coincidenciasDurable:    ' + coincidenciasDurable);

                                                    }
                                                }
                                            }

                                        } else {

                                            totalScoring *= form.formulaSpec[f].CorrectiveFactors.BridgeType.scoring['Other'];
                                            if (ifdt.properties.bcode[i] === AssetADebugear) {
                                                debug(' totalScoring8:            ' + totalScoring);
                                                debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                                debug(' coincidenciasDurable:    ' + coincidenciasDurable);

                                            }
                                        }
                                        // debug('totalScoring6:  ' + totalScoring);

                                        totalScoring = (totalScoring === Number.MAX_VALUE) ? null : totalScoring;
                                        if (ifdt.properties.bcode[i] === AssetADebugear) {
                                            debug(' totalScoring9:            ' + totalScoring);
                                            debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                            debug(' coincidenciasDurable:    ' + coincidenciasDurable);

                                        }
                                        // debug('totalScoring7:  ' + totalScoring);
                                        /**
                                         * jfcp: modificado para guardarlo en tanto por 1, puesto que Pavements se devuelve en tanto por 1 tambien
                                         */
                                        valueconditionsr.push(totalScoring / 100);
                                        if (ifdt.properties.bcode[i] === AssetADebugear) {
                                            debug(' totalScoring10:            ' + totalScoring);
                                            debug(' coincidenciasMechanical: ' + coincidenciasMechanical);
                                            debug(' coincidenciasDurable:    ' + coincidenciasDurable);

                                        }
                                        //debug('totalScoring7:  ' + totalScoring);
                                        ////debug(totalScoring + '\n');
                                    } else {
                                        valueconditionsr.push("");
                                    }
                                    // //debug(valueconditionsr);
                                    ///////////////////////FINAL//////////////////////////////////////////////

                                    break;
                                default:
                                    break;
                            }
                        }
                        // if (i === 123) { while (true) { ; } }
                    }
                    // //debug('coincidencias: ' + coincidencias);
                    tracksUpdated++;
                    //debug(valueconditionsr.toString());
                    // //debug(tracksUpdated);

                    var conditions = {
                        _id: ifdt._id
                    };
                    /** 
                     * modified jfcp: añado el guardarlo por tanto por 1
                     */
                    var query = {
                        $set: {
                            "properties.bcondition": valueconditionsr
                        }
                    }

                    await Infodatatrack.update(conditions, query, function (err, iup) {
                        if (err) {
                            //debug(err.message);
                        }
                        // //debug(iup);  

                    });





                }

                // res.status(200).jsonp(ret);
            });

            tracksUpdated2 = tracksUpdated;
            ret.tracksUpdated = tracksUpdated;
            //debug('tracksUpdated: ' + tracksUpdated);
            res.status(200).jsonp(ret);
            break;















            break;
        default:
            break;
    }

});







/* POST update_field */
router.post('/V1/update_field/', function (req, res, next) {
    //debug('API /V1/update_field/');
    var postData = extend({}, req.body);
    var ret = {
        "result": "OK"
    };
    //debug(postData);
    var value = postData[Object.keys(postData)[0]];
    var field_name = Object.keys(postData)[0];
    //debug(field_name + ": " + value);
    var sendData = {};
    var arrField = field_name.split('__');

    //debug(arrField);

    Formula.find({
        "name": arrField[0]
    }).exec(function (err, f) {
        //debug('Formula.find ' + arrField[0]);
        if (err) {
            res.send(500, err.message);
        }
        /**
         * Si es Length = 3 estoy en las formulas de primer nivel
         * Para Length = 4 estoy en el segundo level
         * Para Length = 5 estoy en scoring
         */
        // console.log(arrField[0]);
        switch (arrField[0]) {
            case 'Condition':
                var arrFieldShift = arrField.slice(0);
                arrFieldShift.shift();
                posicion = arrFieldShift.toString().replace(/,/g, '.');
                indiceJson = 0;
                var formSave = new Formula(f[0]);
                comando = 'formSave' + '.' + posicion + '=' + value;


                // console.log('\n\n\n' + comando + '\n\n\n');
                eval(comando);

                // res.send(f);
                formSave.save(function (err, fsaved) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.status(200).jsonp(ret);

                });


                break;


            case 'AssetCriticality':
                if (arrField.length == 3) {
                    for (var [key, fspec] of Object.entries(f[0].formulaSpec)) {
                        ////debug(fspec.name);
                        if (fspec.name === arrField[1]) {
                            var formSave = new Formula(f[0]);
                            // //debug('formSave: \n' + JSON.stringify(formSave));
                            // //debug(formSave.formulaSpec[key][arrField[2]].weight);
                            // //debug(key + ' ' + value);
                            formSave.formulaSpec[key][arrField[2]].weight = value;
                            formSave.save(function (err, fsaved) {
                                if (err) {
                                    return res.status(500).send(err.message);
                                }
                                res.status(200).jsonp(ret);

                            });

                        }

                    };
                } else if (arrField.length == 4) {
                    for (var [key, fspec] of Object.entries(f[0].formulaSpec)) {
                        ////debug(fspec.name);
                        if (fspec.name === arrField[1]) {
                            var formSave = new Formula(f[0]);
                            // //debug('formSave: \n' + JSON.stringify(formSave));
                            // //debug(formSave.formulaSpec[key][arrField[2]].weight);
                            // //debug(key + ' ' + value);
                            formSave.formulaSpec[key][arrField[2]][arrField[3]].weight = value;
                            formSave.save(function (err, fsaved) {
                                if (err) {
                                    return res.status(500).send(err.message);
                                }
                                res.status(200).jsonp(ret);

                            });

                        }

                    };
                } else if (arrField.length == 5) {
                    for (var [key, fspec] of Object.entries(f[0].formulaSpec)) {
                        ////debug(fspec.name);
                        if (fspec.name === arrField[1]) {
                            var formSave = new Formula(f[0]);
                            // //debug('formSave: \n' + JSON.stringify(formSave));
                            // //debug(formSave.formulaSpec[key][arrField[2]].weight);
                            // //debug(key + ' ' + value);
                            formSave.formulaSpec[key][arrField[2]][arrField[3]].scoring[arrField[4]] = value;
                            formSave.save(function (err, fsaved) {
                                if (err) {
                                    return res.status(500).send(err.message);
                                }
                                res.status(200).jsonp(ret);

                            });

                        }

                    };
                }
                break;

            case 'AssetResponse':
                var field = field_name.replace(arrField[0] + '__', '');
                //debug(field);
                var formSave = new Formula(f[0]);
                // //debug(formSave);
                // Busco el campo @field en la Formula
                for (var [k, fspec] of f[0].formulaSpec.entries()) {
                    // //debug(fspec.WEIGHTS);
                    // //debug(fspec.score);
                    if (field === fspec.WEIGHTS.fieldname) {
                        formSave.formulaSpec[k].WEIGHTS.value = value;
                        //debug(k);
                    } else if (field === fspec.score.fieldname) {
                        formSave.formulaSpec[k].score.value = value;
                        //debug(k);

                    }
                }
                formSave.save(function (err, fsaved) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.status(200).jsonp(ret);

                });
                break;

            case 'AssetSensitivity':
                var field = field_name.replace(arrField[0] + '__', '');
                //debug(field);
                var formSave = new Formula(f[0]);
                // //debug(formSave);
                // Busco el campo @field en la Formula
                for (var [k, fspec] of f[0].formulaSpec.entries()) {
                    // //debug(fspec.WEIGHTS);
                    // //debug(fspec.score);
                    if (field === fspec.WEIGHTS.fieldname) {
                        formSave.formulaSpec[k].WEIGHTS.value = value;
                        //debug(k);
                    }
                }
                formSave.save(function (err, fsaved) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.status(200).jsonp(ret);

                });
                break;
            case 'Likelihood':
                var field = field_name.replace(arrField[0] + '__', '');
                //debug(field);
                var formSave = new Formula(f[0]);
                // //debug(formSave);
                // Busco el campo @field en la Formula
                for (var [k, fspec] of f[0].formulaSpec.entries()) {
                    // //debug(fspec.WEIGHTS);
                    // //debug(fspec.score);
                    if (field === fspec.WEIGHTS.fieldname) {
                        formSave.formulaSpec[k].WEIGHTS.value = value;
                        //debug(k);
                    }
                }
                formSave.save(function (err, fsaved) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.status(200).jsonp(ret);

                });
                break;
            case 'Risk':
                var field = field_name.replace(arrField[0] + '__', '');
                //debug(field);
                var formSave = new Formula(f[0]);
                // //debug(formSave);
                // Busco el campo @field en la Formula
                for (var [k, fspec] of f[0].formulaSpec.entries()) {
                    // //debug(fspec.WEIGHTS);
                    // //debug(fspec.score);
                    if (fspec.WEIGHTS !== undefined &&
                        fspec.WEIGHTS.fieldname !== undefined &&
                        field === fspec.WEIGHTS.fieldname) {
                        formSave.formulaSpec[k].WEIGHTS.value = value;
                        //debug(k);
                    }
                }
                formSave.save(function (err, fsaved) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.status(200).jsonp(ret);

                });
                break;

            default:
                break;
        }

    });

});
/* POST get_formulas_tracks */
router.post('/V1/get_formulas_tracks/', function (req, res, next) {
    // //debug('API /V1/update_field/');
    var postData = extend({}, req.body);
    debug('postData: ');
    debug(postData);
    debug(postData.formname);
    var ret = {
        "result": "OK"
    };

    switch (postData.formname) {
        case 'Criticality':
            //debug('Criticality');
            var orArr = [];
            var orAssetArr = [];
            var andArr = [];
            var catArr = [];
            var promises = [];

            for (var f of postData.filter) {
                switch (f) {
                    case 'Bridge':
                        for (var f of postData.form) {
                            // //debug(f);
                            // //debug(formulasService.criticalityValue(f).score.min);
                            // //debug(formulasService.criticalityValue(f).score.max);
                            orArr.push({
                                "properties.bcriticality": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.bcode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // //debug(catArr);


                        break;
                    case 'Culvert':
                        for (var f of postData.form) {
                            // //debug(f);
                            // //debug(formulasService.criticalityValue(f).score.min);
                            // //debug(formulasService.criticalityValue(f).score.max);
                            orArr.push({
                                "properties.Ccriticality": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.Ccode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // //debug(catArr);

                        break;
                    case 'Geotechnical':
                        for (var f of postData.form) {
                            // //debug(f);
                            // //debug(formulasService.criticalityValue(f).score.min);
                            // //debug(formulasService.criticalityValue(f).score.max);
                            orArr.push({
                                "properties.gcriticality": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                            orArr.push({
                                "properties.gcriticality2": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.gcode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        orAssetArr.push({
                            "properties.gcode2": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // //debug(catArr);
                        break;

                    default:
                        for (var f of postData.form) {
                            // //debug(f);
                            // //debug(formulasService.criticalityValue(f).score.min);
                            // //debug(formulasService.criticalityValue(f).score.max);
                            orArr.push({
                                "properties.rcriticality": {
                                    $gte: formulasService.criticalityValue(f).score.min,
                                    $lt: formulasService.criticalityValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.rcategory": {
                                $in: postData.filterPav
                            }
                        });
                        // //debug(catArr);



                        break;
                }


            }
            andArr.push({
                $or: orAssetArr
            });
            andArr.push({
                $or: orArr
            });

            //debug(JSON.stringify(andArr));

            promises.push(Infodatatrack.find({
                $and: andArr

            }).exec(function (err, tracks) {
                if (err) {
                    res.send(500, err.message);
                }
                //debug(tracks.length);
                return tracks;

            }));

            Promise.all(promises).then(function (values) {
                var tracks = [];
                var resultados = [];
                var ant = 0;
                var antBridge = 0;
                var antCulvert = 0;
                var antGeo = 0;
                var antGeo2 = 0;
                var geoJson = {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    properties: {
                        rcriticality: [],
                        name: ""
                    }
                };
                var geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                var geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                var geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                var geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                var geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));

                if (values.length !== 0) {
                    values.forEach(function (val, index) {
                        for (var v of val) {
                            // //debug(v.properties.name);
                            ant = 0;
                            antBridge = 0;
                            antCulvert = 0;
                            antGeo = 0;
                            antGeo2 = 0;
                            for (var [key, cval] of v.geometry.coordinates.entries()) {
                                for (var f of postData.form) {
                                    for (var filter of postData.filter) {
                                        switch (filter) {
                                            case 'Bridge':
                                                if (v.properties.bcriticality[key] !== null &&
                                                    v.properties.bcriticality[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.bcriticality[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (antBridge == 0) antBridge = key - 1;
                                                    if (key !== (antBridge + 1)) {
                                                        // //debug('-- new geojson --');
                                                        tracks.push(geoJsonBri);
                                                        geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // //debug('--- Add Coord Bri---' + key + ' : ant ' + (antBridge + 1) + ' - ' + cval + ' #Crit: ' + v.properties.bcriticality[key] + ' - ' + f);
                                                    geoJsonBri.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    geoJsonBri.properties['marker-color'] = formulasService.conditionValue(f).score.color;
                                                    antBridge = key;
                                                }
                                                break;
                                            case 'Culvert':
                                                if (v.properties.Ccriticality[key] !== null &&
                                                    v.properties.Ccriticality[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.Ccriticality[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (antCulvert == 0) antCulvert = key - 1;
                                                    if (key !== (antCulvert + 1)) {
                                                        // //debug('-- new geojson --');
                                                        tracks.push(geoJsonCul);
                                                        geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // //debug('--- Add Coord Cul---' + key + ' : ant ' + (antCulvert + 1) + ' - ' + cval + ' #Crit: ' + v.properties.Ccriticality[key] + ' - ' + f);
                                                    geoJsonCul.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonCul.geometry.coordinates.push(cval);
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    geoJsonBri.properties['marker-color'] = formulasService.conditionValue(f).score.color;
                                                    antCulvert = key;
                                                }
                                                break;
                                            case 'Geotechnical':
                                                if (v.properties.gcriticality[key] !== null &&
                                                    v.properties.gcriticality[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.gcriticality[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (antGeo == 0) antGeo = key - 1;
                                                    if (key !== (antGeo + 1)) {
                                                        // //debug('-- new geojson --');
                                                        tracks.push(geoJsonGeo);
                                                        geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // //debug('--- Add Coord Geo---' + key + ' : ant ' + (antGeo + 1) + ' - ' + cval + ' #Crit: ' + v.properties.gcriticality[key] + ' - ' + f);
                                                    geoJsonGeo.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonGeo.geometry.coordinates.push(cval);
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    geoJsonBri.properties['marker-color'] = formulasService.conditionValue(f).score.color;
                                                    antGeo = key;
                                                }
                                                if (v.properties.gcriticality2[key] !== null &&
                                                    v.properties.gcriticality2[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.gcriticality2[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (antGeo2 == 0) antGeo2 = key - 1;
                                                    if (key !== (antGeo2 + 1)) {
                                                        // //debug('-- new geojson --');
                                                        tracks.push(geoJsonGeo2);
                                                        geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // //debug('--- Add Coord Geo2---' + key + ' : ant ' + (antGeo2 + 1) + ' - ' + cval + ' #Crit: ' + v.properties.gcriticality2[key] + ' - ' + f);
                                                    geoJsonGeo2.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonGeo2.geometry.coordinates.push(cval);
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    geoJsonBri.properties['marker-color'] = formulasService.conditionValue(f).score.color;
                                                    antGeo2 = key;
                                                }
                                                break;
                                            default:
                                                if (v.properties.rcriticality[key] !== null &&
                                                    v.properties.rcriticality[key] >= formulasService.criticalityValue(f).score.min &&
                                                    v.properties.rcriticality[key] < formulasService.criticalityValue(f).score.max) {
                                                    if (ant == 0) ant = key - 1;
                                                    if (key !== (ant + 1)) {
                                                        // //debug('-- new geojson --');
                                                        tracks.push(geoJsonPav);
                                                        geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // //debug('--- Add Coord Pav ---' + key + ' : ant ' + (ant + 1) + ' - ' + cval + ' #Crit: ' + v.properties.rcriticality[key] + ' - ' + f);
                                                    geoJsonPav.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonPav.geometry.coordinates.push(cval);
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    geoJsonBri.properties['marker-color'] = formulasService.conditionValue(f).score.color;
                                                    ant = key;
                                                }
                                                break;
                                        }
                                    }

                                }
                                if (key + 1 == v.geometry.coordinates.length) {
                                    // //debug('-- new geojson --')
                                    tracks.push(geoJsonPav);
                                    tracks.push(geoJsonBri);
                                    tracks.push(geoJsonCul);
                                    tracks.push(geoJsonGeo);
                                    tracks.push(geoJsonGeo2);
                                    geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));
                                }

                            }
                            // tracks.push(v);
                        }
                    });
                }
                // //debug(tracks.length);

                res.status(200).jsonp(tracks);

            });

            break;

        case 'Condition':
            //debug('Condition');
            var orArr = [];
            var orAssetArr = [];
            var andArr = [];
            var catArr = [];
            var promises = [];
            debug('*****************************************');
            debug(postData.filter);
            debug('*****************************************');
            for (var f of postData.filter) {
                switch (f) {
                    case 'Bridge':
                        for (var f of postData.form) {
                            // //debug(f);
                            // //debug(formulasService.conditionValue(f).score.min);
                            // //debug(formulasService.conditionValue(f).score.max);
                            orArr.push({
                                "properties.bcondition": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.bcode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // //debug(catArr);


                        break;
                    case 'Culvert':
                        for (var f of postData.form) {
                            debug('f    ' + f);
                            debug('formulasService.conditionValue(f).score.min    ' + formulasService.conditionValue(f).score.min);
                            debug('score.min   ' + formulasService.conditionValue(f).score.min);
                            debug('score.max   ' + formulasService.conditionValue(f).score.max);
                            orArr.push({
                                "properties.Ccondition": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.Ccode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // //debug(catArr);

                        break;
                    case 'Geotechnical':
                        for (var f of postData.form) {
                            // //debug(f);
                            // //debug(formulasService.conditionValue(f).score.min);
                            // //debug(formulasService.conditionValue(f).score.max);
                            orArr.push({
                                "properties.gcondition": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                            orArr.push({
                                "properties.gcondition2": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.gcode": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        orAssetArr.push({
                            "properties.gcode2": {
                                $elemMatch: {
                                    $nin: [""]
                                }
                            }
                        });
                        // //debug(catArr);
                        break;

                    default: // retainning walls
                        for (var f of postData.form) {
                            // //debug(f);
                            // //debug(formulasService.conditionValue(f).score.min);
                            // //debug(formulasService.conditionValue(f).score.max);
                            orArr.push({
                                "properties.rcondition": {
                                    $gte: formulasService.conditionValue(f).score.min,
                                    $lt: formulasService.conditionValue(f).score.max
                                }
                            });
                        }
                        orAssetArr.push({
                            "properties.rcategory": {
                                $in: postData.filterPav
                            }
                        });
                        // //debug(catArr);



                        break;
                }


            }
            andArr.push({
                $or: orAssetArr
            });
            andArr.push({
                $or: orArr
            });
            debug('orAssetArr: ');
            debug(orAssetArr);
            debug('andArr: ');
            debug(andArr);

            //debug(JSON.stringify(andArr));

            promises.push(Infodatatrack.find({
                $and: andArr

            }).exec(function (err, tracks) {
                if (err) {
                    res.send(500, err.message);
                }
                //debug(tracks.length);
                return tracks;

            }));
            // debug(Infodatatrack);

            Promise.all(promises).then(function (values) {
                debug('********0*************');
                var tracks = [];
                var resultados = [];
                var ant = 0;
                var antBridge = 0;
                var antCulvert = 0;
                var antGeo = 0;
                var antGeo2 = 0;
                var geoJson = {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: []
                    },
                    properties: {
                        rcondition: [],
                        name: "",
                        color: "#ffffff"
                    }
                };
                var geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                var geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                var geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                var geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                var geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));
                debug('***********1**********');

                if (values.length !== 0) {
                    values.forEach(function (val, index) {
                        for (var v of val) {
                            // //debug(v.properties.name);
                            ant = 0;
                            antBridge = 0;
                            antCulvert = 0;
                            antGeo = 0;
                            antGeo2 = 0;
                            // debug('*********2************');
                            var indice = 0;
                            for (var [key, cval] of v.geometry.coordinates.entries()) {
                                for (var f of postData.form) {
                                    for (var filter of postData.filter) {
                                        // debug('v.properties.Ccondition[key]                ' + v.properties.Ccondition[key]);
                                        switch (filter) {
                                            case 'Bridge':
                                                if (v.properties.bcondition[key] !== null &&
                                                    v.properties.bcondition[key] !== undefined &&
                                                    v.properties.bcondition[key] !== '' &&
                                                    v.properties.bcondition[key] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.bcondition[key] < formulasService.conditionValue(f).score.max) {
                                                    if (antBridge == 0) antBridge = key - 1;
                                                    if (key !== (antBridge + 1)) {
                                                        // //debug('-- new geojson --');
                                                        tracks.push(geoJsonBri);
                                                        geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // //debug('--- Add Coord Bri---' + key + ' : ant ' + (antBridge + 1) + ' - ' + cval + ' #Crit: ' + v.properties.bcondition[key] + ' - ' + f);
                                                    geoJsonBri.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    geoJsonBri.geometry.coordinates.push(cval);
                                                    geoJsonBri.properties['marker-color'] = formulasService.conditionValue(f).score.color;
                                                    antBridge = key;
                                                }
                                                break;
                                            case 'Culvert':
                                                // debug(v.properties.Ccondition[indice]);
                                                if (v.properties.Ccondition[indice] !== null &&
                                                    v.properties.Ccondition[indice] !== undefined &&
                                                    v.properties.Ccondition[indice] !== '' &&
                                                    v.properties.Ccondition[indice] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.Ccondition[indice] < formulasService.conditionValue(f).score.max) {
                                                    if (antCulvert == 0) antCulvert = key - 1;
                                                    if (key !== (antCulvert + 1)) {
                                                        // debug('-- new geojson --');
                                                        tracks.push(geoJsonCul);
                                                        geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // debug('--- Add Coord Cul---' + key + ' : ant ' + (antCulvert + 1) + ' - ' + cval + ' #Crit: ' + v.properties.Ccondition[key] + ' - ' + f);
                                                    geoJsonCul.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonCul.geometry.coordinates.push(cval);
                                                    geoJsonCul.geometry.coordinates.push(cval);
                                                    geoJsonCul.properties['rcondition'] = 0.5;
                                                    geoJsonCul.geometry["type"] = 'MultiPoint';
                                                    geoJsonCul.properties['color'] = '';
                                                    geoJsonCul.properties['color'] = formulasService.conditionValue(f).score.color;
                                                    debug(geoJsonCul.properties['color'] + '********************************************************');
                                                    geoJsonCul.properties['width'] = 30;
                                                    geoJsonCul.properties["weight"] = 5;
                                                    // geoJsonCul.properties["marker-symbol"] = "bus";
                                                    // geoJsonCul.properties["description"] = "A description";
                                                    geoJsonCul.properties["marker-size"] = "medium";
                                                    // geoJsonCul.properties["marker-symbol"] = "bus";
                                                    geoJsonCul.properties["marker-color"] = formulasService.conditionValue(f).score.color;
                                                    geoJsonCul.properties["stroke"] = formulasService.conditionValue(f).score.color;
                                                    // geoJsonCul.properties["stroke-opacity"] = 1.0;
                                                    geoJsonCul.properties["stroke-width"] = 2;
                                                    geoJsonCul.properties["fill"] = formulasService.conditionValue(f).score.color;
                                                    // geoJsonCul.properties["fill-opacity"] = 1;
                                                    debug(formulasService.conditionValue(f).score.color);
                                                    debug(formulasService.conditionValue(f));
                                                    debug(f);
                                                    console.log(JSON.stringify(geoJsonCul));
                                                    antCulvert = key;
                                                    indice++;
                                                }
                                                break;
                                            case 'Geotechnical':
                                                if (v.properties.gcondition[key] !== null &&
                                                    v.properties.gcondition[key] !== undefined &&
                                                    v.properties.gcondition[key] !== '' &&
                                                    v.properties.gcondition[key] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.gcondition[key] < formulasService.conditionValue(f).score.max) {
                                                    if (antGeo == 0) antGeo = key - 1;
                                                    if (key !== (antGeo + 1)) {
                                                        // //debug('-- new geojson --');
                                                        tracks.push(geoJsonGeo);
                                                        geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // //debug('--- Add Coord Geo---' + key + ' : ant ' + (antGeo + 1) + ' - ' + cval + ' #Crit: ' + v.properties.gcondition[key] + ' - ' + f);
                                                    geoJsonGeo.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonGeo.geometry.coordinates.push(cval);
                                                    geoJsonGeo.geometry.coordinates.push(cval);
                                                    geoJsonGeo.properties['marker-color'] = formulasService.conditionValue(f).score.color;
                                                    antGeo = key;
                                                }
                                                if (v.properties.gcondition2[key] !== null &&
                                                    v.properties.gcondition2[key] !== undefined &&
                                                    v.properties.gcondition2[key] !== '' &&
                                                    v.properties.gcondition2[key] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.gcondition2[key] < formulasService.conditionValue(f).score.max) {
                                                    if (antGeo2 == 0) antGeo2 = key - 1;
                                                    if (key !== (antGeo2 + 1)) {
                                                        // //debug('-- new geojson --');
                                                        tracks.push(geoJsonGeo2);
                                                        geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // //debug('--- Add Coord Geo2---' + key + ' : ant ' + (antGeo2 + 1) + ' - ' + cval + ' #Crit: ' + v.properties.gcondition2[key] + ' - ' + f);
                                                    geoJsonGeo2.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonGeo2.geometry.coordinates.push(cval);
                                                    geoJsonGeo2.geometry.coordinates.push(cval);
                                                    geoJsonGeo2.properties['marker-color'] = formulasService.conditionValue(f).score.color;
                                                    antGeo2 = key;
                                                }
                                                break;
                                            default:
                                                if (v.properties.rcondition[key] !== null &&
                                                    v.properties.rcondition[key] !== undefined &&
                                                    v.properties.rcondition[key] !== '' &&
                                                    v.properties.rcondition[key] >= formulasService.conditionValue(f).score.min &&
                                                    v.properties.rcondition[key] < formulasService.conditionValue(f).score.max) {
                                                    if (ant == 0) ant = key - 1;
                                                    if (key !== (ant + 1)) {
                                                        // //debug('-- new geojson --');
                                                        tracks.push(geoJsonPav);
                                                        geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                                                    }
                                                    // //debug('--- Add Coord Pav ---' + key + ' : ant ' + (ant + 1) + ' - ' + cval + ' #Crit: ' + v.properties.rcriticality[key] + ' - ' + f);
                                                    geoJsonPav.properties.name = v.properties.name + ' - ' + f;
                                                    geoJsonPav.geometry.coordinates.push(cval);
                                                    geoJsonPav.geometry.coordinates.push(cval);
                                                    geoJsonPav.properties['marker-color'] = formulasService.conditionValue(f).score.color;
                                                    ant = key;
                                                }
                                                break;
                                        }
                                    }

                                }
                                if (key + 1 == v.geometry.coordinates.length) {
                                    // //debug('-- new geojson --')
                                    // console.log(geoJsonPav);
                                    // console.log(geoJsonBri);
                                    // console.log(geoJsonCul);
                                    // console.log(geoJsonGeo);
                                    // console.log(geoJsonGeo2);
                                    tracks.push(geoJsonPav);
                                    tracks.push(geoJsonBri);
                                    tracks.push(geoJsonCul);
                                    tracks.push(geoJsonGeo);
                                    tracks.push(geoJsonGeo2);
                                    geoJsonPav = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonBri = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonCul = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonGeo = JSON.parse(JSON.stringify(geoJson));
                                    geoJsonGeo2 = JSON.parse(JSON.stringify(geoJson));
                                }

                            }
                            // tracks.push(v);
                        }
                    });
                }
                // //debug(tracks.length);

                res.status(200).jsonp(tracks);

            });

            break;
        default:
            break;
    }



});



module.exports = router;