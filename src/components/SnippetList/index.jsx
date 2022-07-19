import SnippetCard from "../SnippetCard"
import { Col, Row, Container } from "react-bootstrap"

const SnippetList = ({ snippets }) => {
    return (
        <Container>
            <Row>
                {snippets.map(snippet => {
                    return (
                        <Col xs={4} key={snippet._id}>
                            <SnippetCard {...snippet} />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default SnippetList