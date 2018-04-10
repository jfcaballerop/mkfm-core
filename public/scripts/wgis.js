window.APP || (window.APP = {})

window.APP.WGIS = function wGisModule() {
    var map, spinner, riskToogles, riskForms;
    var center, zoom
    var infoWnd, infoBox;
    var featureCrit = [];
    var featureCond = [];
    var featureRiskPhy = [];
    var featureRiskNat = [];
    var defaultMarkerColor = '#00abff'

    var dataLayers = {
        Culvert: {},
        Bridge: {},
        Geo: {},
        Pavement: {}
    }
    var selectedRoads = {
        main: false,
        secondary: false,
        feeder: false,
        urban: false
    }

    var selectedAssets = {
        Culvert: false,
        Bridge: false,
        Geo: false,
        Pavement: false
    }

    var riskRating = {
        'Very Low': {
            values: [
                '0-20__A',
                '0-20__B',
                '20-40__A'
            ],
            color: '#00B050'
        },
        'Low': {
            values: [
                '0-20__C',
                '0-20__D',
                '20-40__B',
                '20-40__C',
                '40-60__A',
                '60-80__A'
            ],
            color: '#92D050'
        },
        'Medium': {
            values: [
                '0-20__E',
                '20-40__D',
                '20-40__E',
                '40-60__B',
                '40-60__C',
                '40-60__D',
                '60-80__B',
                '60-80__C',
                '80-100__A',
                '80-100__B'
            ],
            color: '#ffff00'
        },
        'High': {
            values:[
                '40-60__E',
                '60-80__D',
                '80-100__C'
            ],
            color: '#FFA500'
        },
        'Very High': {
            values: [
                '60-80__E',
                '80-100__D',
                '80-100__E'
            ],
            color: '#ff0000'
        }
    }

    var riskFormulas = {
        criticality: {
            "Very High": {
                scale: 5,
                color: "#ff0000",
                min: 80,
                max: 101
            },
            "High": {
                scale: 4,
                color: "#FFA500",
                min: 60,
                max: 80
            },
            "Medium": {
                scale: 3,
                color: "#ffff00",
                min: 40,
                max: 60
            },
            "Low": {
                scale: 2,
                color: "#92d050",
                min: 20,
                max: 40
            },
            "Very Low": {
                scale: 1,
                color: "#00b050",
                min: 0,
                max: 20
            }
        },
        condition: {
            "Excellent": {
                scale: 5,
                color: "#00b050",
                min: 0.8,
                max: 1.01
            },
            "Good": {
                scale: 4,
                color: "#92d050",
                min: 0.60,
                max: 0.80
            },
            "Fair": {
                scale: 3,
                color: "#ffff00",
                min: 0.40,
                max: 0.60

            },
            "Poor": {
                scale: 2,
                color: "#f79646",
                min: 0.20,
                max: 0.40

            },
            "Very Poor": {
                scale: 1,
                color: "#ff0000",
                min: 0,
                max: 0.20
            }
        },
        physical: riskRating,
        natural: riskRating

    }

    var assetData = {
        /*
        Example object shape
        */
        Culvert: {
            main: [],
            secondary: [],
            feeder: [],
            urban: []
        },
        Bridge: {},
        Geo: {},
        Pavement: {}
    }

    var riskFilters = {
        criticality: [],
        condition: [],
        physical: [],
        natural: []
    }

    function setRiskFilter(group, value) {
        riskFilters[group].push(value)
        onRiskFilterChanged()
    }

    function removeRiskFilter(group, value) {
        riskFilters[group] = _.without(riskFilters[group], value)
        onRiskFilterChanged()
    }
    function clearRiskFilter(group) {
        if (riskFilters[group].length) {
            riskFilters[group] = []
            onRiskFilterChanged()
        }
    }

    function onRiskFilterChanged() {
        //console.log('New filters', riskFilters)
        applyRiskFiltersToAssets()
    }

    function applyRiskFiltersToAssets() {
        var selectedAssets = getSelectedAssets()
        var selectedRoadTypes = getSelectedRoads()
        if (!selectedRoadTypes.length) {
            return
        }
        _.each(selectedAssets, function (assetType) {
            _.each(selectedRoadTypes, function (roadType) {
                var layer = dataLayers[assetType][roadType]
                if(!layer || !layer.forEach){
                    return
                }
                //apply filter to layer
                layer.forEach(function (feature) {
                    var result = applyFiltersToFeature(feature)
                    //console.log('filters result', result)
                    if (!result) {
                        feature.setProperty('isVisible', false)
                    }
                    else {
                        feature.setProperty('isVisible', true)
                        feature.setProperty('color', result.color)
                    }
                })
            })
        })
    }

    function findMatchingScore(riskFormula, value, selectedCriteria){
        return _.find(riskFormula, function (score, key) {
            //var score = riskFormulas.criticality[criteria]
            return ~selectedCriteria.indexOf(key)
                && value >= score.min
                && value <= score.max
        })
    }

    function findMatchingRiskScore(riskFormula, value, selectedCriteria){
        return _.find(riskFormula, function(data, key){
            return ~selectedCriteria.indexOf(key)
                && ~data.values.indexOf(value)
        })
    }

    function applyFiltersToFeature(feature) {
        if (riskFilters.criticality.length) {
            switch (feature.getProperty('assetType')) {
                case 'Bridge':
                    var value = feature.getProperty('bcriticality')
                    return findMatchingScore(riskFormulas.criticality, value, riskFilters.criticality)
                case 'Culvert':
                    var value = feature.getProperty('Ccriticality')
                    return findMatchingScore(riskFormulas.criticality, value, riskFilters.criticality)
                case 'Geotechnical':
                    var value = feature.getProperty('gcriticality') || feature.getProperty('gcriticality2')
                    return findMatchingScore(riskFormulas.criticality, value, riskFilters.criticality)
            }

        }
        else if (riskFilters.condition.length) {
            switch (feature.getProperty('assetType')) {
                case 'Bridge':
                    var value = feature.getProperty('bcondition')
                    return findMatchingScore(riskFormulas.condition, value, riskFilters.condition)
                case 'Culvert':
                    var value = feature.getProperty('Ccondition')
                    return findMatchingScore(riskFormulas.condition, value, riskFilters.condition)
                case 'Geotechnical':
                    var value = feature.getProperty('gcondition') || feature.getProperty('gcondition2')
                    return findMatchingScore(riskFormulas.condition, value, riskFilters.condition)
            }
        }
        else if (riskFilters.natural.length) {
            switch(feature.getProperty('assetType')){
                case 'Bridge':
                    var value = feature.getProperty('brisknaturalnorm')
                    return findMatchingRiskScore(riskFormulas.natural, value, riskFilters.natural)
                case 'Culvert':
                    var value = feature.getProperty('CRISKnaturalnorm')
                    return findMatchingRiskScore(riskFormulas.natural, value, riskFilters.natural)
                case 'Geotechnical':
                    var value = feature.getProperty('grisknaturalnorm') || feature.getProperty('grisknaturalnorm2')
                    return findMatchingRiskScore(riskFormulas.natural, value, riskFilters.natural)
            }
        }
        else if (riskFilters.physical.length) {
            switch(feature.getProperty('assetType')){
                case 'Bridge':
                    var value = feature.getProperty('briskphysicalnorm')
                    return findMatchingRiskScore(riskFormulas.physical, value, riskFilters.physical)
                case 'Culvert':
                    var value = feature.getProperty('CRISKphysicalnorm')
                    return findMatchingRiskScore(riskFormulas.physical, value, riskFilters.physical)
                case 'Geotechnical':
                    var value = feature.getProperty('griskphysicalnorm') || feature.getProperty('griskphysicalnorm2')
                    return findMatchingRiskScore(riskFormulas.physical, value, riskFilters.physical)
            }
        }
        else {
            // no filter set, return something so feature is visible
            return {
                color: defaultMarkerColor
            }
        }
    }



    function initModule(mapCenter, zoomLevel) {
        //console.log('initmaps', mapCenter, zoomLevel)
        center = mapCenter
        zoom = zoomLevel
    }

    function fetchAssets(assetType, roadType) {
        if (assetData[assetType][roadType] && assetData[assetType][roadType].length) {
            return Promise.resolve(assetData[assetType][roadType])
        }
        else {
            return $.get('/auth/WEB/maps/assets/' + assetType + '/' + roadType)
                .then(function (data) {
                    //console.log('Fetched', assetType, roadType, data.length)
                    assetData[assetType][roadType] = data
                    return data
                })
                .catch(function (error) {
                    console.error('Failed fetching assets', error.status, error.message)
                    if (error.status === 401) {
                        location.assign('/')
                    }
                    return []
                })
        }
    }

    function getRoadType(formValue) {
        switch (formValue) {
            case 'Main Road':
                return 'main'
            case 'Secondary':
                return 'secondary'
            case 'Feeder':
                return 'feeder'
            default:
                return 'urban'
        }
    }

    function saveUI() {
        spinner = $('#spinner')
        infoBox = $('#info-box')
        riskToogles = $('input[type=radio][name=risk-assesment]')

        $('.js-road-type').change(function (event) {
            var roadType = getRoadType(event.target.value)
            var isSelected = !!event.target.checked
            selectedRoads[roadType] = isSelected
            toggleRoadDataLayers(roadType, isSelected)
        })
        $('.js-asset-type').change(function (event) {
            var assetType = event.target.value
            var isSelected = !!event.target.checked
            selectedAssets[assetType] = isSelected
            if (isSelected) {
                loadDataLayer(assetType)
            }
            else {
                hideAssetDataLayer(assetType)
            }

        })

        riskForms = {
            criticality: $('#CriticalityForm'),
            condition: $('#ConditionForm'),
            //calculation: $('#CalculationForm'),
            physical: $('#PhysicalDeteriorationForm'),
            natural: $('#NaturalHazardsForm')
        }

        riskToogles.click(function (e) {
            var $toggle = $(this)
            _.each(riskForms, function (form, riskGroup) {
                if (riskGroup === e.target.value && e.target.checked) {
                    form.slideDown(300)
                    form
                        .find('input[type=checkbox]')
                        .change(function (e) {
                            var filterValue = e.target.value
                            if (e.target.checked) {
                                setRiskFilter(riskGroup, filterValue)
                            }
                            else {
                                removeRiskFilter(riskGroup, filterValue)
                                //if all are unchecked, hide the group
                                if(!form.find('input:checked').length){
                                    $toggle.prop('checked', false)
                                    form.slideUp(300)
                                }
                            }
                        })
                }
                else {
                    form.slideUp(300)
                    form.find('input[type=checkbox]').off('change')
                    // clean up filter
                    clearRiskFilter(riskGroup)
                    // uncheck any child checkboxes
                    form.find('input[type=checkbox]').prop('checked', false)
                }
            })
        })
    }

    function getSelectedAssets() {
        return _.keys(selectedAssets).filter(key => !!selectedAssets[key])
    }
    function getSelectedRoads() {
        return _.keys(selectedRoads).filter(key => !!selectedRoads[key])
    }

    function getEventProp(prop) {
        return this.getProperty(prop) || ''
    }

    function getInfoWindowContent(type, event) {
        var getProp = getEventProp.bind(event.feature)


        var content = 'Asset Type: <strong>' + type + '</strong><br>';
        var subcontent = "";
        if (type === "Culvert") {
            subcontent += 'Asset code: <strong><a href="/auth/WEB/data_sheet/details/' + getProp('Ccode') + '">' + getProp('Ccode') +
                '</a></strong><br><hr>';

            subcontent += '<h5>Inventory Data</h5>';
            subcontent += '<strong>N. Elements: </strong>' + getProp(
                "Cnumelem") + '<br>';
            subcontent +=
                '<strong>Type of section: </strong>' +
                getProp("Csection") + '<br>';
            subcontent += '<strong>Material: </strong>' + getProp(
                "Cmaterial") + '<br>';
            subcontent += '<strong>Diameter: </strong>' + getProp("Cdiameter") +
                '<br>';
            subcontent += '<strong>Width: </strong>' +
                getProp("Cwidth") + '<br>';

            subcontent += '<strong>Length: </strong>' + getProp("Clength") +
                '<br>';
            subcontent += '<h5>O&M Data</h5>';
            subcontent += '<strong> Clearing required: </strong>' + getProp(
                "Cclearing") + '<br>';
            subcontent += '<strong> Current visual condition: </strong>' + getProp(
                "CVisualCondition") + '<br>';

            vfoto = getProp("_attachments");
            if (vfoto !== undefined && vfoto.length > 0) {

                var fotosmall = vfoto[0].replace(".jpg", "-small.jpg");
                subcontent += '<img src="' +
                    fotosmall +
                    '">' + '<br>';
            }



        } else if (type === "Bridge") {
            subcontent += 'Asset code: <strong><a href="/auth/WEB/data_sheet/details/' + getProp('bcode') + '">' + getProp('bcode') +
                '</a></strong><br><hr>';
            subcontent += '<h5>Inventory Data</h5>';
            subcontent += '<strong>Structural typology: </strong>' + getProp(
                "btype") + '<br>';
            subcontent += '<strong>No of spans: </strong>' + getProp("bspans") +
                '<br>';
            subcontent += '<strong>Total length: </strong>' + getProp("blenght") +
                '<br>';
            subcontent += '<strong>Width: </strong>' + getProp("bwidth") +
                '<br>';
            subcontent += '<strong>Free height: </strong>' + getProp(
                "bfreeheight") + '<br>';
            subcontent += '<h5>Material</h5>';
            subcontent += '<strong>Deck: </strong>' + getProp("bmaterialdeck") +
                '<br>';
            subcontent += '<strong>Piers: </strong>' + getProp(
                "bmaterialpiers") +
                '<br>';
            subcontent += '<strong>Abutments: </strong>' + getProp(
                "bmaterialabutments") + '<br>';
            subcontent += '<h5>O&M Data</h5>';
            subcontent += '<strong>Type of damages: </strong>' + getProp("bdamagesfoundationsgeneraltype") + '<br>';
            subcontent += '<strong>Current Visual Condition: </strong>' + getProp(
                "bvisualcondition") + '<br>';

            vfoto = getProp("_attachments");
            if (vfoto !== undefined && vfoto.length > 0) {

                var fotosmall = vfoto[0].replace(".jpg", "-small.jpg");
                subcontent += '<img src="' +
                    fotosmall +
                    '">' + '<br>';
            }
        } else {
            if (type === 'Geotechnical') {
                var code = getProp('gcode') || getProp('gcode2')
                subcontent += 'Asset code: <strong><a href="/auth/WEB/data_sheet/details/' + code + '">' + code +
                    '</a></strong><br><hr>';
                subcontent += '<h5>Inventory Data</h5>';

                subcontent += '<strong>Typology: </strong>' + (getProp("gtype") || getProp("gtype")) +
                    '<br>';
                subcontent += '<strong>Position: </strong>' + (getProp("gposition") || getProp("gposition2")) +
                    '<br>';
                subcontent += '<strong>Height: </strong>' + (getProp("gheight") || getProp("gheight2")) +
                    '<br>';
                subcontent += '<strong>Length: </strong>' + (getProp("glength") || getProp("glength2")) +
                    '<br>';
                subcontent += '<strong>Slope/Angle: </strong>' + (getProp("gslope") || getProp("gslope2")) +
                    '<br>';
                subcontent += '<strong>Nature: </strong>' + (getProp("gnature") || getProp("gnature2")) +
                    '<br>';


                subcontent += '<h5>O&M Data</h5>';
                subcontent += '<strong>Failure processes: </strong>' + (getProp("gnature") || getProp("gnature2") || '') + '<br>';
                /* subcontent += '<strong>Intensity of failure processes: </strong>' + getProp(
                        "bdamagesfoundationsgeneraltype") + '<br>'; */
                subcontent += '<strong>Extent of failure processes: </strong>' + (getProp("gintensityfailure") || getProp("gintensityfailure2")) + '<br>';
                subcontent += '<strong>Current Visual Condition: </strong>' + (getProp("gvisualcondition") || getProp("gvisualcondition2")) + '<br>';
                vfoto = getProp("_attachments");
                if (vfoto !== undefined && vfoto.length > 0) {

                    var fotosmall = vfoto[0].replace(".jpg", "-small.jpg");
                    subcontent += '<img src="' +
                        fotosmall +
                        '">' + '<br>';
                }
            }
        }

        content += '<div class="scrollFix">' +
            subcontent +
            '</div>';
        return content;
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function onDataLayerClick(event) {
        // Set info window on a point asset
        var assetType = event.feature.getProperty('assetType')
        console.log('Asset click on', assetType)
        if (assetType) {
            infoWnd.setPosition(event.latLng);
            infoWnd.setContent(getInfoWindowContent(assetType, event));
            infoWnd.open(map)
        }
    }

    function onDataLayerHover(event) {
        infoBox.html((event.feature.getProperty('assetType') || 'Road') + ' - ' + event.feature.getProperty('displayName') || '-')
    }

    function onDataLayerMouseout(event){
        infoBox.html('--')
    }

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: center,
            zoom: zoom
        });

        var jsonObject;
        infoWnd = new google.maps.InfoWindow();

        // needed for other scripts, they need to access the map
        window.map = map

        $('#spinner').hide();

    };

    var roadTypeStrokeWeight = {
        main: 4,
        secondary: 3,
        feeder: 2,
        urban: 1
    }

    var roadColors = {
        dark: '#639',
        light: '#ff0'
    }

    function createIconMarker(letter, backgroundColor, fgColor){
        return "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" + letter + "|" + backgroundColor.replace('#', '') + "|000000"
    }

    function getStyleForAssetType(assetType, roadType, feature) {
        var mapType = map.getMapTypeId()
        let colorSource
        if (mapType === 'terrain' || mapType === 'roadmap') {
            colorSource = roadColors.dark
        }
        else {
            colorSource = roadColors.light
        }
        switch (assetType) {
            case 'Pavement':
                return {
                    // TODO - color en función de filtros
                    'strokeColor': colorSource,
                    'strokeWeight': roadTypeStrokeWeight[roadType]
                }
            default: {
                return {
                    //TODO - markers específico por tipo de activo puntual
                    //TODO - color de marker en función de filtros

                    //label: String(assetType.slice(0, 1)).toUpperCase(),
                    icon: createIconMarker(String(assetType.slice(0, 1)).toUpperCase(), feature.getProperty('color') || defaultMarkerColor),
                    visible: feature.getProperty('isVisible') !== false
                }
            }
        }


    }

    function createLayer(assetType, roadType) {
        var layer = new google.maps.Data()
        layer.addListener('click', onDataLayerClick)
        layer.addListener('mouseover', onDataLayerHover)
        layer.addListener('mouseout', onDataLayerMouseout)
        dataLayers[assetType][roadType] = layer
        spinner.show()
        layer.setStyle(function (feature) {
            return getStyleForAssetType(assetType, roadType, feature)
        })

        return fetchAssets(assetType, roadType)
            .then(function (data) {
                layer.addGeoJson({
                    type: 'FeatureCollection',
                    features: data
                })
               /*  data.forEach(function(feature){
                    layer.addGeoJson(feature)
                }) */
                applyRiskFiltersToAssets()
                layer.setMap(map)
            })
            .done(function () {
                spinner.hide()
            })
    }

    function loadDataLayer(assetType) {
        //TODO - get selected roadtypes
        var roadTypes = getSelectedRoads()
        // for each selected roadtype...
        // fetch data if needed,or simply toggle on
        _.each(roadTypes, function (roadType) {
            if (!dataLayers[assetType] || !dataLayers[assetType][roadType]) {
                createLayer(assetType, roadType)
            }
            else {
                dataLayers[assetType][roadType].setMap(map)
                applyRiskFiltersToAssets()
            }
        })
    }

    function toggleRoadDataLayers(roadType, isVisible) {
        var selectedAssets = getSelectedAssets()
        _.each(dataLayers, function (assetLayers, assetType) {
            var shouldDisplay = isVisible && ~selectedAssets.indexOf(assetType)
            assetLayers[roadType] && assetLayers[roadType].setMap(shouldDisplay ? map : null)
        })
    }

    /* function hideRoadDataLayers(roadType){
        var selectedAssetTypes = getSelectedAssets()
        _.each(selectedAssetTypes, function(assetType){
            var layer = dataLayers[assetType][roadType]
            layer && layer.setMap(null)
        })
    } */

    function hideAssetDataLayer(assetType) {
        var selectedRoadTypes = getSelectedRoads()
        _.each(selectedRoadTypes, function (roadType) {
            var layer = dataLayers[assetType][roadType]
            layer && layer.setMap(null)
        })
    }

    $(document).ready(function () {
        saveUI()
    })

    return {
        init: initModule,
        initMap: initMap,
        dataLayers: dataLayers
    }
}()
