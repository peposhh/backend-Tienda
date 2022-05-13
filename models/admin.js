'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var AdminSchema = Schema({
    rut: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    telefono: { type: String, required: true },
    rol: { type: String, required: true },

});


module.exports = mongoose.model('admin', AdminSchema);