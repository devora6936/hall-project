const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
    personname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    phone2:{
        type:String
    },
    personType: {
        type: String,
        default: "אורח",
        enum: ["אורח", "שותף", "חבר"]
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Person', personSchema)