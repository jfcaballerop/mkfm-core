var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var roadlabSchema = new Schema({
    type: { type: String },
    properties: {},
    geometry: {
        type: { type: String },
        coordinates: []
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});
roadlabSchema.index({ "geometry": "2dsphere" });

// create the model
var Roadlab = mongoose.model('Roadlab', roadlabSchema);
module.exports = Roadlab;