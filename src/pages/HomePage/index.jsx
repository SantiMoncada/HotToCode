import { Container, Row, Col, Figure } from 'react-bootstrap'
import logo from './../../assets/blackLogo.svg'
import Footer from '../../components/Footer'
import CarouselHome from '../../components/CarouselHome'

const HomePage = () => {

    return (
        <>
            <br />
            <figure>
                <img
                    src={logo}
                    className=" align-top"
                    alt="React Bootstrap logo"
                    style={{ padding: 0, width: '100%' }}
                />
            </figure>
            <CarouselHome />
            <Footer />
        </>
    )
}

export default HomePage