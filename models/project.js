'use strict'

var mongoose = require('mongoose'); // Carga del módulo de Mongoose
var Schema = mongoose.Schema;

var ProjectSchema = Schema({ // Objeto molde, por el cual voy a estar creando nuevos proyectos en la DB
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});
                            // (Nombre de entidad, Esquema)
module.exports = mongoose.model('Project', ProjectSchema); // Acá 'agarro' el esquema para utilizarlo como modelo
/* 
Mongose pasa el nombre de la entidad a minúsculas y lo pluraliza. Por lo tanto, en caso de no existir crea:
projects --> Si existe, directamente guarda los documentos en la colección
*/