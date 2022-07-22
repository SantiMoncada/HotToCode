const router = require('express').Router()

const { isAuthenticated } = require("../middlewares/jwt.middleware")

const User = require('./../models/User.model')

router.get('/', (req, res) => {

    User
        .find()
        .select('username bio avatar')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/details/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .select('username avatar bio favSnippets')
        .populate({
            path: 'favSnippets',
            select: '' // TODO project
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.put('/edit/:user_id', isAuthenticated, (req, res) => {

    const { _id: logged_user_id } = req.payload

    const { user_id } = req.params
    const { username, avatar, bio, } = req.body

    const newUser = {
        username,
        avatar,
        bio,
    }

    if (!(logged_user_id === user_id)) {
        res.status(401).json({ message: "You can only edit your own profile" })
        return
    }

    User
        .findByIdAndUpdate(user_id, newUser, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/favSnippet/:snippet_id', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload

    const { snippet_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $addToSet: { favSnippets: snippet_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/rmSnippet/:snippet_id', isAuthenticated, (req, res) => {

    const { _id: user_id } = req.payload

    const { snippet_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { favSnippets: snippet_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getAllFavSnippets/:user_id', isAuthenticated, (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .select('favSnippets')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router 