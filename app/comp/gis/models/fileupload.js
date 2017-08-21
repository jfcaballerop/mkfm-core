var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var fileuploadSchema = new Schema({
    fname: { type: String, required: true, unique: true },
    fpath: { type: String, required: true },
    foriginalname: { type: String },
    fsize: { type: Number },
    fowner: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

// create the model
var Fileupload = mongoose.model('Fileupload', fileuploadSchema);
module.exports = Fileupload;