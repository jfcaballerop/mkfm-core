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
        rcode: [], // ROADS Group 1
        Roadlab: [],
        road_category: [],
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
        current_visual_condition: [],
        current_condition: [],
        criticality: [],
        exposure_landslide_hazard: [],
        exposure_flood_hazard: [],
        asset_response_against_hazards: [],
        asset_sensitivity: [],
        risk: [],
        RBarriersExist: [], //Road Furniture Data        
        RBarriersType: [],
        RSafetyFence: [],
        RBarrierFunct: [],
        RSignalsExist: [],
        RSignalsType: [],
        RVSignalsType: [],
        RSignalsFunct: [],
        RLightExist: [],
        RLightType: [],
        RLightFunct: [],
        RFPastInterv: [],
        RFYearInterv: [],
        RFComments: [],
        bcode: [], // BRIDGES        
        bexists: [],
        bname: [],
        byearconstruc: [],
        btype: [],
        bsurrounding: [],
        balternative: [],
        bobstaclesaved: [],
        bfloodscenario: [],
        bmaterialdeck: [],
        bmaterialpiers: [],
        bmaterialabutments: [],
        balignment: [],
        bspans: [],
        blenght: [],
        bmaxspan: [],
        bwidth: [],
        bfreeheight: [],
        bfoundation: [],
        bpiersriver: [],
        bprotectabut: [],
        bprojectlocation: [],
        bphoto: [],
        blastinspection: [],
        bprevcondition: [],
        bvisualcondition: [],
        bdamagesfoundations: [],
        bdamagesstructural: [],
        bdamagesnonstructural: [],
        bconslos: [],
        bfailure: [],
        bsurveyfreq: [],
        bnextsurvey: [],
        bpastinterv: [],
        bintervextent: [],
        bdateinterv: [],
        bscopeinterv: [],
        bimpactinterv: [],
        blocdocinterv: [],
        bmaintissues: [],
        binvestment10years: [],
        binvestmentrequired: [],
        bomcomments: [],
        bcondition: [],
        bcriticality: [],
        blandslide: [],
        bflood: [],
        bresphazard: [],
        bsensitivity: [],
        brisk: [],
        gcode: [], // GEOTECHNICAL ASSETS        
        gyearconstruct: [],
        gtype: [],
        gposition: [],
        gmaterial: [],
        gnature: [],
        gheight: [],
        gh_h: [],
        gslope: [],
        gdistance: [],
        glength: [],
        gblocks: [],
        gtreatments: [],
        gcorrectmeas: [],
        gvegetation: [],
        gtypevegetation: [],
        gphoto: [],
        glastinspection: [],
        gprevcondition: [],
        gvisualcondition: [],
        gevidrecfailures: [],
        gtypefailure: [],
        gextentfailure: [],
        gconslos: [],
        gfailure: [],
        gsurveyfreq: [],
        gnextsurvey: [],
        gpastinterv: [],
        gintervextent: [],
        gdateinterv: [],
        gscopeinterv: [],
        gimpactinterv: [],
        glocdocinterv: [],
        gmaintissues: [],
        ginvestment10years: [],
        rgnvestmentrequired: [],
        gomcomments: [],
        gcondition: [],
        gcriticality: [],
        glandslide: [],
        gflood: [],
        gresphazard: [],
        gsensitivity: [],
        grisk: [],
        gcode2: [], // GEOTECHNICAL ASSETS  2      
        gyearconstruct2: [],
        gtype2: [],
        gposition2: [],
        gmaterial2: [],
        gnature2: [],
        gheight2: [],
        gh_h2: [],
        gslope2: [],
        gdistance2: [],
        glength2: [],
        gblocks2: [],
        gtreatments2: [],
        gcorrectmeas2: [],
        gvegetation2: [],
        gtypevegetation2: [],
        gphoto2: [],
        glastinspection2: [],
        gprevcondition2: [],
        gvisualcondition2: [],
        gevidrecfailures2: [],
        gtypefailure2: [],
        gextentfailure2: [],
        gconslos2: [],
        gfailure2: [],
        gsurveyfreq2: [],
        gnextsurvey2: [],
        gpastinterv2: [],
        gintervextent2: [],
        gdateinterv2: [],
        gscopeinterv2: [],
        gimpactinterv2: [],
        glocdocinterv2: [],
        gmaintissues2: [],
        ginvestment10years2: [],
        rgnvestmentrequired2: [],
        gomcomments2: [],
        gcondition2: [],
        gcriticality2: [],
        glandslide2: [],
        gflood2: [],
        gresphazard2: [],
        gsensitivity2: [],
        grisk2: [],
        dcode: [], //Drainages
        dyearconstruc: [],
        dtype: [],
        dcapacity: [],
        drainpeak: [],
        dmaterial: [],
        dslope: [],
        dsection: [],
        ddiameter: [],
        dlength: [],
        dprotentrance: [],
        dprotexit: [],
        dphoto: [],
        dlastinspection: [],
        dprevcondition: [],
        dvisualcondition: [],
        dcrossdamages: [],
        dlostsection: [],
        dconslos: [],
        dfailure: [],
        dsurveyfreq: [],
        dnextsurvey: [],
        dpastinterv: [],
        dintervextent: [],
        ddateinterv: [],
        dscopeinterv: [],
        dimpactinterv: [],
        dlocdocinterv: [],
        dmaintissues: [],
        dinvestment10years: [],
        dinvestmentrequired: [],
        domcomments: [],
        dcondition: [],
        dcriticality: [],
        dlandslide: [],
        dflood: [],
        dresphazard: [],
        dsensitivity: [],
        drisk: [],
        dposition: [],
        dcode2: [], //Drainages2
        dyearconstruc2: [],
        dtype2: [],
        dcapacity2: [],
        drainpeak2: [],
        dmaterial2: [],
        dslope2: [],
        dsection2: [],
        ddiameter2: [],
        dlength2: [],
        dprotentrance2: [],
        dprotexit2: [],
        dphoto2: [],
        dlastinspection2: [],
        dprevcondition2: [],
        dvisualcondition2: [],
        dcrossdamages2: [],
        dlostsection2: [],
        dconslos2: [],
        dfailure2: [],
        dsurveyfreq2: [],
        dnextsurvey2: [],
        dpastinterv2: [],
        dintervextent2: [],
        ddateinterv2: [],
        dscopeinterv2: [],
        dimpactinterv2: [],
        dlocdocinterv2: [],
        dmaintissues2: [],
        dinvestment10years2: [],
        dinvestmentrequired2: [],
        domcomments2: [],
        dcondition2: [],
        dcriticality2: [],
        dlandslide2: [],
        dflood2: [],
        dresphazard2: [],
        dsensitivity2: [],
        drisk2: [],
        dposition2: []
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