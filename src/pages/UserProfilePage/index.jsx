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
    const { user } = useContext(AuthContext)


    useEffect(() => {
        loadSnippet()
    }, [])

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userService
            .getUser(user._id)
            .then(({ data }) => {
                console.log('---user-----', data)
                setUserData(data)
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
            <Row>
                <Col>
                    <UserProfile userData={userData} />
                </Col>
                <Col><SnippetList snippets={snippets} /></Col>
            </Row>
        </Container>

    )
}

export default UserProfilePage