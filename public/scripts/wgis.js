window.APP || (window.APP = {})

window.APP.WGIS = function wGisModule(){
    var map, spinner;
    var center, zoom
    var infoWnd, infoBox;
    var featureCrit = [];
    var featureCond = [];
    var featureRiskPhy = [];
    var featureRiskNat = [];

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

    function initMaps(mapCenter, zoomLevel){
        //console.log('initmaps', mapCenter, zoomLevel)
        center = mapCenter
        zoom = zoomLevel
    }

    function fetchAssets(assetType, roadType){
        if(assetData[assetType][roadType] && assetData[assetType][roadType].length){
            return Promise.resolve(assetData[assetType][roadType])
        }
        else {
            return  $.get('/auth/WEB/maps/assets/' + assetType + '/' + roadType)
            .then(function(data){
                //console.log('Fetched', assetType, roadType, data.length)
                assetData[assetType][roadType] = data
                return data
            })
            .catch(function(error){
                console.error('Failed fetching assets', error.status, error.message)
                if(error.status === 401){
                    location.assign('/')
                }
                return []
            })
        }

    }

    function getRoadType(formValue){
        switch(formValue){
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

    function saveUI(){
        spinner = $('#spinner')
        infoBox = $('#info-box')
        $('.js-road-type').change(function(event){
            var roadType = getRoadType(event.target.value)
            var isSelected = !!event.target.checked
            selectedRoads[roadType] = isSelected
            toggleRoadDataLayers(roadType, isSelected)
        })
        $('.js-asset-type').change(function(event){
            var assetType = event.target.value
            var isSelected = !!event.target.checked
            selectedAssets[assetType] = isSelected
            if(isSelected){
                loadDataLayer(assetType)
            }
            else {
                hideAssetDataLayer(assetType)
            }

        })
    }

    function getSelectedAssets(){
        return _.keys(selectedAssets).filter(key => !!selectedAssets[key])
    }
    function getSelectedRoads(){
        return _.keys(selectedRoads).filter(key => !!selectedRoads[key])
    }

    function getInfoWindowContent(type, event) {
        var getProp = event.feature.getProperty.bind(event.feature)
        var content = 'Asset Type: <strong>' + type + '</strong><br>';
        var subcontent = "";
        if (type === "Culvert") {
            subcontent += 'Asset code: <strong>' + getProp('Ccode') +
                '</strong><br><hr>';

            subcontent += 'Inventory Data<br>';
            subcontent += '<strong>N. Elements : </strong>' + getProp(
                "Cnumelem") + '<br>';
            subcontent +=
                '<strong> Type of section: </strong>' +
                getProp("Csection") + '<br>';
            subcontent += '<strong> Material : </strong>' + getProp(
                "Cmaterial") + '<br>';
            subcontent += '<strong> Diameter: </strong>' + getProp("Cdiameter") +
                '<br>';
            subcontent += '<strong> Width: </strong>' +
                getProp("Cwidth") + '<br>';

            subcontent += '<strong> Length: </strong>' + getProp("Clength") +
                '<br>';
            subcontent += '<br>O&M Data<br>';
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
            subcontent += 'Asset code: <strong>' + getProp('bcode') +
                '</strong><br><hr>';
            subcontent += 'Inventory Data<br>';
            subcontent += '<strong>Structural typology: </strong>' + getProp(
                "btype") + '<br>';
            subcontent += '<strong>No of spans: </strong>' + getProp("bspans") +
                '<br>';
            subcontent += '<strong>Toal length: </strong>' + getProp("blenght") +
                '<br>';
            subcontent += '<strong>Width: </strong>' + getProp("bwidth") +
                '<br>';
            subcontent += '<strong>Free height: </strong>' + getProp(
                "bfreeheight") + '<br>';
            subcontent += '<br>- Material -<br>';
            subcontent += '<strong>Deck: </strong>' + getProp("bmaterialdeck") +
                '<br>';
            subcontent += '<strong>Piers: </strong>' + getProp(
                    "bmaterialpiers") +
                '<br>';
            subcontent += '<strong>Abutments: </strong>' + getProp(
                "bmaterialabutments") + '<br>';
            subcontent += '<br>O&M Data<br>';
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
                subcontent += 'Asset code: <strong>' + (getProp('gcode') || getProp('gcode2')) +
                    '</strong><br><hr>';
                subcontent += 'Inventory Data<br>';

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


                subcontent += '<br>O&M Data<br>';
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
            } /* else {
                subcontent += 'Asset code: <strong>' + event.feature.getProperty('gcode2') +
                    '</strong><br><hr>';
                subcontent += 'Inventory Data<br>';

                subcontent += '<strong>Typology: </strong>' + event.feature.getProperty("gtype2") +
                    '<br>';
                subcontent += '<strong>Position: </strong>' + event.feature.getProperty(
                        "gposition2") +
                    '<br>';
                subcontent += '<strong>Height: </strong>' + event.feature.getProperty("gheight2") +
                    '<br>';
                subcontent += '<strong>Length: </strong>' + event.feature.getProperty("glength2") +
                    '<br>';
                subcontent += '<strong>Slope/Angle: </strong>' + event.feature.getProperty(
                        "gslope2") +
                    '<br>';
                subcontent += '<strong>Nature: </strong>' + event.feature.getProperty("gnature2") +
                    '<br>';


                subcontent += '<br>O&M Data<br>';
                subcontent += '<strong>Failure processes: </strong>' + event.feature.getProperty(
                    "gnature2") + '<br>';
                subcontent += '<strong>Intensity of failure processes: </strong>' + event.feature
                    .getProperty(
                        "bdamagesfoundationsgeneraltype2") + '<br>';
                subcontent += '<strong>Extent of failure processes: </strong>' + event.feature.getProperty(
                    "gintensityfailure2") + '<br>';
                subcontent += '<strong>Current Visual Condition: </strong>' + event.feature.getProperty(
                    "gvisualcondition2") + '<br>';
                vfoto = event.feature.getProperty("_attachments");
                if (vfoto !== undefined && vfoto.length > 0) {

                    var fotosmall = vfoto[0].replace(".jpg", "-small.jpg");
                    subcontent += '<img src="' +
                        fotosmall +
                        '">' + '<br>';
                }
            } */

        }

        content += '<div class="scrollFix">' +
            // event.feature.getProperty('xform_id_string') + " -- " +
            // event.feature.getProperty('_id') + '<br>' +
            // '[ ' + event.latLng.toUrlValue(6) + ' ]<hr>' +
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

    function onDataLayerClick(event){
        // Set info window on a point asset
        var assetType = event.feature.getProperty('assetType')
        console.log('Asset click on', assetType)
        if(assetType){
            infoWnd.setPosition(event.latLng);
            infoWnd.setContent(getInfoWindowContent(assetType, event));
            infoWnd.open(map)
        }

        // Store new open InfoWindow in global variable
        var infoTextContent = event.feature.getProperty('nameoption');
        if (event.feature.getProperty('nameoption') === 'Roads') {
            infoTextContent += ' ' + event.feature.getProperty('name');
        }
        //document.getElementById('info-box').textContent = infoTextContent;
    }

    function onDataLayerHover(event){
        if(event.feature.getId()){
            infoBox.html(event.feature.getId())
        }
    }

    function initMap() {
        console.log('initMap', center, zoom)
        map = new google.maps.Map(document.getElementById('map'), {
            center: center,
            zoom: zoom
        });

        var jsonObject;
        infoWnd = new google.maps.InfoWindow();

        // needed for other scripts, they need to access the map
        window.map = map

        // Set mouseover event for each feature.
        map.data.addListener('click', onDataLayerClick);
        map.data.setStyle(function (feature) {
            var color = feature.getProperty('color');
            var nameopt = feature.getProperty('nameoption');
            $('#layergps option[value="' + nameopt + '"]').prop('style', 'color: ' + color);
            console.log('setStyle', feature)
            return {
                fillColor: color,
                strokeColor: color,
                strokeWeight: 3,
                strokeOpacity: 1,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: color,
                    strokeOpacity: 1,
                    scale: 3
                }
            }
        });

        $('#spinner').hide();

        // });
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

    function getStyleForAssetType(assetType, roadType){
        var mapType = map.getMapTypeId()
        let colorSource
        if(mapType === 'terrain' || mapType === 'roadmap'){
            colorSource = roadColors.dark
        }
        else {
            colorSource = roadColors.light
        }
        switch (assetType){
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
                    label: String(assetType.slice(0,1)).toUpperCase()
                }
            }
        }


    }

    function createLayer(assetType, roadType){
        var layer = new google.maps.Data()
        layer.addListener('click', onDataLayerClick)
        layer.addListener('mouseover', onDataLayerHover)
        dataLayers[assetType][roadType] = layer
        layer.setMap(map)
        spinner.show()
        layer.setStyle(function(feature){
            return getStyleForAssetType(assetType, roadType)
        })

        return fetchAssets(assetType,roadType)
        .then(function(data){
            layer.addGeoJson({
                type: 'FeatureCollection',
                features: data
            })
        })
        .done(function(){
            spinner.hide()
        })
    }

    function loadDataLayer(assetType){
        //TODO - get selected roadtypes
        var roadTypes = getSelectedRoads()
        // for each selected roadtype...
        // fetch data if needed,or simply toggle on
        _.each(roadTypes, function(roadType){
            if(!dataLayers[assetType] || !dataLayers[assetType][roadType]){
                createLayer(assetType, roadType)
            }
            else {
                dataLayers[assetType][roadType].setMap(map)
            }
        })
    }

    function toggleRoadDataLayers(roadType, isVisible){
        var selectedAssets = getSelectedAssets()
        _.each(dataLayers, function(assetLayers, assetType){
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

    function hideAssetDataLayer(assetType){
        var selectedRoadTypes = getSelectedRoads()
        _.each(selectedRoadTypes, function(roadType){
            var layer = dataLayers[assetType][roadType]
            layer && layer.setMap(null)
        })
    }

    $(document).ready(function () {
        var featureActive = [];
        saveUI()
        // ASSETS

        // RISK ASSESMENT
        $('#Criticality').click(function () {
            var $this = $(this);
            if ($this.prop('checked')) {
                $('#CriticalityForm').show();
            } else {
                $('#CriticalityForm').hide();
                $('#CriticalityForm input[type=checkbox]').each(function (index) {
                    $(this).prop('checked', false);
                });


            }
        });

        $('#Condition').click(function () {
            var $this = $(this);
            if ($this.prop('checked')) {
                $('#ConditionForm').show();
            } else {
                $('#ConditionForm').hide();
                $('#ConditionForm input[type=checkbox]').each(function (index) {
                    $(this).prop('checked', false);
                });
            }
        });
        $('#Calculation').click(function () {
            var $this = $(this);
            if ($this.prop('checked')) {
                $('#CalculationForm').show();
            } else {
                $('#CalculationForm').hide();
                $('#CalculationForm input[type=checkbox]').each(function (index) {
                    $(this).prop('checked', false);
                });
            }
        });

        $('input[type=radio][name=radioRisk]').change(function (event) {
            $this = $(this);
            switch ($('input:radio[name=radioRisk]:checked').val()) {
                case 'PhysicalDeterioration':
                    //console.log('PhysicalDeterioration');
                    $('#NaturalHazardsForm').hide();
                    $('#NaturalHazardsForm input[type=checkbox]').each(function (index) {
                        $(this).prop('checked', false);
                    });
                    $('#PhysicalCalculationForm').show();

                    break;
                case 'NaturalHazards':
                    //console.log('NaturalHazards');
                    $('#PhysicalCalculationForm').hide();
                    $('#PhysicalCalculationForm input[type=checkbox]').each(function (index) {
                        $(this).prop('checked', false);
                    });
                    $('#NaturalHazardsForm').show();

                    break;

                default:
                    break;
            }
        });

        // Risk Assessment
        /**
         * AJAX CALL to Criticality
         * Se hace una peticion para cada valor del rango de criticality
         */
        $('#CriticalityForm input[type=checkbox]').click(async function () {
            var $this = $(this);
            var filterPav = false;
            var filterAsset = false;
            var filterPavArr = [];
            var filterAssetArr = [];
            var filterArr = [];
            var sendData = {
                filter: [],
                filterPav: [],
                filterAsset: [],
                formname: "Criticality",
                form: []
            };
            var pulsado = $this.is(':checked') | false;

            //console.log('pulsado ' + pulsado);

            $('#pavements input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    //console.log(index + ": " + $this.val() + ' - ' + $(this).val());
                    filterPavArr.push($(this).val());
                    filterArr.push($(this).val());
                    filterPav = true;

                }
            });
            $('#assets input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    //console.log(index + ": " + $this.val() + ' - ' + $(this).val());
                    filterAssetArr.push($(this).val());
                    filterArr.push($(this).val());
                    filterAsset = true;
                }
            });
            // alert($this.val());

            var optChecked = [];
            await $('#CriticalityForm input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    optChecked.push($(this).val());
                }

            });


            map.data.forEach(function (feature) {
                // If you want, check here for some constraints.
                if (feature.getProperty('nameoption').indexOf('CRITICALITY') >= 0) {
                    map.data.remove(feature);
                }

            });

            if ($this.is(':checked')) {
                if (!filterPav && !filterAsset) {
                    $('#myModal').modal();
                    $('#alertModalContent').empty();
                    $('#alertModalContent').append('<p>Filters not selected!</p>');
                }
            }

            if (optChecked.length > 0) {

                await $('#CriticalityForm input[type=checkbox]').each(function (index) {
                    if ($(this).is(':checked')) {
                        $('#spinnerCriticality').show();

                        sendData.form.push($(this).val());
                    } else {
                        var ix = sendData.form.indexOf($(this).val())
                        ix > -1 ? sendData.form.splice(ix, 1) : false;

                    }

                });
                sendData.filterPav = filterPavArr;
                sendData.filterAsset = filterAssetArr;
                sendData.filter = filterArr;
                if (pulsado && (filterPav || filterAsset)) {

                    var p1 = $.ajax({
                        url: '/auth/WEB/admin/get_formulas_tracks/',
                        data: JSON.stringify(sendData),
                        type: 'POST',
                        contentType: 'application/json'
                    }, function (data) { // //console.log('koboinfo ' + JSON.stringify(data)); return (data);
                    });
                    Promise.all([p1]).then(function (values) {
                        // //console.log(values);
                        if (values[0].length > 0) {


                            $.each(values[0], function (index, value) {
                                //console.log('value' + JSON.stringify(value));
                                jsonObject = value;
                                var color_to_paint = value.properties[
                                    'marker-color'];

                                jsonObject.properties.color = color_to_paint;
                                jsonObject.properties.nameoption = "CRITICALITY: " +
                                    jsonObject.properties.name;
                                featureCrit = map.data.addGeoJson(jsonObject);

                            });
                            $('#spinnerCriticality').hide();

                            //     $('#resultUpdate' + id).append('Tracks update: ' + values[0].tracksUpdated);

                        } else {
                            $('#spinnerCriticality').hide();

                        }
                    });
                } else {
                    $('#spinnerCriticality').hide();

                }
            }

        });

        $('#ConditionForm input[type=checkbox]').click(async function () {
            var $this = $(this);
            var filterPav = false;
            var filterPavArr = [];
            var filterAssetArr = [];
            var filterArr = [];
            var sendData = {
                filter: [],
                filterPav: [],
                filterAsset: [],
                formname: "Condition",
                form: []
            };
            var pulsado = $this.is(':checked') | false;

            //console.log('pulsado ' + pulsado);

            $('#pavements input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    //console.log(index + ": " + $this.val() + ' - ' + $(this).val());
                    filterPavArr.push($(this).val());
                    filterArr.push($(this).val());
                    filterPav = true;

                }
            });
            $('#assets input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    //console.log(index + ": " + $this.val() + ' - ' + $(this).val());
                    filterAssetArr.push($(this).val());
                    filterArr.push($(this).val());
                    filterPav = true;
                }
            });
            // alert($this.val());

            var optChecked = [];
            await $('#ConditionForm input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    optChecked.push($(this).val());
                }

            });


            map.data.forEach(function (feature) {
                // If you want, check here for some constraints.
                if (feature.getProperty('nameoption').indexOf('CONDITION') >= 0) {
                    map.data.remove(feature);
                }

            });

            if ($this.is(':checked')) {
                if (!filterPav) {
                    $('#myModal').modal();
                    $('#alertModalContent').empty();
                    $('#alertModalContent').append('<p>Filters not selected!</p>');
                }
            }

            if (optChecked.length > 0) {

                await $('#ConditionForm input[type=checkbox]').each(function (index) {
                    if ($(this).is(':checked')) {
                        $('#spinnerCondition').show();

                        sendData.form.push($(this).val());
                    } else {
                        var ix = sendData.form.indexOf($(this).val())
                        ix > -1 ? sendData.form.splice(ix, 1) : false;

                    }

                });
                sendData.filterPav = filterPavArr;
                sendData.filterAsset = filterAssetArr;
                sendData.filter = filterArr;
                if (pulsado && filterPav) {

                    var p1 = $.ajax({
                        url: '/auth/WEB/admin/get_formulas_tracks/',
                        data: JSON.stringify(sendData),
                        type: 'POST',
                        contentType: 'application/json'
                    }, function (data) { // //console.log('koboinfo ' + JSON.stringify(data)); return (data);
                    });
                    Promise.all([p1]).then(function (values) {
                        //console.log(values);
                        if (values[0].length > 0) {


                            $.each(values[0], function (index, value) {
                                jsonObject = value;
                                var color_to_paint = value.properties[
                                    'marker-color'];

                                jsonObject.properties.color = color_to_paint;
                                jsonObject.properties.nameoption = "CONDITION: " +
                                    jsonObject.properties.name;
                                featureCond = map.data.addGeoJson(jsonObject);

                            });
                            $('#spinnerCondition').hide();

                            //     $('#resultUpdate' + id).append('Tracks update: ' + values[0].tracksUpdated);

                        } else {
                            $('#spinnerCondition').hide();

                        }
                    });
                } else {
                    $('#spinnerCondition').hide();

                }
            }

        });
        /**
         * PhysicalCalculationForm
         */
        $('#PhysicalCalculationForm input[type=checkbox]').click(async function () {
            var $this = $(this);
            var filterPav = false;
            var filterPavArr = [];
            var filterAssetArr = [];
            var filterArr = [];
            var sendData = {
                filter: [],
                filterPav: [],
                filterAsset: [],
                formname: "RiskPhy",
                form: []
            };
            var pulsado = $this.is(':checked') | false;

            //console.log('pulsado ' + pulsado);

            $('#pavements input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    //console.log(index + ": " + $this.val() + ' - ' + $(this).val());
                    filterPavArr.push($(this).val());
                    filterArr.push($(this).val());
                    filterPav = true;

                }
            });
            $('#assets input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    //console.log(index + ": " + $this.val() + ' - ' + $(this).val());
                    filterAssetArr.push($(this).val());
                    filterArr.push($(this).val());
                    filterPav = true;
                }
            });
            // alert($this.val());

            var optChecked = [];
            await $('#PhysicalCalculationForm input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    optChecked.push($(this).val());
                }

            });


            map.data.forEach(function (feature) {
                // If you want, check here for some constraints.
                if (feature.getProperty('nameoption').indexOf('RISKPHY') >= 0) {
                    map.data.remove(feature);
                }

            });

            if ($this.is(':checked')) {
                if (!filterPav) {
                    $('#myModal').modal();
                    $('#alertModalContent').empty();
                    $('#alertModalContent').append('<p>Filters not selected!</p>');
                }
            }

            if (optChecked.length > 0) {

                await $('#PhysicalCalculationForm input[type=checkbox]').each(function (index) {
                    if ($(this).is(':checked')) {
                        $('#spinnerCondition').show();

                        sendData.form.push($(this).val());
                    } else {
                        var ix = sendData.form.indexOf($(this).val())
                        ix > -1 ? sendData.form.splice(ix, 1) : false;

                    }

                });
                sendData.filterPav = filterPavArr;
                sendData.filterAsset = filterAssetArr;
                sendData.filter = filterArr;
                if (pulsado && filterPav) {

                    var p1 = $.ajax({
                        url: '/auth/WEB/admin/get_formulas_tracks/',
                        data: JSON.stringify(sendData),
                        type: 'POST',
                        contentType: 'application/json'
                    }, function (data) { // //console.log('koboinfo ' + JSON.stringify(data)); return (data);
                    });
                    Promise.all([p1]).then(function (values) {
                        //console.log(values);
                        if (values[0].length > 0) {


                            $.each(values[0], function (index, value) {
                                jsonObject = value;
                                var color_to_paint = value.properties[
                                    'marker-color'];
                                jsonObject.properties.color = color_to_paint;
                                jsonObject.properties.nameoption = "RISKPHY: " +
                                    jsonObject.properties.name;
                                featureRiskPhy = map.data.addGeoJson(jsonObject);

                            });
                            $('#spinnerCondition').hide();

                            //     $('#resultUpdate' + id).append('Tracks update: ' + values[0].tracksUpdated);

                        } else {
                            $('#spinnerCondition').hide();

                        }
                    });
                } else {
                    $('#spinnerCondition').hide();

                }
            }

        });
        /**
         * NaturalHazardsForm
         */
        $('#NaturalHazardsForm input[type=checkbox]').click(async function () {
            var $this = $(this);
            var filterPav = false;
            var filterPavArr = [];
            var filterAssetArr = [];
            var filterArr = [];
            var sendData = {
                filter: [],
                filterPav: [],
                filterAsset: [],
                formname: "RiskNat",
                form: []
            };
            var pulsado = $this.is(':checked') | false;

            //console.log('pulsado ' + pulsado);

            $('#pavements input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    //console.log(index + ": " + $this.val() + ' - ' + $(this).val());
                    filterPavArr.push($(this).val());
                    filterArr.push($(this).val());
                    filterPav = true;

                }
            });
            $('#assets input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    //console.log(index + ": " + $this.val() + ' - ' + $(this).val());
                    filterAssetArr.push($(this).val());
                    filterArr.push($(this).val());
                    filterPav = true;
                }
            });
            // alert($this.val());

            var optChecked = [];
            await $('#NaturalHazardsForm input[type=checkbox]').each(function (index) {
                if ($(this).is(':checked')) {
                    optChecked.push($(this).val());
                }

            });


            map.data.forEach(function (feature) {
                // If you want, check here for some constraints.
                if (feature.getProperty('nameoption').indexOf('RISKPHY') >= 0) {
                    map.data.remove(feature);
                }

            });

            if ($this.is(':checked')) {
                if (!filterPav) {
                    $('#myModal').modal();
                    $('#alertModalContent').empty();
                    $('#alertModalContent').append('<p>Filters not selected!</p>');
                }
            }

            if (optChecked.length > 0) {

                await $('#NaturalHazardsForm input[type=checkbox]').each(function (index) {
                    if ($(this).is(':checked')) {
                        $('#spinnerCondition').show();

                        sendData.form.push($(this).val());
                    } else {
                        var ix = sendData.form.indexOf($(this).val())
                        ix > -1 ? sendData.form.splice(ix, 1) : false;

                    }

                });
                sendData.filterPav = filterPavArr;
                sendData.filterAsset = filterAssetArr;
                sendData.filter = filterArr;
                if (pulsado && filterPav) {

                    var p1 = $.ajax({
                        url: '/auth/WEB/admin/get_formulas_tracks/',
                        data: JSON.stringify(sendData),
                        type: 'POST',
                        contentType: 'application/json'
                    }, function (data) { // //console.log('koboinfo ' + JSON.stringify(data)); return (data);
                    });
                    Promise.all([p1]).then(function (values) {
                        //console.log(values);
                        if (values[0].length > 0) {


                            $.each(values[0], function (index, value) {
                                jsonObject = value;
                                var color_to_paint = value.properties[
                                    'marker-color'];
                                jsonObject.properties.color = color_to_paint;
                                jsonObject.properties.nameoption = "RISKNAT: " +
                                    jsonObject.properties.name;
                                featureRiskNat = map.data.addGeoJson(jsonObject);

                            });
                            $('#spinnerCondition').hide();

                            //     $('#resultUpdate' + id).append('Tracks update: ' + values[0].tracksUpdated);

                        } else {
                            $('#spinnerCondition').hide();

                        }
                    });
                } else {
                    $('#spinnerCondition').hide();

                }
            }
        });
    })

    return {
        init: initMaps,
        initMap: initMap,
        dataLayers: dataLayers
    }
}()
