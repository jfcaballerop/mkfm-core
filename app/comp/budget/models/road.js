var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var roadSchema = new Schema({
    type: { type: String },
    properties: {},
    geometry: {
        type: { type: String },
        coordinates: []
    },
    proccessed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});
roadSchema.index({ "geometry": "2dsphere" });

// create the model
var Road = mongoose.model('Road', roadSchema);
module.exports = Road;