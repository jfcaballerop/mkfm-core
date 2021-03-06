const mongoose = require('mongoose')
const Infodatatrack = require('../comp/gis/models/infodatatrack')
const { calculateBridgeCondition, twoDecimals } = require('./bridgeCondition')
const bridgeConditionParams = require('./bridgeConditionConfig')

function getBridgesWithDamages(){
    return Infodatatrack.aggregate([
        // select tracks that have ANY bcode
        { $match: { 'properties.bcode': { $elemMatch: { $ne: null, $ne: "" }}} },
        // iterate over coordinates (1 output doc per coordinate)
        { $unwind: { path: '$geometry.coordinates', includeArrayIndex: "idx" } },
        {
            // skip all points (coordinates) without bcode
            $redact: {
               $cond: {
                   if: { $ne: ["$properties.bcode", ""] },
                   then: "$$KEEP",
                   else: "$$PRUNE"
               }
           }
        },
        {
            // create a new document containing common bridge data
            // and all damage info in a nested object
            // $idx is the index in the coordinates array
            $project: {
                sourceId: "$_id",
                bcode: { $arrayElemAt: ["$properties.bcode", "$idx"] },
                btype: { $arrayElemAt: ["$properties.btype", "$idx"] },
                idx: "$idx",
                damages: {
                    foundations: { $arrayElemAt: ["$properties.bdamagesfoundationsgeneraltype", "$idx"] },
                    foundationsDetail: { $arrayElemAt: ["$properties.bdamagesfoundationsdetailedtype", "$idx"] },
                    slab: { $arrayElemAt: ["$properties.BDamagesSlab", "$idx"] },
                    slabSeverity: { $arrayElemAt: ["$properties.BDamagesslabSeverity", "$idx"] },
                    piers: { $arrayElemAt: ["$properties.BDamagesPiers", "$idx"] },
                    piersSeverity: { $arrayElemAt: ["$properties.BDamagesPiersSeverity", "$idx"] },
                    beams: { $arrayElemAt: ["$properties.BDamagesBeams", "$idx"] },
                    beamsSeverity: { $arrayElemAt: ["$properties.BDamagesBeamsSeverity", "$idx"] },
                    bearings: { $arrayElemAt: ["$properties.BDamagesBearings", "$idx"] },
                    bearingsSeverity: { $arrayElemAt: ["$properties.BDamagesBearingsSeverity", "$idx"] },
                    abutments: { $arrayElemAt: ["$properties.BDamagesAbutments", "$idx"] },
                    abutmentsSeverity: { $arrayElemAt: ["$properties.BDamagesAbutmentsSeverity", "$idx"] },
                    sidewalls: { $arrayElemAt: ["$properties.BDamagesSidewalls", "$idx"] },
                    sidewallsSeverity: { $arrayElemAt: ["$properties.BDamagessidewallsSeverity", "$idx"] },
                    vaultsArches: { $arrayElemAt: ["$properties.BDamagesVaultArches", "$idx"] },
                    vaultsArchesSeverity: { $arrayElemAt: ["$properties.BDamagesVaultArchesSeverity", "$idx"] },
                    spandrel: { $arrayElemAt: ["$properties.BDamagesSpandrel", "$idx"] },
                    spandrelSeverity: { $arrayElemAt: ["$properties.BDamagesSpandrelSeverity", "$idx"] },
                    specialAreas: { $arrayElemAt: ["$properties.BDamagesSpecialareas", "$idx"] },
                    specialAreasSeverity: { $arrayElemAt: ["$properties.BDamagesSpecialareasSeverity", "$idx"] },
                    nonStructural: { $arrayElemAt: ["$properties.bdamagesnonstructural", "$idx"] }
                },
            }
        },
        {
            // group bridges together and keep
            // original indices where data appeared
            // so we can update later
            $group: {
                _id: {
                    sourceId: "$sourceId",
                    bcode: "$bcode",
                    btype: "$btype",
                    damages: "$damages"
                },
                indices: { $push: "$idx" }
            }
        },
        {
            // create a new document format
            // expanding the grouped _id object into
            // individual properties
            $project: {
                "_id": "$_id.bcode",
                "sourceTrackId": "$_id.sourceId",
                "bcode": "$_id.bcode",
                "type": "$_id.btype",
                "damages": "$_id.damages",
                "indices": "$indices"
            }
        },
        {
            // finally, select a single bridge if needed
            // or at least only bridges with ANY damage
            $match: {
                // get only documents with bcode
                bcode: { $exists: 1, $ne: "" },
                // DEBUG SINGLE BRIDGE
                //_id: "M6-SPL-B-1130",
                /* $or: [
                   { "damages.foundations": { $exists: 1, $ne: "" } },
                   { "damages.slab": { $exists: 1, $ne: "" } },
                   { "damages.piers": { $exists: 1, $ne: "" } },
                   { "damages.beams": { $exists: 1, $ne: "" } },
                   { "damages.bearings": { $exists: 1, $ne: "" } },
                   { "damages.abutments": { $exists: 1, $ne: "" } },
                   { "damages.sidewalls": { $exists: 1, $ne: "" } },
                   { "damages.spandrel": { $exists: 1, $ne: "" } },
                   { "damages.special": { $exists: 1, $ne: "" } },
                ] */

            }
        }
    ])
}

async function updateBridgeCondition(bridgeData){
    const newCondition = calculateBridgeCondition(bridgeData, bridgeConditionParams)
    // store as 0.x in db
    const fractionalBridgeCondition = newCondition / 100
    const updateConditions = {
        _id: bridgeData.sourceTrackId
    }
    // update bcondition in all original indices for this bridge
    const updateData = {
        $set: bridgeData.indices.reduce((acc, sourceIndex) => {
            acc['properties.bcondition.' + sourceIndex] = fractionalBridgeCondition
            return acc
        }, {})
    }
    try {
        const result = await Infodatatrack.update(updateConditions, updateData)
        //console.log('Updated bridge', bridgeData._id, ' with condition', fractionalBridgeCondition, result)
        return true
    }
    catch(err){
        console.error(`Error updating bridge ${bridgeData._id} condition`, err.message)
        return false
    }
}

async function updateAllBridgesCondition(){
    const bridgesToUpdate = await getBridgesWithDamages()
    let updatedCount = 0
    let failedCount = 0
    return Promise.all(bridgesToUpdate.map(async function(bridge){
        const updateResult = await updateBridgeCondition(bridge)
        updateResult ? updatedCount++ : failedCount ++
        return
    }))
    .then(() => {
        console.log(`Update bridge condition. Sucess: ${updatedCount}. Errors: ${failedCount}`)
        return {
            updatedCount,
            failedCount
        }
    })
}

module.exports = {
    getBridgesWithDamages,
    updateBridgeCondition,
    updateAllBridgesCondition
}