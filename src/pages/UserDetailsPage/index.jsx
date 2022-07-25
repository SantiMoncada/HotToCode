import { Container, Row, Col } from "react-bootstrap"
import UserProfile from "../../components/UserProfile"
import SnippetList from "../../components/SnippetList"
import { useState, useEffect } from "react"

import snippetService from "../../services/snippets.services"
import userService from "../../services/user.services"

import Loader from "./../../components/Loader"
import { useParams } from "react-router-dom"

const UserDetailsPage = () => {
    const [snippets, setSnippets] = useState([])

    const [userData, setUserData] = useState([])

    const { user_id } = useParams()

    const [loadingUser, setLoadingUser] = useState(true)
    const [loadingSnippets, setLoadingSnippets] = useState(true)

    useEffect(() => {
        loadUser()
        loadSnippet()
    }, [user_id])

    const loadUser = () => {
        setLoadingUser(true)
        userService
            .getUser(user_id)
            .then(({ data }) => {
                const { username, avatar, bio, _id } = data
                setUserData({ username, avatar, bio, _id })
                setLoadingUser(false)
            })
            .catch(err => {
                setLoadingUser(false)
                console.log(err)
            })
    }

    const loadSnippet = () => {
        setLoadingSnippets(true)
        snippetService
            .getSnippets({ user: user_id })
            .then(({ data }) => {
                setSnippets(data)
                setLoadingSnippets(false)
            })
            .catch(err => {
                setLoadingSnippets(false)
                console.log(err)
            })
    }

    return (
        <Container>
            <br />
            <Row>
                <Col sm={4}>
                    {!loadingUser ?
                        <UserProfile loadUser={loadUser} userData={userData} />
                        :
                        <Loader />
                    }

                </Col>
                <Col sm={8}>
                    {!loadingSnippets ?
                        <SnippetList maxColums={2} snippets={snippets} />
                        :
                        <Loader />
                    }

                </Col>
            </Row>
        </Container>

    )
}

export default UserDetailsPage