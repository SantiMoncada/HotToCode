import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"

import './comment.css'
import commentService from "../../services/commets.services"

const CommentForm = () => {

    const [comentData, setCommentData] = useState({
        content: ''
    })

    const handleChange = e => {
        const { value, name } = e.target
        setCommentData({ ...comentData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        commentService
            .createComment(comentData)
            .then(({ data }) => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    const { content } = comentData

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