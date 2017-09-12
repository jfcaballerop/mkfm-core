var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var infodatatrackSchema = new Schema({
    type: { type: String },
    properties: {
        name: String,
        time: Date,
        coordTimes: [],
        pk: [],
        road_category: [],
        Roadlab: [],
        video_roads: { type: Schema.Types.ObjectId, ref: 'Road' },
        inventario: [],
        date_construction: [],
        alternative_itinerary: [],
        open_traffic: [],
        existence_gauging_stations: [],
        adt: [],
        traffic_high_peak: [],
        pavement_material: [],
        base_material: [],
        subbase_material: [],
        number_lanes_inc: [],
        number_lanes_dec: [],
        total_number_lanes: [],
        total_width: [],
        location_doc_road_projects: []



    },
    geometry: {
        type: { type: String },
        coordinates: []
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});
infodatatrackSchema.index({ "geometry": "2dsphere" });

// create the model
var Infodatatrack = mongoose.model('Infodatatrack', infodatatrackSchema);
module.exports = Infodatatrack;