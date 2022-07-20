import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from './../../assets/blackLogo.svg'

import { MdOutlineSearch } from 'react-icons/md'

const Navigation = () => {
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
                            <Nav.Link as='span'>
                                Snippets
                            </Nav.Link>
                        </Link>

                        <Nav.Link >Sign in</Nav.Link>
                        <Nav.Link style={{ border: 'solid gray 1px', borderRadius: '8px' }}>Sign up</Nav.Link>


                        <NavDropdown title="Session" id="navbarScrollingDropdown" align={'end'}>
                            <NavDropdown.Header active>Hello User!</NavDropdown.Header>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >Your profile</NavDropdown.Item>
                            <NavDropdown.Item >Your snippets</NavDropdown.Item>
                            <NavDropdown.Item >Your favs</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >Sign out</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navigation