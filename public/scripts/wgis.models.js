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

    var SelectedRoads = Backbone.Model.extend({
        defaults: {
            main: false,
            secondary: false,
            feeder: false,
            urban: false
        }
    })

    var SelectedAssets = Backbone.Model.extend({
        defaults: {
            Pavement: false,
            Bridge: false,
            Culvert: false,
            Geo: false
        }
    })

    var RiskFilters = Backbone.Model.extend({
        defaults: {
            criticality: [],
            condition: [],
            physical: [],
            natural: []
        },
        addRiskFilterOption: function(riskType, option){
            this.set(riskType, this.get(riskType).concat(option))
        },
        removeRiskFilterOption: function(riskType, option){
            this.set(riskType, _.without(this.get(riskType), option))
        },
        clearRiskFilter: function(riskType){
            this.set(riskType, [])
        },
        getActiveFilter: function(){
            return _.find(_.keys(this.attributes), function(riskType){
                return this.get(riskType).length > 0
            }, this)
        }
    })

    var AssetCollection = Backbone.Collection.extend({
        initialize: function(models, options){
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
            return [this._baseUrl, this._assetType, this._roadType].join('/')
        }
    })

    var RoadRiskCollection = Backbone.Collection.extend({
        initialize: function(models, options){
            validateRoadType(options.roadType)
            validateRiskType(options.riskType)
            this._roadType = options.roadType
            this._riskType = options.riskType
            this._baseUrl = options.baseUrl || '/auth/WEB/maps/roads_by_risk'
        },
        url: function(){
            var riskField = riskFilterTypeToField(this._riskType)
            var roadCategory = roadTypeToCategory(this._roadType)
            return [this._baseUrl, roadCategory, riskField].join('/')
        }
    })

    return {
        SelectedRoads: SelectedRoads,
        SelectedAssets: SelectedAssets,
        RiskFilters: RiskFilters,
        AssetCollection: AssetCollection,
        RoadRiskCollection: RoadRiskCollection
    }
}()




