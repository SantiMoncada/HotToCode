import { Container, Row, Col } from "react-bootstrap"
import UserProfile from "../../components/UserProfile"
import SnippetList from "../../components/SnippetList"
import { useState, useEffect } from "react"

import snippetService from "../../services/snippets.services"
import userService from "../../services/user.services"

import { useParams } from "react-router-dom"

const UserDetailsPage = () => {
    const [snippets, setSnippets] = useState([])

    const [userData, setUserData] = useState([])

    const { user_id } = useParams()

    useEffect(() => {
        loadUser()
        loadSnippet()
    }, [user_id])

    const loadUser = () => {
        userService
            .getUser(user_id)
            .then(({ data }) => {
                const { username, avatar, bio, _id } = data
                setUserData({ username, avatar, bio, _id })
            })
            .catch(err => console.log(err))
    }

    const loadSnippet = () => {
        snippetService
            .getSnippets({ user: user_id })
            .then(({ data }) => {
                setSnippets(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <br />
            <Row>
                <Col sm={4}>
                    <UserProfile loadUser={loadUser} userData={userData} />
                </Col>
                <Col sm={8}><SnippetList maxColums={2} snippets={snippets} /></Col>
            </Row>
        </Container>

    )
}

export default UserDetailsPage