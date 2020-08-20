const express = require('express');
const router = express.Router();
//Importar controlador
const tareaController = require('../controllers/TaskController');
//Importar middleware
const auth = require('../middleware/auth');
//Importar validaciones
const { check } = require('express-validator');


//crear una tarea
// api/tareas

router.post('/',
    auth,[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

// Obtener las tareas por proyecto

router.get('/',
    auth,
    tareaController.obtenerTareas
);

// Actualizar tarea
router.put('/:id',
    auth,
    tareaController.actualizarTareas
)


// Eliminar una tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTareas
)



module.exports = router;

