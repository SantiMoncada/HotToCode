import { useContext, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"

import { MessageContext } from "../../contexts/userMessage.context"

import './comment.css'
import commentService from "../../services/commets.services"

import { MdScheduleSend, MdSend } from "react-icons/md"

const CommentForm = ({ snippet_id, loadComments }) => {

    const [commentData, setCommentData] = useState({
        content: ''
    })

    const { setShowMessage } = useContext(MessageContext)

    const [isSendingComment, setIsSendingComment] = useState(false)

    const handleChange = e => {
        const { value, name } = e.target
        setCommentData({ commentData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        setIsSendingComment(true)

        commentService
            .createComment(snippet_id, commentData)
            .then(({ data }) => {
                loadComments()
                setCommentData('')
                setIsSendingComment(false)
            })
            .catch(err => {
                console.log(err)
                setIsSendingComment(false)
                setShowMessage({ show: true, title: 'Error posting comment', text: 'There was an erro posting you comment, try again' })
            })

        e.target.reset()
    }

    const { content } = commentData

    return (
        <Form className="commentArea" onSubmit={handleSubmit}>
            <Row>
                <Col xs={10} xl={11} style={{ paddingRight: 0 }}>
                    <Form.Group controlId="content">
                        <Form.Control type="text" autoComplete="off" value={content || ''} onChange={handleChange} name="content" placeholder="comment..." />
                    </Form.Group>
                </Col>
                <Col xs={2} xl={1} style={{ paddingLeft: 0, alignItems: 'center' }}>
                    {isSendingComment
                        ?
                        <Button variant="warning" type="submit" style={{ width: '100%' }} >
                            <MdScheduleSend />
                        </Button>
                        :
                        <Button className="" variant="dark" type="submit" style={{ width: '100%' }}>
                            <MdSend />
                        </Button>
                    }
                </Col>
            </Row>
        </Form>
    )
}

export default CommentForm