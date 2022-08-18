'use strict'

var express = require('express');
var clienteController = require('../controllers/ClienteController');

var api = express.Router();

var auth = require('../middlewares/autheticate');

api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente', clienteController.login_cliente);
api.get('/listar_cliente_filtro_admin/:tipo/:filtro?', auth.auth, clienteController.listar_cliente_filtro_admin);
api.post('/registro_cliente_unitario', clienteController.registro_cliente_unitario);


module.exports = api