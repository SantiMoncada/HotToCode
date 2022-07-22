import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import snippetService from "../../services/snippets.services"
import SnippetDetails from "../../components/SnippedDetails"
import { Container } from "react-bootstrap"
const SnippetDetailsPage = () => {

    const [snippet, setSnippet] = useState({})

    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadSnippet()
    })

    const loadSnippet = () => {
        snippetService
            .getOneSnippet(snippet_id)
            .then(({ data }) => {
                console.log(data)
                setSnippet(data)
            })
            .catch(err => console.log(err))

    }
    return (
        <Container>
            <SnippetDetails snippet={snippet} />
        </Container>
    )
}

export default SnippetDetailsPage