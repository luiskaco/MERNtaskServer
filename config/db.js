const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            //Solucion
            useCreateIndex:true
        });
        console.log('Database Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); // Detener la app
    }
}

module.exports = conectarDB;

