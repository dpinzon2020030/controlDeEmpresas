const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = Schema ({
    nombre : String,
    email : String,
    password : String,
    rol : String,
    puesto: String,
    departamento: String,
    usuarioCreador : String
})

module.exports = mongoose.model('Usuarios', usuarioSchema)