const _ = require('underscore')

function calculateBridgeCondition(bridgeData, params) {
    const { damages } = bridgeData
    const { damageTypeScoring } = params
    // FIRST - MAIN FACTORS
    let damageCount = 0
    let mechanicalDamageCount = 0
    let durableDamageCount = 0
    let score = 1
    // damages on foundations
    if (damages.foundations) {
        if(~damages.foundations.indexOf(damageTypeScoring.foundationGroundDecay.match)){
            // find details
            _.each(damageTypeScoring.foundationGroundDecay.details, function(detailScore, match){
                if(~damages.foundationsDetail.indexOf(match)){
                    score *= detailScore * damageTypeScoring.foundationGroundDecay.score
                    damageCount++
                }
            })
        }
        if(~damages.foundations.indexOf(damageTypeScoring.foundationDecay.match)){
            // no details in Mongo right now
            score *= damageTypeScoring.foundationDecay.score * damageTypeScoring.foundationDecay.detailsScore
            damageCount++
        }
    }

    // damages on structural elements
    const hasStructuralDamages = Boolean(damages.slab || damages.piers || damages.beams || damages.bearings ||
        damages.abutments || damages.sidewalls || damages.vaultsArches || damages.spandrel || damages.specialAreas)
    if(hasStructuralDamages){

    }


    // damages on non structural elements
    if(damages.nonStructural){
        _.each(damageTypeScoring.nonStructural.details, function(detailScore, match){
            if(~damages.nonStructural.indexOf(match)){
                score *= detailScore * damageTypeScoring.nonStructural.score
            }
        })
    }

    // no damages


    // CORRECTIVE FACTORS
    // existance of several damages
    if(mechanicalDamageCount > 0){
        // apply formula
    }
    if(durableDamageCount > 0){
        // apply formula
    }
    // bridge type
    if(damageCount){
        const bridgeTypeScore = params.correctiveBridgeType[bridgeData.type]
        if(bridgeTypeScore){
            score *= bridgeTypeScore
        }
    }



    return Math.round(score * 100) / 100
    //return score
}

module.exports = {
    calculateBridgeCondition
}