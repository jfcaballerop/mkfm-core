var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var formulaSchema = new Schema({
    name: { type: String },
    properties: {},
    formulaSpec: [],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

// create the model
var Formula = mongoose.model('Formula', formulaSchema);
module.exports = Formula;