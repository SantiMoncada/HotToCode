import { useState } from "react"
import { Form, Button } from "react-bootstrap"

import commentService from "../../services/commets.services"

const CommentForm = () => {

    const [comentData, setCommentData] = useState({})

    const handleChange = e => {
        const { value, name } = e.target
        setCommentData({ ...comentData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        commentService
            .createComment(comentData)
            .then((response) => {
                console.log(response)
            })
            .catch(err => console.log(err))
    }

    const { content } = comentData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="content">
                <Form.Label></Form.Label>
                <Form.Control as="textarea" rows={3} value={content} onChange={handleChange} name="content" />
            </Form.Group>
            <Button variant="dark" type="submit">Post</Button>
        </Form>
    )
}

export default CommentForm