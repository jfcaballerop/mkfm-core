// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = new Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    nombre: { type: String },
    apellido1: { type: String },
    apellido2: { type: String },
    fecha_nac: Date,
    documento: {
        tipo: String,
        doc: String
    },
    admin: Boolean,
    activo: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
var User = mongoose.model('User', userSchema);
module.exports = User;