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
        loadSnippets()
    }, [])

    const loadUser = () => {
        userService
            .getUser(loggedUser._id)
            .then(({ data }) => {
                const { username, avatar, bio, _id } = data
                setUserData({ username, avatar, bio, _id })
            })
            .catch(err => console.log(err))
    }

    const loadSnippets = () => {
        snippetService
            .getSnippets({ user: loggedUser._id })
            .then(({ data }) => {
                setSnippets(data)
            })
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        console.log('me estás llamando¡????')
        loadSnippets()
    }


    return (
        <Container>
            <br />
            <Row>
                <Col sm={4}>
                    <UserProfile loadUser={loadUser} userData={userData} />
                </Col>
                <Col sm={8}><SnippetList maxColums={2} snippets={snippets} fireFinalActions={fireFinalActions} /></Col>
            </Row>
        </Container>

    )
}

export default UserProfilePage