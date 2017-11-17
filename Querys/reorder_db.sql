pk, rklmpoint
surveyor, surveyor
datesurvey, datesurvey
coordTimes, movietime
district, district,db.infodatatracks.update({}, { $set: { "properties.district": [] } }, false, true);
rcode, rcode
rname, rname
road_category, rcategory,db.infodatatracks.update({}, { $rename: { "properties.road_category": "properties.rcategory" } }, false, true);
rutmlong, rutmlong,db.infodatatracks.update({}, { $set: { "properties.rutmlong": [] } }, false, true);
rutmlat, rutmlat,db.infodatatracks.update({}, { $set: { "properties.rutmlat": [] } }, false, true);
rutmelevation, rutmelevation,db.infodatatracks.update({}, { $set: { "properties.rutmelevation": [] } }, false, true);
date_construction, rdateconstruct,db.infodatatracks.update({}, { $rename: { "properties.date_construction": "properties.rdateconstruct" } }, false, true);
pavement_material, rmaterial,db.infodatatracks.update({}, { $rename: { "properties.pavement_material": "properties.rmaterial" } }, false, true);
base_material, rbasematerial,db.infodatatracks.update({}, { $rename: { "properties.base_material": "properties.rbasematerial" } }, false, true);
subbase_material,rsubbasematerial,db.infodatatracks.update({}, { $rename: { "properties.subbase_material": "properties.rsubbasematerial" } }, false, true); 
number_lanes_inc,rlaneinc,db.infodatatracks.update({}, { $rename: { "properties.number_lanes_inc": "properties.rlaneinc" } }, false, true);
number_lanes_dec,rlanedecr,db.infodatatracks.update({}, { $rename: { "properties.number_lanes_dec": "properties.rlanedecr" } }, false, true);
total_number_lanes,rlanetotal,db.infodatatracks.update({}, { $rename: { "properties.total_number_lanes": "properties.rlanetotal" } }, false, true);
total_width,rwidth,db.infodatatracks.update({}, { $rename: { "properties.total_width": "properties.rwidth" } }, false, true);
location_doc_road_projects, rlocdoc,db.infodatatracks.update({}, { $rename: { "properties.location_doc_road_projects": "properties.rlocdoc" } }, false, true);
rvideo,rvideo,db.infodatatracks.update({}, { $set: { "properties.rvideo": [] } }, false, true);
alternative_itinerary,ralternatitinerary,db.infodatatracks.update({}, { $rename: { "properties.alternative_itinerary": "properties.ralternatitinerary" } }, false, true);
open_traffic,ropen,db.infodatatracks.update({}, { $rename: { "properties.open_traffic": "properties.ropen" } }, false, true);
existence_gauging_stations,rgauging,db.infodatatracks.update({}, { $rename: { "properties.existence_gauging_stations": "properties.rgauging" } }, false, true);
adt,radt,db.infodatatracks.update({}, { $rename: { "properties.adt": "properties.radt" } }, false, true);
traffic_high_peak,rtrafficpeak,db.infodatatracks.update({}, { $rename: { "properties.traffic_high_peak": "properties.rtrafficpeak" } }, false, true);
RoadLab,iri,db.infodatatracks.update({}, { $rename: { "properties.roadlab": "properties.iri" } }, false, true);
current_visual_condition,rvcondition,db.infodatatracks.update({}, { $rename: { "properties.current_visual_condition": "properties.rvcondition" } }, false, true);
cons_LOS,rconslos,db.infodatatracks.update({}, { $rename: { "properties.cons_los": "properties.rconslos" } }, false, true);
prev_condition,rprevcondition,db.infodatatracks.update({}, { $rename: { "properties.prev_condition": "properties.rprevcondition" } }, false, true);
last_inspection,rlastinspection,db.infodatatracks.update({}, { $rename: { "properties.last_inspection": "properties.rlastinspection" } }, false, true);
survey_freq,rsurveyfreq,db.infodatatracks.update({}, { $rename: { "properties.survey_freq": "properties.rsurveyfreq" } }, false, true);
next_survey,rnextsurvey,db.infodatatracks.update({}, { $rename: { "properties.next_survey": "properties.rnextsurvey" } }, false, true);
failure_history,rfailure,db.infodatatracks.update({}, { $rename: { "properties.failure_history": "properties.rfailure" } }, false, true);
rlastoverlay,rlastoverlay,db.infodatatracks.update({}, { $set: { "properties.rlastoverlay":[] } }, false, true);
year_interv,rlastyearinterv,db.infodatatracks.update({}, { $rename: { "properties.year_interv": "properties.rlastyearinterv" } }, false, true);
interv_extent,rlastyearintervextent,db.infodatatracks.update({}, { $rename: { "properties.interv_extent": "properties.rlastyearintervextent" } }, false, true);
past_interv,rlastyearintervdate,db.infodatatracks.update({}, { $rename: { "properties.past_interv": "properties.rlastyearintervdate" } }, false, true);
scope_interv,rlastyearintervscope,db.infodatatracks.update({}, { $rename: { "properties.scope_interv": "properties.rlastyearintervscope" } }, false, true);
rlastyearintervcost,rlastyearintervcost,db.infodatatracks.update({}, { $set: { "properties.rlastyearintervcost": [] } }, false, true);
impact_interv,rlastyearintervimpactcond,db.infodatatracks.update({}, { $rename: { "properties.impact_interv": "properties.rlastyearintervimpactcond" } }, false, true);
loc_doc_interv,rlocdoclastyearinterv,db.infodatatracks.update({}, { $rename: { "properties.loc_doc_interv": "properties.rlocdoclastyearinterv" } }, false, true);
rcurryearinterv,rcurryearinterv,db.infodatatracks.update({}, { $set: { "properties.rcurryearinterv": [] } }, false, true);
rcurryearintervextent,rcurryearintervextent,db.infodatatracks.update({}, { $set: { "properties.rcurryearintervextent": [] } }, false, true);
rcurryearintervdate,rcurryearintervdate,db.infodatatracks.update({}, { $set: { "properties.rcurryearintervdate": [] } }, false, true);
rcurryearintervscope,rcurryearintervscope,db.infodatatracks.update({}, { $set: { "properties.rcurryearintervscope": [] } }, false, true);
rcurryearintervcost,rcurryearintervcost,db.infodatatracks.update({}, { $set: { "properties.rcurryearintervcost": [] } }, false, true);
rlocdoccurryearinterv,rlocdoccurryearinterv,db.infodatatracks.update({}, { $set: { "properties.rlocdoccurryearinterv": [] } }, false, true);
maint_issues,rmaintissues,db.infodatatracks.update({}, { $rename: { "properties.maint_issues": "properties.rmaintissues" } }, false, true);
investment10years,rinvestment10years,db.infodatatracks.update({}, { $rename: { "properties.investment10years": "properties.rinvestment10years" } }, false, true);
investment_required,rinvestmentrequired,db.infodatatracks.update({}, { $rename: { "properties.investment_required": "properties.rinvestmentrequired" } }, false, true);
om_comments,romcomments,db.infodatatracks.update({}, { $rename: { "properties.om_comments": "properties.romcomments" } }, false, true);
acess_airports_ferry_ports,rinfrint,db.infodatatracks.update({},{$rename: {"properties.acess_airports_ferry_ports": "properties.rinfrint"}},false,true);
access_turistic_sites,rtourism,db.infodatatracks.update({},{$rename: {"properties.access_turistic_sites": "properties.rtourism"}},false,true);
acess_industry_agriculture_fishing_sites,rindustry,db.infodatatracks.update({},{$rename: {"properties.acess_industry_agriculture_fishing_sites": "properties.rindustry"}},false,true);
distance_industries_agriculture_fishing_sites,rindustrydist,db.infodatatracks.update({},{$rename: {"properties.distance_industries_agriculture_fishing_sites": "properties.rindustrydist"}},false,true);
access_social_services,rhealth,db.infodatatracks.update({},{$rename: {"properties.access_social_services": "properties.rhealth"}},false,true);
located_within_an_environmentally_protected_area,renvironment,db.infodatatracks.update({},{$rename: {"properties.located_within_an_environmentally_protected_area": "properties.renvironment"}},false,true);
distance_a_dumping_area,rwaste,db.infodatatracks.update({},{$rename: {"properties.distance_a_dumping_area": "properties.rwaste"}},false,true);
current_condition,rccondition,db.infodatatracks.update({},{$rename: {"properties.current_condition": "properties.rccondition"}},false,true);
criticality,rcriticality,db.infodatatracks.update({},{$rename: {"properties.criticality": "properties.rcriticality"}},false,true);
exposure_landslide_hazard,rlandslide,db.infodatatracks.update({},{$rename: {"properties.exposure_landslide_hazard": "properties.rlandslide"}},false,true);
exposure_flood_hazard,rflood,db.infodatatracks.update({},{$rename: {"properties.exposure_flood_hazard": "properties.rflood"}},false,true);
asset_response_against_hazards,rresphazard,db.infodatatracks.update({},{$rename: {"properties.asset_response_against_hazards": "properties.rresphazard"}},false,true);
asset_sensitivity,rsensitivity,db.infodatatracks.update({},{$rename: {"properties.asset_sensitivity": "properties.rsensitivity"}},false,true);
risk,rrisk,db.infodatatracks.update({},{$rename: {"properties.risk": "properties.rrisk"}},false,true);

RBarriersExist,rbarriersexist,db.infodatatracks.update({},{$rename: {"properties.RBarriersExist": "properties.rbarriersexist"}},false,true);
RBarriersType,rbarrierstype,db.infodatatracks.update({},{$rename: {"properties.RBarriersType": "properties.rbarrierstype"}},false,true);
RSafetyFence,rsafetyfence,db.infodatatracks.update({},{$rename: {"properties.RSafetyFence": "properties.rsafetyfence"}},false,true);
RBarrierFunct,rbarrierfunct,db.infodatatracks.update({},{$rename: {"properties.RBarrierFunct": "properties.rbarrierfunct"}},false,true);
RSignalsExist,rsignalsexist,db.infodatatracks.update({},{$rename: {"properties.RSignalsExist": "properties.rsignalsexist"}},false,true);
RSignalsType,rsignalstype,db.infodatatracks.update({},{$rename: {"properties.RSignalsType": "properties.rsignalstype"}},false,true);
RVSignalsType,rvsignalstype,db.infodatatracks.update({},{$rename: {"properties.RVSignalsType": "properties.rvsignalstype"}},false,true);
RSignalsFunct,rsignalsfunct,db.infodatatracks.update({},{$rename: {"properties.RSignalsFunct": "properties.rsignalsfunct"}},false,true);
RLightExist,rlightexist,db.infodatatracks.update({},{$rename: {"properties.RLightExist": "properties.rlightexist"}},false,true);
RLightType,rlighttype,db.infodatatracks.update({},{$rename: {"properties.RLightType": "properties.rlighttype"}},false,true);
RLightFunct,rlightfunct,db.infodatatracks.update({},{$rename: {"properties.RLightFunct": "properties.rlightfunct"}},false,true);
RFPastInterv,rfpastinterv,db.infodatatracks.update({},{$rename: {"properties.RFPastInterv": "properties.rfpastinterv"}},false,true);
RFYearInterv,rfyearinterv,db.infodatatracks.update({},{$rename: {"properties.RFYearInterv": "properties.rfyearinterv"}},false,true);
RFComments,rfcomments,db.infodatatracks.update({},{$rename: {"properties.RFComments": "properties.rfcomments"}},false,true);

bcode,BCode,
bexists,bexistence,db.infodatatracks.update({},{$rename: {"properties.bexists": "properties.bexistence"}},false,true);
bname,BName,
byearconstruc,BYearConstruc,
btype,Btype,
bsurrounding,Bsurrounding,
bobstaclesaved,BObstacleSaved,
bfloodscenario,Bfloodscenario,
Bloadcapacity,Bloadcapacity,
bmaterialdeck,BMaterialDeck,
bmaterialgirder,BMaterialGirders,
bmaterialpiers,BMaterialPiers,
bmaterialabutments,BMaterialAbutments,
balignment,Balignment,
bspans,Bspans,
bnumberspans,Bnumberspans,
blenght,Blenght,
bmaxspan,BMaxSpan,
bwidth,Bwidth,
bfreeheight,BFreeHeight,
bfoundation,Bfoundation,
bpiersriver,BPiersRiver,
bprotectabut,BProtectAbut,
bprojectlocation,Bprojectlocation,
bphoto,Bphoto,

balternative,BAlternative,
bvisualcondition,BVisualCondition,
bconslos,BConsLOS,
bprevcondition,BPrevCondition,
blastinspection,BLastInspection,
bsurveyfreq,BSurveyFreq,
bnextsurvey,BNextSurvey,
bfailure,Bfailure,
bdamagesfoundations,BDamagesFoundations,
bdamagesfoundationsgeneraltype,BDamagesFoundationsgeneraltype,
bdamagesfoundationsdetailedtype,BDamagesFoundationsdetailedtype,
bdamagesstructural,BDamagesStructural,
bdamagesvaultsarchesmechanicaldurable,BDamagesVaultArches,db.infodatatracks.update({},{$rename: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArches"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArches"}},false,true);
bdamagesvaultsarchesimportance,BDamagesVaultArchesSeverity,db.infodatatracks.update({},{$rename: {"properties.bdamagesvaultsarchesimportance": "properties.BDamagesVaultArches"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesvaultsarchesimportance": "properties.BDamagesVaultArches"}},false,true);db.infodatatracks.update({},{$rename: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArchesSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArchesSeverity"}},false,true);
//TODO: voy por aqui
bdamagespiersmechanicaldurable,BDamagesPiers,db.infodatatracks.update({},{$rename: {"properties.bdamagespiersmechanicaldurable": "properties.BDamagesPiers"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagespiersmechanicaldurable": "properties.BDamagesPiers"}},false,true);
bdamagespiersimportance,BDamagesPiersSeverity,db.infodatatracks.update({},{$rename: {"properties.bdamagespiersimportance": "properties.BDamagesPiersSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagespiersimportance": "properties.BDamagesPiersSeverity"}},false,true);
bdamagesspandrelwallmechanicaldurable,BDamagesSpandrel,db.infodatatracks.update({},{$rename: {"properties.bdamagesspandrelwallmechanicaldurable": "properties.BDamagesSpandrel"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesspandrelwallmechanicaldurable": "properties.BDamagesSpandrel"}},false,true);
bdamagesspandrelwallimportance,BDamagesSpandrelSeverity,db.infodatatracks.update({},{$rename: {"properties.bdamagesspandrelwallimportance": "properties.BDamagesSpandrelSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesspandrelwallimportance": "properties.BDamagesSpandrelSeverity"}},false,true);
bdamagesabutmentsmechanicaldurable,BDamagesAbutments,db.infodatatracks.update({},{$rename: {"properties.bdamagesabutmentsmechanicaldurable": "properties.BDamagesAbutments"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesabutmentsmechanicaldurable": "properties.BDamagesAbutments"}},false,true);
bdamagesabutmentsimportance,BDamagesAbutmentsSeverity,db.infodatatracks.update({},{$rename: {"properties.bdamagesabutmentsimportance": "properties.BDamagesAbutmentsSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesabutmentsimportance": "properties.BDamagesAbutmentsSeverity"}},false,true);
bdamagessidewallsmechanicaldurable,BDamagesSidewalls,db.infodatatracks.update({},{$rename: {"properties.bdamagessidewallsmechanicaldurable": "properties.BDamagesSidewalls"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagessidewallsmechanicaldurable": "properties.BDamagesSidewalls"}},false,true);
bdamagessidewallsimportance,BDamagessidewallsSeverity,db.infodatatracks.update({},{$rename: {"properties.bdamagessidewallsimportance": "properties.BDamagessidewallsSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagessidewallsimportance": "properties.BDamagessidewallsSeverity"}},false,true);
bdamagesslabmechanicaldurable,BDamagesSlab,db.infodatatracks.update({},{$rename: {"properties.bdamagesslabmechanicaldurable": "properties.BDamagesSlab"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesslabmechanicaldurable": "properties.BDamagesSlab"}},false,true);
bdamagesslabimportance,BDamagesslabSeverity,db.infodatatracks.update({},{$rename: {"properties.bdamagesslabimportance": "properties.BDamagesslabSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesslabimportance": "properties.BDamagesslabSeverity"}},false,true);
bdamagesbeamsbracesmechanicaldurable,BDamagesBeams,db.infodatatracks.update({},{$rename: {"properties.bdamagesbeamsbracesmechanicaldurable": "properties.BDamagesBeams"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesbeamsbracesmechanicaldurable": "properties.BDamagesBeams"}},false,true);
bdamagesbeamsbracesimportance,BDamagesBeamsSeverity,db.infodatatracks.update({},{$rename: {"properties.bdamagesbeamsbracesimportance": "properties.BDamagesBeamsSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesbeamsbracesimportance": "properties.BDamagesBeamsSeverity"}},false,true);
bdamagesbearingstype,BDamagesBearings,db.infodatatracks.update({},{$rename: {"properties.bdamagesbearingstype": "properties.BDamagesBearings"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesbearingstype": "properties.BDamagesBearings"}},false,true);
bdamagesbearingsimportance,BDamagesBearingsSeverity,db.infodatatracks.update({},{$rename: {"properties.bdamagesbearingsimportance": "properties.BDamagesBearingsSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesbearingsimportance": "properties.BDamagesBearingsSeverity"}},false,true);
bdamagesspecialareastype,BDamagesSpecialareas,db.infodatatracks.update({},{$rename: {"properties.bdamagesspecialareastype": "properties.BDamagesSpecialareas"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesspecialareastype": "properties.BDamagesSpecialareas"}},false,true);
bdamagesspecialareasimportance,BDamagesSpecialareasSeverity,db.infodatatracks.update({},{$rename: {"properties.bdamagesspecialareasimportance": "properties.BDamagesSpecialareasSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesspecialareasimportance": "properties.BDamagesSpecialareasSeverity"}},false,true);
bdamagesnonstructural,BDamagesNonStructural,
bpastinterv,BLastYearInterv,db.infodatatracks.update({},{$rename: {"properties.bpastinterv": "properties.BLastYearInterv"}},false,true); db.koboinfos.update({},{$rename: {"properties.bpastinterv": "properties.BLastYearInterv"}},false,true);
bintervextent,BLastYearIntervExtent,db.infodatatracks.update({},{$rename: {"properties.bintervextent": "properties.BLastYearIntervExtent"}},false,true); db.koboinfos.update({},{$rename: {"properties.bintervextent": "properties.BLastYearIntervExtent"}},false,true);
bdateinterv,BLastYearIntervDate,db.infodatatracks.update({},{$rename: {"properties.bdateinterv": "properties.BLastYearIntervDate"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdateinterv": "properties.BLastYearIntervDate"}},false,true);
bscopeinterv,BLastYearIntervScope,db.infodatatracks.update({},{$rename: {"properties.bscopeinterv": "properties.BLastYearIntervScope"}},false,true); db.koboinfos.update({},{$rename: {"properties.bscopeinterv": "properties.BLastYearIntervScope"}},false,true);
BLastYearIntervCost,BLastYearIntervCost,
bimpactinterv,BLastYearIntervImpactCond,db.infodatatracks.update({},{$rename: {"properties.bimpactinterv": "properties.BLastYearIntervImpactCond"}},false,true); db.koboinfos.update({},{$rename: {"properties.bimpactinterv": "properties.BLastYearIntervImpactCond"}},false,true);
blocdocinterv,BLocDocLastYearInterv,db.infodatatracks.update({},{$rename: {"properties.blocdocinterv": "properties.BLocDocLastYearInterv"}},false,true); db.koboinfos.update({},{$rename: {"properties.blocdocinterv": "properties.BLocDocLastYearInterv"}},false,true);
BCurrYearInterv,BCurrYearInterv,
BCurrYearIntervExtent,BCurrYearIntervExtent,
BCurrYearIntervDate,BCurrYearIntervDate,
BCurrYearIntervScope,BCurrYearIntervScope,
BCurrYearIntervCost,BCurrYearIntervCost,
BLocDocCurrYearInterv,BLocDocCurrYearInterv,
bmaintissues,BMaintIssues,
binvestment10years,Binvestment10years,
binvestmentrequired,Binvestmentrequired,
bomcomments,BOMComments,

, bcondition
, bcriticality
, blandslide
, bflood
, bresphazard
, bsensitivity
, brisk
, lgcode
, lgyearconstruct
, lgtype
, lgposition
, lgmaterial
, lgnature
, lgheight
gh_h, gh_h
, lgslope
, lgdistance
, lgshoulders
, lglength
, lgblocks
, lgtreatments
, lgtreatmentsretaining
, lgtreatmentsretainingtype
, lgtreatmentsretainingextension
, lgtreatmentsretainingeffectiveness
, lgtreatmentsretainingconservation
, lgtreatmentsretainingother
, lgtreatmentsdefence
, lgtreatmentsdefencetype
, lgtreatmentsdefenceextension
, lgtreatmentsdefenceeffectiveness
, lgtreatmentsdefenceconservation
, lgtreatmentsdefenceother
, lgtreatmentscoating
, lgtreatmentscoatingtype
, lgtreatmentscoatingextension
, lgtreatmentscoatingeffectiveness
, lgtreatmentscoatingconservation
, lgtreatmentscoatingother
, lgtreatmentsinternaldrainages
, lgtreatmentsinternaldrainagesextension
, lgtreatmentsinternaldrainageseffectiveness
, lgtreatmentsinternaldrainagesconservation
, lgvegetation
, lgtypevegetation
, lgphoto
, lgvisualcondition
, lgconslos
, lgprevcondition
, lglastinspection
, lgsurveyfreq
, lgnextsurvey
, lgfailure
, lgevidrecfailures
, lgtypefailure
, lgintensityfailure
, lgextentfailure
, lglastyearinterv
, lglastyearintervextent
, lglastyearintervdate
, lglastyearintervscope
, lglastyearintervcost
, lglastyearintervimpactcond
, lglocdoclastyearinterv
, lgcurryearinterv
, lgcurryearintervextent
, lgcurryearintervdate
, lgcurryearintervscope
, lgcurryearintervcost
, lglocdoccurryearinterv
, lgmaintissues
, lginvestment10years
, lgnvestmentrequired
, lgomcomments
, lgcondition
, lgcriticality
, lglandslide
, lgflood
, lgresphazard
, lgsensitivity
, lgrisk
, rgcode
, rgyearconstruct
, rgtype
, rgposition
, rgmaterial
, rgnature
, rgheight
gh_h2, gh_h2
, rgslope
, rgdistance
, rgshoulders
, rglength
, rgblocks
, rgtreatments
, rgtreatmentsretaining
, rgtreatmentsretainingtype
, rgtreatmentsretainingextension
, rgtreatmentsretainingeffectiveness
, rgtreatmentsretainingconservation
, rgtreatmentsretainingother
, rgtreatmentsdefence
, rgtreatmentsdefencetype
, rgtreatmentsdefenceextension
, rgtreatmentsdefenceeffectiveness
, rgtreatmentsdefenceconservation
, rgtreatmentsdefenceother
, rgtreatmentscoating
, rgtreatmentscoatingtype
, rgtreatmentscoatingextension
, rgtreatmentscoatingeffectiveness
, rgtreatmentscoatingconservation
, rgtreatmentscoatingother
, rgtreatmentsinternaldrainages
, rgtreatmentsinternaldrainagesextension
, rgtreatmentsinternaldrainageseffectiveness
, rgtreatmentsinternaldrainagesconservation
, rgvegetation
, rgtypevegetation
, rgphoto
, rgvisualcondition
, rgconslos
, rgprevcondition
, rglastinspection
, rgsurveyfreq
, rgnextsurvey
, rgfailure
, rgevidrecfailures
, rgtypefailure
, rgintensityfailure
, rgextentfailure
, rglastyearinterv
, rglastyearintervextent
, rglastyearintervdate
, rglastyearintervscope
, rglastyearintervcost
, rglastyearintervimpactcond
, rglocdoclastyearinterv
, rgcurryearinterv
, rgcurryearintervextent
, rgcurryearintervdate
, rgcurryearintervscope
, rgcurryearintervcost
, rglocdoccurryearinterv
, rgmaintissues
, rginvestment10years
, rginvestmentrequired
, rgomcomments
, rgcondition
, rgcriticality
, rglandslide
, rgflood
, rgresphazard
, rgsensitivity
, rgrisk
, ccode
, cyearconstruc
, ctype
, csection
, ccapacity
, crainpeak
, cmaterial
, cnumelem
, cdiameter
, cwidth
, clength
, cprotentrance
, cprotexit
, cphoto
, cvisualcondition
, cconslos
, cprevcondition
, clastinspection
, csurveyfreq
, cnextsurvey
, cfailure
, cdamages
, cclearing
, clostsection
, clastyearinterv
, clastyearintervextent
, clastyearintervdate
, clastyearintervscope
, clastyearintervcost
, clastyearintervimpactcond
, clocdoclastyearinterv
, ccurryearinterv
, ccurryearintervextent
, ccurryearintervdate
, ccurryearintervscope
, ccurryearintervcost
, clocdoccurryearinterv
, cmaintissues
, cinvestment10years
, cinvestmentrequired
, comcomments
, ccondition
, ccriticality
, clandslide
, cflood
, cresphazard
, csensitivity
, crisk
, ldcode
, ldyearconstruc
, ldtype
, ldlongsection
, ldlongposition
, ldlongslope
, ldphoto
, ldconslos
, ldfailure
, ldlastyearinterv
, ldlastyearintervextent
, ldlastyearintervdate
, ldlastyearintervscope
, ldlastyearintervcost
, ldlocdoclastyearinterv
, ldcurryearinterv
, ldcurryearintervextent
, ldcurryearintervdate
, ldcurryearintervscope
, ldcurryearintervcost
, ldlocdoccurryearinterv
, ldmaintissues
, ldinvestment10years
, ldinvestmentrequired
, ldomcomments
, rdcode
, rdyearconstruc
, rdtype
, rdlongsection
, rdlongposition
, rdlongslope
, rdphoto
, rdconslos
, rdfailure
, rdlastyearinterv
, rdlastyearintervextent
, rdlastyearintervdate
, rdlastyearintervscope
, rdlastyearintervcost
, rdlocdoclastyearinterv
, rdcurryearinterv
, rdcurryearintervextent
, rdcurryearintervdate
, rdcurryearintervscope
, rdcurryearintervcost
, rdlocdoccurryearinterv
, rdmaintissues
, rdinvestment10years
, rdinvestmentrequired
, rdomcomments