const router = require('express').Router()

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


router.put('/edit/:user_id', (req, res) => {

    const { user_id } = req.params
    const { username, avatar, bio, } = req.body

    const newUser = {
        username,
        avatar,
        bio,
    }

    User
        .findByIdAndUpdate(user_id, newUser, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/favSnippet/:snippet_id', (req, res) => {

    const user_id = "62d55bf9891513fc0996afac" //TODO get from token
    const { snippet_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $push: { favSnippets: snippet_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/rmSnippet/:snippet_id', (req, res) => {

    const user_id = "62d55bf9891513fc0996afac" //TODO get from token
    const { snippet_id } = req.params

    User
        .findByIdAndUpdate(user_id, { $pull: { favSnippets: snippet_id } }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router 