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
        value: []
    },
    Bridges: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm of deck"
        },
        value: []
    },
    Culverts: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / lm"
        },
        value: []
    },
    "Longitudinal Drainage": {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / lm"
        },
        value: []
    },
    "Cuttings Embankments": {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        },
        value: []
    },
    "Retaining walls": {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        },
        value: []
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