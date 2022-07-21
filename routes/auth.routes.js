const express = require("express")
const bcrypt = require('bcryptjs')
const User = require('./../models/User.model')
const jwt = require('jsonwebtoken')

const { isAuthenticated } = require("../middlewares/jwt.middleware")


const router = express.Router()
const saltRounds = 10

router.post('/signup', (req, res, next) => {

    const { email, password, username } = req.body

    if (password.length < 6) {
        res.status(400).json({ message: 'Password must have at least 6 characters' })
        return
    }

    User
        .findOne({ email })
        .select("_id")
        .then((foundUser) => {

            if (foundUser) {
                throw { message: "User already exists.", errorCode: 400 }
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username })
        })
        .then((createdUser) => {

            const { email, username, _id } = createdUser
            const user = { email, username, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            const errorCode = err.errorCode ? err.errorCode : 500
            const message = err.message ? err.message : "Internal server error"
            res.status(errorCode).json({ message })
        })
})

router.post('/login', (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                throw { message: "User not found.", errorCode: 401 }
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, role } = foundUser;

                const payload = { _id, email, username, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken: authToken });

            }
            else {
                throw { message: "Unable to authenticate the user", errorCode: 401 }
            }

        })
        .catch(err => {
            const errorCode = err.errorCode ? err.errorCode : 500
            const message = err.message ? err.message : "Internal server error"
            res.status(errorCode).json({ message })
        })
});


router.get('/verify', isAuthenticated, (req, res) => {
    res.status(200).json(req.payload)
})

module.exports = router