const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'}); // LINEA MPORTANTE

module.exports =  (req, res, next)  => {
    // Leer el token del header
    const token = req.header('x-auth-token');

      /* Nota: el token debe estar presente en el header*/

    //console.log(token)
    // Revisar existencia del token
    if(!token){
        return res.status(401).json({msg: 'No hay token, permiso no valido'})
    }

    // Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.usuario = cifrado.usuario; // objecto usaurio | payload
        /* NOta: Se anda guardando el usuario autenticado */
        
        next() // Vaya al siguiente middleware
    } catch (error) {
        res.status(401).json({msg: 'Token no válido'});
    }
}

