import SnippetForm from "../../components/SnippetForm"
import { Container, Row, Col } from 'react-bootstrap'

const SnippetFormPage = () => {

    return (
        <Container>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>New Snippet</h1>

                    <hr />

                    <SnippetForm />

                </Col>
            </Row>

        </Container>
    )
}

export default SnippetFormPage