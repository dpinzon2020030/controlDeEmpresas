const express = require('express');
const administradorControlador = require('../controllers/administrador.controller');

const api = express.Router();

//api.post('/generarAdministrador', administradorControlador.generarAdministrador);
api.post('/registrarEmpresa', administradorControlador.registrarEmpresa);
api.put('/editarEmpresa', administradorControlador.editarEmpresa);

module.exports = api;