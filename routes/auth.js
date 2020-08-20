// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/AuthController');

//Importar middleware
const auth = require('../middleware/auth');

//crear usauriio e iniciar session
// api/auth

router.post('/', 
  
    authController.autenticarUsuario
);

// Obtiene el usuario autenticado 

router.get('/',
    auth,
    authController.usuarioAutenticado
);


module.exports = router;