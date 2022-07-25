import commentService from './../../services/commets.services'

import { AuthContext } from '../../contexts/auth.context'
import { useContext } from "react"

import { useNavigate } from 'react-router-dom'
import { Container, Card, Row, Col } from "react-bootstrap"

import { MdDeleteForever } from 'react-icons/md'

import './CommentItem.css'

const CommentItem = ({ owner, content, _id }) => {


    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const commentDelete = () => {

        commentService
            .deleteComment(_id)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }

    return (
        <Container className="itemAvatar">
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            <img src={owner.avatar} alt={`profile pciture of ${owner.username}`} />@{owner.username}
                        </Col>
                        <Col className='commentHeader'>
                            {
                                owner._id === user?._id &&
                                <MdDeleteForever size="sm" onClick={() => commentDelete()} className='actionButton' />
                            }
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Text>
                    <p>{content}</p>
                </Card.Text>
            </Card>
        </Container>
    )

}

export default CommentItem