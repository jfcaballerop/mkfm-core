var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var infodatatrackSchema = new Schema({
    type: { type: String },
    inverted: { type: Boolean, default: false },
    properties: {
        name: String,
        time: Date,
        proccessed: { type: Boolean, default: false },
        coordTimes: [],
        kobo: [{
            kobo_id: String,
            kobo_type: String
        }],
        koboedit: [],
        video_roads: { type: Schema.Types.ObjectId, ref: 'Road' },
        pk: [],
        surveyor: [],
        datesurvey: [],
        rcode: [],
        rname: [],
        district: [],
        rcategory: [],
        rutmlong: [],
        rutmlat: [],
        rutmelevation: [],
        rdateconstruct: [],
        rmaterial: [],
        rbasematerial: [],
        rsubbasematerial: [],
        rlaneinc: [],
        rlanedecr: [],
        rlanetotal: [],
        rwidth: [],
        rlocdoc: [],
        rvideo: [],
        ralternatitinerary: [],
        rdendritic: [],
        ropen: [],
        rgauging: [],
        radt: [],
        rtrafficpeak: [],
        iri: [],
        rconslos: [],
        rprevcondition: [],
        rlastinspection: [],
        rsurveyfreq: [],
        rnextsurvey: [],
        rfailure: [],
        rlastoverlay: [],
        rlastyearinterv: [],
        rlastyearintervextent: [],
        rlastyearintervdate: [],
        rlastyearintervscope: [],
        rlastyearintervcost: [],
        rlastyearintervimpactcond: [],
        rlocdoclastyearinterv: [],
        rcurryearinterv: [],
        rcurryearintervextent: [],
        rcurryearintervdate: [],
        rcurryearintervscope: [],
        rcurryearintervcost: [],
        rlocdoccurryearinterv: [],
        rmaintissues: [],
        rinvestment10years: [],
        rinvestmentrequired: [],
        romcomments: [],
        rinfrint: [], //ROADS Group 4
        distance_airports_ferry_ports: [],
        rtourism: [],
        distance_turistic_sites: [],
        rindustry: [],
        rindustrydist: [],
        rhealth: [],
        distance_social_services: [],
        renvironment: [],
        rwaste: [],
        rvcondition: [],
        rccondition: [],
        rcriticality: [],
        rlandslide: [],
        rflood: [],
        rresphazard: [],
        rsensitivity: [],
        rrisk: [],
        rriskphysical: [],
        rrisknatural: [],
        rbarriersexist: [], //Road Furniture Data        
        rbarrierstype: [],
        rsafetyfence: [],
        rbarrierfunct: [],
        rsignalsexist: [],
        rsignalstype: [],
        rvsignalstype: [],
        rsignalsfunct: [],
        rlightexist: [],
        rlighttype: [],
        rlightfunct: [],
        rfpastinterv: [],
        rfyearinterv: [],
        rfcomments: [],
        bcode: [], // BRIDGES        
        bexistence: [],
        bname: [],
        byearconstruc: [],
        btype: [],
        bsurrounding: [],
        balternative: [],
        bobstaclesaved: [],
        bfloodscenario: [],
        bmaterialdeck: [],
        bmaterialgirder: [],
        bmaterialpiers: [],
        bmaterialabutments: [],
        balignment: [],
        bspans: [],
        bnumberspans: [],
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
        bdamagesstructuralgeneraltype: [],
        BDamagesVaultArches: [],
        BDamagesVaultArchesSeverity: [],
        BDamagesPiers: [],
        BDamagesPiersSeverity: [],
        BDamagesSpandrel: [],
        BDamagesSpandrelSeverity: [],
        BDamagesAbutments: [],
        BDamagesAbutmentsSeverity: [],
        BDamagesSidewalls: [],
        BDamagessidewallsSeverity: [],
        BDamagesSlab: [],
        BDamagesslabSeverity: [],
        BDamagesBeams: [],
        BDamagesBeamsSeverity: [],
        BDamagesBearings: [],
        BDamagesBearingsSeverity: [],
        BDamagesSpecialareas: [],
        BDamagesSpecialareasSeverity: [],
        bdamagesfoundationsgeneraltype: [],
        bdamagesfoundationsdetailedtype: [],
        bconslos: [],
        bfailure: [],
        bsurveyfreq: [],
        bnextsurvey: [],
        BLastYearInterv: [],
        BLastYearIntervExtent: [],
        BLastYearIntervDate: [],
        BLastYearIntervScope: [],
        BLastYearIntervImpactCond: [],
        BLocDocLastYearInterv: [],
        BCurrYearInterv: [],
        BCurrYearIntervExtent: [],
        BCurrYearIntervDate: [],
        BCurrYearIntervScope: [],
        BCurrYearIntervCost: [],
        BLocDocCurrYearInterv: [],
        BMaintIssues: [],
        Binvestment10years: [],
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
        gshoulders: [],
        gtreatments: [],
        gtreatmentsretaining: [],
        gtreatmentsretainingtype: [],
        gtreatmentsretainingextension: [],
        gtreatmentsretainingeffectiveness: [],
        gtreatmentsretainingconservation: [],
        gtreatmentsretainingother: [],
        gtreatmentsdefence: [],
        gtreatmentsdefencetype: [],
        gtreatmentsdefenceextension: [],
        gtreatmentsdefenceeffectiveness: [],
        gtreatmentsdefenceconservation: [],
        gtreatmentsdefenceother: [],
        gtreatmentscoating: [],
        gtreatmentscoatingtype: [],
        gtreatmentscoatingextension: [],
        gtreatmentscoatingeffectiveness: [],
        gtreatmentscoatingconservation: [],
        gtreatmentscoatingother: [],
        gtreatmentsinternaldrainages: [],
        gtreatmentsinternaldrainagesextension: [],
        gtreatmentsinternaldrainageseffectiveness: [],
        gtreatmentsinternaldrainagesconservation: [],
        gcorrectmeas: [],
        gvegetation: [],
        gtypevegetation: [],
        gphoto: [],
        glastinspection: [],
        gprevcondition: [],
        gvisualcondition: [],
        gevidrecfailures: [],
        gtypefailure: [],
        gintensityfailure: [],
        gextentfailure: [],
        gconslos: [],
        gfailure: [],
        gsurveyfreq: [],
        gnextsurvey: [],
        gpastinterv: [],
        gintervextent: [],
        gdateinterv: [],
        gscopeinterv: [],
        qintervcost: [],
        gimpactinterv: [],
        glocdocinterv: [],
        gcurryearinterv: [],
        gcurryearintervextent: [],
        gcurryearintervdate: [],
        gcurryearintervscope: [],
        gcurryearintervcost: [],
        glocdoccurryearinterv: [],
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
        gshoulders2: [],
        glength2: [],
        gblocks2: [],
        gtreatments2: [],
        gtreatmentsretaining2: [],
        gtreatmentsretainingtype2: [],
        gtreatmentsretainingextension2: [],
        gtreatmentsretainingeffectiveness2: [],
        gtreatmentsretainingconservation2: [],
        gtreatmentsretainingother2: [],
        gtreatmentsdefence2: [],
        gtreatmentsdefencetype2: [],
        gtreatmentsdefenceextension2: [],
        gtreatmentsdefenceeffectiveness2: [],
        gtreatmentsdefenceconservation2: [],
        gtreatmentsdefenceother2: [],
        gtreatmentscoating2: [],
        gtreatmentscoatingtype2: [],
        gtreatmentscoatingextension2: [],
        gtreatmentscoatingeffectiveness2: [],
        gtreatmentscoatingconservation2: [],
        gtreatmentscoatingother2: [],
        gtreatmentsinternaldrainages2: [],
        gtreatmentsinternaldrainagesextension2: [],
        gtreatmentsinternaldrainageseffectiveness2: [],
        gtreatmentsinternaldrainagesconservation2: [],
        gvegetation2: [],
        gtypevegetation2: [],
        gphoto2: [],
        glastinspection2: [],
        gprevcondition2: [],
        gvisualcondition2: [],
        gevidrecfailures2: [],
        gtypefailure2: [],
        gintensityfailure2: [],
        gextentfailure2: [],
        gconslos2: [],
        gfailure2: [],
        gsurveyfreq2: [],
        gnextsurvey2: [],
        gpastinterv2: [],
        gintervextent2: [],
        gdateinterv2: [],
        gscopeinterv2: [],
        qintervcost2: [],
        gimpactinterv2: [],
        glocdocinterv2: [],
        gcurryearinterv2: [],
        gcurryearintervextent2: [],
        gcurryearintervdate2: [],
        gcurryearintervscope2: [],
        gcurryearintervcost2: [],
        glocdoccurryearinterv2: [],
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
        Ccode: [],
        Cyearconstruc: [],
        Ctype: [],
        Clocation: [],
        Cfeeding: [],
        Csection: [],
        Ccapacity: [],
        Crainpeak: [],
        Cmaterial: [],
        Cnumelem: [],
        Cdiameter: [],
        Cwidth: [],
        Clength: [],
        Cprotentrance: [],
        Cprotexit: [],
        Cphoto: [],
        CVisualCondition: [],
        CConsLOS: [],
        CPrevCondition: [],
        CLastInspection: [],
        CSurveyFreq: [],
        CNextSurvey: [],
        Cfailure: [],
        CDamages: [],
        Cclearing: [],
        CLostSection: [],
        CLastYearInterv: [],
        CLastYearIntervExtent: [],
        CLastYearIntervDate: [],
        CLastYearIntervScope: [],
        CLastYearIntervCost: [],
        CLastYearIntervImpactCond: [],
        CLocDocLastYearInterv: [],
        CCurrYearInterv: [],
        CCurrYearIntervExtent: [],
        CCurrYearIntervDate: [],
        CCurrYearIntervScope: [],
        CCurrYearIntervCost: [],
        CLocDocCurrYearInterv: [],
        CMaintIssues: [],
        Cinvestment10years: [],
        Cinvestmentrequired: [],
        COMComments: [],
        Ccondition: [],
        Ccriticality: [],
        CLandslide: [],
        CFlood: [],
        CRespHazard: [],
        Csensitivity: [],
        CRISK: [],
        dcode: [],
        dyearconstruc: [],
        dtype: [],
        dsection: [],
        dposition: [],
        dslope: [],
        dphoto: [],
        dconslos: [],
        dfailure: [],
        dlastinspection: [],
        dintervextent: [],
        ddateinterv: [],
        dscopeinterv: [],
        dlastyearintervcost: [],
        dlocdocinterv: [],
        dcurryearinterv: [],
        dcurryearintervextent: [],
        dcurryearintervdate: [],
        dcurryearintervscope: [],
        dcurryearintervcost: [],
        dlocdoccurryearinterv: [],
        dmaintissues: [],
        dinvestment10years: [],
        dinvestmentrequired: [],
        domcomments: [],
        dcode2: [],
        dyearconstruc2: [],
        dtype2: [],
        dsection2: [],
        dposition2: [],
        dslope2: [],
        dphoto2: [],
        dconslos2: [],
        dfailure2: [],
        dlastinspection2: [],
        dintervextent2: [],
        ddateinterv2: [],
        dscopeinterv2: [],
        dlastyearintervcost2: [],
        dlocdocinterv2: [],
        dcurryearinterv2: [],
        dcurryearintervextent2: [],
        dcurryearintervdate2: [],
        dcurryearintervscope2: [],
        dcurryearintervcost2: [],
        dlocdoccurryearinterv2: [],
        dmaintissues2: [],
        dinvestment10years2: [],
        dinvestmentrequired2: [],
        domcomments2: []
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