import { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from "../../contexts/auth.context";
import userService from "../../services/user.services";

import './Navigation.css'
import { Container, Navbar, Nav } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from './../../assets/blackLogo.svg'
import { MdOutlineSearch } from 'react-icons/md'

import { useState } from "react";
import { Typeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';


const Navigation = () => {



    const [allUsers, setAllUsers] = useState([])
    const [usersSelected, setUsersSelected] = useState([]);

    let navigate = useNavigate();

    const { logoutUser, user } = useContext(AuthContext)


    useEffect(() => {
        userService.getAllUsers()
            .then(({ data }) => {
                setAllUsers(data.map(user => { return { label: user.username, id: user._id } }))
            })
    }, [])

    return (

        <Navbar className="Navigation" bg="light" expand="lg">
            <Container fluid>
                <Link to='/'>
                    <Navbar.Brand>
                        <img
                            src={logo}
                            width="120"
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

                            <div className="user-search-bar" style={{ display: 'flex' }}>
                                <Typeahead
                                    id='user-search-bar'
                                    onChange={setUsersSelected}
                                    options={allUsers}
                                    placeholder="User..."
                                    selected={usersSelected}
                                    highlightOnlyResult={true}
                                    minLength={0}
                                    renderMenu={(results, menuProps) => (
                                        <Menu {...menuProps}>
                                            {results.map((result, index) => (
                                                <MenuItem
                                                    key={result.id}
                                                    onClick={() => navigate(`/user/${result.id}`)}
                                                    option={result}
                                                    position={index}>
                                                    {result.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    )}
                                />
                                <Button onClick={() => console.log(usersSelected[0])} variant="outline-success"><MdOutlineSearch /></Button>
                            </div>

                        </Form>
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
                                <NavDropdown.Item >
                                    <Link to={`/user/${user._id}`} className="LinkStyle" >
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
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}
export default Navigation