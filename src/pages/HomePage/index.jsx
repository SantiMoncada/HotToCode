import { Container, Row, Col, } from 'react-bootstrap'
import logo from './../../assets/blackLogo.svg'
import Footer from '../../components/Footer'
import CarouselHome from '../../components/CarouselHome'

const HomePage = () => {

    return (
        <hero>
            <br />
            <Container>
                <Row>
                    <Col md={{ offset: 3, span: 6 }} className='mb-4 mt-5'>
                        <figure>
                            <img
                                src={logo}
                                className=" align-top"
                                alt="React Bootstrap logo"
                                style={{ padding: 0, width: '100%' }}
                            />
                        </figure>
                    </Col>
                </Row>
            </Container>
            <CarouselHome />
            <br />
            <Footer />
        </hero>
    )
}

export default HomePage