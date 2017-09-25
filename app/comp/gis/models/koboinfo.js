var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var koboinfoSchema = new Schema({
    type: { type: String },
    properties: {},
    geometry: {
        type: { type: String },
        coordinates: []
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});
koboinfoSchema.index({ "geometry": "2dsphere" });

// create the model
var Koboinfo = mongoose.model('Koboinfo', koboinfoSchema);
module.exports = Koboinfo;