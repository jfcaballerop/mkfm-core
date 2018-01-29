pk, rklmpoint,
surveyor, surveyor,db.infodatatracks.update({}, { $set: { "properties.surveyor": [] } }, false, true);
datesurvey, datesurvey,db.infodatatracks.update({}, { $set: { "properties.datesurvey": [] } }, false, true);
coordTimes, movietime,
district, district,db.infodatatracks.update({}, { $set: { "properties.district": [] } }, false, true);
rcode, rcode,
rname, rname,db.infodatatracks.update({}, { $set: { "properties.rname": [] } }, false, true);
rcategory,road_category,db.infodatatracks.update({}, { $rename: { "properties.road_category": "properties.rcategory" } }, false, true);
rutmlong, rutmlong,db.infodatatracks.update({}, { $set: { "properties.rutmlong": [] } }, false, true);
rutmlat, rutmlat,db.infodatatracks.update({}, { $set: { "properties.rutmlat": [] } }, false, true);
rutmelevation, rutmelevation,db.infodatatracks.update({}, { $set: { "properties.rutmelevation": [] } }, false, true);
rdateconstruct,date_construction,db.infodatatracks.update({}, { $rename: { "properties.date_construction": "properties.rdateconstruct" } }, false, true);
rmaterial,pavement_material,db.infodatatracks.update({}, { $rename: { "properties.pavement_material": "properties.rmaterial" } }, false, true);
rbasematerial,base_material,db.infodatatracks.update({}, { $rename: { "properties.base_material": "properties.rbasematerial" } }, false, true);
rsubbasematerial,subbase_material,db.infodatatracks.update({}, { $rename: { "properties.subbase_material": "properties.rsubbasematerial" } }, false, true); 
rlaneinc,number_lanes_inc,db.infodatatracks.update({}, { $rename: { "properties.number_lanes_inc": "properties.rlaneinc" } }, false, true);
rlanedecr,number_lanes_dec,db.infodatatracks.update({}, { $rename: { "properties.number_lanes_dec": "properties.rlanedecr" } }, false, true);
rlanetotal,total_number_lanes,db.infodatatracks.update({}, { $rename: { "properties.total_number_lanes": "properties.rlanetotal" } }, false, true);
rwidth,total_width,db.infodatatracks.update({}, { $rename: { "properties.total_width": "properties.rwidth" } }, false, true);
rlocdoc,location_doc_road_projects,db.infodatatracks.update({}, { $rename: { "properties.location_doc_road_projects": "properties.rlocdoc" } }, false, true);
rvideo,rvideo,db.infodatatracks.update({}, { $set: { "properties.rvideo": [] } }, false, true);
ralternatitinerary,alternative_itinerary,db.infodatatracks.update({}, { $rename: { "properties.alternative_itinerary": "properties.ralternatitinerary" } }, false, true);
rdendritic,rdendritic,db.infodatatracks.update({}, { $set: { "rdendritic": []} }, false, true);
ropen,open_traffic,db.infodatatracks.update({}, { $rename: { "properties.open_traffic": "properties.ropen" } }, false, true);
rgauging,existence_gauging_stations,db.infodatatracks.update({}, { $rename: { "properties.existence_gauging_stations": "properties.rgauging" } }, false, true);
radt,adt,db.infodatatracks.update({}, { $rename: { "properties.adt": "properties.radt" } }, false, true);
rtrafficpeak,traffic_high_peak,db.infodatatracks.update({}, { $rename: { "properties.traffic_high_peak": "properties.rtrafficpeak" } }, false, true);
iri,RoadLab,db.infodatatracks.update({}, { $rename: { "properties.roadlab": "properties.iri" } }, false, true);
rvcondition,current_visual_condition,db.infodatatracks.update({}, { $rename: { "properties.current_visual_condition": "properties.rvcondition" } }, false, true);
rconslos,cons_LOS,db.infodatatracks.update({}, { $rename: { "properties.cons_los": "properties.rconslos" } }, false, true);
rprevcondition,prev_condition,db.infodatatracks.update({}, { $rename: { "properties.prev_condition": "properties.rprevcondition" } }, false, true);
rlastinspection,last_inspection,db.infodatatracks.update({}, { $rename: { "properties.last_inspection": "properties.rlastinspection" } }, false, true);
rsurveyfreq,survey_freq,db.infodatatracks.update({}, { $rename: { "properties.survey_freq": "properties.rsurveyfreq" } }, false, true);
rnextsurvey,next_survey,db.infodatatracks.update({}, { $rename: { "properties.next_survey": "properties.rnextsurvey" } }, false, true);
rfailure,failure_history,db.infodatatracks.update({}, { $rename: { "properties.failure_history": "properties.rfailure" } }, false, true);
rlastoverlay,rlastoverlay,db.infodatatracks.update({}, { $set: { "properties.rlastoverlay":[] } }, false, true);
rlastyearinterv,year_interv,db.infodatatracks.update({}, { $rename: { "properties.year_interv": "properties.rlastyearinterv" } }, false, true);
rlastyearintervextent,interv_extent,db.infodatatracks.update({}, { $rename: { "properties.interv_extent": "properties.rlastyearintervextent" } }, false, true);
rlastyearintervdate,past_interv,db.infodatatracks.update({}, { $rename: { "properties.past_interv": "properties.rlastyearintervdate" } }, false, true);
rlastyearintervscope,scope_interv,db.infodatatracks.update({}, { $rename: { "properties.scope_interv": "properties.rlastyearintervscope" } }, false, true);
rlastyearintervcost,rlastyearintervcost,db.infodatatracks.update({}, { $set: { "properties.rlastyearintervcost": [] } }, false, true);
rlastyearintervimpactcond,impact_interv,db.infodatatracks.update({}, { $rename: { "properties.impact_interv": "properties.rlastyearintervimpactcond" } }, false, true);
rlocdoclastyearinterv,loc_doc_interv,db.infodatatracks.update({}, { $rename: { "properties.loc_doc_interv": "properties.rlocdoclastyearinterv" } }, false, true);
rcurryearinterv,rcurryearinterv,db.infodatatracks.update({}, { $set: { "properties.rcurryearinterv": [] } }, false, true);
rcurryearintervextent,rcurryearintervextent,db.infodatatracks.update({}, { $set: { "properties.rcurryearintervextent": [] } }, false, true);
rcurryearintervdate,rcurryearintervdate,db.infodatatracks.update({}, { $set: { "properties.rcurryearintervdate": [] } }, false, true);
rcurryearintervscope,rcurryearintervscope,db.infodatatracks.update({}, { $set: { "properties.rcurryearintervscope": [] } }, false, true);
rcurryearintervcost,rcurryearintervcost,db.infodatatracks.update({}, { $set: { "properties.rcurryearintervcost": [] } }, false, true);
rlocdoccurryearinterv,rlocdoccurryearinterv,db.infodatatracks.update({}, { $set: { "properties.rlocdoccurryearinterv": [] } }, false, true);
rmaintissues,maint_issues,db.infodatatracks.update({}, { $rename: { "properties.maint_issues": "properties.rmaintissues" } }, false, true);
rinvestment10years,investment10years,db.infodatatracks.update({}, { $rename: { "properties.investment10years": "properties.rinvestment10years" } }, false, true);
rinvestmentrequired,investment_required,db.infodatatracks.update({}, { $rename: { "properties.investment_required": "properties.rinvestmentrequired" } }, false, true);
romcomments,om_comments,db.infodatatracks.update({}, { $rename: { "properties.om_comments": "properties.romcomments" } }, false, true);
rinfrint,acess_airports_ferry_ports,db.infodatatracks.update({},{$rename: {"properties.acess_airports_ferry_ports": "properties.rinfrint"}},false,true);
rtourism,access_turistic_sites,db.infodatatracks.update({},{$rename: {"properties.access_turistic_sites": "properties.rtourism"}},false,true);
rindustry,acess_industry_agriculture_fishing_sites,db.infodatatracks.update({},{$rename: {"properties.acess_industry_agriculture_fishing_sites": "properties.rindustry"}},false,true);
rindustrydist,distance_industries_agriculture_fishing_sites,db.infodatatracks.update({},{$rename: {"properties.distance_industries_agriculture_fishing_sites": "properties.rindustrydist"}},false,true);
rhealth,access_social_services,db.infodatatracks.update({},{$rename: {"properties.access_social_services": "properties.rhealth"}},false,true);
renvironment,located_within_an_environmentally_protected_area,db.infodatatracks.update({},{$rename: {"properties.located_within_an_environmentally_protected_area": "properties.renvironment"}},false,true);
rwaste,distance_a_dumping_area,db.infodatatracks.update({},{$rename: {"properties.distance_a_dumping_area": "properties.rwaste"}},false,true);
rccondition,current_condition,db.infodatatracks.update({},{$rename: {"properties.current_condition": "properties.rccondition"}},false,true);
rcriticality,criticality,db.infodatatracks.update({},{$rename: {"properties.criticality": "properties.rcriticality"}},false,true);
rlandslide,exposure_landslide_hazard,db.infodatatracks.update({},{$rename: {"properties.exposure_landslide_hazard": "properties.rlandslide"}},false,true);
rflood,exposure_flood_hazard,db.infodatatracks.update({},{$rename: {"properties.exposure_flood_hazard": "properties.rflood"}},false,true);
rresphazard,asset_response_against_hazards,db.infodatatracks.update({},{$rename: {"properties.asset_response_against_hazards": "properties.rresphazard"}},false,true);
rsensitivity,asset_sensitivity,db.infodatatracks.update({},{$rename: {"properties.asset_sensitivity": "properties.rsensitivity"}},false,true);
rrisk,risk,db.infodatatracks.update({},{$rename: {"properties.risk": "properties.rrisk"}},false,true);
rbarriersexist,RBarriersExist,db.infodatatracks.update({},{$rename: {"properties.RBarriersExist": "properties.rbarriersexist"}},false,true);
rbarrierstype,RBarriersType,db.infodatatracks.update({},{$rename: {"properties.RBarriersType": "properties.rbarrierstype"}},false,true);
rsafetyfence,RSafetyFence,db.infodatatracks.update({},{$rename: {"properties.RSafetyFence": "properties.rsafetyfence"}},false,true);
rbarrierfunct,RBarrierFunct,db.infodatatracks.update({},{$rename: {"properties.RBarrierFunct": "properties.rbarrierfunct"}},false,true);
rsignalsexist,RSignalsExist,db.infodatatracks.update({},{$rename: {"properties.RSignalsExist": "properties.rsignalsexist"}},false,true);
rsignalstype,RSignalsType,db.infodatatracks.update({},{$rename: {"properties.RSignalsType": "properties.rsignalstype"}},false,true);
rvsignalstype,RVSignalsType,db.infodatatracks.update({},{$rename: {"properties.RVSignalsType": "properties.rvsignalstype"}},false,true);
rsignalsfunct,RSignalsFunct,db.infodatatracks.update({},{$rename: {"properties.RSignalsFunct": "properties.rsignalsfunct"}},false,true);
rlightexist,RLightExist,db.infodatatracks.update({},{$rename: {"properties.RLightExist": "properties.rlightexist"}},false,true);
rlighttype,RLightType,db.infodatatracks.update({},{$rename: {"properties.RLightType": "properties.rlighttype"}},false,true);
rlightfunct,RLightFunct,db.infodatatracks.update({},{$rename: {"properties.RLightFunct": "properties.rlightfunct"}},false,true);
rfpastinterv,RFPastInterv,db.infodatatracks.update({},{$rename: {"properties.RFPastInterv": "properties.rfpastinterv"}},false,true);
rfyearinterv,RFYearInterv,db.infodatatracks.update({},{$rename: {"properties.RFYearInterv": "properties.rfyearinterv"}},false,true);
rfcomments,RFComments,db.infodatatracks.update({},{$rename: {"properties.RFComments": "properties.rfcomments"}},false,true);
bcode,BCode,
bexistence,bexists,db.infodatatracks.update({},{$rename: {"properties.bexists": "properties.bexistence"}},false,true);
bname,BName,
byearconstruc,BYearConstruc,
btype,Btype,
bsurrounding,Bsurrounding,
bobstaclesaved,BObstacleSaved,
bfloodscenario,Bfloodscenario,
Bloadcapacity,Bloadcapacity,db.infodatatracks.update({}, { $set: { "properties.Bloadcapacity": [] } }, false, true);
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
BDamagesVaultArchesSeverity,bdamagesvaultsarchesimportance,db.infodatatracks.update({},{$rename: {"properties.bdamagesvaultsarchesimportance": "properties.BDamagesVaultArches"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesvaultsarchesimportance": "properties.BDamagesVaultArches"}},false,true);db.infodatatracks.update({},{$rename: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArchesSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArchesSeverity"}},false,true);
BDamagesPiers,bdamagespiersmechanicaldurable,db.infodatatracks.update({},{$rename: {"properties.bdamagespiersmechanicaldurable": "properties.BDamagesPiers"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagespiersmechanicaldurable": "properties.BDamagesPiers"}},false,true);
BDamagesPiersSeverity,bdamagespiersimportance,db.infodatatracks.update({},{$rename: {"properties.bdamagespiersimportance": "properties.BDamagesPiersSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagespiersimportance": "properties.BDamagesPiersSeverity"}},false,true);
BDamagesSpandrel,bdamagesspandrelwallmechanicaldurable,db.infodatatracks.update({},{$rename: {"properties.bdamagesspandrelwallmechanicaldurable": "properties.BDamagesSpandrel"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesspandrelwallmechanicaldurable": "properties.BDamagesSpandrel"}},false,true);
BDamagesSpandrelSeverity,bdamagesspandrelwallimportance,db.infodatatracks.update({},{$rename: {"properties.bdamagesspandrelwallimportance": "properties.BDamagesSpandrelSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesspandrelwallimportance": "properties.BDamagesSpandrelSeverity"}},false,true);
BDamagesAbutments,bdamagesabutmentsmechanicaldurable,db.infodatatracks.update({},{$rename: {"properties.bdamagesabutmentsmechanicaldurable": "properties.BDamagesAbutments"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesabutmentsmechanicaldurable": "properties.BDamagesAbutments"}},false,true);
BDamagesAbutmentsSeverity,bdamagesabutmentsimportance,db.infodatatracks.update({},{$rename: {"properties.bdamagesabutmentsimportance": "properties.BDamagesAbutmentsSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesabutmentsimportance": "properties.BDamagesAbutmentsSeverity"}},false,true);
BDamagesSidewalls,bdamagessidewallsmechanicaldurable,db.infodatatracks.update({},{$rename: {"properties.bdamagessidewallsmechanicaldurable": "properties.BDamagesSidewalls"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagessidewallsmechanicaldurable": "properties.BDamagesSidewalls"}},false,true);
BDamagessidewallsSeverity,bdamagessidewallsimportance,db.infodatatracks.update({},{$rename: {"properties.bdamagessidewallsimportance": "properties.BDamagessidewallsSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagessidewallsimportance": "properties.BDamagessidewallsSeverity"}},false,true);
BDamagesSlab,bdamagesslabmechanicaldurable,db.infodatatracks.update({},{$rename: {"properties.bdamagesslabmechanicaldurable": "properties.BDamagesSlab"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesslabmechanicaldurable": "properties.BDamagesSlab"}},false,true);
BDamagesslabSeverity,bdamagesslabimportance,db.infodatatracks.update({},{$rename: {"properties.bdamagesslabimportance": "properties.BDamagesslabSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesslabimportance": "properties.BDamagesslabSeverity"}},false,true);
BDamagesBeams,bdamagesbeamsbracesmechanicaldurable,db.infodatatracks.update({},{$rename: {"properties.bdamagesbeamsbracesmechanicaldurable": "properties.BDamagesBeams"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesbeamsbracesmechanicaldurable": "properties.BDamagesBeams"}},false,true);
BDamagesBeamsSeverity,bdamagesbeamsbracesimportance,db.infodatatracks.update({},{$rename: {"properties.bdamagesbeamsbracesimportance": "properties.BDamagesBeamsSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesbeamsbracesimportance": "properties.BDamagesBeamsSeverity"}},false,true);
BDamagesBearings,bdamagesbearingstype,db.infodatatracks.update({},{$rename: {"properties.bdamagesbearingstype": "properties.BDamagesBearings"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesbearingstype": "properties.BDamagesBearings"}},false,true);
BDamagesBearingsSeverity,bdamagesbearingsimportance,db.infodatatracks.update({},{$rename: {"properties.bdamagesbearingsimportance": "properties.BDamagesBearingsSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesbearingsimportance": "properties.BDamagesBearingsSeverity"}},false,true);
BDamagesSpecialareas,bdamagesspecialareastype,db.infodatatracks.update({},{$rename: {"properties.bdamagesspecialareastype": "properties.BDamagesSpecialareas"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesspecialareastype": "properties.BDamagesSpecialareas"}},false,true);
BDamagesSpecialareasSeverity,bdamagesspecialareasimportance,db.infodatatracks.update({},{$rename: {"properties.bdamagesspecialareasimportance": "properties.BDamagesSpecialareasSeverity"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdamagesspecialareasimportance": "properties.BDamagesSpecialareasSeverity"}},false,true);
bdamagesnonstructural,BDamagesNonStructural,
BLastYearInterv,bpastinterv,db.infodatatracks.update({},{$rename: {"properties.bpastinterv": "properties.BLastYearInterv"}},false,true); db.koboinfos.update({},{$rename: {"properties.bpastinterv": "properties.BLastYearInterv"}},false,true);
BLastYearIntervExtent,bintervextent,db.infodatatracks.update({},{$rename: {"properties.bintervextent": "properties.BLastYearIntervExtent"}},false,true); db.koboinfos.update({},{$rename: {"properties.bintervextent": "properties.BLastYearIntervExtent"}},false,true);
BLastYearIntervDate,bdateinterv,db.infodatatracks.update({},{$rename: {"properties.bdateinterv": "properties.BLastYearIntervDate"}},false,true); db.koboinfos.update({},{$rename: {"properties.bdateinterv": "properties.BLastYearIntervDate"}},false,true);
BLastYearIntervScope,bscopeinterv,db.infodatatracks.update({},{$rename: {"properties.bscopeinterv": "properties.BLastYearIntervScope"}},false,true); db.koboinfos.update({},{$rename: {"properties.bscopeinterv": "properties.BLastYearIntervScope"}},false,true);
BLastYearIntervCost,BLastYearIntervCost,
BLastYearIntervImpactCond,bimpactinterv,db.infodatatracks.update({},{$rename: {"properties.bimpactinterv": "properties.BLastYearIntervImpactCond"}},false,true); db.koboinfos.update({},{$rename: {"properties.bimpactinterv": "properties.BLastYearIntervImpactCond"}},false,true);
BLocDocLastYearInterv,blocdocinterv,db.infodatatracks.update({},{$rename: {"properties.blocdocinterv": "properties.BLocDocLastYearInterv"}},false,true); db.koboinfos.update({},{$rename: {"properties.blocdocinterv": "properties.BLocDocLastYearInterv"}},false,true);
BCurrYearInterv,BCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.BCurrYearInterv": [] } }, false, true);
BCurrYearIntervExtent,BCurrYearIntervExtent,db.infodatatracks.update({}, { $set: { "properties.BCurrYearIntervExtent": [] } }, false, true);
BCurrYearIntervDate,BCurrYearIntervDate,db.infodatatracks.update({}, { $set: { "properties.BCurrYearIntervDate": [] } }, false, true);
BCurrYearIntervScope,BCurrYearIntervScope,db.infodatatracks.update({}, { $set: { "properties.BCurrYearIntervScope": [] } }, false, true);
BCurrYearIntervCost,BCurrYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.BCurrYearIntervCost": [] } }, false, true);
BLocDocCurrYearInterv,BLocDocCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.BLocDocCurrYearInterv": [] } }, false, true);
BMaintIssues,bmaintissues,db.infodatatracks.update({},{$rename: {"properties.bmaintissues": "properties.BMaintIssues"}},false,true); db.koboinfos.update({},{$rename: {"properties.bmaintissues": "properties.BMaintIssues"}},false,true);
Binvestment10years,binvestment10years,db.infodatatracks.update({},{$rename: {"properties.binvestment10years": "properties.Binvestment10years"}},false,true); db.koboinfos.update({},{$rename: {"properties.binvestment10years": "properties.Binvestment10years"}},false,true);
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
rginvestmentrequired,LGnvestmentrequired,
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
rginvestmentrequired2,LGnvestmentrequired,
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
Clocation,Clocation,db.infodatatracks.update({}, { $set: { "properties.Clocation": [] } }, false, true);
Cfeeding,Cfeeding,db.infodatatracks.update({}, { $set: { "properties.Cfeeding": [] } }, false, true);
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
dcode,LDcode,
dyearconstruc,LDyearconstruc,
dtype,LDtype,
dsection,LDLongsection,
dposition,LDLongposition,
dslope,LDLongslope,
dphoto,LDphoto,
dconslos,LDConsLOS,
dfailure,LDfailure,
dlastinspection,LDLastYearInterv,
dintervextent,LDLastYearIntervExtent,
ddateinterv,LDLastYearIntervDate,
dscopeinterv,LDLastYearIntervScope,
dlastyearintervcost,LDLastYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.dlastyearintervcost": [] } }, false, true);
dlocdocinterv,LDLocDocLastYearInterv,
dcurryearinterv,LDCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.dcurryearinterv": [] } }, false, true);
dcurryearintervextent,ldcurryearintervextent,db.infodatatracks.update({}, { $set: { "properties.dcurryearintervextent": [] } }, false, true);
dcurryearintervdate,ldcurryearintervdate,db.infodatatracks.update({}, { $set: { "properties.dcurryearintervdate": [] } }, false, true);
dcurryearintervscope,LDCurrYearIntervScope,db.infodatatracks.update({}, { $set: { "properties.dcurryearintervscope": [] } }, false, true);
dcurryearintervcost,LDCurrYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.dcurryearintervcost": [] } }, false, true);
dlocdoccurryearinterv,LDLocDocCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.dlocdoccurryearinterv": [] } }, false, true);
dmaintissues,LDMaintIssues,
dinvestment10years,LDinvestment10years,
dinvestmentrequired,LDinvestmentrequired,
domcomments,LDOMComments,
dcode2,RDcode,db.infodatatracks.update({}, { $set: { "properties.dcode2": [] } }, false, true);
dyearconstruc2,LDyearconstruc,
dtype2,LDtype,
dsection2,LDLongsection,
dposition2,LDLongposition,
dslope2,LDLongslope,
dphoto2,LDphoto,
dconslos2,LDConsLOS,
dfailure2,LDfailure,
dlastinspection2,LDLastYearInterv,
dintervextent2,LDLastYearIntervExtent,
ddateinterv2,LDLastYearIntervDate,
dscopeinterv2,LDLastYearIntervScope,
dlastyearintervcost2,LDLastYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.dlastyearintervcost2": [] } }, false, true);
dlocdocinterv2,LDLocDocLastYearInterv,
dcurryearinterv2,LDCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.dcurryearinterv2": [] } }, false, true);
dcurryearintervextent2,ldcurryearintervextent,db.infodatatracks.update({}, { $set: { "properties.dcurryearintervextent2": [] } }, false, true);
dcurryearintervdate2,ldcurryearintervdate,db.infodatatracks.update({}, { $set: { "properties.dcurryearintervdate2": [] } }, false, true);
dcurryearintervscope2,LDCurrYearIntervScope,db.infodatatracks.update({}, { $set: { "properties.dcurryearintervscope2": [] } }, false, true);
dcurryearintervcost2,LDCurrYearIntervCost,db.infodatatracks.update({}, { $set: { "properties.dcurryearintervcost2": [] } }, false, true);
dlocdoccurryearinterv2,LDLocDocCurrYearInterv,db.infodatatracks.update({}, { $set: { "properties.dlocdoccurryearinterv2": [] } }, false, true);
dmaintissues2,LDMaintIssues,
dinvestment10years2,LDinvestment10years,
dinvestmentrequired2,LDinvestmentrequired,
domcomments2,LDOMComments,



/**
* Querys
*/
db.koboinfos.update({"properties.kobo_type":"ODT"},{$set:{"properties.kobo_type":"Culvert"}},false,true);
db.infodatatracks.update({"properties.koboedit.kobo_type":"ODT"},{$set:{"properties.koboedit":[]}},false,true);
Ctype,dtype,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dtype":"properties.Ctype"}},false,true);
Csection,dsection,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dsection":"properties.Csection"}},false,true);
Ccapacity,dcapacity,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dcapacity":"properties.Ccapacity"}},false,true);
Crainpeak,drainpeak,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.drainpeak":"properties.Crainpeak"}},false,true);
Cmaterial,dmaterial,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dmaterial":"properties.Cmaterial"}},false,true);
Cnumelem,dculnumelem,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dculnumelem":"properties.Cnumelem"}},false,true);
Cdiameter,ddiameter,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.ddiameter":"properties.Cdiameter"}},false,true);
Cwidth,dculwidth,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dculwidth":"properties.Cwidth"}},false,true);
Clength,dlength,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dlength":"properties.Clength"}},false,true);
Cprotentrance,dprotentrance,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dprotentrance":"properties.Cprotentrance"}},false,true);
Cprotexit,dprotexit,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dprotexit":"properties.Cprotexit"}},false,true);
Cphoto,dphoto,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dphoto":"properties.Cphoto"}},false,true);
CVisualCondition,dvisualcondition,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dvisualcondition":"properties.CVisualCondition"}},false,true);
CConsLOS,dconslos,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dconslos":"properties.CConsLOS"}},false,true);
CPrevCondition,dprevcondition,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dprevcondition":"properties.CPrevCondition"}},false,true);
CLastInspection,dlastinspection,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dlastinspection":"properties.CLastInspection"}},false,true);
CSurveyFreq,dsurveyfreq,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dsurveyfreq":"properties.CSurveyFreq"}},false,true);
CNextSurvey,dnextsurvey,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dnextsurvey":"properties.CNextSurvey"}},false,true);
CDamages,dcrossdamages,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dcrossdamages":"properties.CDamages"}},false,true);
Cclearing,dclearing,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dclearing":"properties.Cclearing"}},false,true);
CLostSection,dlostsection,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.dlostsection":"properties.CLostSection"}},false,true);
COMComments,domcomments,db.koboinfos.update({"properties.kobo_type":"Culvert"},{$rename:{"properties.domcomments":"properties.COMComments"}},false,true);
