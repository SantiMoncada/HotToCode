import { Container, Row, Col } from 'react-bootstrap'
import logo from './../../assets/blackLogo.svg'
import Footer from '../../components/Footer'

const HomePage = () => {

    return (
        <Container>

            <Row>

                <Col md={{ span: 6, offset: 3 }}>
                    <h1>WELCOME TO</h1>
                    <br />
                    <img
                        src={logo}
                        width="700"
                        height="200"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Col>

            </Row>

            <Footer />
        </Container>
    )
}

export default HomePage