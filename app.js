'use strict'

var express = require('express'); // Carga del módulo EXPRESS
var bodyParser = require('body-parser'); // Carga del módulo BODY-PARSER

var app = express();

// Carga de archivos de rutas

var project_routes = require('./routes/project');

// Middlewares: Capa (método) que se ejecuta antes de la acción principal de un controlador

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); // Para convertir cualquier tipo de dato en un objeto JSON

// CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


                          // req: los datos que puedo estar enviando desde el cliente o la petición que haga
// Configuración de rutas || res: la response que voy a estar enviando 

app.use('/api', project_routes); // Si no quiero agregar nada, simplemente dejo '/'

/*
app.get('/', function(req,res){
    res.status(200).send("<h1> Hola mundo desde NodeJS</h1>");
    // .listen(3000, () => {console.log(resp)});
}); 

app.post('/test/:id', function(req, res){ 
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    console.log(req.body.name); // Acá tengo la información del body haciendo la petición
    console.log(req.query.web); // Para obtener la información de la URL
    console.log(req.params.id);

    res.status(200).send({           
        message: "Hola mundo desde mi API de NodeJS"
    });                            
});
*/

// Export del módulo Express
module.exports = app;