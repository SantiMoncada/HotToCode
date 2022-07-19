// import { useContext } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from 'react-router-dom'
// import { AuthContext } from "../../contexts/auth.context"

const Navigation = () => {

    // const { user, logoutUser } = useContext(AuthContext)

    // const logout = () => {
    //     logoutUser()
    // }

    return (

        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
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