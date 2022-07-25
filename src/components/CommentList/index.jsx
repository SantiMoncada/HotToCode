import CommentItem from "../CommentItem"
import { Col, Row, Container } from "react-bootstrap"

const CommentList = ({ commentsData }) => {

    return (
        <Container>
            {
                commentsData.map(comment => {
                    return (
                        <Row>
                            <Col key={comment._id}>
                                <CommentItem {...comment} />
                            </Col>
                            <br />
                        </Row>
                    )
                })
            }
        </Container>
    )
}

export default CommentList
