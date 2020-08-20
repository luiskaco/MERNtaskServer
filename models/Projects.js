const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,   //REferencia join
        ref: 'Usuario'
    },
    creado:{
        type:Date,
        default: Date.now()  // Par ordencar las fechas
    }

})

module.exports = mongoose.model('Proyecto',ProyectoSchema);