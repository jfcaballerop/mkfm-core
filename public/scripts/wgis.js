window.APP || (window.APP = {})

window.APP.WGIS = function wGisModule(){
    var map, spinner;
    var center, zoom
    var infoWnd, activeInfoWindow;
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
        var content = 'Type of Asset: <span style="font-weight: bold;">' + event.feature.getProperty('kobo_type') +
            '</span><br>';
        var subcontent = "";
        if (event.feature.getProperty('kobo_type') === "Culvert") {
            subcontent += 'Asset code: <span style="font-weight: bold;">' + event.feature.getProperty('Ccode') +
                '</span><br><hr>';

            subcontent += 'Inventory Data<br>';
            subcontent += '<span style="font-weight: bold;">N. Elements : </span>' + event.feature.getProperty(
                "Cnumelem") + '<br>';
            subcontent +=
                '<span style="font-weight: bold;"> Type of section: </span>' +
                event.feature.getProperty("Csection") + '<br>';
            subcontent += '<span style="font-weight: bold;"> Material : </span>' + event.feature.getProperty(
                "Cmaterial") + '<br>';
            subcontent += '<span style="font-weight: bold;"> Diameter: </span>' + event.feature.getProperty("Cdiameter") +
                '<br>';
            subcontent += '<span style="font-weight: bold;"> Width: </span>' +
                event.feature.getProperty("Cwidth") + '<br>';

            subcontent += '<span style="font-weight: bold;"> Length: </span>' + event.feature.getProperty("Clength") +
                '<br>';
            subcontent += '<br>O&M Data<br>';
            subcontent += '<span style="font-weight: bold;"> Clearing required: </span>' + event.feature.getProperty(
                "Cclearing") + '<br>';
            subcontent += '<span style="font-weight: bold;"> Current visual condition: </span>' + event.feature.getProperty(
                "CVisualCondition") + '<br>';

            vfoto = event.feature.getProperty("_attachments");
            if (vfoto !== undefined && vfoto.length > 0) {

                var fotosmall = vfoto[0].replace(".jpg", "-small.jpg");
                subcontent += '<img src="' +
                    fotosmall +
                    '">' + '<br>';
            }



        } else if (event.feature.getProperty('kobo_type') === "Bridge") {
            subcontent += 'Asset code: <span style="font-weight: bold;">' + event.feature.getProperty('bcode') +
                '</span><br><hr>';
            subcontent += 'Inventory Data<br>';
            subcontent += '<span style="font-weight: bold;">Structural typology: </span>' + event.feature.getProperty(
                "btype") + '<br>';
            subcontent += '<span style="font-weight: bold;">No of spans: </span>' + event.feature.getProperty("bspans") +
                '<br>';
            subcontent += '<span style="font-weight: bold;">Toal length: </span>' + event.feature.getProperty("blenght") +
                '<br>';
            subcontent += '<span style="font-weight: bold;">Width: </span>' + event.feature.getProperty("bwidth") +
                '<br>';
            subcontent += '<span style="font-weight: bold;">Free height: </span>' + event.feature.getProperty(
                "bfreeheight") + '<br>';
            subcontent += '<br>- Material -<br>';
            subcontent += '<span style="font-weight: bold;">Deck: </span>' + event.feature.getProperty("bmaterialdeck") +
                '<br>';
            subcontent += '<span style="font-weight: bold;">Piers: </span>' + event.feature.getProperty(
                    "bmaterialpiers") +
                '<br>';
            subcontent += '<span style="font-weight: bold;">Abutments: </span>' + event.feature.getProperty(
                "bmaterialabutments") + '<br>';
            subcontent += '<br>O&M Data<br>';
            subcontent += '<span style="font-weight: bold;">Type of damages: </span>' + event.feature
                .getProperty("bdamagesfoundationsgeneraltype") + '<br>';
            subcontent += '<span style="font-weight: bold;">Current Visual Condition: </span>' + event.feature.getProperty(
                "bvisualcondition") + '<br>';

            vfoto = event.feature.getProperty("_attachments");
            if (vfoto !== undefined && vfoto.length > 0) {

                var fotosmall = vfoto[0].replace(".jpg", "-small.jpg");
                subcontent += '<img src="' +
                    fotosmall +
                    '">' + '<br>';
            }
        } else {
            if (event.feature.getProperty('gcode') !== "") {
                subcontent += 'Asset code: <span style="font-weight: bold;">' + event.feature.getProperty('gcode') +
                    '</span><br><hr>';
                subcontent += 'Inventory Data<br>';

                subcontent += '<span style="font-weight: bold;">Typology: </span>' + event.feature.getProperty("gtype") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Position: </span>' + event.feature.getProperty(
                        "gposition") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Height: </span>' + event.feature.getProperty("gheight") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Length: </span>' + event.feature.getProperty("glength") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Slope/Angle: </span>' + event.feature.getProperty(
                        "gslope") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Nature: </span>' + event.feature.getProperty("gnature") +
                    '<br>';


                subcontent += '<br>O&M Data<br>';
                subcontent += '<span style="font-weight: bold;">Failure processes: </span>' + event.feature.getProperty(
                    "gnature") + '<br>';
                subcontent += '<span style="font-weight: bold;">Intensity of failure processes: </span>' + event.feature
                    .getProperty(
                        "bdamagesfoundationsgeneraltype") + '<br>';
                subcontent += '<span style="font-weight: bold;">Extent of failure processes: </span>' + event.feature.getProperty(
                    "gintensityfailure") + '<br>';
                subcontent += '<span style="font-weight: bold;">Current Visual Condition: </span>' + event.feature.getProperty(
                    "gvisualcondition") + '<br>';
                vfoto = event.feature.getProperty("_attachments");
                if (vfoto !== undefined && vfoto.length > 0) {

                    var fotosmall = vfoto[0].replace(".jpg", "-small.jpg");
                    subcontent += '<img src="' +
                        fotosmall +
                        '">' + '<br>';
                }
            } else {
                subcontent += 'Asset code: <span style="font-weight: bold;">' + event.feature.getProperty('gcode2') +
                    '</span><br><hr>';
                subcontent += 'Inventory Data<br>';

                subcontent += '<span style="font-weight: bold;">Typology: </span>' + event.feature.getProperty("gtype2") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Position: </span>' + event.feature.getProperty(
                        "gposition2") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Height: </span>' + event.feature.getProperty("gheight2") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Length: </span>' + event.feature.getProperty("glength2") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Slope/Angle: </span>' + event.feature.getProperty(
                        "gslope2") +
                    '<br>';
                subcontent += '<span style="font-weight: bold;">Nature: </span>' + event.feature.getProperty("gnature2") +
                    '<br>';


                subcontent += '<br>O&M Data<br>';
                subcontent += '<span style="font-weight: bold;">Failure processes: </span>' + event.feature.getProperty(
                    "gnature2") + '<br>';
                subcontent += '<span style="font-weight: bold;">Intensity of failure processes: </span>' + event.feature
                    .getProperty(
                        "bdamagesfoundationsgeneraltype2") + '<br>';
                subcontent += '<span style="font-weight: bold;">Extent of failure processes: </span>' + event.feature.getProperty(
                    "gintensityfailure2") + '<br>';
                subcontent += '<span style="font-weight: bold;">Current Visual Condition: </span>' + event.feature.getProperty(
                    "gvisualcondition2") + '<br>';
                vfoto = event.feature.getProperty("_attachments");
                if (vfoto !== undefined && vfoto.length > 0) {

                    var fotosmall = vfoto[0].replace(".jpg", "-small.jpg");
                    subcontent += '<img src="' +
                        fotosmall +
                        '">' + '<br>';
                }
            }

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
        ////console.log(event.latLng);
        console.log('map data click!', event.latLng, event.feature.getProperty)

        // Open new InfoWindow for mouseover event
        if(event.feature.getProperty('kobo_type')){
            infoWnd.setPosition(event.latLng);
            infoWnd.setContent(getInfoWindowContent(event.feature.getProperty('kobo_type'), event));
            infoWnd.open(map)
        }

        // Store new open InfoWindow in global variable
        var infoTextContent = event.feature.getProperty('nameoption');
        if (event.feature.getProperty('nameoption') === 'Roads') {
            infoTextContent += ' ' + event.feature.getProperty('name');
        }
        document.getElementById('info-box').textContent = infoTextContent;
    }

    function initMap() {
        console.log('initMap', center, zoom)
        map = new google.maps.Map(document.getElementById('map'), {
            center: center,
            zoom: zoom
        });

        var jsonObject;
        infoWnd = new google.maps.InfoWindow();


        window.map = map
        // on mouseout (moved mouse off marker) make infoWindow disappear
        // map.data.addListener('click', function(event) {
        //     infoWnd.close();
        // });

        // Set mouseover event for each feature.
        map.data.addListener('click', onDataLayerClick);
        map.data.setStyle(function (feature) {
            var color = feature.getProperty('color');
            var nameopt = feature.getProperty('nameoption');
            $('#layergps option[value="' + nameopt + '"]').prop('style', 'color: ' + color);

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

    function createLayer(assetType, roadType){
        var layer = new google.maps.Data()
        layer.addListener('click', onDataLayerClick)
        dataLayers[assetType][roadType] = layer
        layer.setMap(map)
        spinner.show()
        layer.setStyle(function(feature){
            return {
                label: assetType.slice(0,1),
                fillColor: '#ff0'
            }
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
        const selectedAssets = getSelectedAssets()
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
