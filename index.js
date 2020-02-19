'use strict'

var mongoose = require('mongoose'); // Carga del módulo
var app = require('./app');
var port = 3700; // Puerto del servidor

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise; // Conexión a la Base de Datos
mongoose.connect('mongodb://localhost:27017/portafolio', { useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() => { // Para comprobar si me he conectado a la DB
        console.log("Conexión a la DB establecida satisfactoriamente");

        // Creación del servidor
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:3700");
        });
    })
    .catch(err => console.log(err)); 