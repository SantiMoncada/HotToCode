import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import snippetService from "../../services/snippets.services"
import SnippetList from "../../components/SnippetList"


const SnippetListPage = () => {

    const [snippets, setSnippets] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadSnippet()
    }, [])


    const loadSnippet = () => {
        snippetService
            .getSnippets()
            .then(({ data }) => {
                setSnippets(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>

        </>
    )
}

export default SnippetListPage