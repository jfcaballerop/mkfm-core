var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var infodatatrackSchema = new Schema({
    type: { type: String },
    properties: {
        name: String,
        time: Date,
        coordTimes: [],
        pk: [],
        Roadlab: [],
        video_roads: { type: Schema.Types.ObjectId, ref: 'Road' }
    },
    geometry: {
        type: { type: String },
        coordinates: []
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});
infodatatrackSchema.index({ "geometry": "2dsphere" });

// create the model
var Infodatatrack = mongoose.model('Infodatatrack', infodatatrackSchema);
module.exports = Infodatatrack;