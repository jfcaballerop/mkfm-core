var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var schedulenatSchema = new Schema({
    type: {
        type: String
    },
    config: {},
    properties: {},
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// create the model
var Schedulenat = mongoose.model('Schedulenat', schedulenatSchema);
module.exports = Schedulenat;