const express = require('express');
const router = express.Router();
//Importar controlador
const proyectoController = require('../controllers/ProjectController');
//Importar middleware
const auth = require('../middleware/auth');
//Importar validaciones
const { check } = require('express-validator');



// Crea proyecto
// api/proyectos
router.post('/', 
    auth ,
    [
        check('nombre', 'El nombre del proyecto es Obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// Obtener todos los proyectos
router.get('/', 
    auth ,
    proyectoController.obtenerProyectos
);

// Actualizar proyecto via ID
// uso de comodin :id

router.put('/:id', 
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
    ],
    proyectoController.actualizarProyectos
);


// Eliminar un proyecto
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyectos
);



module.exports = router;