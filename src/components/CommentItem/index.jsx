import { Container, Row, Col, Card } from "react-bootstrap"
import './CommentItem.css'

const CommentItem = ({ owner, content }) => {

    return (
        <Container>
            <Card>
                <Row className="itemAvatar">
                    <Col md={2}>
                        <p><img src={owner.avatar} alt={`profile pciture of ${owner.username}`} />@{owner.username}</p>
                    </Col>
                    <Col md={10}>
                        <p>{content}</p>
                    </Col>
                </Row>
            </Card>
        </Container>
    )

}

export default CommentItem