import { Container, Row, Col } from 'react-bootstrap'

const HomePage = () => {

    return (
        <Container>

            <Row>

                <Col md={{ span: 6, offset: 3 }}>

                    <h1>Hot to Code</h1>
                    <h2>oh i'm the home page so sad :3</h2>
                </Col>

            </Row>

        </Container>
    )
}

export default HomePage