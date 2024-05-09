const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
    },
    

}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)