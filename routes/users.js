// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usersControllers');
const { check } = require('express-validator');

//Crea un usuario
// api/usuarios | end point
/*router.post('/', () => {
    console.log('creando usuarios');
});
*/

/*  NOta: Las validaciones(Reglas) son con express-
          validator se realizan en las rutas(route)

        nota2: Los resultados  de las reglas son leidos 
        en el controlador.
*/

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email valido').isEmail(),
        check('password','El password debe ser mínimo de 6 caracteres').isLength({ min: 6})
    ],
    usuarioController.crearUsuario
);
module.exports = router;