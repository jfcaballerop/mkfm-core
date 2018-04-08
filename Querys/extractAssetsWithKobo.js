var assetCode = "properties.gcode2"
var assetCodePath = "$" + assetCode
db.getCollection('infodatatracks').aggregate([
    { $match: { [assetCode]: { $elemMatch: { $ne: null, $ne: "" }}} },
    { $unwind: { path: assetCodePath, includeArrayIndex: "idx" } },
    {
        $redact: {
            $cond: {
                if: { $ne: [assetCodePath, ""] }, 
                then: "$$KEEP", 
                else: "$$PRUNE" 
            }
        } 
    },
    {  $project: {
        "_id": 0,
        "properties.name": 1,
        "code": assetCodePath,
        "idx": 1,
        "koboedit": { $arrayElemAt: [ "$properties.koboedit", "$idx" ] }, 
        //"properties.Ctype": { $arrayElemAt: ["$properties.Ctype", "$idx"] },
        "geometry.coordinates": { $arrayElemAt: ["$geometry.coordinates", "$idx"] }, 
        //"properties.rcode": { $arrayElemAt: ["$properties.rcode", "$idx"] },     
        "properties.rcategory": { $arrayElemAt: ["$properties.rcategory", "$idx"] } 
        }
    },
   {
       $group: {
           _id: { 
               code: "$code", 
               roadCategory: "$properties.rcategory", 
               //index: "$idx",
               sourceTrack: "$properties.name",
               kobo: "$koboedit",
               //coordinates: "$geometry.coordinates"
            },            
           coordinates: {  $push: "$geometry.coordinates" },
           indices: { $push: "$idx" }
       } 
   },
   /*{
       $project: {
           "_id": "$_id.code",
           "assetCode": "$_id.code",
           "sourceTrack": "$_id.sourceTrack",
           "roadCategory": "$_id.roadCategory",
           "koboedit": "$_id.koboedit",
           "geometry": {
               "type": { $literal: "LineString" },
               "coordinates": "$coordinates"
            },
            "trackIndices": "$indices"
       }
   }*/
   
])