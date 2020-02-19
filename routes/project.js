'use strict'

var express = require('express'); // Carga del módulo de Express
var ProjectController = require('../controllers/project');

var router = express.Router(); // Servicio de la ruta

// Middleware
var multiparty = require('connect-multiparty');
var multipartMiddleware = multiparty({uploadDir: './uploads'});

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject); // Con '?' el parámetro se vuelve opcional y hay que verificarlo en el controlador
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);

router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;