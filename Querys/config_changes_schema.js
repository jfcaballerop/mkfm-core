db.infodatatracks.update({}, {
    $set: {
        "config": {
            "properties": {
                name: {
                    desc: "name",
                    subgroup: "Survey data",
                    group: "ROADS - PAVEMENTS"
                },
                pk: {
                    desc: "Kilometer Point",
                    subgroup: "Survey data",
                    group: "ROADS - PAVEMENTS"
                },
                surveyor: {
                    desc: "Name of surveyor",
                    subgroup: "Survey data",
                    group: "ROADS - PAVEMENTS"
                },
                datesurvey: {
                    desc: "Date of survey",
                    subgroup: "Survey data",
                    group: "ROADS - PAVEMENTS"
                },
                coordTimes: {
                    desc: "Movie record time",
                    subgroup: "Survey data",
                    group: "ROADS - PAVEMENTS"
                },
                district: {
                    desc: "District",
                    subgroup: "Roads General Data",
                    group: "ROADS - PAVEMENTS"
                },
                rcode: {
                    desc: "Road code",
                    subgroup: "Roads General Data",
                    group: "ROADS - PAVEMENTS"
                },
                rname: {
                    desc: "Road name",
                    subgroup: "Roads General Data",
                    group: "ROADS - PAVEMENTS"
                },
                rcategory: {
                    desc: "Road category",
                    subgroup: "Roads General Data",
                    group: "ROADS - PAVEMENTS"
                },
                rutmlong: {
                    desc: "Longitude",
                    subgroup: "Roads General Data",
                    group: "ROADS - PAVEMENTS"
                },
                rutmlat: {
                    desc: "Latitude",
                    subgroup: "Roads General Data",
                    group: "ROADS - PAVEMENTS"
                },
                rutmelevation: {
                    desc: "Elevation (m)",
                    subgroup: "Roads General Data",
                    group: "ROADS - PAVEMENTS"
                },
                rdateconstruct: {
                    desc: "Date of construction",
                    subgroup: "Roads General Data",
                    group: "ROADS - PAVEMENTS"
                },
                rmaterial: {
                    desc: "Pavement material",
                    subgroup: "Pavement Group 1: Inventory Data",
                    group: "ROADS - PAVEMENTS"
                },
                rbasematerial: {
                    desc: "Base material",
                    subgroup: "Pavement Group 1: Inventory Data",
                    group: "ROADS - PAVEMENTS"
                },
                rsubbasematerial: {
                    desc: "Subbase material",
                    subgroup: "Pavement Group 1: Inventory Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlaneinc: {
                    desc: "Number of lanes (increasing KP)",
                    subgroup: "Pavement Group 1: Inventory Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlanedecr: {
                    desc: "Number of lanes (decreasing KP)",
                    subgroup: "Pavement Group 1: Inventory Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlanetotal: {
                    desc: "Total number of lanes",
                    subgroup: "Pavement Group 1: Inventory Data",
                    group: "ROADS - PAVEMENTS"
                },
                rwidth: {
                    desc: "Total width (m)",
                    subgroup: "Pavement Group 1: Inventory Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlocdoc: {
                    desc: "Location of the documentation of road projects",
                    subgroup: "Pavement Group 1: Inventory Data",
                    group: "ROADS - PAVEMENTS"
                },
                rvideo: {
                    desc: "Video",
                    subgroup: "Pavement Group 1: Inventory Data",
                    group: "ROADS - PAVEMENTS"
                },
                ralternatitinerary: {
                    desc: "Existence of alternative itinerary",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rdendritic: {
                    desc: "Road dendritic rank",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                ropen: {
                    desc: "Is the road open to traffic?",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rgauging: {
                    desc: "Existence of gauging stations",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                radt: {
                    desc: "ADT",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rtrafficpeak: {
                    desc: "Traffic high peak",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                iri: {
                    desc: "IRI - Pavement roughtness",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rvcondition: {
                    desc: "Current visual condition",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rconslos: {
                    desc: "Consequences of failure on LOS",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rprevcondition: {
                    desc: "Previous condition rate",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlastinspection: {
                    desc: "Date of last inspection",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rsurveyfreq: {
                    desc: "Survey frequency",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rnextsurvey: {
                    desc: "Date of next survey",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rfailure: {
                    desc: "Failure history",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlastoverlay: {
                    desc: "Date of last overlay",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlastyearinterv: {
                    desc: "Have there been past interventions performed during the last year?",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlastyearintervextent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlastyearintervdate: {
                    desc: "Date of performance of last year interventions",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlastyearintervscope: {
                    desc: "Scope of last year interventions",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlastyearintervcost: {
                    desc: "Cost of last year interventions",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlastyearintervimpactcond: {
                    desc: "Impact of last year interventions on asset condition",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlocdoclastyearinterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rcurryearinterv: {
                    desc: "Have there been interventions performed during the current year?",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rcurryearintervextent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rcurryearintervdate: {
                    desc: "Date of performance of current year interventions",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rcurryearintervscope: {
                    desc: "Scope of current year interventions",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rcurryearintervcost: {
                    desc: "Accummulated Cost of current year interventions",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rlocdoccurryearinterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rmaintissues: {
                    desc: "Maintainability issues",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rinvestment10years: {
                    desc: "Investment undertaken in the last 10 years",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rinvestmentrequired: {
                    desc: "Investment required to upgrade to A class",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                romcomments: {
                    desc: "Comments to operation and maintainance",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                },
                rinfrint: {
                    desc: "Acess to airports/ferry ports",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rtourism: {
                    desc: "Access to touristic sites",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rindustry: {
                    desc: "Acess to industry, agriculture, fishing sites",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rindustrydist: {
                    desc: "Distance to industries, agriculture, fishing sites",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rhealth: {
                    desc: "Access to health care services",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                renvironment: {
                    desc: "Located within an environmentally protected area",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rwaste: {
                    desc: "Distance to a dumping area",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rccondition: {
                    desc: "Current condition",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rcriticality: {
                    desc: "Criticality",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rlandslide: {
                    desc: "Exposure to landslide hazard",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rflood: {
                    desc: "Exposure to flood hazard",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rresphazard: {
                    desc: "Asset Response against hazards",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rsensitivity: {
                    desc: "Asset Sensitivity",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rrisk: {
                    desc: "RISK",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rriskphysical: {
                    desc: "Risk due to Physical Deterioration",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rrisknatural: {
                    desc: "Risk due to Natural Hazards",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rbarriersexist: {
                    desc: "Existence of barriers",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rbarrierstype: {
                    desc: "Typology of barriers",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rsafetyfence: {
                    desc: "Typology of safety fences",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rbarrierfunct: {
                    desc: "Functionality - Is the asset functioning as it is expected?",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rsignalsexist: {
                    desc: "Existence of signposting and road signs",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rsignalstype: {
                    desc: "Typology of signaling",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rvsignalstype: {
                    desc: "Typology of vertical signaling",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rsignalsfunct: {
                    desc: "Functionality - Is the asset functioning as it is expected?",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rlightexist: {
                    desc: "Existence of street lighting",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rlighttype: {
                    desc: "Typology of street lighting",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rlightfunct: {
                    desc: "Functionality - Is the asset functioning as it is expected?",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rfpastinterv: {
                    desc: "Have there been past interventions?",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rfyearinterv: {
                    desc: "Year of performance of past interventions",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                rfcomments: {
                    desc: "Comments",
                    subgroup: "Road Furniture Inventory, Maintenance & Operation Data",
                    group: "ROAD FURNITURE DATA"
                },
                bcode: {
                    desc: "Asset Code",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bexistence: {
                    desc: "Existence of bridge",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bname: {
                    desc: "Bridge name",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                byearconstruc: {
                    desc: "Year of construction",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                btype: {
                    desc: "Structural typology",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bsurrounding: {
                    desc: "Surrounding - Environment",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bobstaclesaved: {
                    desc: "Obstacle overpassed",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bfloodscenario: {
                    desc: "Design flood scenario",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                Bloadcapacity: {
                    desc: "Load capacity",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bmaterialdeck: {
                    desc: "Material - Deck",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bmaterialgirder: {
                    desc: "Material - Girders",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bmaterialpiers: {
                    desc: "Material - Piers",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bmaterialabutments: {
                    desc: "Material - Abutments",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                balignment: {
                    desc: "Bridge alignment",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bspans: {
                    desc: "Single or multiple span?",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bnumberspans: {
                    desc: "Number of spans",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                blenght: {
                    desc: "Total length (m)",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bmaxspan: {
                    desc: "Maximum span (m)",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bwidth: {
                    desc: "Total width (m)",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bfreeheight: {
                    desc: "Free height (m)",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bfoundation: {
                    desc: "Foundations typology",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bpiersriver: {
                    desc: "Existence of piers over riverbed",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bprotectabut: {
                    desc: "Protection of abutments /nearby areas",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bprojectlocation: {
                    desc: "Location of the documentation of bridge projects",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                bphoto: {
                    desc: "Photographs",
                    subgroup: "Bridges Group 1: General and Inventory Data",
                    group: "BRIDGES"
                },
                balternative: {
                    desc: "Existence of alternative itinerary",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bvisualcondition: {
                    desc: "Current visual condition",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bconslos: {
                    desc: "Consequences of failure on LOS",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bprevcondition: {
                    desc: "Previous condition rate",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                blastinspection: {
                    desc: "Date of last inspection",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bsurveyfreq: {
                    desc: "Survey frequency",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bnextsurvey: {
                    desc: "Date of next survey",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bfailure: {
                    desc: "Failure history",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bdamagesfoundations: {
                    desc: "Damages on foundations",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bdamagesfoundationsgeneraltype: {
                    desc: "Type of damages on foundations (from foundation-ground decay, from foundation decay)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bdamagesfoundationsdetailedtype: {
                    desc: "Type of damages on foundations due to foundation-ground decay",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bdamagesstructural: {
                    desc: "Damages on structural elements",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bdamagesvaultsarchesmechanicaldurable: {
                    desc: "Damages on vault / arches (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesVaultArches: {
                    desc: "Damages on vault / arches (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesVaultArchesSeverity: {
                    desc: "Severity of damages on vault / arches",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesPiers: {
                    desc: "Damages on piers (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesPiersSeverity: {
                    desc: "Severity of damages on piers",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesSpandrel: {
                    desc: "Damages on spandrel walls (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesSpandrelSeverity: {
                    desc: "Severity of damages on spandrel walls",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesAbutments: {
                    desc: "Damages on abutments (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesAbutmentsSeverity: {
                    desc: "Severity of damages on abutments",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesSidewalls: {
                    desc: "Damages on side walls (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagessidewallsSeverity: {
                    desc: "Severity of damages on side walls",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesSlab: {
                    desc: "Damages on slab (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesslabSeverity: {
                    desc: "Severity of damages on slab",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesBeams: {
                    desc: "Damages on beams (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesBeamsSeverity: {
                    desc: "Severity of damages on beams",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesBearings: {
                    desc: "Damages on bearings (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesBearingsSeverity: {
                    desc: "Severity of damages on bearings",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesSpecialareas: {
                    desc: "Damages on special areas (mechanical vs. durable)",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BDamagesSpecialareasSeverity: {
                    desc: "Severity of damages on special areas",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bdamagesnonstructural: {
                    desc: "Damages on non structural elements",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BLastYearInterv: {
                    desc: "Have there been past interventions performed during the last year?",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BLastYearIntervExtent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BLastYearIntervDate: {
                    desc: "Date of performance of last year interventions",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BLastYearIntervScope: {
                    desc: "Scope of last year interventions",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BLastYearIntervCost: {
                    desc: "Cost of last year interventions",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BLastYearIntervImpactCond: {
                    desc: "Impact of last year interventions on asset condition",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BLocDocLastYearInterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BCurrYearInterv: {
                    desc: "Have there been interventions performed during the current year?",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BCurrYearIntervExtent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BCurrYearIntervDate: {
                    desc: "Date of performance of current year interventions",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BCurrYearIntervScope: {
                    desc: "Scope of current year interventions",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BCurrYearIntervCost: {
                    desc: "Accummulated cost of current year interventions",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BLocDocCurrYearInterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                BMaintIssues: {
                    desc: "Maintainability issues",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                Binvestment10years: {
                    desc: "Investment undertaken in the last 10 years",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                binvestmentrequired: {
                    desc: "Investment required to upgrade to A class",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bomcomments: {
                    desc: "Comments to operation and maintainance",
                    subgroup: "Bridges Group 2: Operation & Maintenance Data",
                    group: "BRIDGES"
                },
                bdamagesstructuralgeneraltype: {
                    desc: "borrar",
                    subgroup: "Bridge Group 2: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                bcondition: {
                    desc: "Current condition",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                bcriticality: {
                    desc: "Criticality",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                blandslide: {
                    desc: "Exposure to landslide hazard",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                bflood: {
                    desc: "Exposure to flood hazard",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                bresphazard: {
                    desc: "Asset Response against hazards",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                bsensitivity: {
                    desc: "Asset Sensitivity",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                brisk: {
                    desc: "RISK",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                briskphysical: {
                    desc: "Risk due to Physical Deterioration",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                brisknatural: {
                    desc: "Risk due to Natural Hazards",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                gcode: {
                    desc: "Asset Code",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gyearconstruct: {
                    desc: "Year of construction",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtype: {
                    desc: "Type of geotechnical asset",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gposition: {
                    desc: "Position",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gmaterial: {
                    desc: "Material - Retaining walls",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gnature: {
                    desc: "Nature - Earthworks",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gheight: {
                    desc: "Height (m)",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gh_h: {
                    desc: "Relation h/H ",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gslope: {
                    desc: "Slope / Angle (º)",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gdistance: {
                    desc: "Distance to road (m)",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gshoulders: {
                    desc: "Shoulders / Verges",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glength: {
                    desc: "Length (m)",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gblocks: {
                    desc: "Size of blocks (m)",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatments: {
                    desc: "Existence of geotechnical treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretaining: {
                    desc: "Existence  of retaining treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingtype: {
                    desc: "Type  of retaining treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingextension: {
                    desc: "Extension of retaining treatments (%)",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingeffectiveness: {
                    desc: "Effectiveness of retaining treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingconservation: {
                    desc: "Conservation of retaining treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingother: {
                    desc: "Other retaining treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefence: {
                    desc: "Existence  of defence treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefencetype: {
                    desc: "Type  of defence treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefenceextension: {
                    desc: "Extension of defence treatments (%)",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefenceeffectiveness: {
                    desc: "Effectiveness of defence treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefenceconservation: {
                    desc: "Conservation of defence treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefenceother: {
                    desc: "Other defence treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoating: {
                    desc: "Existence  of coating treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingtype: {
                    desc: "Type  of coating treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingextension: {
                    desc: "Extension of coating treatments (%)",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingeffectiveness: {
                    desc: "Effectiveness of coating treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingconservation: {
                    desc: "Conservation of coating treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingother: {
                    desc: "Other coating treatments",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsinternaldrainages: {
                    desc: "Existence  of internal drainages",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsinternaldrainagesextension: {
                    desc: "Extension of internal drainages (%)",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsinternaldrainageseffectiveness: {
                    desc: "Effectiveness of internal drainages",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsinternaldrainagesconservation: {
                    desc: "Conservation of internal drainages",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gvegetation: {
                    desc: "Existence of vegetation",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtypevegetation: {
                    desc: "Type of vegetation",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gphoto: {
                    desc: "Photographs",
                    subgroup: "Geotechnical Assets Left Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gvisualcondition: {
                    desc: "Current visual condition",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gconslos: {
                    desc: "Consequences of failure on LOS",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gprevcondition: {
                    desc: "Previous condition rate",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glastinspection: {
                    desc: "Date of last inspection",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gsurveyfreq: {
                    desc: "Survey frequency",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gnextsurvey: {
                    desc: "Date of next survey",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gfailure: {
                    desc: "Failure history",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gevidrecfailures: {
                    desc: "Evidence of recent failures?",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtypefailure: {
                    desc: "Type of failure process",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gintensityfailure: {
                    desc: "Intensity of failure process",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gextentfailure: {
                    desc: "Extent of failure (%)",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gpastinterv: {
                    desc: "Have there been past interventions performed during the last year?",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gintervextent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gdateinterv: {
                    desc: "Date of performance of last year interventions",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gscopeinterv: {
                    desc: "Scope of last year interventions",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                qintervcost: {
                    desc: "Cost of last year interventions",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gimpactinterv: {
                    desc: "Impact of last year interventions on asset condition",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glocdocinterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearinterv: {
                    desc: "Have there been interventions performed during the current year?",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearintervextent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearintervdate: {
                    desc: "Date of performance of current year interventions",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearintervscope: {
                    desc: "Scope of current year interventions",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearintervcost: {
                    desc: "Accummulated cost of current year interventions",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glocdoccurryearinterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gmaintissues: {
                    desc: "Maintainability issues",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                ginvestment10years: {
                    desc: "Investment undertaken in the last 10 years",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                rginvestmentrequired: {
                    desc: "Investment required to upgrade to A class",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gomcomments: {
                    desc: "Comments to maintainance",
                    subgroup: "Geotechnical Assets Left Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcondition: {
                    desc: "Current condition",
                    subgroup: "Geotechnical Assets Left Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcriticality: {
                    desc: "Criticality",
                    subgroup: "Geotechnical Assets Left Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glandslide: {
                    desc: "Exposure to landslide hazard",
                    subgroup: "Geotechnical Assets Left Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gflood: {
                    desc: "Exposure to flood hazard",
                    subgroup: "Geotechnical Assets Left Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gresphazard: {
                    desc: "Asset Response against hazards",
                    subgroup: "Geotechnical Assets Left Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gsensitivity: {
                    desc: "Asset Sensitivity",
                    subgroup: "Geotechnical Assets Left Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                grisk: {
                    desc: "RISK",
                    subgroup: "Geotechnical Assets Left Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                griskphysical: {
                    desc: "Risk due to Physical Deterioration",
                    subgroup: "Geotechnical Assets Left Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                grisknatural: {
                    desc: "Risk due to Natural Hazards",
                    subgroup: "Geotechnical Assets Left Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcode2: {
                    desc: "Asset Code",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gyearconstruct2: {
                    desc: "Year of construction",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtype2: {
                    desc: "Type of geotechnical asset",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gposition2: {
                    desc: "Position",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gmaterial2: {
                    desc: "Material - Retaining walls",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gnature2: {
                    desc: "Nature - Earthworks",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gheight2: {
                    desc: "Height (m)",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gh_h2: {
                    desc: "Relation h/H ",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gslope2: {
                    desc: "Slope / Angle (º)",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gdistance2: {
                    desc: "Distance to road (m)",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gshoulders2: {
                    desc: "Shoulders / Verges",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glength2: {
                    desc: "Length (m)",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gblocks2: {
                    desc: "Size of blocks (m)",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatments2: {
                    desc: "Existence of geotechnical treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretaining2: {
                    desc: "Existence  of retaining treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingtype2: {
                    desc: "Type  of retaining treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingextension2: {
                    desc: "Extension of retaining treatments (%)",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingeffectiveness2: {
                    desc: "Effectiveness of retaining treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingconservation2: {
                    desc: "Conservation of retaining treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsretainingother2: {
                    desc: "Other retaining treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefence2: {
                    desc: "Existence  of defence treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefencetype2: {
                    desc: "Type  of defence treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefenceextension2: {
                    desc: "Extension of defence treatments (%)",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefenceeffectiveness2: {
                    desc: "Effectiveness of defence treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefenceconservation2: {
                    desc: "Conservation of defence treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsdefenceother2: {
                    desc: "Other defence treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoating2: {
                    desc: "Existence  of coating treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingtype2: {
                    desc: "Type  of coating treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingextension2: {
                    desc: "Extension of coating treatments (%)",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingeffectiveness2: {
                    desc: "Effectiveness of coating treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingconservation2: {
                    desc: "Conservation of coating treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentscoatingother2: {
                    desc: "Other coating treatments",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsinternaldrainages2: {
                    desc: "Existence  of internal drainages",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsinternaldrainagesextension2: {
                    desc: "Extension of internal drainages (%)",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsinternaldrainageseffectiveness2: {
                    desc: "Effectiveness of internal drainages",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtreatmentsinternaldrainagesconservation2: {
                    desc: "Conservation of internal drainages",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gvegetation2: {
                    desc: "Existence of vegetation",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtypevegetation2: {
                    desc: "Type of vegetation",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gphoto2: {
                    desc: "Photographs",
                    subgroup: "Geotechnical Assets Right Side Group 1: General and Inventory Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gvisualcondition2: {
                    desc: "Current visual condition",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gconslos2: {
                    desc: "Consequences of failure on LOS",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gprevcondition2: {
                    desc: "Previous condition rate",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glastinspection2: {
                    desc: "Date of last inspection",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gsurveyfreq2: {
                    desc: "Survey frequency",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gnextsurvey2: {
                    desc: "Date of next survey",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gfailure2: {
                    desc: "Failure history",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gevidrecfailures2: {
                    desc: "Evidence of recent failures?",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gtypefailure2: {
                    desc: "Type of failure process",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gintensityfailure2: {
                    desc: "Intensity of failure process",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gextentfailure2: {
                    desc: "Extent of failure (%)",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gpastinterv2: {
                    desc: "Have there been past interventions performed during the last year?",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gintervextent2: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gdateinterv2: {
                    desc: "Date of performance of last year interventions",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gscopeinterv2: {
                    desc: "Scope of last year interventions",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                qintervcost2: {
                    desc: "Cost of last year interventions",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gimpactinterv2: {
                    desc: "Impact of last year interventions on asset condition",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glocdocinterv2: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearinterv2: {
                    desc: "Have there been interventions performed during the current year?",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearintervextent2: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearintervdate2: {
                    desc: "Date of performance of current year interventions",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearintervscope2: {
                    desc: "Scope of current year interventions",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcurryearintervcost2: {
                    desc: "Accummulated cost of current year interventions",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glocdoccurryearinterv2: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gmaintissues2: {
                    desc: "Maintainability issues",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                ginvestment10years2: {
                    desc: "Investment undertaken in the last 10 years",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                rginvestmentrequired2: {
                    desc: "Investment required to upgrade to A class",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gomcomments2: {
                    desc: "Comments to maintainance",
                    subgroup: "Geotechnical Assets Right Side Group 2: Operation and Maintenance Data",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcondition2: {
                    desc: "Current condition",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gcriticality2: {
                    desc: "Criticality",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glandslide2: {
                    desc: "Exposure to landslide hazard",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gflood2: {
                    desc: "Exposure to flood hazard",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gresphazard2: {
                    desc: "Asset Response against hazards",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                gsensitivity2: {
                    desc: "Asset Sensitivity",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                grisk2: {
                    desc: "RISK",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                griskphysical2: {
                    desc: "Risk due to Physical Deterioration",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                grisknatural2: {
                    desc: "Risk due to Natural Hazards",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                Ccode: {
                    desc: "Asset Code",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Cyearconstruc: {
                    desc: "Year of construction",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Ctype: {
                    desc: "Type of drainage",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Clocation: {
                    desc: "Culvert location",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Cfeeding: {
                    desc: "Feeding system",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Csection: {
                    desc: "Type of section",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Ccapacity: {
                    desc: "Drain Capacity",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Crainpeak: {
                    desc: "Design rain peak values",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Cmaterial: {
                    desc: "Material",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Cnumelem: {
                    desc: "Number of elements",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Cdiameter: {
                    desc: "Diameter / Height (m)",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Cwidth: {
                    desc: "Width (m)",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Clength: {
                    desc: "Length (m)",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Cprotentrance: {
                    desc: "Protection of embankment at the drain entrance",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Cprotexit: {
                    desc: "Protection bed / inverter arch at the drain exit",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                Cphoto: {
                    desc: "Photographs",
                    subgroup: "Culverts Group 1: General and Inventory Data",
                    group: "CULVERTS"
                },
                CVisualCondition: {
                    desc: "Current visual condition",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CConsLOS: {
                    desc: "Consequences of failure on LOS",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CPrevCondition: {
                    desc: "Previous condition rate",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLastInspection: {
                    desc: "Date of last inspection",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CSurveyFreq: {
                    desc: "Survey frequency",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CNextSurvey: {
                    desc: "Date of next survey",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                Cfailure: {
                    desc: "Failure history",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CDamages: {
                    desc: "Damages on culverts",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                Cclearing: {
                    desc: "Clearing required",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLostSection: {
                    desc: "Lost of section due to blocking/silting/obstacles (%)",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLastYearInterv: {
                    desc: "Have there been past interventions performed during the last year?",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLastYearIntervExtent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLastYearIntervDate: {
                    desc: "Date of performance of last year interventions",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLastYearIntervScope: {
                    desc: "Scope of last year interventions",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLastYearIntervCost: {
                    desc: "Cost of last year interventions",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLastYearIntervImpactCond: {
                    desc: "Impact of last year interventions on asset condition",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLocDocLastYearInterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CCurrYearInterv: {
                    desc: "Have there been interventions performed during the current year?",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CCurrYearIntervExtent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CCurrYearIntervDate: {
                    desc: "Date of performance of current year interventions",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CCurrYearIntervScope: {
                    desc: "Scope of current year interventions",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CCurrYearIntervCost: {
                    desc: "Accummulated cost of current year interventions",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CLocDocCurrYearInterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                CMaintIssues: {
                    desc: "Maintainability issues",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                Cinvestment10years: {
                    desc: "Investment undertaken in the last 10 years",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                Cinvestmentrequired: {
                    desc: "Investment required to upgrade to A class",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                COMComments: {
                    desc: "Comments to operation and maintainance",
                    subgroup: "Culverts Group 2: Operational and Maintenance Data",
                    group: "CULVERTS"
                },
                Ccondition: {
                    desc: "Current condition",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                Ccriticality: {
                    desc: "Criticality",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                CLandslide: {
                    desc: "Exposure to landslide hazard",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                CFlood: {
                    desc: "Exposure to flood hazard",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                CRespHazard: {
                    desc: "Asset Response against hazards",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                Csensitivity: {
                    desc: "Asset Sensitivity",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                CRISK: {
                    desc: "RISK",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                CRISKphysical: {
                    desc: "Risk due to Physical Deterioration",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                CRISKnatural: {
                    desc: "Risk due to Natural Hazards",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                dcode: {
                    desc: "Asset Code",
                    subgroup: "Longitudinal Drainage Left Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dyearconstruc: {
                    desc: "Year of construction",
                    subgroup: "Longitudinal Drainage Left Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dtype: {
                    desc: "Type of drainage",
                    subgroup: "Longitudinal Drainage Left Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dsection: {
                    desc: "Type of section",
                    subgroup: "Longitudinal Drainage Left Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dposition: {
                    desc: "Position",
                    subgroup: "Longitudinal Drainage Left Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dslope: {
                    desc: "Slope (%)",
                    subgroup: "Longitudinal Drainage Left Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dphoto: {
                    desc: "Photographs",
                    subgroup: "Longitudinal Drainage Left Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dconslos: {
                    desc: "Consequences of failure on LOS",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dfailure: {
                    desc: "Failure history",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dlastinspection: {
                    desc: "Have there been past interventions performed during the last year?",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dintervextent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                ddateinterv: {
                    desc: "Date of performance of last year interventions",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dscopeinterv: {
                    desc: "Scope of last year interventions",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dlastyearintervcost: {
                    desc: "Cost of last year interventions",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dlocdocinterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearinterv: {
                    desc: "Have there been interventions performed during the current year?",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearintervextent: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearintervdate: {
                    desc: "Date of performance of current year interventions",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearintervscope: {
                    desc: "Scope of current year interventions",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearintervcost: {
                    desc: "Accummulated cost of current year interventions",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dlocdoccurryearinterv: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dmaintissues: {
                    desc: "Maintainability issues",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dinvestment10years: {
                    desc: "Investment undertaken in the last 10 years",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dinvestmentrequired: {
                    desc: "Investment required for replacement",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                domcomments: {
                    desc: "Comments to operation and maintainance",
                    subgroup: "Longitudinal Drainage Left Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcode2: {
                    desc: "Asset Code",
                    subgroup: "Longitudinal Drainage Right Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dyearconstruc2: {
                    desc: "Year of construction",
                    subgroup: "Longitudinal Drainage Right Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dtype2: {
                    desc: "Type of drainage",
                    subgroup: "Longitudinal Drainage Right Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dsection2: {
                    desc: "Type of section",
                    subgroup: "Longitudinal Drainage Right Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dposition2: {
                    desc: "Position",
                    subgroup: "Longitudinal Drainage Right Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dslope2: {
                    desc: "Slope (%)",
                    subgroup: "Longitudinal Drainage Right Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dphoto2: {
                    desc: "Photographs",
                    subgroup: "Longitudinal Drainage Right Side Group 1: General and Inventory Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dconslos2: {
                    desc: "Consequences of failure on LOS",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dfailure2: {
                    desc: "Failure history",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dlastinspection2: {
                    desc: "Have there been past interventions performed during the last year?",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dintervextent2: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                ddateinterv2: {
                    desc: "Date of performance of last year interventions",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dscopeinterv2: {
                    desc: "Scope of last year interventions",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dlastyearintervcost2: {
                    desc: "Cost of last year interventions",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dlocdocinterv2: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearinterv2: {
                    desc: "Have there been interventions performed during the current year?",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearintervextent2: {
                    desc: "Have they been global or partial interventions?",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearintervdate2: {
                    desc: "Date of performance of current year interventions",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearintervscope2: {
                    desc: "Scope of current year interventions",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dcurryearintervcost2: {
                    desc: "Accummulated cost of current year interventions",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dlocdoccurryearinterv2: {
                    desc: "Location of the documentation of last year interventions",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dmaintissues2: {
                    desc: "Maintainability issues",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dinvestment10years2: {
                    desc: "Investment undertaken in the last 10 years",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                dinvestmentrequired2: {
                    desc: "Investment required for replacement",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                domcomments2: {
                    desc: "Comments to operation and maintainance",
                    subgroup: "Longitudinal Drainage Right Side Group 2: Operations and Maintenance Data",
                    group: "LONGITUDINAL DRAINAGE - LEFT/RIGHT SIDE"
                },
                rlofnatural: {
                    desc: "rlofnatural",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                rlofphysical: {
                    desc: "rlofphysical",
                    subgroup: "Pavement Group 3: Indexes and Risk Analysis",
                    group: "ROADS - PAVEMENTS"
                },
                blofnatural: {
                    desc: "blofnatural",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                blofphysical: {
                    desc: "blofphysical",
                    subgroup: "Bridge Group 3: Indexes and Risk Analysis",
                    group: "BRIDGES"
                },
                Clofnatural: {
                    desc: "Clofnatural",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                Clofphysical: {
                    desc: "Clofphysical",
                    subgroup: "Culverts Group 3: Indexes and Risk Analysis",
                    group: "CULVERTS"
                },
                glofnatural: {
                    desc: "glofnatural",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glofphysical: {
                    desc: "glofphysical",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glofnatural2: {
                    desc: "glofnatural2",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                glofphysical2: {
                    desc: "glofphysical2",
                    subgroup: "Geotechnical Assets Right Side Group 3: Indexes and Risk Analysis",
                    group: "GEOTECHNICAL ASSETS - LEFT/RIGHT SIDE"
                },
                rcondition: {
                    desc: "rcondition",
                    subgroup: "Pavement Group 2: Operations and Maintenance Data",
                    group: "ROADS - PAVEMENTS"
                }
            }
        }
    }
}, false, true);