var riskField = "properties.rcriticality"
var roadType = "Main Road"
var riskFieldPath = "$" + riskField
db.getCollection('infodatatracks').aggregate([
    /*{ 
        
        $match: { 
            [riskField]: { $elemMatch: { $ne: null, $ne: "" }},
            "properties.rcategory": roadType 
        }
    },*/
    {
        $project: {
            [riskField]: 1,
            "properties.name": 1,
            //"properties.rcode": 1,
            "properties.rcategory": 1,
            "geometry.coordinates": 1
        }
    },
    //{ $limit: 1 },
    { $unwind: { path: riskFieldPath, includeArrayIndex: "idx" } },
    {
        $redact: {
            $cond: {
                if: { $ne: [riskFieldPath, ""] }, 
                then: "$$KEEP", 
                else: "$$PRUNE" 
            }
        } 
    },
    {  $project: {
        "_id": 0,
        "properties.name": 1,
        //"properties.rcode": 1,
        "riskvalue": riskFieldPath,
        "idx": 1,
        //"koboedit": { $arrayElemAt: [ "$properties.koboedit", "$idx" ] }, 
        //"properties.Ctype": { $arrayElemAt: ["$properties.Ctype", "$idx"] },
        "geometry.coordinates": { $arrayElemAt: ["$geometry.coordinates", "$idx"] }, 
        //"properties.rcode": { $arrayElemAt: ["$properties.rcode", "$idx"] },     
        "properties.rcategory": { $arrayElemAt: ["$properties.rcategory", "$idx"] } 
        }
    },
   {
       $group: {
           _id: { 
               riskvalue: "$riskvalue", 
               roadCategory: "$properties.rcategory", 
               //index: "$idx",
               //roadCode: { $arrayElemAt: ["$properties.rcode", "$idx" ] },
               sourceTrack: "$properties.name",
               //kobo: "$koboedit",
               //coordinates: "$geometry.coordinates"
            },            
           coordinates: {  $push: "$geometry.coordinates" },
           indices: { $push: "$idx" }
       } 
   },
   {
       $project: {
           "_id": 0,
           //"_id": "$_id.code",
           //"assetCode": "$_id.code",
           "riskValue": "$_id.riskvalue",
           "sourceTrack": "$_id.sourceTrack",
           "roadCategory": "$_id.roadCategory",
           //"koboedit": "$_id.koboedit",
           "geometry": {
               "type": { $literal: "LineString" },
               "coordinates": "$coordinates"
            },
            "trackIndices": "$indices"
       }
   },
   {
       $match: {
            'roadCategory' : roadType,
            'trackIndices.1': {$exists: true}
       }
   }
]).toArray()