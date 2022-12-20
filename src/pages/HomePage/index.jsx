import { Container, Row, Col, } from 'react-bootstrap'
import logo from './../../assets/blackLogo.svg'
import Footer from '../../components/Footer'
import CarouselHome from '../../components/CarouselHome'
import styled from 'styled-components'

const HomePage = () => {
    const StyledLogo = styled.img`
        padding: 0;
    `

    return (
        <hero>
            <br />
            <Container>
                <Row>
                    <Col md={{ offset: 3, span: 6 }} className='mb-4 mt-4'>
                        <figure>
                            <StyledLogo
                                src={logo}
                                className="align-top"
                                alt="React Bootstrap logo"
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