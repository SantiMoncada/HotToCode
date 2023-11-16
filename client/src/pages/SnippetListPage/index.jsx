import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Container } from "react-bootstrap"

import snippetService from "../../services/snippets.services"

import SnippetList from "../../components/SnippetList"
import Loader from "../../components/Loader"



const SnippetListPage = () => {

    const [snippets, setSnippets] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        setIsLoading(true)
        loadSnippet()
    }, [user])

    const loadSnippet = () => {
        snippetService.getSnippets()
            .then(({ data }) => {
                setIsLoading(false)
                setSnippets(data)
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }

    const fireFinalActions = () => {
        loadSnippet()
    }

    return (
        <>
            <br></br>
            <Container>
                {
                    isLoading ? <Loader /> : <SnippetList snippets={snippets} fireFinalActions={fireFinalActions} />
                }
            </Container>
        </>


    )
}

export default SnippetListPage