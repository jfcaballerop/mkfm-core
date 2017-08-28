var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var filetypeSchema = new Schema({
    type: { type: String, required: true, unique: true },
    extension: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

// create the model
var Filetype = mongoose.model('Filetype', filetypeSchema);
module.exports = Filetype;