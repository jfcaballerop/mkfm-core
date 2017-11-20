pk, rklmpoint,
surveyor, surveyor,
datesurvey, datesurvey,
coordTimes, movietime,
district, district,db.infodatatracks.update({}, { $set: { "properties.district": [] } }, false, true);
rcode, rcode,
rname, rname,
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
BCurrYearInterv,BCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.BCurrYearInterv": [] } }, false, true);
BCurrYearIntervExtent,BCurrYearIntervExtent,db.infodatatracks.update({}, { $set: { "properties.BCurrYearIntervExtent": [] } }, false, true);
BCurrYearIntervDate,BCurrYearIntervDate,db.infodatatracks.update({}, { $set: { "properties.BCurrYearIntervDate": [] } }, false, true);
BCurrYearIntervScope,BCurrYearIntervScope,db.infodatatracks.update({}, { $set: { "properties.BCurrYearIntervScope": [] } }, false, true);
BCurrYearIntervCost,BCurrYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.BCurrYearIntervCost": [] } }, false, true);
BLocDocCurrYearInterv,BLocDocCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.BLocDocCurrYearInterv": [] } }, false, true);
bmaintissues,BMaintIssues,db.infodatatracks.update({},{$rename: {"properties.bmaintissues": "properties.BMaintIssues"}},false,true); db.koboinfos.update({},{$rename: {"properties.bmaintissues": "properties.BMaintIssues"}},false,true);
binvestment10years,Binvestment10years,db.infodatatracks.update({},{$rename: {"properties.binvestment10years": "properties.Binvestment10years"}},false,true); db.koboinfos.update({},{$rename: {"properties.binvestment10years": "properties.Binvestment10years"}},false,true);
binvestmentrequired,Binvestmentrequired,
bomcomments,BOMComments,
bcondition,BCondition,
bcriticality,Bcriticality,
blandslide,BLandslide,
bflood,BFlood,
bresphazard,BRespHazard,
bsensitivity,Bsensitivity,
brisk,BRISK,

gcode,LGcode,
gyearconstruct,LGyearconstruct,
gtype,LGtype,
gposition,LGposition,
gmaterial,LGmaterial,
gnature,LGnature,
gheight,LGheight,
gh_h,LGh_H,
gslope,LGslope,
gdistance,LGdistance,
gshoulders,LGshoulders,
glength,LGlength,
gblocks,LGblocks,
gtreatments,LGtreatments,
gtreatmentsretaining,LGtreatmentsretaining,
gtreatmentsretainingtype,LGtreatmentsretainingtype,
gtreatmentsretainingextension,LGtreatmentsretainingextension,
gtreatmentsretainingeffectiveness,LGtreatmentsretainingeffectiveness,
gtreatmentsretainingconservation,LGtreatmentsretainingconservation,
gtreatmentsretainingother,LGtreatmentsretainingother,
gtreatmentsdefence,LGtreatmentsDefence,
gtreatmentsdefencetype,LGtreatmentsDefencetype,
gtreatmentsdefenceextension,LGtreatmentsDefenceextension,
gtreatmentsdefenceeffectiveness,LGtreatmentsDefenceeffectiveness,
gtreatmentsdefenceconservation,LGtreatmentsDefenceconservation,
gtreatmentsdefenceother,LGtreatmentsDefenceother,
gtreatmentscoating,LGtreatmentsCoating,
gtreatmentscoatingtype,LGtreatmentsCoatingtype,
gtreatmentscoatingextension,LGtreatmentsCoatingextension,
gtreatmentscoatingeffectiveness,LGtreatmentsCoatingeffectiveness,
gtreatmentscoatingconservation,LGtreatmentsCoatingconservation,
gtreatmentscoatingother,LGtreatmentsCoatingother,
gtreatmentsinternaldrainages,LGtreatmentsInternalDrainages,
gtreatmentsinternaldrainagesextension,LGtreatmentsInternalDrainagesextension,
gtreatmentsinternaldrainageseffectiveness,LGtreatmentsInternalDrainageseffectiveness,
gtreatmentsinternaldrainagesconservation,LGtreatmentsInternalDrainagesconservation,
gvegetation,LGvegetation,
gtypevegetation,LGtypevegetation,
gphoto,LGphoto,
gvisualcondition,LGVisualCondition,
gconslos,LGConsLOS,
gprevcondition,LGPrevCondition,
glastinspection,LGLastInspection,
gsurveyfreq,LGSurveyFreq,
gnextsurvey,LGNextSurvey,
gfailure,LGfailure,
gevidrecfailures,LGEvidRecFailures,
gtypefailure,LGTypeFailure,
gintensityfailure,LGIntensityFailure,
gextentfailure,LGExtentFailure,
gpastinterv,LGLastYearInterv,
gintervextent,LGLastYearIntervExtent,
gdateinterv,LGLastYearIntervDate,
gscopeinterv,LGLastYearIntervScope,
qintervcost,LGLastYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.qintervcost": [] } }, false, true);
gimpactinterv,LGLastYearIntervImpactCond,
glocdocinterv,LGLocDocLastYearInterv,
gcurryearinterv,LGCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.gcurryearinterv": [] } }, false, true);
gcurryearintervextent,LGCurrYearIntervExtent,db.infodatatracks.update({}, { $set: { "properties.gcurryearintervextent": [] } }, false, true);
gcurryearintervdate,LGCurrYearIntervDate,db.infodatatracks.update({}, { $set: { "properties.gcurryearintervdate": [] } }, false, true);
gcurryearintervscope,LGCurrYearIntervScope,db.infodatatracks.update({}, { $set: { "properties.gcurryearintervscope": [] } }, false, true);
gcurryearintervcost,LGCurrYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.gcurryearintervcost": [] } }, false, true);
glocdoccurryearinterv,LGLocDocCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.glocdoccurryearinterv": [] } }, false, true);
gmaintissues,LGMaintIssues,
ginvestment10years,LGinvestment10years,
rgnvestmentrequired,LGnvestmentrequired,
gomcomments,LGOMComments,
gcondition,LGcondition,
gcriticality,LGcriticality,
glandslide,LGLandslide,
gflood,LGFlood,
gresphazard,LGRespHazard,
gsensitivity,LGsensitivity,
grisk,LGRISK,

gcode2,LGcode,
gyearconstruct2,LGyearconstruct,
gtype2,LGtype,
gposition2,LGposition,
gmaterial2,LGmaterial,
gnature2,LGnature,
gheight2,LGheight,
gh_h2,LGh_H,
gslope2,LGslope,
gdistance2,LGdistance,
gshoulders2,LGshoulders,db.infodatatracks.update({}, { $set: { "properties.gshoulders2": [] } }, false, true);
glength2,LGlength,
gblocks2,LGblocks,
gtreatments2,LGtreatments,
gtreatmentsretaining2,LGtreatmentsretaining,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsretaining2": [] } }, false, true);
gtreatmentsretainingtype2,LGtreatmentsretainingtype,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsretainingtype2": [] } }, false, true);
gtreatmentsretainingextension2,LGtreatmentsretainingextension,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsretainingextension2": [] } }, false, true);db.infodatatracks.update({}, { $set: { "properties.gtreatmentsretainingextension2": [] } }, false, true);
gtreatmentsretainingeffectiveness2,LGtreatmentsretainingeffectiveness,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsretainingeffectiveness2": [] } }, false, true);
gtreatmentsretainingconservation2,LGtreatmentsretainingconservation,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsretainingconservation2": [] } }, false, true);
gtreatmentsretainingother2,LGtreatmentsretainingother,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsretainingother2": [] } }, false, true);
gtreatmentsdefence2,LGtreatmentsDefence,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsdefence2": [] } }, false, true);
gtreatmentsdefencetype2,LGtreatmentsDefencetype,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsdefencetype2": [] } }, false, true);
gtreatmentsdefenceextension2,LGtreatmentsDefenceextension,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsdefenceextension2": [] } }, false, true);
gtreatmentsdefenceeffectiveness2,LGtreatmentsDefenceeffectiveness,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsdefenceeffectiveness2": [] } }, false, true);
gtreatmentsdefenceconservation2,LGtreatmentsDefenceconservation,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsdefenceconservation2": [] } }, false, true);
gtreatmentsdefenceother2,LGtreatmentsDefenceother,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsdefenceother2": [] } }, false, true);
gtreatmentscoating2,LGtreatmentsCoating,db.infodatatracks.update({}, { $set: { "properties.gtreatmentscoating2": [] } }, false, true);
gtreatmentscoatingtype2,LGtreatmentsCoatingtype,db.infodatatracks.update({}, { $set: { "properties.gtreatmentscoatingtype2": [] } }, false, true);
gtreatmentscoatingextension2,LGtreatmentsCoatingextension,db.infodatatracks.update({}, { $set: { "properties.gtreatmentscoatingextension2": [] } }, false, true);
gtreatmentscoatingeffectiveness2,LGtreatmentsCoatingeffectiveness,db.infodatatracks.update({}, { $set: { "properties.gtreatmentscoatingeffectiveness2": [] } }, false, true);
gtreatmentscoatingconservation2,LGtreatmentsCoatingconservation,db.infodatatracks.update({}, { $set: { "properties.gtreatmentscoatingconservation2": [] } }, false, true);
gtreatmentscoatingother2,LGtreatmentsCoatingother,db.infodatatracks.update({}, { $set: { "properties.gtreatmentscoatingother2": [] } }, false, true);
gtreatmentsinternaldrainages2,LGtreatmentsInternalDrainages,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsinternaldrainages2": [] } }, false, true);
gtreatmentsinternaldrainagesextension2,LGtreatmentsInternalDrainagesextension,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsinternaldrainagesextension2": [] } }, false, true);
gtreatmentsinternaldrainageseffectiveness2,LGtreatmentsInternalDrainageseffectiveness,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsinternaldrainageseffectiveness2": [] } }, false, true);
gtreatmentsinternaldrainagesconservation2,LGtreatmentsInternalDrainagesconservation,db.infodatatracks.update({}, { $set: { "properties.gtreatmentsinternaldrainagesconservation2": [] } }, false, true);
gvegetation2,LGvegetation,
gtypevegetation2,LGtypevegetation,
gphoto2,LGphoto,
gvisualcondition2,LGVisualCondition,
gconslos2,LGConsLOS,
gprevcondition2,LGPrevCondition,
glastinspection2,LGLastInspection,
gsurveyfreq2,LGSurveyFreq,
gnextsurvey2,LGNextSurvey,
gfailure2,LGfailure,
gevidrecfailures2,LGEvidRecFailures,
gtypefailure2,LGTypeFailure,
gintensityfailure2,LGIntensityFailure,db.infodatatracks.update({}, { $set: { "properties.gintensityfailure2": [] } }, false, true);
gextentfailure2,LGExtentFailure,
gpastinterv2,LGLastYearInterv,
gintervextent2,LGLastYearIntervExtent,
gdateinterv2,LGLastYearIntervDate,
gscopeinterv2,LGLastYearIntervScope,
qintervcost2,LGLastYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.qintervcost2": [] } }, false, true);
gimpactinterv2,LGLastYearIntervImpactCond,
glocdocinterv2,LGLocDocLastYearInterv,
gcurryearinterv2,LGCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.gcurryearinterv2": [] } }, false, true);
gcurryearintervextent2,LGCurrYearIntervExtent,db.infodatatracks.update({}, { $set: { "properties.gcurryearintervextent2": [] } }, false, true);
gcurryearintervdate2,LGCurrYearIntervDate,db.infodatatracks.update({}, { $set: { "properties.gcurryearintervdate2": [] } }, false, true);
gcurryearintervscope2,LGCurrYearIntervScope,db.infodatatracks.update({}, { $set: { "properties.gcurryearintervscope2": [] } }, false, true);
gcurryearintervcost2,LGCurrYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.gcurryearintervcost2": [] } }, false, true);
glocdoccurryearinterv2,LGLocDocCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.glocdoccurryearinterv2": [] } }, false, true);
gmaintissues2,LGMaintIssues,
ginvestment10years2,LGinvestment10years,
rgnvestmentrequired2,LGnvestmentrequired,
gomcomments2,LGOMComments,
gcondition2,LGcondition,
gcriticality2,LGcriticality,
glandslide2,LGLandslide,
gflood2,LGFlood,
gresphazard2,LGRespHazard,
gsensitivity2,LGsensitivity,
grisk2,LGRISK,

Ccode,Ccode,db.infodatatracks.update({}, { $set: { "properties.Ccode": [] } }, false, true);
Cyearconstruc,Cyearconstruc,db.infodatatracks.update({}, { $set: { "properties.Cyearconstruc": [] } }, false, true);
Ctype,Ctype,db.infodatatracks.update({}, { $set: { "properties.Ctype": [] } }, false, true);
Csection,Csection,db.infodatatracks.update({}, { $set: { "properties.Csection": [] } }, false, true);
Ccapacity,Ccapacity,db.infodatatracks.update({}, { $set: { "properties.Ccapacity": [] } }, false, true);
Crainpeak,Crainpeak,db.infodatatracks.update({}, { $set: { "properties.Crainpeak": [] } }, false, true);
Cmaterial,Cmaterial,db.infodatatracks.update({}, { $set: { "properties.Cmaterial": [] } }, false, true);
Cnumelem,Cnumelem,db.infodatatracks.update({}, { $set: { "properties.Cnumelem": [] } }, false, true);
Cdiameter,Cdiameter,db.infodatatracks.update({}, { $set: { "properties.Cdiameter": [] } }, false, true);
Cwidth,Cwidth,db.infodatatracks.update({}, { $set: { "properties.Cwidth": [] } }, false, true);
Clength,Clength,db.infodatatracks.update({}, { $set: { "properties.Clength": [] } }, false, true);
Cprotentrance,Cprotentrance,db.infodatatracks.update({}, { $set: { "properties.Cprotentrance": [] } }, false, true);
Cprotexit,Cprotexit,db.infodatatracks.update({}, { $set: { "properties.Cprotexit": [] } }, false, true);
Cphoto,Cphoto,db.infodatatracks.update({}, { $set: { "properties.Cphoto": [] } }, false, true);
CVisualCondition,CVisualCondition,db.infodatatracks.update({}, { $set: { "properties.CVisualCondition": [] } }, false, true);
CConsLOS,CConsLOS,db.infodatatracks.update({}, { $set: { "properties.CConsLOS": [] } }, false, true);
CPrevCondition,CPrevCondition,db.infodatatracks.update({}, { $set: { "properties.CPrevCondition": [] } }, false, true);
CLastInspection,CLastInspection,db.infodatatracks.update({}, { $set: { "properties.CLastInspection": [] } }, false, true);
CSurveyFreq,CSurveyFreq,db.infodatatracks.update({}, { $set: { "properties.CSurveyFreq": [] } }, false, true);
CNextSurvey,CNextSurvey,db.infodatatracks.update({}, { $set: { "properties.CNextSurvey": [] } }, false, true);
Cfailure,Cfailure,db.infodatatracks.update({}, { $set: { "properties.Cfailure": [] } }, false, true);
CDamages,CDamages,db.infodatatracks.update({}, { $set: { "properties.CDamages": [] } }, false, true);
Cclearing,Cclearing,db.infodatatracks.update({}, { $set: { "properties.Cclearing": [] } }, false, true);
CLostSection,CLostSection,db.infodatatracks.update({}, { $set: { "properties.CLostSection": [] } }, false, true);
CLastYearInterv,CLastYearInterv,db.infodatatracks.update({}, { $set: { "properties.CLastYearInterv": [] } }, false, true);
CLastYearIntervExtent,CLastYearIntervExtent,db.infodatatracks.update({}, { $set: { "properties.CLastYearIntervExtent": [] } }, false, true);
CLastYearIntervDate,CLastYearIntervDate,db.infodatatracks.update({}, { $set: { "properties.CLastYearIntervDate": [] } }, false, true);
CLastYearIntervScope,CLastYearIntervScope,db.infodatatracks.update({}, { $set: { "properties.CLastYearIntervScope": [] } }, false, true);
CLastYearIntervCost,CLastYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.CLastYearIntervCost": [] } }, false, true);
CLastYearIntervImpactCond,CLastYearIntervImpactCond,db.infodatatracks.update({}, { $set: { "properties.CLastYearIntervImpactCond": [] } }, false, true);
CLocDocLastYearInterv,CLocDocLastYearInterv,db.infodatatracks.update({}, { $set: { "properties.CLocDocLastYearInterv": [] } }, false, true);
CCurrYearInterv,CCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.CCurrYearInterv": [] } }, false, true);
CCurrYearIntervExtent,CCurrYearIntervExtent,db.infodatatracks.update({}, { $set: { "properties.CCurrYearIntervExtent": [] } }, false, true);
CCurrYearIntervDate,CCurrYearIntervDate,db.infodatatracks.update({}, { $set: { "properties.CCurrYearIntervDate": [] } }, false, true);
CCurrYearIntervScope,CCurrYearIntervScope,db.infodatatracks.update({}, { $set: { "properties.CCurrYearIntervScope": [] } }, false, true);
CCurrYearIntervCost,CCurrYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.CCurrYearIntervCost": [] } }, false, true);
CLocDocCurrYearInterv,CLocDocCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.CLocDocCurrYearInterv": [] } }, false, true);
CMaintIssues,CMaintIssues,db.infodatatracks.update({}, { $set: { "properties.CMaintIssues": [] } }, false, true);
Cinvestment10years,Cinvestment10years,db.infodatatracks.update({}, { $set: { "properties.Cinvestment10years": [] } }, false, true);
Cinvestmentrequired,Cinvestmentrequired,db.infodatatracks.update({}, { $set: { "properties.Cinvestmentrequired": [] } }, false, true);
COMComments,COMComments,db.infodatatracks.update({}, { $set: { "properties.COMComments": [] } }, false, true);
Ccondition,Ccondition,db.infodatatracks.update({}, { $set: { "properties.Ccondition": [] } }, false, true);
Ccriticality,Ccriticality,db.infodatatracks.update({}, { $set: { "properties.Ccriticality": [] } }, false, true);
CLandslide,CLandslide,db.infodatatracks.update({}, { $set: { "properties.CLandslide": [] } }, false, true);
CFlood,CFlood,db.infodatatracks.update({}, { $set: { "properties.CFlood": [] } }, false, true);
CRespHazard,CRespHazard,db.infodatatracks.update({}, { $set: { "properties.CRespHazard": [] } }, false, true);
Csensitivity,Csensitivity,db.infodatatracks.update({}, { $set: { "properties.Csensitivity": [] } }, false, true);
CRISK,CRISK,db.infodatatracks.update({}, { $set: { "properties.CRISK": [] } }, false, true);

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