var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
## upload::
{ title: '' }
{ fieldname: 'file',
  originalname: 'backup.json',
  encoding: '7bit',
  mimetype: 'application/json',
  destination: '/home/jfcp/Documentos/Workspace/domininesv3/public/uploads/',
  filename: 'c85aa5ff220172903f0e7c9f9ec6f11a',
  path: '/home/jfcp/Documentos/Workspace/domininesv3/public/uploads/c85aa5ff220172903f0e7c9f9ec6f11a',
  size: 3415 }
*/

// define the schema for our user model
var fileuploadSchema = new Schema({
    filename: { type: String, required: true, unique: true },
    path: { type: String, required: true },
    size: { type: Number },
    destination: { type: String },
    mimetype: { type: String },
    owner: { type: String },
    type: { type: String },
    originalname: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

// create the model
var Fileupload = mongoose.model('Fileupload', fileuploadSchema);
module.exports = Fileupload;