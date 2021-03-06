db.infodatatracks.
update({}, { $set: { "properties.surveyor": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.datesurvey": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.district": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rname": []
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.road_category": "properties.rcategory"
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rutmlong": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rutmlat": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rutmelevation": []
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.date_construction": "properties.rdateconstruct"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.pavement_material": "properties.rmaterial"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.base_material": "properties.rbasematerial"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.subbase_material": "properties.rsubbasematerial"
} }, false, true); 
db.infodatatracks.
update({}, { $rename: { "properties.number_lanes_inc": "properties.rlaneinc"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.number_lanes_dec": "properties.rlanedecr"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.total_number_lanes": "properties.rlanetotal"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.total_width": "properties.rwidth"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.location_doc_road_projects": "properties.rlocdoc"
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rvideo": []
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.alternative_itinerary": "properties.ralternatitinerary"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.open_traffic": "properties.ropen"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.existence_gauging_stations": "properties.rgauging"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.adt": "properties.radt"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.traffic_high_peak": "properties.rtrafficpeak"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.roadlab": "properties.iri"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.current_visual_condition": "properties.rvcondition"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.cons_los": "properties.rconslos"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.prev_condition": "properties.rprevcondition"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.last_inspection": "properties.rlastinspection"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.survey_freq": "properties.rsurveyfreq"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.next_survey": "properties.rnextsurvey"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.failure_history": "properties.rfailure"
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rlastoverlay":[]
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.year_interv": "properties.rlastyearinterv"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.interv_extent": "properties.rlastyearintervextent"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.past_interv": "properties.rlastyearintervdate"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.scope_interv": "properties.rlastyearintervscope"
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rlastyearintervcost": []
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.impact_interv": "properties.rlastyearintervimpactcond"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.loc_doc_interv": "properties.rlocdoclastyearinterv"
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rcurryearinterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rcurryearintervextent": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rcurryearintervdate": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rcurryearintervscope": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rcurryearintervcost": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rlocdoccurryearinterv": []
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.maint_issues": "properties.rmaintissues"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.investment10years": "properties.rinvestment10years"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.investment_required": "properties.rinvestmentrequired"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.om_comments": "properties.romcomments"
} }, false, true);
db.infodatatracks.
update({},{$rename
: {"properties.acess_airports_ferry_ports": "properties.rinfrint"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.access_turistic_sites": "properties.rtourism"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.acess_industry_agriculture_fishing_sites": "properties.rindustry"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.distance_industries_agriculture_fishing_sites": "properties.rindustrydist"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.access_social_services": "properties.rhealth"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.located_within_an_environmentally_protected_area": "properties.renvironment"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.distance_a_dumping_area": "properties.rwaste"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.current_condition": "properties.rccondition"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.criticality": "properties.rcriticality"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.exposure_landslide_hazard": "properties.rlandslide"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.exposure_flood_hazard": "properties.rflood"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.asset_response_against_hazards": "properties.rresphazard"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.asset_sensitivity": "properties.rsensitivity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.risk": "properties.rrisk"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RBarriersExist": "properties.rbarriersexist"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RBarriersType": "properties.rbarrierstype"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RSafetyFence": "properties.rsafetyfence"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RBarrierFunct": "properties.rbarrierfunct"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RSignalsExist": "properties.rsignalsexist"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RSignalsType": "properties.rsignalstype"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RVSignalsType": "properties.rvsignalstype"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RSignalsFunct": "properties.rsignalsfunct"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RLightExist": "properties.rlightexist"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RLightType": "properties.rlighttype"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RLightFunct": "properties.rlightfunct"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RFPastInterv": "properties.rfpastinterv"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RFYearInterv": "properties.rfyearinterv"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.RFComments": "properties.rfcomments"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bexists": "properties.bexistence"}},false,true);
db.infodatatracks.
update({}, { $set: { "properties.Bloadcapacity": []
} }, false, true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArches"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArches"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesvaultsarchesimportance": "properties.BDamagesVaultArches"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesvaultsarchesimportance": "properties.BDamagesVaultArches"}},false,true);db.infodatatracks.
update({},{$rename
: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArchesSeverity"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesvaultsarchesmechanicaldurable": "properties.BDamagesVaultArchesSeverity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagespiersmechanicaldurable": "properties.BDamagesPiers"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagespiersmechanicaldurable": "properties.BDamagesPiers"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagespiersimportance": "properties.BDamagesPiersSeverity"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagespiersimportance": "properties.BDamagesPiersSeverity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesspandrelwallmechanicaldurable": "properties.BDamagesSpandrel"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesspandrelwallmechanicaldurable": "properties.BDamagesSpandrel"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesspandrelwallimportance": "properties.BDamagesSpandrelSeverity"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesspandrelwallimportance": "properties.BDamagesSpandrelSeverity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesabutmentsmechanicaldurable": "properties.BDamagesAbutments"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesabutmentsmechanicaldurable": "properties.BDamagesAbutments"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesabutmentsimportance": "properties.BDamagesAbutmentsSeverity"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesabutmentsimportance": "properties.BDamagesAbutmentsSeverity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagessidewallsmechanicaldurable": "properties.BDamagesSidewalls"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagessidewallsmechanicaldurable": "properties.BDamagesSidewalls"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagessidewallsimportance": "properties.BDamagessidewallsSeverity"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagessidewallsimportance": "properties.BDamagessidewallsSeverity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesslabmechanicaldurable": "properties.BDamagesSlab"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesslabmechanicaldurable": "properties.BDamagesSlab"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesslabimportance": "properties.BDamagesslabSeverity"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesslabimportance": "properties.BDamagesslabSeverity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesbeamsbracesmechanicaldurable": "properties.BDamagesBeams"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesbeamsbracesmechanicaldurable": "properties.BDamagesBeams"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesbeamsbracesimportance": "properties.BDamagesBeamsSeverity"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesbeamsbracesimportance": "properties.BDamagesBeamsSeverity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesbearingstype": "properties.BDamagesBearings"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesbearingstype": "properties.BDamagesBearings"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesbearingsimportance": "properties.BDamagesBearingsSeverity"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesbearingsimportance": "properties.BDamagesBearingsSeverity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesspecialareastype": "properties.BDamagesSpecialareas"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesspecialareastype": "properties.BDamagesSpecialareas"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdamagesspecialareasimportance": "properties.BDamagesSpecialareasSeverity"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdamagesspecialareasimportance": "properties.BDamagesSpecialareasSeverity"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bpastinterv": "properties.BLastYearInterv"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bpastinterv": "properties.BLastYearInterv"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bintervextent": "properties.BLastYearIntervExtent"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bintervextent": "properties.BLastYearIntervExtent"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bdateinterv": "properties.BLastYearIntervDate"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bdateinterv": "properties.BLastYearIntervDate"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bscopeinterv": "properties.BLastYearIntervScope"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bscopeinterv": "properties.BLastYearIntervScope"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.bimpactinterv": "properties.BLastYearIntervImpactCond"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bimpactinterv": "properties.BLastYearIntervImpactCond"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.blocdocinterv": "properties.BLocDocLastYearInterv"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.blocdocinterv": "properties.BLocDocLastYearInterv"}},false,true);
db.infodatatracks.
update({}, { $set: { "properties.BCurrYearInterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.BCurrYearIntervExtent": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.BCurrYearIntervDate": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.BCurrYearIntervScope": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.BCurrYearIntervCost": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.BLocDocCurrYearInterv": []
} }, false, true);
db.infodatatracks.
update({},{$rename
: {"properties.bmaintissues": "properties.BMaintIssues"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.bmaintissues": "properties.BMaintIssues"}},false,true);
db.infodatatracks.
update({},{$rename
: {"properties.binvestment10years": "properties.Binvestment10years"}},false,true); db.koboinfos.
update({},{$rename
: {"properties.binvestment10years": "properties.Binvestment10years"}},false,true);
db.infodatatracks.
update({}, { $set: { "properties.qintervcost": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearinterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearintervextent": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearintervdate": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearintervscope": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearintervcost": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.glocdoccurryearinterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gshoulders2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsretaining2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsretainingtype2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsretainingextension2": []
} }, false, true);db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsretainingextension2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsretainingeffectiveness2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsretainingconservation2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsretainingother2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsdefence2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsdefencetype2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsdefenceextension2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsdefenceeffectiveness2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsdefenceconservation2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsdefenceother2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentscoating2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentscoatingtype2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentscoatingextension2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentscoatingeffectiveness2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentscoatingconservation2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentscoatingother2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsinternaldrainages2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsinternaldrainagesextension2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsinternaldrainageseffectiveness2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gtreatmentsinternaldrainagesconservation2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gintensityfailure2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.qintervcost2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearinterv2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearintervextent2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearintervdate2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearintervscope2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.gcurryearintervcost2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.glocdoccurryearinterv2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Ccode": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cyearconstruc": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Ctype": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Csection": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Ccapacity": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Crainpeak": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cmaterial": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cnumelem": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cdiameter": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cwidth": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Clength": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cprotentrance": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cprotexit": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cphoto": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CVisualCondition": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CConsLOS": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CPrevCondition": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLastInspection": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CSurveyFreq": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CNextSurvey": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cfailure": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CDamages": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cclearing": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLostSection": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLastYearInterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLastYearIntervExtent": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLastYearIntervDate": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLastYearIntervScope": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLastYearIntervCost": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLastYearIntervImpactCond": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLocDocLastYearInterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CCurrYearInterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CCurrYearIntervExtent": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CCurrYearIntervDate": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CCurrYearIntervScope": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CCurrYearIntervCost": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLocDocCurrYearInterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CMaintIssues": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cinvestment10years": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cinvestmentrequired": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.COMComments": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Ccondition": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Ccriticality": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CLandslide": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CFlood": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CRespHazard": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Csensitivity": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CRISK": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dlastyearintervcost": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearinterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearintervextent": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearintervdate": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearintervscope": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearintervcost": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dlocdoccurryearinterv": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcode2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dlastyearintervcost2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearinterv2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearintervextent2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearintervdate2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearintervscope2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dcurryearintervcost2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.dlocdoccurryearinterv2": []
} }, false, true);
db.koboinfos.
update({"properties.kobo_type":"ODT"},{$set
:{"properties.kobo_type":"Culvert"}},false,true);
db.infodatatracks.
update({"properties.koboedit.kobo_type":"ODT"},{$set
:{"properties.koboedit":[]}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dtype":"properties.Ctype"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dsection":"properties.Csection"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dcapacity":"properties.Ccapacity"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.drainpeak":"properties.Crainpeak"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dmaterial":"properties.Cmaterial"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dculnumelem":"properties.Cnumelem"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.ddiameter":"properties.Cdiameter"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dculwidth":"properties.Cwidth"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dlength":"properties.Clength"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dprotentrance":"properties.Cprotentrance"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dprotexit":"properties.Cprotexit"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dphoto":"properties.Cphoto"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dvisualcondition":"properties.CVisualCondition"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dconslos":"properties.CConsLOS"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dprevcondition":"properties.CPrevCondition"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dlastinspection":"properties.CLastInspection"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dsurveyfreq":"properties.CSurveyFreq"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dnextsurvey":"properties.CNextSurvey"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dcrossdamages":"properties.CDamages"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dclearing":"properties.Cclearing"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.dlostsection":"properties.CLostSection"}},false,true);
db.koboinfos.
update({"properties.kobo_type":"Culvert"},{$rename
:{"properties.domcomments":"properties.COMComments"}},false,true);
// 20171128
db.infodatatracks.
update({}, { $set: { "inverted": false
} }, false, true);
db.infodatatracks.
update({}, { $set: { "rdendritic": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Clocation": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.Cfeeding": []
} }, false, true);
// 20171204
db.infodatatracks.
update({}, { $set: { "properties.rriskphysical": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.rrisknatural": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.briskphysical": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.brisknatural": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.griskphysical": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.grisknatural": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.griskphysical2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.grisknatural2": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CRISKphysical": []
} }, false, true);
db.infodatatracks.
update({}, { $set: { "properties.CRISKnatural": []
} }, false, true);
// 20171204 v2
db.infodatatracks.
update({}, { $rename: {"properties.grisk2physical": "properties.griskphysical2"
} }, false, true);
db.infodatatracks.
update({}, { $rename: { "properties.grisk2natural": "properties.grisknatural2"
} }, false, true);
// 20171204 v3
db.getCollection
('koboinfos').
update({"properties._id":414
},{$set:{"geometry.coordinates":[-61.4574757231655 , 15.5776638500912]}},false,true);
// 20180111
db.infodatatracks.
update({}, { $unset: { "rdendritic": ""
} }, false, true);