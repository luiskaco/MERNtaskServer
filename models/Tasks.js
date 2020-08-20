const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    estado:{
        type:Boolean,
        default: false
    },
    creado:{
        type:Date,
        default: Date.now()  // Par ordencar las fechas
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,   //REferencia join
        ref: 'Proyecto' // Nombre del modelo
    },
    
})

module.exports = mongoose.model('Tarea',TareaSchema);