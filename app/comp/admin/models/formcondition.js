var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var formconditionSchema = new Schema({
    name: { type: String },
    formulaSpec: [],
});


// create the model
var Formcondition = mongoose.model('Formcondition', formconditionSchema);
module.exports = Formcondition;