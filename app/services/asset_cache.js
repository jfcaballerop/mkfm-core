const Infodatatrack = require('../comp/gis/models/infodatatrack')
const Koboinfo = require('../comp/gis/models/koboinfo')
const Cache = require('./cache')
const _ = require('underscore')
const services = require('./services')

/* Fields to select grouped by asset type */
const commonFields = {
    type: 1,
    geometry: 1,
    "properties.name": 1,
    "properties.koboedit": 1,
}
const roadFields = {
    "properties.rcode": 1,
    "properties.rname": 1,
    "properties.rcategory": 1,
    "properties.rcriticality": 1,
    "properties.rcondition": 1,
    "properties.rriskphysicalnorm": 1,
    "properties.rrisknaturalnorm": 1,
}
const culvertFields = {
    "properties.Ccode": 1,
    "properties.Ctype": 1,
    "properties.Cnumelem": 1,
    "properties.Csection": 1,
    "properties.Cmaterial": 1,
    "properties.Cdiameter": 1,
    "properties.Cwidth": 1,
    "properties.Clength": 1,
    "properties.Cclearing": 1,
    "properties.CVisualCondition": 1,
    "properties.Ccriticality": 1,
    "properties.Ccondition": 1,
    "properties.CRISKphysicalnorm": 1,
    "properties.CRISKnaturalnorm": 1,
}
const bridgeFields = {
    "properties.bcode": 1,
    "properties.btype": 1,
    "properties.bspans": 1,
    "properties.blenght": 1,
    "properties.bwidth": 1,
    "properties.bfreeheight": 1,
    "properties.bmaterialdeck": 1,
    "properties.bmaterialpiers": 1,
    "properties.bmaterialabutments": 1,
    "properties.bdamagesfoundationsgeneraltype": 1,
    "properties.bvisualcondition": 1,
    "properties.bcriticality": 1,
    "properties.bcondition": 1,
    "properties.briskphysicalnorm": 1,
    "properties.brisknaturalnorm": 1,
}
const geoFields = {
    "properties.gcode": 1,
    "properties.gtype": 1,
    "properties.gposition": 1,
    "properties.gheight": 1,
    "properties.glength": 1,
    "properties.gslope": 1,
    "properties.gnature": 1,
    "properties.gintensityfailure": 1,
    "properties.gvisualcondition": 1,
    "properties.gcriticality": 1,
    "properties.gcondition": 1,
    "properties.griskphysicalnorm": 1,
    "properties.grisknaturalnorm": 1,
}
const geo2Fields = {
    "properties.gcode2": 1,
    "properties.gtype2": 1,
    "properties.gposition2": 1,
    "properties.gheight2": 1,
    "properties.glength2": 1,
    "properties.gslope2": 1,
    "properties.gnature2": 1,
    "properties.gintensityfailure2": 1,
    "properties.gvisualcondition2": 1,
    "properties.gcriticality2": 1,
    "properties.gcondition2": 1,
    "properties.griskphysicalnorm2": 1,
    "properties.grisknaturalnorm2": 1,
}

async function loadInfodatatrack(){
    var fields = Object.assign({},
        commonFields,
        roadFields,
        culvertFields,
        bridgeFields,
        geoFields,
        geo2Fields
    )
    return Infodatatrack.find({}, fields)
}

async function loadKobos(){
    return Koboinfo.find()
}

// find a koboinfo document by its id
// NOTE: koboinfos are mongoose Documents, so _id is an ObjectId
// and hence the need to String() it before comparison
function getKoboById(koboinfos, id){
    if(!id) return null
    return koboinfos.find(k => String(k._id) === id)
}

function getTrackProps(track){
    return {
        type: 'Feature',
        geometry: track.geometry,
        properties: {
            displayName: track.properties.rcode ? track.properties.rcode[0] :
                'Missing road code',
            trackName: track.properties.name,
            rcategory: track.properties.rcategory[0],
            rcode: track.properties.rcode ? track.properties.rcode[0] : '',
            rname: track.properties.rname ? track.properties.rname[0] : ''
        }
    }
}

function buildGeoAsset(track, index, assetPropPaths){
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: track.geometry.coordinates[index]
        },
        properties: Object.keys(assetPropPaths).reduce((acc, key) => {
            const prop = key.split('.')[1] // remove properties.
            acc[prop] = track.properties[prop][index]
            return acc
        }, {})
    }
}

function isCorrectKoboType(assetType, koboType){
    switch (assetType){
    case 'Culvert':
        return ~(['Culvert', 'ford'].indexOf(koboType))
    case 'Bridge':
        return koboType === 'Bridge'
    case 'Geotechnical':
        return ~(['Cutting', 'Enbankment', 'Retaining_walls'].indexOf(koboType))
    default:
        return false
    }
}

// extracts assets from a track, completes them with kobodata and pushes to a destination array

// @param {String}  codeProperty    Asset code property, like "bcode" or "Ccode"
// @param {String}  assetType       Culvert | Bridge | Geotechnical
// @param {Array}   destination     Destination array to push found assets to
// @param {Object}  assetProps      Map of mongo fields to extract, like { "properties.bcondition" }
// @param {Array}   koboinfos       Array of Koboinfos Mongoose documents to find kobos related to each asset
// @returns nothing
function extractAssets(track, codeProperty, assetType, destination, assetProps, koboinfos){
    const uniqueNonEmptyCodes = _.unique(track.properties[codeProperty]).filter(x => !!x)
    uniqueNonEmptyCodes.forEach(assetCode => {
        const assetIndex = track.properties[codeProperty].findIndex(x => x === assetCode)
        const hasKoboData = !!track.properties.koboedit && !!track.properties.koboedit[assetIndex]
        if(assetIndex && hasKoboData){
            const koboId = track.properties.koboedit[assetIndex] && track.properties.koboedit[assetIndex].kobo_id
            const koboType = track.properties.koboedit[assetIndex] && track.properties.koboedit[assetIndex].kobo_type
            const kobo = getKoboById(koboinfos, koboId)
            const asset = buildGeoAsset(track, assetIndex, assetProps)

            if(kobo && isCorrectKoboType(assetType, koboType)) {
                asset.properties._attachments = kobo.properties._attachments
                // add feature id and asset type
                asset.properties.displayName = assetCode
                asset.properties.assetType = assetType
                destination.push(asset)
            }
        }
        // ONLY CRITICAL ASSETS WITH KOBO ARE SHOWN IN MAPS
        /*  else if (assetIndex){
            console.log('Found asset of type ' + assetType + ' in index' + assetIndex + ' without koboId, ignoring it')
        } */
    })
}

function transformData(tracks, koboinfos){
    // ODT === Culvert!!!
    var kobo_mainr_odt = [];
    var kobo_mainr_bridge = [];
    var kobo_mainr_geo = [];
    var kobo_secondaryr_odt = [];
    var kobo_secondaryr_bridge = [];
    var kobo_secondaryr_geo = [];
    var kobo_feederr_odt = [];
    var kobo_feederr_bridge = [];
    var kobo_feederr_geo = [];
    var kobo_urbanr_odt = [];
    var kobo_urbanr_bridge = [];
    var kobo_urbanr_geo = [];
    var kobo_otherr_odt = [];
    var kobo_otherr_bridge = [];
    var kobo_otherr_geo = [];
    var mainr = [];
    var secondaryr = [];
    var feederr = [];
    var otherr = [];
    var urbanr = [];





    tracks.forEach(function (track, index) {
        try {
            if (track.properties.rcategory.indexOf('Main Road') >= 0) {
                mainr.push(getTrackProps(track));
                extractAssets(track, 'Ccode', 'Culvert', kobo_mainr_odt, culvertFields, koboinfos)
                extractAssets(track, 'bcode', 'Bridge', kobo_mainr_bridge, bridgeFields, koboinfos)
                extractAssets(track, 'gcode', 'Geotechnical', kobo_mainr_geo, geoFields, koboinfos)
                extractAssets(track, 'gcode2', 'Geotechnical', kobo_mainr_geo, geo2Fields, koboinfos)
            }
            else if (track.properties.rcategory.indexOf('Secondary') >= 0) {
                secondaryr.push(getTrackProps(track));
                extractAssets(track, 'Ccode', 'Culvert', kobo_secondaryr_odt, culvertFields, koboinfos)
                extractAssets(track, 'bcode', 'Bridge', kobo_secondaryr_bridge, bridgeFields, koboinfos)
                extractAssets(track, 'gcode', 'Geotechnical', kobo_secondaryr_geo, geoFields, koboinfos)
                extractAssets(track, 'gcode2', 'Geotechnical', kobo_secondaryr_geo, geo2Fields, koboinfos)
            }
            else if (track.properties.rcategory.indexOf('Feeder') >= 0) {
                feederr.push(getTrackProps(track));
                extractAssets(track, 'Ccode', 'Culvert', kobo_feederr_odt, culvertFields, koboinfos)
                extractAssets(track, 'bcode', 'Bridge', kobo_feederr_bridge, bridgeFields, koboinfos)
                extractAssets(track, 'gcode', 'Geotechnical', kobo_feederr_geo, geoFields, koboinfos)
                extractAssets(track, 'gcode2', 'Geotechnical', kobo_feederr_geo, geo2Fields, koboinfos)
            }
            else if (track.properties.rcategory.indexOf('Urban') >= 0) {
                urbanr.push(getTrackProps(track));
                extractAssets(track, 'Ccode', 'Culvert', kobo_urbanr_odt, culvertFields, koboinfos)
                extractAssets(track, 'bcode', 'Bridge', kobo_urbanr_bridge, bridgeFields, koboinfos)
                extractAssets(track, 'gcode', 'Geotechnical', kobo_urbanr_geo, geoFields, koboinfos)
                extractAssets(track, 'gcode2', 'Geotechnical', kobo_urbanr_geo, geo2Fields, koboinfos)
            }
        }
        catch(error){
            console.error('Error processing track', track.properties.name, error.message, error.stack)
        }
        // Other is not used, avoid spending time here
        /* else {
            // Other types
            otherr.push(elem);
            extractAssets(elem, 'Ccode', 'Culvert', kobo_otherr_odt)
            extractAssets(elem, 'bcode', 'Bridge', kobo_otherr_bridge)
            extractAssets(elem, 'gcode', 'Geotechnical', kobo_otherr_geo)
            extractAssets(elem, 'gcode2', 'Geotechnical', kobo_otherr_geo)
        } */
    });

    // group data by asset type
    const assetData = {
        'Culvert': {
            main: kobo_mainr_odt,
            secondary: kobo_secondaryr_odt,
            feeder: kobo_feederr_odt,
            urban: kobo_urbanr_odt
        },
        'Bridge': {
            main: kobo_mainr_bridge,
            secondary: kobo_secondaryr_bridge,
            feeder: kobo_feederr_bridge,
            urban: kobo_urbanr_bridge
        },
        'Geo': {
            main: kobo_mainr_geo,
            secondary: kobo_secondaryr_geo,
            feeder: kobo_feederr_geo,
            urban: kobo_urbanr_geo
        },
        'Pavement': {
            main: mainr,
            secondary: secondaryr,
            feeder: feederr,
            urban: urbanr
        }
    }
    return assetData
}

const AssetCache = new Cache('assetCache', async function(){
    const kobos = await loadKobos()
    const tracks = await loadInfodatatrack()
    return transformData(tracks, kobos)
})

module.exports = AssetCache