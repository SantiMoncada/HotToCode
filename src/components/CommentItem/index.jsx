import { Container, Row, Col } from "react-bootstrap"

const CommentItem = () => {

    return (
        <Container>
            <Row>
                <Col>
                    {/* <img onScrollCapture={owner.avatar} alt={`profile pciture of ${owner.username}`} /> */}
                </Col>
                <Col>
                    {/* <p>@{owner.username}</p> */}
                </Col>
            </Row>
            <Row>
                {/* comments */}
            </Row>
        </Container>
    )

}

export default CommentItem