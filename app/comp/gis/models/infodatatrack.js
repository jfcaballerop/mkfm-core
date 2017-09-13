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
        road_category: [], // ROADS Group 1
        Roadlab: [],
        video_roads: { type: Schema.Types.ObjectId, ref: 'Road' },
        inventario: [],
        date_construction: [],
        alternative_itinerary: [],
        open_traffic: [],
        existence_gauging_stations: [],
        adt: [],
        traffic_high_peak: [],
        pavement_material: [], // ROADS Group 2
        base_material: [],
        subbase_material: [],
        number_lanes_inc: [],
        number_lanes_dec: [],
        total_number_lanes: [],
        total_width: [],
        location_doc_road_projects: [],
        last_inspection: [], // ROADS Group 3
        prev_condition: [],
        failure_history: [],
        cons_LOS: [],
        survey_freq: [],
        next_survey: [],
        past_interv: [],
        interv_extent: [],
        year_interv: [],
        scope_interv: [],
        impact_interv: [],
        loc_doc_interv: [],
        maint_issues: [],
        investment10years: [],
        investment_required: [],
        om_comments: [],
        acess_airports_ferry_ports: [], //ROADS Group 4
        distance_airports_ferry_ports: [],
        access_turistic_sites: [],
        distance_turistic_sites: [],
        acess_industry_agriculture_fishing_sites: [],
        distance_industries_agriculture_fishing_sites: [],
        access_social_services: [],
        distance_social_services: [],
        located_within_an_environmentally_protected_area: [],
        distance_a_dumping_area: [],
        current_condition: [],
        criticality: [],
        exposure_landslide_hazard: [],
        exposure_flood_hazard: [],
        asset_response_against_hazards: [],
        asset_sensitivity: [],
        risk: []
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