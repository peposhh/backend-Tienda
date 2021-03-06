'use strict'

var Admin = require('../models/admin');
var bcrypt = require('bcryptjs');
var jwt = require('../helpers/jwt');

const registro_admin = async function (req, res) {

    // Validar rut

    /*     var Fn = {
            // Valida el rut con su cadena completa "XXXXXXXX-X"
            validaRut: function (rutCompleto) {
                if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
    
                    return false;
                var tmp = rutCompleto.split('-');
                var digv = tmp[1];
                var rut = tmp[0];
                if (digv == 'K') digv = 'k';
                return (Fn.dv(rut) == digv);
            },
            dv: function (T) {
                var M = 0, S = 1;
                for (; T; T = Math.floor(T / 10))
                    S = (S + T % 10 * (9 - M++ % 6)) % 11;
                return S ? S - 1 : 'k';
            }
        } */

    var data = req.body;
    var cliente_rut = data.rut;
    var admin_arr = [];


    admin_arr = await Admin.find({ email: data.email });


    if (data.email) {


        if (admin_arr.length == 0) {
            // una vez que el formato del dato es correcto, se verifica si existe en bd

            if (data.password) {
                bcrypt.hash(data.password, 12, function (err, hash) {

                    if (hash) {
                        data.password = hash;
                        var reg = Admin.create(data);
                        res.status(200).send({ message: 'Usuario administrador registrado con exito' });
                    } else {
                        res.status(200).send({ message: 'ErrorServer', data: undefined });
                    }

                });

            } else {

                res.status(200).send({ message: 'Campo password Vacio', data: undefined });
            }


        } else {

            res.status(200).send({ message: 'email ya se encuentra registrados', data: undefined });

        }




    } else {
        res.status(200).send({ message: 'Campo email Vacio', data: undefined });
    }

}


const login_admin = async function (req, res) {
    var data = req.body;
    //res.status(200).send({ data: data });


    var admin_arr = [];

    //se busca el correo en la bd
    admin_arr = await Admin.find({ email: data.email });


    if (admin_arr.length == 0) {
        // se verifica si existe el correo en la bd
        res.status(200).send({ message: 'No se encontro el correo', data: undefined });

    } else {

        let user = admin_arr[0];
        // comparar las password
        bcrypt.compare(data.password, user.password, async function (error, check) {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({ message: 'la contraseña no coincide', data: undefined });
            }



        });

    }



}


module.exports = {
    registro_admin,
    login_admin
}