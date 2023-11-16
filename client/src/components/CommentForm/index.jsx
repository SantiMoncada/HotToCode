import { useContext, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"

import { MessageContext } from "../../contexts/userMessage.context"

import commentService from "../../services/commets.services"

import { MdScheduleSend, MdSend } from "react-icons/md"

import styled from "styled-components"

const StyledColComment = styled(Col)`
    padding-right: 0;
`

const StyledCommentInputField = styled(Form.Control)`
    border-right: none;
    border-radius:4px 0 0 4px;
    padding-right: 0;
`
const StyledSendButton = styled(Button)`
        width: 100%;
        border-radius:0px 4px 4px 0px ;
`

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

        if(isSendingComment){
            return
        }
        
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
                setShowMessage({ show: true, title: 'Error posting comment', text: 'There was an error posting your comment, try again' })
            })

        e.target.reset()
    }

    const { content } = commentData

    return (
        <Form onSubmit={handleSubmit}>
            
            <Row>
                <StyledColComment xs={10} md={11}>
                    <Form.Group controlId="content">
                        <StyledCommentInputField type="text" autoComplete="off" value={content || ''} onChange={handleChange} name="content" placeholder="comment..." />
                    </Form.Group>
                </StyledColComment>
                <Col xs={2} md={1} style={{ paddingLeft: 0, alignItems: 'center' }}>
                {isSendingComment
                    ?
                    <StyledSendButton variant="warning" type="submit" >
                        <MdScheduleSend />
                    </StyledSendButton>
                    :
                    <StyledSendButton variant="dark" type="submit" >
                        <MdSend />
                    </StyledSendButton>
                }
                </Col>
            </Row>
            
        </Form>
    )
}

export default CommentForm