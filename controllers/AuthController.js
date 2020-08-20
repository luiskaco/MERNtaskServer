const Usuario = require('../models/Users');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) =>{
      // Revisar si ay errores
         const errores = validationResult(req);

        if( !errores.isEmpty() ){
            return res.status(400).json({errores: errores.array()})
        }
       
      //extrar el emaiy t password
      const {email, password} = req.body;
      
    try {
        //Revisar que sea un usuaruo registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'});
        }

        //Revisar password
        let passCorrecto = await bcryptjs.compare(password, usuario.password);

        if(!passCorrecto){
            return res.status(400).json({msg:'Contraseña incorrecto'});
        }

        // Se crear EL JWT  Crear y firmar el JWT
        const payload = {
            usuario:{
                id:usuario.id
            }
        };
        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 360000  // 1 hora
        }, (error, token) => {
            if(error) throw error;
            //Mensaje de confirmacion
            res.json({token});
    
        });


    } catch (error) {
        console.log(error);
    }

}


// Obtiene que usaurio esta autenticado
exports.usuarioAutenticado = async (req, res) =>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');  // (-) -password siginfica que no queremos
        res.json({usuario});
        
        } 
    catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Hubo un error'});
        }
}