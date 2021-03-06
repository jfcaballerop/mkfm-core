var debug = require('debug')('debug');
var express = require('express');
var router = express.Router();
var path = require('path');
var config = require(path.join(__dirname, '../../../../config/config'));
var fs = require('fs');
var http = require('http');
var moment = require('moment');
var sseExpress = require('sse-express');
var bodyParser = require('body-parser');
var utm = require('utm');
var assert = require('assert');
var req2 = require('request');
var services = require(path.join(__dirname, '../../../services/services'));
var mongoose = require('mongoose')
var AssetCache = require('../../../services/asset_cache')
var TrackModel = require('../models/infodatatrack')

/*
 * Global VBLES
 */
var roadlabObject = {};
router.use(bodyParser.urlencoded({
    extended: true
}));
//router.use(fileUpload());
//router.use(uploading.single('foofield'));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function (req, res, next) {
    var list_files = [];
    fs.readdir(path.join(__dirname, '../public/uploads'), function (err, files) {
        if (files)
            list_files = files.concat();
        list_files.forEach(function (item) {
            console.log('## Files: ' + item);
        });
        res.render('maps', {
            files: list_files,
            token: req.token,
            title: config.CLIENT_NAME + '-' + config.APP_NAME,
            cname: config.CLIENT_NAME,
            id: req.user_id,
            login: req.user_login,
            rol: req.rol,
            api_key: config.MAPS_API_KEY
        });
    });
    console.log('## Files 2: ' + list_files);

});

/* GET List Files */
router.get('/view_data', function (req, resp, next) {
    var promises = [];
    var optionsRoad = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/list_id_not_proccesed/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var optionsInfoData = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/infodatatrack/V1/list_order',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    promises.push(new Promise(function (resolve, reject) {
        var localOptions = optionsRoad;
        var request = http.request(localOptions, function (res) {
            res.setEncoding('utf8');
            var data = '';
            res.on('data', function (chunk) {
                var type = typeof chunk;
                data += chunk;
            });
            res.on('end', function () {
                try {
                    var responseObject = JSON.parse(data);
                    resolve({
                        hostname: localOptions.hostname,
                        port: localOptions.port,
                        path: localOptions.path,
                        statusCode: res.statusCode,
                        responseHeaders: JSON.stringify(res.headers),
                        body: responseObject
                    });
                }
                catch(err){
                    reject(err)
                }
            });
        });
        request.on('error', function (e) {
            console.error(e);
            reject(e);
        });
        request.end();
    }));

    promises.push(new Promise(function (resolve, reject) {
        // save options locally because it will be reassigned to a different object
        // before it gets used in the callback below
        var localOptions = optionsInfoData;
        var req = http.request(localOptions, function (res) {
            var data = "";

            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('error', console.error.bind(console))
            res.on('end', function () {
                try {
                    var responseObject = JSON.parse(data);
                    resolve({
                        hostname: localOptions.hostname,
                        port: localOptions.port,
                        path: localOptions.path,
                        statusCode: res.statusCode,
                        responseHeaders: JSON.stringify(res.headers),
                        body: responseObject
                    });
                }
                catch(err){
                    reject(err)
                }

            });
        });
        req.on('error', function (e) {
            console.error(e);
            reject(e);
        });
        req.end();
    }));


    // now wait for all promises to be done
    Promise.all(promises).then(function (allData) {
        console.log('## maps.js ## Promise.all ##');

        resp.render('maps_data', {
            utm: utm,
            roadsvals: allData[0].body,
            infodatasvals: allData[1].body,
            moment: moment,
            token: req.token,
            title: config.CLIENT_NAME + '-' + config.APP_NAME,
            cname: config.CLIENT_NAME,
            id: req.user_id,
            login: req.user_login,
            rol: req.rol,
            api_key: config.MAPS_API_KEY
        });

    }, function (reason) {
        return resp.status(500).send(reason);
    });
});


/* GET List Files */
router.get('/list_files', function (req, resp, next) {
    var options = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/gis/V1/active_valid',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var optionsRoadlab = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/roadlab/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var requestRL = http.request(optionsRoadlab, function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            data += chunk;

        });
        res.on('end', function () {
            //console.log('DATA ' + data.length + ' ' + data);
            roadlabObject = JSON.parse(data);
            roadlabObject.forEach(function (item) {
                delete item["_id"];
                delete item["updated_at"];
                delete item["created_at"];
                //delete item["properties"]["coordTimes"];

            });
            //resp.render('user', { token: req.token, users: responseObject, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });
            //resp.render('upload', { token: req.token, fup: responseObject, moment: moment, title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME });
            //resp.status(200).jsonp(filetypesObject);
        });
    });
    requestRL.end();


    var optionsRoad = {
        host: config.HOST_API,
        port: config.PORT_API,
        path: config.PATH_API + '/road/V1/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.cookies.jwtToken
        }
    };
    var request = http.request(optionsRoad, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function (chunk) {
            var type = typeof chunk;
            // console.log('BODY: ' + chunk + 'TYPE: ' + typeof chunk);
            // console.log('TYPE ' + type);
            data += chunk;
            // console.log('DATA1 long:: ' + data.length);


        });
        res.on('end', function () {
            // console.log('DATA2 long ' + data.length);
            var responseObject = JSON.parse(data);
            responseObject.forEach(function (item) {
                delete item["_id"];
                delete item["updated_at"];
                delete item["created_at"];
                //delete item["properties"]["coordTimes"];

            });
            // responseObject.forEach(function(item) {
            //     console.log('responseObject.length:: ' + JSON.stringify(item));

            // });
            // console.log(JSON.stringify(responseObject));

            resp.render('maps', {
                roadlabs: roadlabObject,
                roads: responseObject,
                token: req.token,
                title: config.CLIENT_NAME + '-' + config.APP_NAME,
                cname: config.CLIENT_NAME,
                id: req.user_id,
                login: req.user_login,
                rol: req.rol,
                api_key: config.MAPS_API_KEY
            });
            //resp.status(200).send(responseObject);

        });
    });

    request.end();
    //  resp.render('user', { users: JSON.parse(data), title: config.CLIENT_NAME + '-' + config.APP_NAME, cname: config.CLIENT_NAME, id: req.user_id, login: req.user_login, rol: req.rol });

});

/* GET List Info */
router.get('/list_info', async function (req, resp, next) {
    //const assetData = await AssetCache.get()
    resp.render('maps', {
        token: req.token,
        title: config.CLIENT_NAME + '-' + config.APP_NAME,
        cname: config.CLIENT_NAME,
        id: req.user_id,
        login: req.user_login,
        rol: req.rol,
        api_key: config.MAPS_API_KEY,
        maps_center: config.MAPS_CENTER_POS,
        maps_zoom: config.MAPS_CENTER_ZOOM
    });
});

router.get('/assets/:assetType/:roadType', async function(req, res){
    const { assetType, roadType } = req.params
    try {
        const cache = await AssetCache.get()
        const data = cache[assetType][roadType]
        res.json(data)
    }
    catch(err){
        console.error('Error fetching assets from cache', err.message)
        res.status(400).send({ message: err.message })
    }
})

router.get('/roads_by_risk/:roadType/:riskField', async function(req, res){
    const { roadType, riskField } = req.params
    const riskFieldPath = "$properties." + riskField
    //TODO - ahora solo con 1 posible valor, gestionar varios (Very High, bla bla)
    try {
        const roadFragments = await TrackModel.aggregate([
            // primera etapa: elegir campos que me interesan (como 2do argumento en find)
            {
                $project: {
                    ["properties." + riskField]: 1,
                    "properties.name": 1,
                    "properties.rcategory": 1,
                    "geometry.coordinates": 1
                }
            },
            // descomponer el array de riesgos en 1 documento por cada elemento
            { $unwind: { path: riskFieldPath, includeArrayIndex: "idx" } },
            // si el campo está vacío, me salto el documento
            {
                $redact: {
                    $cond: {
                        if: { $ne: [riskFieldPath, ""] },
                        then: "$$KEEP",
                        else: "$$PRUNE"
                    }
                }
            },
            // genero un documento que tenga el valor, el indice en el array, y las
            // coordenadas y categoria que coinciden en esa posicion (1 por cada rcriticality por ejemplo)
            {  $project: {
                "_id": 0,
                "properties.name": 1,
                [riskField]: riskFieldPath,
                "idx": 1,
                "geometry.coordinates": { $arrayElemAt: ["$geometry.coordinates", "$idx"] },
                "properties.rcategory": { $arrayElemAt: ["$properties.rcategory", "$idx"] }
                }
            },
            // agrupo los documentos anteriores por los que tienen el mismo valor de riesgo
            // y voy añadiendo las coordenadas (creo tramos por valor rcriticality por ejemplo)
            {
                $group: {
                    // todo lo q va dentro de _id es como un GROUP BY por estos campos
                    _id: {
                        [riskField]: "$" + riskField,
                        roadCategory: "$properties.rcategory",
                        sourceTrack: "$properties.name",
                    },
                    // voy pusheando coordenadas
                    coordinates: {  $push: "$geometry.coordinates" },
                    // e indices de origen por si me hace falta
                    indices: { $push: "$idx" }
                }
            },
            // proyecto lo anterior en un formato de documento más chulo
            {
                $project: {
                    "_id": 0,
                    "properties": {
                        [riskField]: "$_id." + riskField,
                        "sourceTrack": "$_id.sourceTrack",
                        "roadCategory": "$_id.roadCategory",
                    },
                    "geometry": {
                        "coordinates": "$coordinates"
                    },
                    // esto por si necesito depurar de que indices viene
                    "trackIndices": "$indices"
                }
            },
            // y por ultimo, devuelvo solo los de la categoria que me interesa
            {
                $match: {
                    "properties.roadCategory" : roadType,
                    "geometry.coordinates.1": {$exists: true}
                }
            }
        ])

        res.json({
            type: 'FeatureCollection',
            features: roadFragments.map(data => ({
                type: 'Feature',
                properties: data.properties,
                geometry: {
                    type: 'MultiLineString',
                    coordinates: splitLinestringIntoFragments(data)
                }
            }))
        })
    }
    catch(err){
        console.error('Error en roads_by_risk', err.message)
        res.status(500).send({ message: err.message })

    }
})

function splitLinestringIntoFragments(data){
    var fragments = data.trackIndices.reduce((acc, index) => {
        if(!acc.current || index - acc.current[acc.current.length-1] > 1){
            acc.output.push([])
            acc.current = acc.output[acc.output.length-1]
        }
        acc.current.push(index)
        return acc


    }, { current: null, output: [] })

    var multilines = fragments.output.map(function(frag){
        return frag.map(idx => data.geometry.coordinates[data.trackIndices.indexOf(idx)])
    })

    return multilines
}

module.exports = router;