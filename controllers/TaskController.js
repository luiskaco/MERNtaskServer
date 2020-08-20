const Tarea = require('../models/Tasks');
const Proyecto = require('../models/Projects');



//Importar resultado de express-validator
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) =>{
    // Revisar si ay errores
    const errores = validationResult(req);

    if( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array()})
    }

   

    try {

        // Extrar el proyecto y comprobar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        //console.log(proyecto);
        //return ;

        if(!existeProyecto){
            return res.status(400).json({msg: 'Proyecto no encontrado'});
        }
        // Revisar si el proyecto actual, pertenece al usaurio autenticado
          //Verificar el creador del proyecto 
        if (existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg:'No autorizado'});
        }
        // Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    
}

// OBtener las taras por proyectos

exports.obtenerTareas = async (req, res) =>{
     try {
                // Extrar el proyecto y comprobar si existe
            const { proyecto } = req.query;

            /*
                Nota importante: cuando desde la vista se envia un valor como params, 
                en el back debe recibirse como req.query u no com req.body
             */


            const existeProyecto = await Proyecto.findById(proyecto);
            //console.log(proyecto);
            //return ;

            if(!existeProyecto){
                return res.status(400).json({msg: 'Proyecto no encontrado'});
            }
            // Revisar si el proyecto actual, pertenece al usaurio autenticado
            //Verificar el creador del proyecto 
            if (existeProyecto.creador.toString() !== req.usuario.id ){
                return res.status(401).json({msg:'No autorizado'});
            }

            // Obtener las tareas por proyectos
            const tareas = await Tarea.find({proyecto}).sort({creado:-1});
                            //sort -1 va cambiar el orden 
            res.json({tareas})

     } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
     }
}

//  Actualizar una tarea
exports.actualizarTareas = async (req, res) =>{
    try {
             // Extrar el proyecto y comprobar si existe
             const { proyecto, nombre, estado } = req.body;

            // Si la tarea existe o no
            let tarea = await Tarea.findById(req.params.id);
            if(!tarea){
                 return res.status(404).json({msg:'No existe la tarea'});
            }

             //Extraer proyecto
             const existeProyecto = await Proyecto.findById(proyecto);
        
             // Revisar si el proyecto actual, pertenece al usaurio autenticado
             //Verificar el creador del proyecto 
             if (existeProyecto.creador.toString() !== req.usuario.id ){
                 return res.status(401).json({msg:'No autorizado'});
             }

 
             // Crear un objeto con la nueva informacion
            const nuevaTarea = {};
           /* if(nombre) nuevaTarea.nombre=nombre;               
            if(estado) nuevaTarea.estado=estado;*/   
            nuevaTarea.nombre=nombre;               
             nuevaTarea.estado=estado;    
      
            // Guardar Tareas
            tarea = await Tarea.findByIdAndUpdate({_id:req.params.id}, nuevaTarea,{new:true});

             res.json({tarea});

    } catch (error) {
        console.log(error);
            res.status(500).send('Hubo un error');
        
    }
}


// elimianr una tarea
exports.eliminarTareas = async (req, res) =>{
    try {
        // Extrar el proyecto y comprobar si existe
        const { proyecto} = req.query;

       // Si la tarea existe o no
       let tarea = await Tarea.findById(req.params.id);
       if(!tarea){
            return res.status(404).json({msg:'No existe la tarea'});
       }

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
   
        // Revisar si el proyecto actual, pertenece al usaurio autenticado
        //Verificar el creador del proyecto 
        if (existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg:'No autorizado'});
        }

        // Eliminar

        await Tarea.findByIdAndRemove({_id:req.params.id})
        res.json({msg:'Tarea Eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    
    }

}