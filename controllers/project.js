'use strict'

var Project = require('../models/project'); // Carga del modelo para hacer instancias de él
var fs = require('fs');
var path = require('path');

var controllers = {
    home: function(req, res){
        return res.status(200).send({
            message: 'home method'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'test method'
        });
    },

    saveProject: function(req, res){
        // Al hacer un 'new' crea una ID automáticamente
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => { // Guardar el objeto en la DB
            if(err) return res.status(500).send({message: 'Error al guardar el documento'});

            if(!projectStored)  return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

            return res.status(200).send({project: projectStored});
        }); 

        // return res.status(200).send({ 
        //     project: project, 
        //     message: 'saveProject method' 
        // });
    },

    // Buscar una ID en la DB
    getProject: function(req, res){
        var project_id = req.params.id;

        if(project_id == null) return res.status(404).send({message: 'El proyecto no existe'});

        Project.findById(project_id, (err, project) => { // Método de Mongoose
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!project) return res.status(404).send({message: 'El proyecto no existe'});

            return res.status(200).send({
                project
            });
        });
    },

    getProjects: function(req, res){
        Project.find({}).sort('-year').exec((err, projects) => { // Método 'find': Me saca todos los documentos que hay dentro de una entidad. Le podemos pasar opciones como {year: 2020}
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            
            if(!projects) return res.status(404).send({message: 'No hay proyectos para mostrar'});

            return res.status(200).send({projects});
        });
    },

    updateProject: function(req, res){
        var project_id = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(project_id, update, {new: true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar'});

            if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

            return res.status(200).send({project: projectUpdated});
        });
    },

    deleteProject: function(req, res){
        var project_id = req.params.id;
        
        Project.findByIdAndDelete(project_id, (err, projectRemoved) => {
            if(err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

            if(!projectRemoved) return res.status(404).send({message: 'No se puede eliminar el proyecto'});

            return res.status(200).send({project: projectRemoved});
        });
    },

    uploadImage: function(req, res){
        var project_id = req.params.id;
        var fileName = 'Imagen no subida...';
        
        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' || fileExt == 'jfif'){
                
                Project.findByIdAndUpdate(project_id, {image: fileName}, {new: true}, (err, projectUpdated) =>{
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});
    
                    if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});
    
                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
            }else{
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'La extensión no es válida'});
                });
            }
  
        }else{
            return res.status(200).send({
                message: fileName
            }); 
        }
    },

    getImageFile: function(req,res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen"
                });
            }
        })
    }
};

module.exports = controllers;