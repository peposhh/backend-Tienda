'use strict'

var Cliente = require('../models/cliente');
var bcrypt = require('bcryptjs');

const registro_cliente = async function (req, res) {

    // Validar rut

    var Fn = {
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
    }

    var data = req.body;
    var cliente_rut = data.rut;
    var clientes_arr_rut = [];



    if (data.rut) {
        var resultado = Fn.validaRut(data.rut);
        clientes_arr_rut = await Cliente.find({ rut: data.rut });
        // Validamos el resultado de la funcion Valida rut
        if (resultado) {

            if (clientes_arr_rut.length == 0) {
                // una vez que el formato del dato es correcto, se verifica si existe en bd

                if (data.password) {
                    bcrypt.hash(data.password, 12, function (err, hash) {
                        console.log(hash);
                        if (hash) {
                            data.password = hash;
                            var reg = Cliente.create(data);
                            res.status(200).send({ message: 'Usuario registrado con exito' });
                        } else {
                            res.status(200).send({ message: 'ErrorServer', data: undefined });
                        }

                    });

                } else {

                    res.status(200).send({ message: 'Campo password Vacio', data: undefined });
                }


            } else {

                res.status(200).send({ message: 'rut  ya se encuentra registrados', data: undefined });

            }


        } else {

            res.status(200).send({ message: 'el formato del rut es invalido - ejemplo XXXXXXXX-X' });

        }

    } else {
        res.status(200).send({ message: 'Campo rut Vacio', data: undefined });
    }

}

const login_cliente = async function (req, res) {
    var data = req.body;
    //res.status(200).send({ data: data });


    var cliente_arr = [];


    cliente_arr = await Cliente.find({ email: data.email });

    if (cliente_arr.length == 0) {
        // se verifica si existe el correo en la bd
        res.status(200).send({ message: 'No se encontro el correo', data: undefined });

    } else {

        let user = cliente_arr[0];
        res.status(200).send({ message: 'Usuario encontrado', data: user });

        /// INICIO DE SESIÓN Y GENERAR TOKEN EN BACKEND



    }







}



module.exports = {
    registro_cliente,
    login_cliente
}