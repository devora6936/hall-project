const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const foundUser = await User.findOne({ username }).lean()
        console.log(foundUser);
        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) return res.status(401).json({ message: 'Unauthorized' })

        const userInfo = {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email
        }

        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken })
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const register = async (req, res) => {
    try {
        const { username, password, email, phone } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: 'fields are required' })
        }
        const duplicate = await User.findOne({ email: email }).lean()
        if (duplicate) {
            return res.status(409).json({ message: "Duplicate email" })
        }
        const hashedPwd = await bcrypt.hash(password, 10)
        const userObject = { email, username, phone, password: hashedPwd }
        const user = await User.create(userObject)
        if (user) {
            return res.status(201).json({
                message: `New user ${user.username} created`
            })
        } else {
            return res.status(400).json({ message: 'Invalid user received' })
        }
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { login, register }
