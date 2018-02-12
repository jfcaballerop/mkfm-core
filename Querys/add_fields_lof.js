db.infodatatracks.update({}, {
    $set: {
        "properties.rlofnatural": []
    }
}, false, true);
db.infodatatracks.update({}, {
    $set: {
        "properties.rlofphysical": []
    }
}, false, true);
db.infodatatracks.update({}, {
    $set: {
        "properties.blofnatural": []
    }
}, false, true);
db.infodatatracks.update({}, {
    $set: {
        "properties.blofphysical": []
    }
}, false, true);
db.infodatatracks.update({}, {
    $set: {
        "properties.Clofnatural": []
    }
}, false, true);
db.infodatatracks.update({}, {
    $set: {
        "properties.Clofphysical": []
    }
}, false, true);
db.infodatatracks.update({}, {
    $set: {
        "properties.glofnatural": []
    }
}, false, true);
db.infodatatracks.update({}, {
    $set: {
        "properties.glofphysical": []
    }
}, false, true);
db.infodatatracks.update({}, {
    $set: {
        "properties.glofnatural2": []
    }
}, false, true);
db.infodatatracks.update({}, {
    $set: {
        "properties.glofphysical2": []
    }
}, false, true);

// add config info
db.infodatatracks.update({}, {
    $set: {
        "config": {
            "properties": {
                rlofnatural: {
                    desc: "rlofnatural",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rlofphysical: {
                    desc: "rlofphysical",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                blofnatural: {
                    desc: "blofnatural",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                blofphysical: {
                    desc: "blofphysical",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                Clofnatural: {
                    desc: "Clofnatural",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                Clofphysical: {
                    desc: "Clofphysical",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                glofnatural: {
                    desc: "glofnatural",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT SIDE"
                },
                glofphysical: {
                    desc: "glofphysical",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT SIDE"
                },
                glofnatural2: {
                    desc: "glofnatural2",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - RIGHT SIDE"
                },
                glofphysical2: {
                    desc: "glofphysical2",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - RIGHT SIDE"
                }
            }
        }
    }
}, false, true);