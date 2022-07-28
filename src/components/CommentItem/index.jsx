import commentService from './../../services/commets.services'

import { AuthContext } from '../../contexts/auth.context'
import { useContext } from "react"

import { Card, Row, Col } from "react-bootstrap"

import { MdDeleteForever } from 'react-icons/md'

import './CommentItem.css'

const CommentItem = ({ owner, content, _id, fireFinalActions }) => {

    const { user } = useContext(AuthContext)

    const commentDelete = () => {

        commentService
            .deleteComment(_id)
            .then(() => {
                if (fireFinalActions) {
                    fireFinalActions()
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Card className="CommentItem">
            <Row>
                <Col xs={2} md={1} className={'commentImgContainer'}>
                    <img src={owner.avatar} alt={`profile pciture of ${owner.username}`} />
                </Col>
                <Col xs={8} md={10}>
                    <Card.Text>
                        <strong>
                            @{owner.username}
                        </strong>
                    </Card.Text>
                    <Card.Text>
                        {content}
                    </Card.Text>

                </Col>
                <Col xs={2} md={1} style={{ padding: '0', display: 'flex', justifyContent: 'end' }}>
                    <figure style={{ padding: '0', display: 'flex', justifyContent: 'end' }}>
                        {
                            owner._id === user?._id &&
                            <MdDeleteForever style={{ width: '40%', marginRight: '15px' }} size="sm" onClick={() => commentDelete()} />
                        }
                    </figure>
                </Col>
            </Row>
        </Card>
    )

}

export default CommentItem