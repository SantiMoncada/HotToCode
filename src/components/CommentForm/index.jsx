import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"

import './comment.css'
import commentService from "../../services/commets.services"

const CommentForm = ({ snippet_id }) => {

    const [commentData, setCommentData] = useState({
        content: ''
    })

    const handleChange = e => {
        const { value, name } = e.target
        setCommentData({ commentData, [name]: value })
    }
    //delete show all edit
    const handleSubmit = e => {
        e.preventDefault()

        commentService
            .createComment(snippet_id, commentData)
            .then(({ data }) => {
                console.log("esto es el inside de comentData", commentData)
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    const { content } = commentData

    return (
        <Form className="commentArea" onSubmit={handleSubmit}>
            <Row>
                <Col><Form.Group className="mb-3" controlId="content">
                    <Form.Label></Form.Label>
                    <Form.Control as="textarea" rows={1} value={content} onChange={handleChange} name="content" />
                </Form.Group></Col>
                <Col><Button className="postBtn" variant="dark" type="submit">Post</Button></Col>
            </Row>
        </Form>
    )
}

export default CommentForm