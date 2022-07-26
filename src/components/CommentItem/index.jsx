import commentService from './../../services/commets.services'

import { AuthContext } from '../../contexts/auth.context'
import { useContext } from "react"

import { Card, Row, Col, Button } from "react-bootstrap"

import { MdDeleteForever } from 'react-icons/md'

import './CommentItem.css'

const CommentItem = ({ owner, content, _id, loadComments }) => {

    const { user } = useContext(AuthContext)

    const commentDelete = () => {

        commentService
            .deleteComment(_id)
            .then(() => loadComments())
            .catch(err => console.log(err))
    }

    return (
        <Card className="CommentItem">
            <Row>
                <Col xs={1}>
                    <img src={owner.avatar} alt={`profile pciture of ${owner.username}`} />
                </Col>
                <Col xs={10}>
                    <Card.Text>
                        <p>
                            <strong>
                                @{owner.username}
                            </strong>
                        </p>
                        <p>{content}</p>
                    </Card.Text>
                </Col>
                <Col xs={1}>
                    {
                        owner._id === user?._id &&
                        <MdDeleteForever className="actionButton delete" size="sm" onClick={() => commentDelete()} />
                    }
                </Col>
            </Row>
        </Card>
    )

}

export default CommentItem