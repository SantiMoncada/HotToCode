import CommentItem from "../CommentItem"
import { Col, Row } from "react-bootstrap"

const CommentList = ({ commentsData }) => {

    return (
        <Row>
            {
                commentsData.map(comment => {
                    console.log('esto debería contenr la info que necesito', comment)
                    return (
                        <Col key={comment._id}>
                            <CommentItem {...comment} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default CommentList
