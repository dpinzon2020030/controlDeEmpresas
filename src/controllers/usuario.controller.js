const Usuario = require('../models/usuario.model')
const { restart } = require('nodemon')

function registrarEmpleados(req, res) {
    var parametros = req.body
    var usuarioModel = new Usuario()
    var idEmpresa = req.params.idUsuario

    if (idEmpresa !== req.user.sub) return res.status(500)
        .send({ mensaje: 'No puede crear empleados para otras empresas' })

    if (parametros.nombre && parametros.puesto && parametros.departamento) {

        usuarioModel.nombre = parametros.nombre;
        usuarioModel.puesto = parametros.puesto;
        usuarioModel.departamento = parametros.departamento;
        usuarioModel.rol = 'EMPLEADO';
        usuarioModel.usuarioCreador = req.user.sub

        usuarioModel.save((err, usuarioGuardado) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' })
            if (!usuarioGuardado) return res.status(500)
                .send({ mensaje: 'Error al agregar el usuario' })

            return res.status(200).send({ usuario: usuarioGuardado })
        })
    }
}

function editarEmpleado(req, res) {
    var idEmpresa = req.params.usuarioCreador
    var parametros = req.body


    if (idEmpresa !== req.user.sub) return res.status(500)
        .send({ mensaje: 'No puede editar empleados de otras empresas' })

    Usuario.findByIdAndUpdate(req.user.sub, parametros, { new: true },
        (err, usuarioActualizado) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' })

            if (!usuarioActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el empleado' })

            return res.status(200)
                .send({ usuario: usuarioActualizado })
        })
}

function logIn(req, res) {
    var parametros = req.body

    Usuario.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500)
            .send({ mensaje: 'Error en la peticion' })

        if (usuarioEncontrado) {

            if (parametros.obtenerToken == true) {
                return res.status(200)
                    .send({ token: jwt.crearToken(usuarioEncontrado) })
            } else {
                usuarioEncontrado.password = undefined
                return res.status(200)
                    .send({ usuario: usuarioEncontrado })
            }
        } else {
            return res.status(500)
                .send({ mensaje: 'El correo ingresado no esta registrado' })
        }
    })
}

function eliminarUsuario(req, res) {
    var id = req.params.idEmpresa;
    //var idEmpresa = req.params.usuarioCreador

   // if (idEmpresa !== req.user.sub) return res.status(500)
    //    .send({ mensaje: 'No puede eliminar a un empleado de otra empresa' })

    Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioEliminado) return res.status(404).send({ mensaje: 'Error al eliminar el usuario' });

        return res.status(200).send({ usuario: usuarioEliminado });
    })
}

module.exports = {
    registrarEmpleados,
    editarEmpleado,
    logIn,
    eliminarUsuario
}