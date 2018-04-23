// 1. Aggregation query - devuelve los tracks sin tramificar

var riskFieldPath = "rcriticality" //o "rcondition", etc
var riskField = "$properties." + riskField
db.getCollection('infodatatracks').aggregate([
    // primera etapa: elegir campos que me interesan (como 2do argumento en find)
    {
        $project: {
            ["properties." + riskField]: 1,
            "properties.name": 1,
            "properties.rcategory": 1,
            "geometry.coordinates": 1
        }
    },
    // descomponer el array de riesgos en 1 documento por cada elemento
    { $unwind: { path: riskFieldPath, includeArrayIndex: "idx" } },
    // si el campo está vacío, me salto el documento
    {
        $redact: {
            $cond: {
                if: { $ne: [riskFieldPath, ""] },
                then: "$$KEEP",
                else: "$$PRUNE"
            }
        }
    },
    // genero un documento que tenga el valor, el indice en el array, y las
    // coordenadas y categoria que coinciden en esa posicion (1 por cada rcriticality por ejemplo)
    {  $project: {
        "_id": 0,
        "properties.name": 1,
        [riskField]: riskFieldPath,
        "idx": 1,
        "geometry.coordinates": { $arrayElemAt: ["$geometry.coordinates", "$idx"] },
        "properties.rcategory": { $arrayElemAt: ["$properties.rcategory", "$idx"] }
        }
    },
    // agrupo los documentos anteriores por los que tienen el mismo valor de riesgo
    // y voy añadiendo las coordenadas (creo tramos por valor rcriticality por ejemplo)
    {
        $group: {
            // todo lo q va dentro de _id es como un GROUP BY por estos campos
            _id: {
                [riskField]: "$" + riskField,
                roadCategory: "$properties.rcategory",
                sourceTrack: "$properties.name",
            },
            // voy pusheando coordenadas
            coordinates: {  $push: "$geometry.coordinates" },
            // e indices de origen por si me hace falta
            indices: { $push: "$idx" }
        }
    },
    // proyecto lo anterior en un formato de documento más chulo
    {
        $project: {
            "_id": 0,
            "properties": {
                [riskField]: "$_id." + riskField,
                "sourceTrack": "$_id.sourceTrack",
                "roadCategory": "$_id.roadCategory",
            },
            "geometry": {
                "coordinates": "$coordinates"
            },
            // esto por si necesito depurar de que indices viene
            "trackIndices": "$indices"
        }
    },
    // y por ultimo, devuelvo solo los de la categoria que me interesa
    {
        $match: {
            "properties.roadCategory" : roadType,
            "geometry.coordinates.1": {$exists: true}
        }
    }
])


// 2. Tramificar - le pasas el data que has obtenido antes y te devuelve para
// cada uno tramos de coordenadas (array de arrays), para meterlo directamente
// como geometry.coordinates en un tipo "MultiLineString"
function splitLinestringIntoFragments(data){
    var fragments = data.trackIndices.reduce((acc, index) => {
        if(!acc.current || index - acc.current[acc.current.length-1] > 1){
            acc.output.push([])
            acc.current = acc.output[acc.output.length-1]
        }
        acc.current.push(index)
        return acc


    }, { current: null, output: [] })

    var multilines = fragments.output.map(function(frag){
        return frag.map(idx => data.geometry.coordinates[data.trackIndices.indexOf(idx)])
    })

    return multilines
}
