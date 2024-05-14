require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 1111
const connectDB = require("./config/dbConn")
const verifyJWT = require("./middleware/verifyJWT")

const app = express()
connectDB()

app.use(express.json())
app.use(express.static("public"))
app.use(cors(corsOptions))
app.use('/api/auth',require('./routs/authRouter'))

//app.use(verifyJWT)
app.use('/api/persons',require('./routs/personRouter'))
app.use('/api/events',require('./routs/eventRouter'))
app.use('/api/email',require('./routs/mailRouter'))

mongoose.connection.once('open', () => {
    console.log('connected to database')
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
})