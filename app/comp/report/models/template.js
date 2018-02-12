var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var templateSchema = new Schema({
    name: { type: String },
    docDefinition: {},
    config: {},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

// create the model
var Template = mongoose.model('Template', templateSchema);
module.exports = Template;