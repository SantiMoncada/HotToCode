import SnippetCard from "../SnippetCard"
import "./SnippetList.css"
import { Col, Row, Container } from "react-bootstrap"

const SnippetList = ({ snippets }) => {
    return (

        <Row>
            {snippets.map(snippet => {
                return (
                    <Col md={12} lg={6} xl={4} key={snippet._id} className="mb-4">
                        <SnippetCard {...snippet} />
                    </Col>
                )
            })}
        </Row>

    )
}

export default SnippetList
