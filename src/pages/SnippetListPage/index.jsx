import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Container } from "react-bootstrap"

import snippetService from "../../services/snippets.services"
import userService from "../../services/user.services"

import SnippetList from "../../components/SnippetList"
import Loader from "../../components/Loader"



const SnippetListPage = () => {

    const [snippets, setSnippets] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadSnippet()
    }, [user])

    const loadSnippet = () => {

        snippetService.getSnippets()
            .then(({ data }) => {
                setSnippets(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <br></br>
            <Container>
                {
                    snippets.length ? <SnippetList snippets={snippets} /> : <Loader />
                }
            </Container>
        </>


    )
}

export default SnippetListPage