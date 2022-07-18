import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from 'react-router-dom'

const Navigation = () => {

    return (

        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/signup">
                            <Nav.Link as="span">Registro</Nav.Link>
                        </Link>
                        <Link to="/login">
                            <Nav.Link as="span">Iniciar sesión</Nav.Link>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </>)

}

export default Navigation