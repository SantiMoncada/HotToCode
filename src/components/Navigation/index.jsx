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
                    <Link to="/">
                        <Nav.Link as="span">HotToCode</Nav.Link>
                    </Link>
                    <Nav className="me-auto">
                        <Link to="/signup">
                            <Nav.Link as="span">Signup</Nav.Link>
                        </Link>
                        <Link to="/login">
                            <Nav.Link as="span">Login</Nav.Link>
                        </Link>
                        <Link to="/snippets">
                            <Nav.Link as="span">Snippets</Nav.Link>
                        </Link>
                        <Link to="/snippetForm">
                            <Nav.Link as="span">SnippetForm</Nav.Link>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )

}

export default Navigation