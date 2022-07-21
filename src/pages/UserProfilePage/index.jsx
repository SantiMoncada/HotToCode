import { Container, Row, Col } from "react-bootstrap"
import UserProfile from "../../components/UserProfile"
import SnippetList from "../../components/SnippetList"
import { useState, useEffect } from "react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import snippetService from "../../services/snippets.services"
import userService from "../../services/user.services"

const UserProfilePage = () => {

    const [snippets, setSnippets] = useState([])

    const [userData, setUserData] = useState([])

    const { user: loggedUser } = useContext(AuthContext)


    useEffect(() => {
        loadUser()
        loadSnippet()
    }, [])

    const loadUser = () => {
        userService
            .getUser(loggedUser._id)
            .then(({ data }) => {
                const { username, avatar, bio } = data
                setUserData({ username, avatar, bio })
            })
            .catch(err => console.log(err))
    }

    const loadSnippet = () => {
        snippetService
            .getSnippets()
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

export default UserProfilePage