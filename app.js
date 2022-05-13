'use strict'


var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
const { append } = require('express/lib/response');
var port = process.env.Port || 4201;
const bodyParser = require('body-parser');


var cliente_route = require('./routes/clienteRouter');
var admin_route = require('./routes/adminRouter');


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


app.use((req, res, next) => {
    res.header('Access-Control-allow-Origin', '*');
    res.header('Access-Control-allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-allow-Methods', 'GET, PUT ,POST ,DELETE , OPTIONS');
    res.header('Allow', 'GET, PUT ,POST ,DELETE , OPTIONS');
    next();
});





app.use('/api', cliente_route);
app.use('/api', admin_route);

module.exports = app;                   