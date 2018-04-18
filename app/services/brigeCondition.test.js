describe('Bridge Condition', () => {
    const assert = require('assert')
    const { calculateBridgeCondition, DEFAULT_BRIDGE } = require('./bridgeCondition')

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
            foundationsDetail: 'Scouring on abutments',
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
            "sidewallsSeverity": "",
            "vaultsArches": "",
            "vaultsArchesSeverity": "",
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
            slab: {
                score: 90,
                details: {
                    'Mechanical': {
                        'Very High': 0.20,
                        'High': 0.40,
                        'Medium': 0.60,
                        'Low': 0.80,
                        'Unknown': 0.01
                    },
                    'Durable': {
                        'Very High': 0.45,
                        'High': 0.60,
                        'Medium': 0.80,
                        'Low': 0.90,
                        'Unknown': 0.90
                    }
                }
            },
            piers: {
                score: 90,
                details: {
                    'Mechanical': {
                        'Very High': 0.20,
                        'High': 0.40,
                        'Medium': 0.60,
                        'Low': 0.80,
                        'Unknown': 0.01
                    },
                    'Durable': {
                        'Very High': 0.45,
                        'High': 0.60,
                        'Medium': 0.80,
                        'Low': 0.90,
                        'Unknown': 0.90
                    }
                }
            },
            beams: {
                score: 90,
                details: {
                    'Mechanical': {
                        'Very High': 0.20,
                        'High': 0.40,
                        'Medium': 0.60,
                        'Low': 0.80,
                        'Unknown': 0.01
                    },
                    'Durable': {
                        'Very High': 0.45,
                        'High': 0.60,
                        'Medium': 0.80,
                        'Low': 0.90,
                        'Unknown': 0.90
                    }
                }
            },
            bearings: {
                score: 98,
                details: {
                    'No bearings': {
                        'Very High': 0.20,
                        'High': 0.40,
                        'Medium': 0.60,
                        'Low': 0.80,
                        'Unknown': 0.01
                    },
                    'Bearings displaced': {
                        'Very High': 0.45,
                        'High': 0.60,
                        'Medium': 0.80,
                        'Low': 0.90,
                        'Unknown': 0.01
                    },
                    /* 'Bearings decay': {
                        'Very High': 0.45,
                        'High': 0.60,
                        'Medium': 0.80,
                        'Low': 0.90,
                        'Unknown': 0.90
                    }, */
                    'Other damages': {
                        'Very High': 0.45,
                        'High':	0.60,
                        'Medium': 0.80,
                        'Low':0.90,
                        'Unknown': 0.90
                    }

                }
            },
            abutments: {
                score: 90,
                details: {
                    'Mechanical': {
                        'Very High': 0.20,
                        'High': 0.40,
                        'Medium': 0.60,
                        'Low': 0.80,
                        'Unknown': 0.01
                    },
                    'Durable': {
                        'Very High': 0.45,
                        'High': 0.60,
                        'Medium': 0.80,
                        'Low': 0.90,
                        'Unknown': 0.90
                    }
                }
            },
            sidewalls: {
                score: 98,
                details: {
                    'Mechanical': {
                        'Very High': 0.30,
                        'High': 0.50,
                        'Medium': 0.65,
                        'Low': 0.80,
                        'Unknown': 0.01
                    },
                    'Durable': {
                        'Very High': 0.45,
                        'High': 0.60,
                        'Medium': 0.80,
                        'Low': 0.90,
                        'Unknown': 0.90
                    }
                }
            },
            vaultsArches: {
                score: 90,
                details: {
                    'Mechanical': {
                        'Very High': 0.20,
                        'High': 0.40,
                        'Medium': 0.60,
                        'Low': 0.80,
                        'Unknown': 0.01
                    },
                    'Durable': {
                        'Very High': 0.45,
                        'High': 0.60,
                        'Medium': 0.80,
                        'Low': 0.90,
                        'Unknown': 0.90
                    }
                }
            },
            spandrel: {
                score: 99,
                details: {
                    'Mechanical': {
                        'Very High': 0.20,
                        'High': 0.40,
                        'Medium': 0.60,
                        'Low': 0.80,
                        'Unknown': 0.01
                    },
                    'Durable': {
                        'Very High': 0.45,
                        'High': 0.60,
                        'Medium': 0.80,
                        'Low': 0.90,
                        'Unknown': 0.90
                    }
                }
            },
            specialAreas: 99,
            nonStructural: {
                score: 95,
                details: {
                    'Damages on non structural elements': 1
                }
            } ,
            noDamages: 1
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
    })

    describe('Tests', () => {
        function createBridge(data){
            return Object.assign({}, {
                expected: data.expected,
                type: data.type,
                damages: Object.assign({}, DEFAULT_BRIDGE.damages, data.damages)
            })
        }

        const bridges = [
            {
                expected: 32.18,
                type: 'Masonry_arch',
                damages: {
                    foundations: 'Damages from foundation decay',
                    //nonStructural: 'No damages'
                }
            },
            {
                expected: 30.49,
                type: 'Masonry_arch',
                damages: {
                    foundations: 'Damages from foundation-ground decay',
                    foundationsDetail: 'Scouring on abutments'
                }
            },
            {
                expected: 95,
                type: 'Slab',
                damages: {}
            },
            {
                //S8-SG-01-B-1866
                type: 'Masonry_arch',
                expected: 15.01,
                damages: {
                    slab: 'Mechanical defects',
                    slabSeverity: 'Very High',
                    spandrel: 'Mechanical defects',
                    spandrelSeverity: 'Very High',
                    sidewalls: 'Mechanical defects',
                    sidewallsSeverity: 'High',
                    nonStructural: 'No damages'
                }
            },
            {
                //S8-SG-01-B-15
                expected: 76.95,
                type: 'Girder',
                damages: {
                    beams: 'Durable effects',
                    beamsSeverity: 'Low',
                    bearings: 'Bearings decay',
                    bearingsSeverity: 'Medium',
                    nonStructural: 'No damages'
                }
            },
            {
                //M9-SJH-B-6285
                type: 'Girder',
                expected: 29.55,
                damages: {
                    foundations: 'Damages from foundation-ground decay',
                    foundationsDetail: 'Scouring on abutments'
                }
            }
        ].map(x => createBridge(x))


        it('Matches all example cases', () => {
            bridges.forEach((b,i) => {
                //console.log('Running test case ', i+1, '\n')
                assert.equal(calculateBridgeCondition(b, parameters), b.expected, 'Example case # ' + (i+1) + ' failed')
            })
        })
    })

})


