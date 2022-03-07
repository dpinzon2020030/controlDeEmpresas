const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarEmpleado', usuarioControlador.registrarEmpleados);
api.put('/editarEmpleado', usuarioControlador.editarEmpleado);
api.post('/logIn', usuarioControlador.logIn);
api.delete('/eliminar', usuarioControlador.eliminarUsuario)

module.exports = api;