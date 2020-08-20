const Proyecto = require('../models/Projects');
//Importar resultado de express-validator
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) =>{
    // Revisar si ay errores
    const errores = validationResult(req);

    if( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array()})
    }

    try {
        //Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        
          // Guardar el creador via JWT
          proyecto.creador = req.usuario.id;

        //Guardar Proyecto
        proyecto.save();
        res.json(proyecto);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

    /*
    Nota: Siempre se recomienda un try cath 
    cuando se usada un async y await
    */
}

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) =>{
    try {
        console.log(req.usuario);

        const proyectos = await Proyecto.find({ creador: req.usuario.id}).sort({creado:-1});
        res.json({proyectos});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


// Actualiza un proyecto

exports.actualizarProyectos = async (req, res) =>{
   
    // Revisar si ay errores
    const errores = validationResult(req);

    if( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array()})
    }


    //Extraer informacion del proyecto
     
    console.log(req.body);

      const { nombre } = req.body; 
      const nuevoProyecto = {}; 

       //Valido si existe valor 
       if (nombre){
            nuevoProyecto.nombre = nombre; 
        }


    try {
        
          //Revisar el Id 
          let proyecto = await Proyecto.findById(req.params.id);
          
  
          //Si el proyecto existe o no 
          if (!proyecto){
              return res.status(404).json({msg:'Proyecto no encontrado'})
          }
  
          //Verificar el creador del proyecto 
          if (proyecto.creador.toString() !== req.usuario.id ){
              return res.status(401).json({msg:'No autorizado'});
          }
  
          //Actualizar 
          proyecto = await Proyecto.findByIdAndUpdate({ _id:req.params.id }, { $set:nuevoProyecto}, {new:true});
          
          res.json({proyecto});
        

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');

    }

}

// ELimina un proyecto 

exports.eliminarProyectos = async (req, res) =>{
    try {
         //Revisar el Id 
         let proyecto = await Proyecto.findById(req.params.id);
          
  
         //Si el proyecto existe o no 
         if (!proyecto){
             return res.status(404).json({msg:'Proyecto no encontrado'})
         }
 
         //Verificar el creador del proyecto 
         if (proyecto.creador.toString() !== req.usuario.id ){
             return res.status(401).json({msg:'No autorizado'});
         }

         //ELiminar el proyecto
         await Proyecto.findOneAndRemove({_id: req.params.id});
         res.json({msg:'Proyecto eliminado'})



    } catch (error) {
         console.log(error);
         res.status(500).send('Error en el servidor');
    }

}
