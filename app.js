'use strict'


var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
const { append } = require('express/lib/response');
var port = process.env.Port || 4201;

var cliente_route = require('./routes/clienteRouter');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://127.0.0.1:27017/tienda', (err, res) => {

    if (err) {
        console.log(err)
    } else {

        app.listen(port, function () {
            console.log('Servidor corriendo en el puerto' + port);
        });
    }

});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use('/api', cliente_route);

module.exports = app;                   