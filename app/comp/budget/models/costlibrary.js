var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var costlibrarySchema = new Schema({
    type: {
        type: String
    },
    properties: {},
    geometry: {
        type: {
            type: String
        },
        coordinates: []
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