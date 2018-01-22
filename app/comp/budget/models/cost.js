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
        value1: [],
        value2: [],
        value3: [],
        value4: []
    },
    Bridges: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm of deck"
        },
        value1: [],
        value2: [],
        value3: [],
        value4: []
    },
    Culverts: {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / lm"
        },
        value1: [],
        value2: [],
        value3: [],
        value4: []
    },
    "Longitudinal Drainage": {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / lm"
        },
        value1: [],
        value2: [],
        value3: [],
        value4: []
    },
    "Cuttings Embankments": {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        },
        value1: [],
        value2: [],
        value3: [],
        value4: []
    },
    "Retaining walls": {
        code: [],
        material: [],
        unit_price: {
            type: String,
            default: "EC$ / sqm"
        },
        value1: [],
        value2: [],
        value3: [],
        value4: []
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