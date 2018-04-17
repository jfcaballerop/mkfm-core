/* Get Bridges with Damages */
db.getCollection('infodatatracks').aggregate([
    { $match: { 'properties.bcode': { $elemMatch: { $ne: null, $ne: "" }}} },
    { $unwind: { path: '$geometry.coordinates', includeArrayIndex: "idx" } },
    {
       $redact: {
           $cond: {
               if: { $ne: ["$properties.bcode", ""] },
               then: "$$KEEP",
               else: "$$PRUNE"
           }
       }
   },
    { $project: {
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
            sidewallsSeverity: { $arrayElemAt: ["$properties.BDamagesSidewallsSeverity", "$idx"] },
            vaultsArches: { $arrayElemAt: ["$properties.BDamagesVaultArches", "$idx"] },
            vaultsArchesSeverity: { $arrayElemAt: ["$properties.BDamagesVaultArchesSeverity", "$idx"] },
            spandrel: { $arrayElemAt: ["$properties.BDamagesSpandrel", "$idx"] },
            spandrelSeverity: { $arrayElemAt: ["$properties.BDamagesSpandrelSeverity", "$idx"] },
            specialAreas: { $arrayElemAt: ["$properties.BDamagesSpecialareas", "$idx"] },
            specialAreasSeverity: { $arrayElemAt: ["$properties.BDamagesSpecialareasSeverity", "$idx"] },
            nonStructural: { $arrayElemAt: ["$properties.bdamagesnonstructural", "$idx"] }
        },
    }},
    {
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
        $match: {
            $or: [
               { "damages.foundations": { $exists: 1, $ne: "" } },
               { "damages.slab": { $exists: 1, $ne: "" } },
               { "damages.piers": { $exists: 1, $ne: "" } },
               { "damages.beams": { $exists: 1, $ne: "" } },
               { "damages.bearings": { $exists: 1, $ne: "" } },
               { "damages.abutments": { $exists: 1, $ne: "" } },
               { "damages.sidewalls": { $exists: 1, $ne: "" } },
               { "damages.spandrel": { $exists: 1, $ne: "" } },
               { "damages.special": { $exists: 1, $ne: "" } },
            ]

        }
    }
])