const mongoose = require('mongoose')

const cleanerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
    },
    

}, {
    timestamps: true
})

module.exports = mongoose.model('Cleaner', cleanerSchema)