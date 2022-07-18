const router = require('express').Router()

const Snippet = require('./../models/Snippet.model')


router.post('/create', (req, res) => {

    const { content, language, title } = req.body

    const newSnippet = {
        title,
        owner: "62d55bf9891513fc0996afac", // TODO get owner from token
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


router.put('/edit/:snippet_id', (req, res) => {

    const { title, content, language } = req.body
    const { snippet_id } = req.params

    Snippet
        .findByIdAndUpdate(snippet_id, { title, content, language }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.delete('/delete/:snippet_id', (req, res) => {

    const { snippet_id } = req.params

    Snippet
        .findByIdAndDelete(snippet_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router 