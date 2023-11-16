import LoginForm from "../../components/LoginForm"
import { Container, Col, Row } from "react-bootstrap"


const LoginPage = () => {

    return (
        <Container>
            <Row>

                <Col md={{ offset: 3, span: 6 }}>
                    <h1>Login</h1>
                    <hr />
                    <LoginForm />
                </Col>

            </Row>
        </Container>
    )
}

export default LoginPage