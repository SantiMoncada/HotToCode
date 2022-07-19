const router = require('express').Router()

const { isAuthenticated } = require("../middlewares/jwt.middleware")

const Comment = require('./../models/Comment.model')
const Snippet = require('./../models/Snippet.model')

router.post('/create/:post_id', isAuthenticated, (req, res) => {

    const { post_id } = req.params
    const { title, content } = req.body
    const { _id: logged_user_id } = req.payload

    const newComment = {
        title,
        owner: logged_user_id,
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

router.put('/edit/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params
    const { content, title } = req.body
    const { _id: logged_user_id } = req.payload

    const newComment = {
        title,
        content
    }

    Comment.findById(comment_id)
        .select('owner')
        .then(comment => {
            if (!comment) {
                throw { message: "Comment does no exist", errorCode: 404 }
            }
            if (!comment.owner.equals(logged_user_id)) {

                throw { message: "Can not edit a comment that you do not own", errorCode: 401 }
            }
            return Comment.findByIdAndUpdate(comment_id, newComment, { new: true })
        })
        .then(response => res.json(response))
        .catch(err => {
            const errorCode = err.errorCode ? err.errorCode : 500
            const message = err.message ? err.message : "Internal server error"
            res.status(errorCode).json(message)
        })
})

router.delete('/delete/:comment_id', isAuthenticated, (req, res) => {

    const { comment_id } = req.params
    const { _id: logged_user_id } = req.payload


    Comment.findById(comment_id)
        .select('owner')
        .then(comment => {
            if (comment.owner !== logged_user_id) {
                const message = "Can not delete a comment that you do not own"
                throw { message, errorCode: 401 }
            }
            return Comment.findByIdAndDelete(comment_id)
        })
        .then(response => res.json(response))
        .catch(err => {
            const errorCode = err.errorCode ? err.errorCode : 500
            const message = err.message ? err.message : "Internal server error"
            res.status(errorCode).json(message)
        })
})

module.exports = router 