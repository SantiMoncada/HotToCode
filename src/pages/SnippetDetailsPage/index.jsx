import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import snippetService from "../../services/snippets.services"
import SnippetDetails from "../../components/SnippetDetails"

const SnippetDetailsPage = () => {

    const [snippet, setSnippet] = useState({})
    const { snippet_id } = useParams()

    useEffect(() => {
        loadSnippet()
    }, [])

    const loadSnippet = () => {
        snippetService
            .getOneSnippet(snippet_id)
            .then(({ data }) => {
                setSnippet(data)
            })
            .catch(err => console.log(err))

    }
    return (
        <SnippetDetails  {...snippet} />
    )
}

export default SnippetDetailsPage