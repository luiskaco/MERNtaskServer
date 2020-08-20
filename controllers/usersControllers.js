const Usuario = require('../models/Users');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
    // Revisar si ay errores
    const errores = validationResult(req);

    if( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array()})
    }

    //console.log('Desde Crear Usuarios'); // console.log(req.body);

    // Extraer email y passsword
    const { email, password } = req.body;


    try {
        //Revisar que el usaurio registrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg : 'El usuario ya existe'});
        }
        
        //Crear el nuevo usuario
             usuario = new Usuario(req.body);

            //hashear el password
            const salt = await bcryptjs.genSalt(10); 
            /*Nota: 10 bit es un buen nuemero  
                2 | salt se para generar encriptado diferente
                3 | Mayor numero de bit, mas consumo de memoria del servidor
            */
            usuario.password = await bcryptjs.hash(password, salt );
            //Reeescribe pawword

        // Guardar Usuario
        await usuario.save();

        // Crear y firmar el JWT
        const payload = {
            usuario:{
                id:usuario.id
            }
        };
        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 3600  // 1 hora
        }, (error, token) => {
            if(error) throw error;

            //Mensaje de confirmacion
            res.json({token});
            /*Nota: Cuando llave y valor se llaman igual, 
            se puede retornar uno solo de ellos
            */
            
        });

        //Mensaje de confirmacion
        //res.send('Usuario creado correctamente');
       // res.json({msg : 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

}