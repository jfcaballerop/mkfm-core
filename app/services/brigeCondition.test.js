describe('Bridge Condition', () => {
    const assert = require('assert')
    const { calculateBridgeCondition } = require('./bridgeCondition')

    const mock1 = {
        "_id": "M6-SPL-B-1130",
        "indices": [
            163,
            164
        ],
        "sourceTrackId": "59fb33cc8fa7b44dcbd1fd18",
        "bcode": "M6-SPL-B-1130",
        "type": "Masonry_arch",
        "damages": {
            "foundations": "Damages from foundation-ground decay",
            //"foundations": "Damages from foundation decay",
            "foundationsDetail": "General scouring",
            "slab": "",
            "slabSeverity": "",
            "piers": "",
            "piersSeverity": "",
            "beams": "",
            "beamsSeverity": "",
            "bearings": "",
            "bearingsSeverity": "",
            "abutments": "",
            "abutmentsSeverity": "",
            "sidewalls": "",
            "vaultsArches": "",
            "vaultsArchesSeverity": "",
            "sidewallsSeverity": "",
            "spandrel": "",
            "spandrelSeverity": "",
            "specialAreas": "",
            "nonStructural": "No damages"
        }
    }

    const parameters = {
        damageTypeScoring: {
            foundationGroundDecay: {
                score: 90,
                match: "Damages from foundation-ground decay",
                details: {
                    'General scouring': 0.35,
                    'Scouring on piers': 0.35,
                    'Scouring on abutments': 0.35,
                    'Other': 0.85
                }
            },
            foundationDecay: {
                score: 95,
                match: "Damages from foundation decay",
                detailsScore: 0.35
            },
            slab: 90,
            piers: 90,
            beams: 90,
            bearings: 98,
            abutments: 90,
            sidewalls: 98,
            vaultsArches: 90,
            spandrel: 99,
            specialAreas: 99,
            nonStructural: {
                score: 95,
                details: {
                    'Damages on non structural elements': 1
                }
            } ,
            noDamages: 100
        },
        correctiveBridgeType: {
            Girder: 0.95,
            Slab: 0.95,
            Truss: 0.80,
            Bailey: 0.80,
            Arch: 0.85,
            Composite: 0.85,
            Cantilever: 0.80,
            Masonry_arch: 0.98,
            Cable_stayed: 0.75,
            Suspension: 0.75,
            Submersible: 0.98,
            Truss_arch: 0.80,
            Other: 0.90
        }

    }

    it('calculateBridgeCondition() is a function', () => {
        assert.equal(typeof calculateBridgeCondition, 'function')
    })

    it('returns a number', () => {
        const res = calculateBridgeCondition(mock1, parameters)
        assert.equal(typeof res, 'number')
        console.log(res)
    })

    describe('Main Factors', () => {

    })

})


