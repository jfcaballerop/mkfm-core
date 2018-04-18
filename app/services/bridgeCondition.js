const _ = require('underscore')

function twoDecimals(n){
    return Math.round(n * 100) / 100
}

function findSmaller(numbers){
    return numbers.sort(function(a,b){
        return a-b
    })[0]
}

// Expected data format, see Queys/getBridgesWithDamages
const DEFAULT_BRIDGE = {
    type: 'Other',
    damages: {
        foundations: '',
        foundationsDetail: '',
        slab: '',
        slabSeverity: '',
        piers: '',
        piersSeverity: '',
        beams: '',
        beamsSeverity: '',
        bearings: '',
        bearingsSeverity: '',
        abutments: '',
        abutmentsSeverity: '',
        sidewalls: '',
        sidewallsSeverity: '',
        vaultArches: '',
        vaultArchesSeverity: '',
        spandrel: "",
        spandrelSeverity: "",
        specialAreas: "",
        nonStructural: "No damages"
    }
}

function calculateBridgeCondition(bridge = DEFAULT_BRIDGE, params) {
    const bridgeData = _.extend({}, DEFAULT_BRIDGE, bridge)
    const { damages } = bridgeData
    const { damageTypeScoring } = params
    // FIRST - MAIN FACTORS
    let damageCount = 0
    let mechanicalDamageCount = 0
    let durableDamageCount = 0
    let scores = [100]
    // damages on foundations
    if (damages.foundations) {
        if(~damages.foundations.indexOf(damageTypeScoring.foundationGroundDecay.match)){
            // find details
            _.each(damageTypeScoring.foundationGroundDecay.details, function(detailScore, match){
                const regex = new RegExp(match, 'gi')
                if(regex.test(damages.foundationsDetail)){
                    //console.log('Found foundation damage', match, damages.foundationsDetail)
                    scores.push(detailScore * damageTypeScoring.foundationGroundDecay.score)
                    damageCount++
                    mechanicalDamageCount++
                }
            })
        }
        if(~damages.foundations.indexOf(damageTypeScoring.foundationDecay.match)){
            // no details in Mongo right now
            scores.push(damageTypeScoring.foundationDecay.score * damageTypeScoring.foundationDecay.detailsScore)
            damageCount++
            mechanicalDamageCount++
        }
    }

    // damages on structural elements
    const structuralProperties = ['slab', 'piers', 'beams', 'bearings', 'abutments', 'sidewalls', 'vaultsArches', 'spandrel', 'specialAreas']
    structuralProperties.forEach(prop => {
        const type = damages[prop]
        const severity = damages[prop + 'Severity']
        const paramGroup = params.damageTypeScoring[prop]
        const groupScore = paramGroup.score
        _.each(paramGroup.details, function(severityOptions, damageType){
            const damageTypeRegEx = new RegExp(damageType, 'gi')
            if(damageTypeRegEx.test(type)){
                const isMechanical = /Mechanical|No bearings|Bearings displaced/.test(type)
                //console.log('Found type of damage', prop, damageType, type)
                _.each(severityOptions, function(score, optionSeverity){
                    if(severity === optionSeverity){
                        //console.log('Found structural damage', prop, severity, groupScore*score, 'Mech/Durable: ', isMechanical)
                        scores.push(groupScore * score)
                        isMechanical ? mechanicalDamageCount++ : durableDamageCount++
                    }
                })
            }
        })
    })


    // damages on non structural elements
    if(damages.nonStructural){
        _.each(damageTypeScoring.nonStructural.details, function(detailScore, match){
            const regex = new RegExp(match, 'gi')
            if(regex.test(damages.nonStructural)){
                //console.log('Found non structural', damages.nonStructural, match)
                score *= detailScore * damageTypeScoring.nonStructural.score
            }
        })
    }

    // no damages
    //console.log('All scores', scores)
    score = twoDecimals(findSmaller(scores))
    //console.log('Score before corrective factors', score)

    // CORRECTIVE FACTORS

    // 1. existance of several damages
    if(mechanicalDamageCount > 0){
        // apply formula
        //console.log('applying mech correction')
        const y = 0.0018*Math.pow(mechanicalDamageCount, 3) - 0.0305*Math.pow(mechanicalDamageCount, 2) + 0.0302*mechanicalDamageCount + 0.9862
        score *= y
    }
    if(durableDamageCount > 0){
        // apply formula
        //console.log('applying durable correction')
        const y = durableDamageCount < 3 ? 1 : -0.0214*durableDamageCount + 1.0643
        score *= y
    }
    score = twoDecimals(score)
    // 2. bridge type ONLY if score is NOT 100
    const bridgeTypeScore = params.correctiveBridgeType[bridgeData.type]
    if(score !== 100 && bridgeTypeScore){
        //console.log('Applying bridge corrective factor', score, bridgeData.type, bridgeTypeScore)
        score *= bridgeTypeScore
    }
    else if(score !== 100) {
        score *= params.correctiveBridgeType.Other
    }
    //console.log('Score before return', score)
    return twoDecimals(score)
}

module.exports = {
    calculateBridgeCondition,
    twoDecimals,
    DEFAULT_BRIDGE
}