const router = require('express').Router()

const { isAuthenticated } = require("../middlewares/jwt.middleware")

const Snippet = require('./../models/Snippet.model')


router.post('/create', isAuthenticated, (req, res) => {

    const { content, language, title } = req.body
    const { _id: owner } = req.payload

    const newSnippet = {
        title,
        owner,
        content,
        language,
    }

    Snippet
        .create(newSnippet)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/list', (req, res) => {
    const { user, lang, limit } = req.query

    //TODO fix this bs code
    const filterParams = {}

    if (user) {
        filterParams._id = user
    }

    if (lang) {
        filterParams.language = lang
    }

    Snippet
        .find(filterParams)
        .limit(limit)
        .populate({ path: 'owner', select: 'username avatar' })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/details/:snippet_id', (req, res) => {

    const { snippet_id } = req.params

    Snippet
        .findById(snippet_id)
        .populate({ path: 'owner', select: 'username avatar' })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})


router.put('/edit/:snippet_id', isAuthenticated, (req, res) => {

    const { title, content, language } = req.body
    const { snippet_id } = req.params
    const { _id: user_id } = req.payload

    Snippet.findById(snippet_id)
        .select('owner')
        .then(snippet => {
            if (snippet.owner !== user_id) {
                const message = "Can not edit a snippet that you do not own"
                throw { message, errorCode: 401 }
            }
            return Snippet.findByIdAndUpdate(snippet_id, { title, content, language }, { new: true })
        })
        .then(response => res.json(response))
        .catch(err => {
            const errorCode = err.errorCode ? err.errorCode : 500
            const message = err.message ? err.message : "Internal server error"
            res.status(errorCode).json(message)
        })
})

router.delete('/delete/:snippet_id', (req, res) => {

    const { snippet_id } = req.params
    const { _id: user_id } = req.payload

    Snippet.findById(snippet_id)
        .select('owner')
        .then(snippet => {
            if (snippet.owner !== user_id) {
                const message = "Can not delete a snippet that you do not own"
                throw { message, errorCode: 401 }
            }
            return Snippet.findByIdAndDelete(snippet_id)
        })
        .then(response => res.json(response))
        .catch(err => {
            const errorCode = err.errorCode ? err.errorCode : 500
            const message = err.message ? err.message : "Internal server error"
            res.status(errorCode).json(message)
        })
})


module.exports = router 