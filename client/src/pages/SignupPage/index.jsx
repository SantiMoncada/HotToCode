import SignupForm from "../../components/SignupForm"
import { Container, Col, Row } from "react-bootstrap"


const SignupPage = () => {

    return (

        <Container>

            <Row>

                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Signup</h1>

                    <hr />

                    <SignupForm />

                </Col>
            </Row>

        </Container>
    )

}

export default SignupPage