import { Container, Row, Col, Tab, Tabs } from "react-bootstrap"
import UserProfile from "../../components/UserProfile"
import SnippetList from "../../components/SnippetList"
import { useState, useEffect } from "react"

import snippetService from "../../services/snippets.services"
import userService from "../../services/user.services"

import Loader from "./../../components/Loader"
import { useParams } from "react-router-dom"

import './UserDetailsPage.css'

const UserDetailsPage = () => {

    const [snippets, setSnippets] = useState([])
    const [userData, setUserData] = useState({})
    const [tabKet, setTabKey] = useState('own')

    const { user_id } = useParams()

    const [loadingUser, setLoadingUser] = useState(true)
    const [loadingSnippets, setLoadingSnippets] = useState(true)

    useEffect(() => {
        loadUser()
        loadSnippets()
    }, [user_id])

    useEffect(() => {
        switch (tabKet) {
            case 'favs':
                loadFavSnippets()
                break
            case 'own':
            default:
                loadSnippets()


        }
    }, [tabKet])

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

    const loadSnippets = () => {
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

    const loadFavSnippets = () => {
        setLoadingSnippets(true)
        userService
            .getAllFavSnippetsContent(user_id)
            .then(({ data }) => {
                console.log('fav snippets', data)
                setSnippets(data)
                setLoadingSnippets(false)
            })
            .catch(err => {
                setLoadingSnippets(false)
                console.log(err)
            })
    }

    const deleteFinalActions = () => {
        loadSnippets()
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

                    <Tabs
                        activeKey={tabKet}
                        onSelect={(k) => setTabKey(k)}
                        id="favSelector"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="own" title={`${userData.username}'s Snippets`} style={{ color: 'red' }}>
                        </Tab>
                        <Tab eventKey="favs" title={`${userData.username}'s Favourites`}>
                        </Tab>

                    </Tabs>
                    {!loadingSnippets ?
                        <SnippetList maxColums={2} snippets={snippets} fireFinalActions={deleteFinalActions} />
                        :
                        <Loader />
                    }

                </Col>
            </Row>
        </Container>

    )
}

export default UserDetailsPage