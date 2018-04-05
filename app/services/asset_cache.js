const Infodatatrack = require('../comp/gis/models/infodatatrack')
const Koboinfo = require('../comp/gis/models/koboinfo')
const Cache = require('./cache')
const services = require('./services')

// DO this ONCE, not on every request!!
// ALSO, better use underscore (uniq), which
// is already a dependency
Array.prototype.unique = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (!arr.includes(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
};
Array.prototype.firstindex = function (v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === v) return i;
    }
    return -1;
};

async function loadInfodatatrack(){
    var fields = {
        type: 1,
        name: 1,
        geometry: 1,
        "properties.name": 1,
        "properties.rcategory": 1,
        "properties.Ccode": 1,
        "properties.bcode": 1,
        "properties.gcode": 1,
        "properties.gcode2": 1,
        "properties.Ctype": 1,
        "properties.Cnumelem": 1,
        "properties.Csection": 1,
        "properties.Cmaterial": 1,
        "properties.Cdiameter": 1,
        "properties.Cwidth": 1,
        "properties.Clength": 1,
        "properties.Cclearing": 1,
        "properties.CVisualCondition": 1,
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
        "properties.gtype": 1,
        "properties.gposition": 1,
        "properties.gheight": 1,
        "properties.glength": 1,
        "properties.gslope": 1,
        "properties.gnature": 1,
        "properties.gintensityfailure": 1,
        "properties.gvisualcondition": 1,
        "properties.gtype2": 1,
        "properties.gposition2": 1,
        "properties.gheight2": 1,
        "properties.glength2": 1,
        "properties.gslope2": 1,
        "properties.gnature2": 1,
        "properties.gintensityfailure2": 1,
        "properties.gvisualcondition2": 1,
        "properties.koboedit": 1
    };
    return Infodatatrack.find({}, fields)
}

async function loadKobos(){
    return Koboinfo.find()
}

function transformData(tracks, koboinfos){
    var kobo_mainr_odt = [];
    var kobo_mainr_bridge = [];
    var kobo_mainr_geo = [];
    var kobo_secondaryr_odt = [];
    var kobo_secondaryr_bridge = [];
    var kobo_secondaryr_geo = [];
    var kobo_feederr_odt = [];
    var kobo_feederr_bridge = [];
    var kobo_feederr_geo = [];
    var kobo_otherr_odt = [];
    var kobo_otherr_bridge = [];
    var kobo_otherr_geo = [];
    var kobo_urbanr_odt = [];
    var kobo_urbanr_bridge = [];
    var kobo_urbanr_geo = [];
    var mainr = [];
    var secondaryr = [];
    var feederr = [];
    var otherr = [];
    var urbanr = [];

    tracks.forEach(function (elem, index) {
        if (elem.properties.rcategory.indexOf('Main Road') >= 0) {
            mainr.push(elem);
            var unique = elem.properties.Ccode.unique();
            for (var u of unique) {
                if (u !== '') {
                    // debug(u + ' : ' + elem.properties.Ccode.firstindex(u) + '\n');
                    // debug(elem.properties.koboedit);
                    const code = elem.properties.Ccode.firstindex(u)
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[code] !== undefined &&
                        elem.properties.koboedit[code] !== null) {
                            //console.log('Voy a buscar kobo', u, koboinfos.length)
                            const koboId = elem.properties.koboedit[code].kobo_id
                            if(!koboId) continue
                            const kobo = koboinfos.find(k => {
                                return String(k.id) === koboId
                            })
                            if(kobo){
                                kobo_mainr_odt.push(services.makeKoboGeoJson(elem, code, 'Culvert'));
                                kobo_mainr_odt[kobo_mainr_odt.length - 1]["properties"]["_attachments"] = kobo.properties._attachments;
                            }
                    }
                }
            }
            var unique = elem.properties.bcode.unique();
            for (var u of unique) {
                if (u != '') {
                    const bridgeIndex = elem.properties.bcode.firstindex(u)
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[bridgeIndex] !== undefined &&
                        elem.properties.koboedit[bridgeIndex] !== null) {

                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem._id) === elem.properties.koboedit[bridgeIndex].kobo_id) {
                                //console.log('Encontrado puente en mainr', koboelem._id, elem.properties.koboedit[bridgeIndex].kobo_id)
                                kobo_mainr_bridge.push(services.makeKoboGeoJson(elem, bridgeIndex, 'Bridge'));
                                kobo_mainr_bridge[kobo_mainr_bridge.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode.firstindex(u)].kobo_id) {
                                kobo_mainr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode.firstindex(u), 'Geotechnical'));
                                kobo_mainr_geo[kobo_mainr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode2.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode2.firstindex(u)].kobo_id) {
                                kobo_mainr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode2.firstindex(u), 'Geotechnical'));
                                kobo_mainr_geo[kobo_mainr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
        } else if (elem.properties.rcategory.indexOf('Secondary') >= 0) {
            secondaryr.push(elem);
            var unique = elem.properties.Ccode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.Ccode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.Ccode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.Ccode.firstindex(u)].kobo_id) {
                                kobo_secondaryr_odt.push(services.makeKoboGeoJson(elem, elem.properties.Ccode.firstindex(u), 'Culvert'));
                                kobo_secondaryr_odt[kobo_secondaryr_odt.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.bcode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.bcode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.bcode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.bcode.firstindex(u)].kobo_id) {
                                kobo_secondaryr_bridge.push(services.makeKoboGeoJson(elem, elem.properties.bcode.firstindex(u), 'Bridge'));
                                kobo_secondaryr_bridge[kobo_secondaryr_bridge.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode.firstindex(u)].kobo_id) {
                                kobo_secondaryr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode.firstindex(u), 'Geotechnical'));
                                kobo_secondaryr_geo[kobo_secondaryr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode2.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode2.firstindex(u)].kobo_id) {
                                kobo_secondaryr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode2.firstindex(u), 'Geotechnical'));
                                kobo_secondaryr_geo[kobo_secondaryr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
        } else if (elem.properties.rcategory.indexOf('Feeder') >= 0) {
            feederr.push(elem);
            var unique = elem.properties.Ccode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.Ccode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.Ccode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.Ccode.firstindex(u)].kobo_id) {
                                kobo_feederr_odt.push(services.makeKoboGeoJson(elem, elem.properties.Ccode.firstindex(u), 'Culvert'));
                                kobo_feederr_odt[kobo_feederr_odt.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.bcode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.bcode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.bcode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.bcode.firstindex(u)].kobo_id) {
                                kobo_feederr_bridge.push(services.makeKoboGeoJson(elem, elem.properties.bcode.firstindex(u), 'Bridge'));
                                kobo_feederr_bridge[kobo_feederr_bridge.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode.firstindex(u)].kobo_id) {
                                kobo_feederr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode.firstindex(u), 'Geotechnical'));
                                kobo_feederr_geo[kobo_feederr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode2.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode2.firstindex(u)].kobo_id) {
                                kobo_feederr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode2.firstindex(u), 'Geotechnical'));
                                kobo_feederr_geo[kobo_feederr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
        } else if (elem.properties.rcategory.indexOf('Urban') >= 0) {
            urbanr.push(elem);
            var unique = elem.properties.Ccode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.Ccode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.Ccode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.Ccode.firstindex(u)].kobo_id) {
                                kobo_urbanr_odt.push(services.makeKoboGeoJson(elem, elem.properties.Ccode.firstindex(u), 'Culvert'));
                                kobo_urbanr_odt[kobo_urbanr_odt.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.bcode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.bcode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.bcode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.bcode.firstindex(u)].kobo_id) {
                                kobo_urbanr_bridge.push(services.makeKoboGeoJson(elem, elem.properties.bcode.firstindex(u), 'Bridge'));
                                kobo_urbanr_bridge[kobo_urbanr_bridge.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode.firstindex(u)].kobo_id) {
                                kobo_urbanr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode.firstindex(u), 'Geotechnical'));
                                kobo_urbanr_geo[kobo_urbanr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode2.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode2.firstindex(u)].kobo_id) {
                                kobo_urbanr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode2.firstindex(u), 'Geotechnical'));
                                kobo_urbanr_geo[kobo_urbanr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
        } else {
            otherr.push(elem);
            var unique = elem.properties.Ccode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.Ccode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.Ccode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.Ccode.firstindex(u)].kobo_id) {
                                kobo_otherr_odt.push(services.makeKoboGeoJson(elem, elem.properties.Ccode.firstindex(u), 'Culvert'));
                                kobo_otherr_odt[kobo_otherr_odt.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.bcode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.bcode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.bcode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.bcode.firstindex(u)].kobo_id) {
                                kobo_otherr_bridge.push(services.makeKoboGeoJson(elem, elem.properties.bcode.firstindex(u), 'Bridge'));
                                kobo_otherr_bridge[kobo_otherr_bridge.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode.firstindex(u)].kobo_id) {
                                kobo_otherr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode.firstindex(u), 'Geotechnical'));
                                kobo_otherr_geo[kobo_otherr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
            var unique = elem.properties.gcode2.unique();
            for (var u of unique) {
                if (u != '') {
                    if (elem.properties.koboedit !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== undefined &&
                        elem.properties.koboedit[elem.properties.gcode2.firstindex(u)] !== null) {
                        koboinfos.forEach(function (koboelem, index) {
                            if (String(koboelem.id) ===elem.properties.koboedit[elem.properties.gcode2.firstindex(u)].kobo_id) {
                                kobo_otherr_geo.push(services.makeKoboGeoJson(elem, elem.properties.gcode2.firstindex(u), 'Geotechnical'));
                                kobo_otherr_geo[kobo_otherr_geo.length - 1]["properties"]["_attachments"] = koboelem.properties._attachments;
                            }

                        });
                    }
                }
            }
        }
    });

    console.log('main roads', mainr.length)
    console.log('kobo_mainr_odt', kobo_mainr_odt.length)
    console.log('kobo_mainr_geo', kobo_mainr_geo.length)

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