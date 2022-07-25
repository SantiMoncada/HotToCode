import CommentItem from "../CommentItem"
import { Col, Row } from "react-bootstrap"
const CommentList = () => {

    return (
        <Row>
            {
                comments.map(comment => {
                    return (
                        <Col>
                            <CommentItem {...comment} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default CommentList
