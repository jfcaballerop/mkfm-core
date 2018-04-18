describe('Bridge Condition', () => {
    const assert = require('assert')
    const { calculateBridgeCondition, DEFAULT_BRIDGE } = require('./bridgeCondition')
    const parameters = require('./bridgeConditionConfig')


    it('calculateBridgeCondition() is a function', () => {
        assert.equal(typeof calculateBridgeCondition, 'function')
    })

    it('returns a number', () => {
        const res = calculateBridgeCondition(DEFAULT_BRIDGE, parameters)
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
                expected: 74.48,
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


