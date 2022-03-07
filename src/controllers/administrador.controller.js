const Empresa = require('../models/usuario.model')
const jwt = require('../services/jwt')
const { restart } = require('nodemon')
const Administrador = require('../controllers/usuario.controller')

function registrarEmpresa(req, res) {
    var parametros = req.body
    var empresaModel = new Empresa()

    if (parametros.nombre && parametros.password && parametros.email) {
        empresaModel.nombre = parametros.nombre
        empresaModel.email = parametros.email
        empresaModel.password = parametros.password
        empresaModel.rol = 'EMPRESA'
        empresaModel.usuarioCreador = '6225837004e54e7f69b8f742'

        Empresa.find({ email: parametros.email }, (err, empresaEncontrada) => {
            if (empresaEncontrada.length == 0) {

                empresaModel.save((err, empresaGuardada) => {
                    if (err) return res.status(500)
                        .send({ mensaje: 'Error en la peticion' })
                    if (!empresaGuardada) return res.status(500)
                        .send({ mensaje: 'Error al agregar la empresa' })


                    return res.status(200)
                        .send({ Empresa: empresaGuardada })
                })
            } else {
                return res.status(500)
                    .send({ mensaje: 'Este correo ya se encuentra en uso con otra empresa' })
            }
        })
    }
}

function editarEmpresa(req, res) {
    var idUser = req.params.idEmpresa
    var parametros = req.body

    Empresa.findByIdAndUpdate(idUser, parametros, {new: true},
        (err, empresaActualizada)=>{
            if(err) return res.status(500).
            send({mensaje: 'Error en la peticion'})
            if(!empresaActualizada)return res.status(500).
            send({mensaje: 'Error al editar la empresa'})
            return res.status(200).send({empresa: empresaActualizada})
        })
}

function eliminarEmpresa(req, res) {
    var id = req.params.sub;

    Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!usuarioEliminado) return res.status(404).send( { mensaje: 'Error al eliminar la empresa'});

        return res.status(200).send({ usuario: usuarioEliminado});
    })
}

module.exports = {
    registrarEmpresa,
    editarEmpresa,
    eliminarEmpresa
}