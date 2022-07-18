const router = require('express').Router()

const Comment = require('./../models/Comment.model')
const Snippet = require('./../models/Snippet.model')

router.post('/create/:post_id', (req, res) => {

    const { post_id } = req.params
    const { title, content } = req.body

    const newComment = {
        title,
        owner: "62d55bf9891513fc0996afac", // TODO get owner from token
        content,
    }

    Comment
        .create(newComment)
        .then(comment => Snippet.findByIdAndUpdate(post_id, { $push: { comments: comment._id } }, { new: true }))
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/:post_id', (req, res) => {

    const { post_id } = req.params

    Snippet
        .findById(post_id)
        .select('comments')
        .populate({
            path: 'comments',
            populate: {
                path: 'owner',
                select: 'username avatar'
            }
        })
        .then(response => res.json(response.comments))
        .catch(err => res.status(500).json(err))
})

router.put('/edit/:comment_id', (req, res) => {

    const { comment_id } = req.params
    const { content, title } = req.body

    const newComment = {
        title,
        content
    }

    Comment
        .findByIdAndUpdate(comment_id, newComment, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/delete/:comment_id', (req, res) => {

    const { comment_id } = req.params

    Comment
        .findByIdAndDelete(comment_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router 