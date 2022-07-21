import { AuthContext } from "../../contexts/auth.context";
import { useContext } from "react";

import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from './../../assets/blackLogo.svg'

import { MdOutlineSearch } from 'react-icons/md'

const Navigation = () => {

    const { logoutUser } = useContext(AuthContext)

    return (

        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Link to='/'>
                    <Navbar.Brand>
                        <img
                            src={logo}
                            width="140"
                            height="40"
                            className="d-inline-block align-top"
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
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Users"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success"><MdOutlineSearch /></Button>
                        </Form>
                    </Nav>
                    <Nav>



                        <Link to='/snippets' style={{ textDecoration: 'none' }}>
                            <Nav.Link as='span' >
                                Snippets
                            </Nav.Link>
                        </Link>

                        <Link to='/snippetForm' style={{ textDecoration: 'none' }}>
                            <Nav.Link as='span' >
                                Create snippet
                            </Nav.Link>
                        </Link>


                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            <Nav.Link as='span' >
                                Sign in
                            </Nav.Link>
                        </Link>

                        <Link to='/signup' style={{ textDecoration: 'none' }}>
                            <Nav.Link as='span' style={{ border: 'solid gray 1px', borderRadius: '8px' }}>
                                Sign up
                            </Nav.Link>
                        </Link>

                        <NavDropdown title="Session" id="navbarScrollingDropdown" align={'end'}>
                            <NavDropdown.Header active>Hello User!</NavDropdown.Header>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >
                                <Link to='/myProfile' style={{ textDecoration: 'none' }}>
                                    <NavDropdown.Item as='span' style={{ padding: '0' }}>
                                        Your Profile
                                    </NavDropdown.Item>
                                </Link>
                            </NavDropdown.Item>

                            <NavDropdown.Item >Your snippets</NavDropdown.Item>
                            <NavDropdown.Item >Your favs</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutUser}>Sign out</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navigation