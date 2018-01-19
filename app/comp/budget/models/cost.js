var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var costSchema = new Schema({
    name: {
        type: String
    },
    Pavements: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        },
        value: { type: Number }
    },
    Bridges: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm of deck"
        },
        value: { type: Number }
    },
    Culverts: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / lm"
        },
        value: { type: Number }
    },
    LongitudinalDrainage: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / lm"
        },
        value: { type: Number }
    },
    CuttingsEmbankments: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        },
        value: { type: Number }
    },
    Retainingwalls: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        },
        value: { type: Number }
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

// create the model
var Cost = mongoose.model('Cost', costSchema);
module.exports = Cost;