const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    eventType: {
        type: String,
        required: true,
        enum: ["ערב", "בוקר", "שבת", "קידוש", "יום שלם"]
    },
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    coments: {
        type: String
    },
    speakers:{
        type:Boolean,
        default:false
    },
    payment:{
        type:String,
        enum:['מזומן','העברה בנקאית','']
    }
}, {
    timesteps: true
})

module.exports = mongoose.model('Event', eventSchema)