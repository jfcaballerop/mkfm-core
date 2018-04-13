window.APP || (window.APP = {})
window.APP.Models = function WGISModels(){
    var ROAD_TYPES = ['main', 'secondary', 'feeder', 'urban']
    var ASSET_TYPES = ['Pavement', 'Bridge', 'Culvert', 'Geo']
    var RISK_FILTERS = ['criticality', 'condition', 'physical', 'natural']

    function validateRoadType(x){
        if(ROAD_TYPES.indexOf(x) === -1){
            throw new Error('Invalid road type: ' + x + '. Valid types are ' + ROAD_TYPES.join(', '))
        }
    }
    function validateAssetType(x){
        if(ASSET_TYPES.indexOf(x) === -1){
            throw new Error('Invalid asset type: ' + x + '. Valid type are ' + ASSET_TYPES.join(', '))
        }
    }

    function validateRiskType(x){
        if(RISK_FILTERS.indexOf(x) === -1){
            throw new Error('Invalid risk type: ' + x + '. Valid type are ' + RISK_FILTERS.join(', '))
        }
    }

    function riskFilterTypeToField(type){
        switch(type){
        case 'criticality':
            return 'rcriticality'
        case 'condition':
            return 'rcondition'
        case 'physical':
            return 'rriskphysicalnorm'
        case 'natural':
            return 'rrisknaturalnorm'
        default:
            throw new Error('Unknown risk filter type', type)
        }
    }

    function roadTypeToCategory(type){
        switch(type){
        case 'main':
            return 'Main Road'
        default:
            return type[0].toUpperCase() + type.slice(1)
        }
    }

    // Common model for asset & road types checkbox group
    var SelectableGroupsModel = Backbone.Model.extend({
        getSelected: function(){
            return _.filter(_.keys(this.attributes), function(item){
                return !!this.get(item)
            }, this)
        },
        getNonSelected: function(){
            return _.filter(_.keys(this.attributes), function(item){
                return !this.get(item)
            }, this)
        }
    })

    var SelectedRoads = SelectableGroupsModel.extend({
        defaults: function(){
            return {
                main: false,
                secondary: false,
                feeder: false,
                urban: false
            }
        }
    })

    var SelectedAssets = SelectableGroupsModel.extend({
        defaults: function() {
            return {
                Pavement: false,
                Bridge: false,
                Culvert: false,
                Geo: false
            }
        }
    })

    // Risk filters model, keeps individual items in groups
    // and also a "current" group attribute - which is the current selected risk group
    var RiskFilters = Backbone.Model.extend({
        defaults: function(){
            return {
                criticality: [],
                condition: [],
                physical: [],
                natural: [],
                // current active risk type
                current: null
            }
        },
        addRiskFilterOption: function(riskType, option){
            this.set({
                [riskType]: this.get(riskType).concat(option),
                current: riskType
            })
        },
        removeRiskFilterOption: function(riskType, option){
            var remainingOptions = _.without(this.get(riskType), option)
            this.set({
                [riskType]: remainingOptions,
                current: remainingOptions.length ? this.get('current') : null
            })
        },
        clearRiskFilter: function(riskType){
            this.set({
                [riskType]: [],
                current: null
            })
        },
        getActiveFilter: function(){
            return this.get('current')
        }
    })

    var FetchOnceCollection = Backbone.Collection.extend({
        initialize: function(){
            this._fetched = false
            this._fetchingPromise = false
            this.listenTo(this, 'sync', this.fetchComplete)
        },
        fetchComplete: function(col){
            this._fetched = true
            this._fetchingPromise = null
        },
        fetchIfNeeded: function(){
            if(this._fetchingPromise){
                return this._fetchingPromise
            }
            if(this._fetched){
                return Promise.resolve(this.toJSON())
            }
            else {
                this._fetchingPromise = this.fetch()
                return this._fetchingPromise
            }
        }
    })

    var FetchOnceModel = Backbone.Model.extend({
        initialize: function(){
            this._fetched = false
            this._fetchingPromise = false
            this.listenTo(this, 'sync', this.fetchComplete)
        },
        fetchComplete: function(col){
            this._fetched = true
            this._fetchingPromise = null
        },
        fetchIfNeeded: function(){
            if(this._fetchingPromise){
                return this._fetchingPromise
            }
            if(this._fetched){
                return Promise.resolve(this.toJSON())
            }
            else {
                this._fetchingPromise = this.fetch()
                return this._fetchingPromise
            }
        }
    })

    var AssetCollection = FetchOnceCollection.extend({
        initialize: function(models, options){
            FetchOnceCollection.prototype.initialize.apply(this, [])
            if(!options.assetType){
                throw new Error('AssetCollection expects options.assetType')
            }
            if(!options.roadType){
                throw new Error('AssetCollection expects options.roadType')
            }
            validateRoadType(options.roadType)
            validateAssetType(options.assetType)
            this._assetType = options.assetType
            this._roadType = options.roadType
            this._baseUrl = options.baseUrl || '/auth/WEB/maps/assets'
        },
        url: function(){
            return [this._baseUrl, this._assetType, this._roadType].join('/') + '?' + Date.now().toString(16)
        }
    })

    var RoadRiskTypeModel = FetchOnceModel.extend({
        initialize: function(models, options){
            FetchOnceModel.prototype.initialize.apply(this, [])
            validateRoadType(options.roadType)
            validateRiskType(options.riskType)
            this._roadType = options.roadType
            this._riskType = options.riskType
            this._baseUrl = options.baseUrl || '/auth/WEB/maps/roads_by_risk'
        },
        url: function(){
            var riskField = riskFilterTypeToField(this._riskType)
            var roadCategory = roadTypeToCategory(this._roadType)
            return [this._baseUrl, roadCategory, riskField].join('/') + '?' + Date.now().toString(16)
        }
    })

    var RoadRisk = Backbone.Model.extend({
        initialize: function(attrs, options){
            validateRoadType(options.roadType)
            this._roadType = options.roadType
            this._baseUrl = options.baseUrl || '/auth/WEB/maps/roads_by_risk'
            this.criticality = new RoadRiskTypeModel(null, {
                roadType: this._roadType,
                riskType: 'criticality',
                baseUrl: this._baseUrl
            })
            this.condition = new RoadRiskTypeModel(null, {
                roadType: this._roadType,
                riskType: 'condition',
                baseUrl: this._baseUrl
            })
            this.physical = new RoadRiskTypeModel(null, {
                roadType: this._roadType,
                riskType: 'physical',
                baseUrl: this._baseUrl
            })
            this.natural = new RoadRiskTypeModel(null, {
                roadType: this._roadType,
                riskType: 'natural',
                baseUrl: this._baseUrl
            })
        }
    })

    // helper function to create one Google Maps Data layer
    // for each road type.
    // returns { main: dataLayer, secondary: dataLayer, ... }
    function createAssetDataLayers(map, options){
        return ROAD_TYPES.reduce(function(acc, roadType){
            var layer = new google.maps.Data()
            layer.addListener('click', options.onClick)
            layer.addListener('mouseover', options.onMouseOver)
            layer.addListener('mouseout', options.onMouseOut)
            layer.setStyle(options.createSetStyle(options.assetType, roadType))
            layer.setMap(map)
            acc[roadType] = layer
            return acc
        }, {})
    }

    function createRiskRoadDataLayers(map, options){
        return ROAD_TYPES.reduce(function(acc, roadType){
            var layer = new google.maps.Data()
            layer.setStyle(options.createSetStyle(roadType))
            layer.setMap(map)
            acc[roadType] = layer
            return acc
        }, {})
    }

    function createAssetCollections(dataLayers){
        return ASSET_TYPES.reduce(function(assets, assetType){
            assets[assetType] = ROAD_TYPES.reduce(function(roads, roadType){
                var col = new AssetCollection(null, {
                    roadType: roadType,
                    assetType: assetType
                })
                col.on('sync', function(collection){
                    // load GeoJSON data into data layer
                    dataLayers[assetType][roadType].addGeoJson({
                        type: 'FeatureCollection',
                        features: collection.toJSON()
                    })
                })
                roads[roadType] = col
                return roads
            }, {})
            return assets
        }, {})
    }

    function createRiskRoadModels(riskLayers){
        return ROAD_TYPES.reduce(function(acc, roadType){
            var model = new RoadRisk(null, { roadType: roadType })
           /*  _.each(RISK_FILTERS, function(riskType){
                model[riskType].on('sync', function(col){
                    var layer = riskLayers[roadType]
                    // remove existing
                    layer.forEach(function(feature){
                        layer.remove(feature)
                    })
                    // server returns already a geoJSon feature collection, so only
                    // the first collection element contains everything
                    layer.addGeoJson(col.toJSON())
                })
            }) */
            acc[roadType] = model
            return acc
        }, {})
    }

    return {
        SelectedRoads: SelectedRoads,
        SelectedAssets: SelectedAssets,
        RiskFilters: RiskFilters,
        AssetCollection: AssetCollection,
        RoadRiskCollection: RoadRiskTypeModel,
        RoadRisk: RoadRisk,
        createAssetDataLayers: createAssetDataLayers,
        createRiskRoadDataLayers: createRiskRoadDataLayers,
        createAssetCollections: createAssetCollections,
        createRiskRoadModels: createRiskRoadModels,
        helpers: {
            riskFilterTypeToField: riskFilterTypeToField
        }
    }
}()




