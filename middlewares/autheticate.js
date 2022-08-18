'use strict'



var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'DanielContreras';



exports.auth = function (req, res, next) {

    // Validacion de variable authorization la cual envia el token
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'error en headers' })

    }

    //****************************************** */
    var token = req.headers.authorization.replace(/['"]+/g, '');

    var segment = token.split('.');



    // validos que el token venga divido en 3 
    //****************************************** */

    if (segment.length != 3) {
        return res.status(403).send({ message: 'token invalido a' })
    }
    else {

        try {
            var payload = jwt.decode(token, secret);

            // valdicion de expiración del token

            if (payload.exp <= moment().unix()) {
                return res.status(403).send({ message: 'Token expirado' })
            }


        } catch (error) {
            return res.status(403).send({ message: 'invalidToken' })
        }

    }
    //**********************************************
    req.user = payload;

    next();

}


