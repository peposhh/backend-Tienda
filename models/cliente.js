'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var ClienteSchema = Schema({
    rut: { type: String, required: false },
    apellidos: { type: String, required: true },
    pais: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    perfil: { type: String, default: 'perfil.png', required: true },
    telefono: { type: String, required: true },
    genero: { type: String, required: false },
    f_nacimiento: { type: String, required: false },

});


module.exports = mongoose.model('cliente', ClienteSchema);