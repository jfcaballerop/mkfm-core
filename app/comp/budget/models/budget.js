var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var budgetSchema = new Schema({
    name: {
        type: String
    },
    ammount: {
        type: Number
    },
    Routine: {
        type: Number
    },
    Periodic: {
        type: Number
    },
    Emergency: {
        type: Number
    },
    Brushcutting: {
        type: Number
    },
    Drainclearing: {
        type: Number
    },
    Patching: {
        type: Number
    },
    RoadSafetyImprovement: {
        type: Number
    },
    WorkInterventions: {
        type: Number
    },
    Inspections: {
        type: Number
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
var Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;