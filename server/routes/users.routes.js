const router = require('express').Router()

const { isAuthenticated } = require("../middlewares/jwt.middleware")
const { populate } = require('./../models/User.model')

const User = require('./../models/User.model')

router.get('/', (req, res) => {
    const { username, limit } = req.query

    const filterParams = {}

    if (username) {
        filterParams.username = { '$regex': username, '$options': 'i' }
    }

    User
        .find(filterParams)
        .limit(limit)
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

router.get('/getAllFavSnippetsContent/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .select('favSnippets')
        .populate({
            path: 'favSnippets',
            select: 'title content language owner',
            populate: {
                path: 'owner',
                select: 'avatar username'
            }

        })
        .then(response => res.json(response.favSnippets))
        .catch(err => res.status(500).json(err))
})

module.exports = router 