var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var costlibrarySchema = new Schema({
    name: {
        type: String
    },
    Pavements: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        }
    },
    Bridges: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm of deck"
        }
    },
    Culverts: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / lm"
        }
    },
    LongitudinalDrainage: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / lm"
        }
    },
    CuttingsEmbankments: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        }
    },
    Retainingwalls: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        }
    },
    proccessed: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});
costlibrarySchema.index({
    "geometry": "2dsphere"
});

// create the model
var Costlibrary = mongoose.model('Costlibrary', costlibrarySchema);
module.exports = Costlibrary;