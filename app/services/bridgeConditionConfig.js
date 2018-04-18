module.exports = {
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
                'Bearings decay': {
                    'Very High': 0.45,
                    'High': 0.60,
                    'Medium': 0.80,
                    'Low': 0.90,
                    'Unknown': 0.90
                },
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