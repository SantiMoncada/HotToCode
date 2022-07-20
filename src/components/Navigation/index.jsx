import { useContext } from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { AuthContext } from "../../contexts/auth.context"

const Navigation = () => {

    const { user, logoutUser } = useContext(AuthContext)

    const logout = () => {
        logoutUser()
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >
                    <Link to="/">
                        <Nav.Link as="span">HotToCode</Nav.Link>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/snippets">
                            <Nav.Link as="span">Snippets</Nav.Link>
                        </Link>
                        <Link to="/snippetForm">
                            <Nav.Link as="span">SnippetForm</Nav.Link>
                        </Link>
                    </Nav>
                    <Nav>
                        <Link to="/signup">
                            <Nav.Link as="span">Signup</Nav.Link>
                        </Link>
                        <Link to="/login">
                            <Nav.Link as="span">Login</Nav.Link>
                        </Link>
                        <Link to="/myProfile">
                            <Nav.Link as="span">My Profile</Nav.Link>
                        </Link>
                        <Link to="/">
                            <Nav.Link as="span" onClick={logout}>Cerrar sesión</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation