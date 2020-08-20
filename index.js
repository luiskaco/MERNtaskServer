const express = require('express');
const conectarDB = require('./config/db');
// importar cors
//const cors = require('cors');


//Crear el servidor
const app = express();

//Conectar a la base de datos
conectarDB();

// Habilitar cors
//app.use(cors());

// Habilitar express.json | Nota: Tambne se usa aca bodyparser
app.use(express.json({ extended: true }))
//Nota: cuando se usa express json en cabecera debe enviarse application/json


// Puero del App | heroku asigna el puerto, en caso de no conseguir asigna el 4000
const port = process.env.port || 4000;

// Definir la pagina principal
/*app.get('/', (req, res)=>{
    res.send(`Hola Mundo`);
})
*/
// importando rutas

app.use('/api/proyectos', require('./routes/project'));

app.use('/api/usuarios', require('./routes/users'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/tareas', require('./routes/tasks'));


//arrancar el servidor
app.listen(port,'0.0.0.0', () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})

//Lo asigna heroku '0.0.0.0.