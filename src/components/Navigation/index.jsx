import { useContext } from "react";
import { Link } from 'react-router-dom'

import { AuthContext } from "../../contexts/auth.context";
import { MessageContext } from "../../contexts/userMessage.context";

import './Navigation.css'
import logo from './../../assets/blackLogo.svg'

import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"

import SearchBar from './searchBar'

import styled from 'styled-components'

const StyledLogo = styled.img`
    width: 120px;
    height: 40px;
    display: inline-block;
    vertical-align: top;
`
const Navigation = () => {

    const { logoutUser, user } = useContext(AuthContext)
    const { setShowMessage } = useContext(MessageContext)

    const logOuthandler = () => {
        setShowMessage({ show: true, title: 'Good bay!', text: 'Your session has been terminated' })
        logoutUser()
    }

    return (

        <Navbar className="Navigation" bg="light" expand="lg">
            <Container fluid>
                <Link to='/'>
                    <Navbar.Brand>
                        <StyledLogo
                            src={logo}
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <SearchBar />

                        <Link to='/snippets' className="LinkStyle" >
                            <Nav.Link as='span' >
                                Snippets
                            </Nav.Link>
                        </Link>

                        {user &&
                            <Link to='/snippetForm' className="LinkStyle" >
                                <Nav.Link as='span' >
                                    Create snippet
                                </Nav.Link>
                            </Link>
                        }
                    </Nav>
                    <Nav>

                        {!user ?
                            <>
                                <Link to='/login' className="LinkStyle" >
                                    <Nav.Link as='span' >
                                        Sign in
                                    </Nav.Link>
                                </Link>

                                <Link to='/signup' className="LinkStyle" >
                                    <Nav.Link className="signup" as='span' >
                                        Sign up
                                    </Nav.Link>
                                </Link>
                            </>

                            :
                            <NavDropdown title="Session" id="navbarScrollingDropdown" align={'end'}>
                                <NavDropdown.Header>Hello {user.username} !</NavDropdown.Header>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as='span'>
                                    <Link to={`/user/${user._id}`} className="LinkStyle" >
                                        <NavDropdown.Item as='span' style={{ padding: '0' }}>
                                            Your Profile
                                        </NavDropdown.Item>
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logOuthandler}>Sign out</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navigation