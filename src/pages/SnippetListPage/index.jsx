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
        if (user) {
            const promises = []
            promises.push(userService.getAllFavSnippets(user._id))
            promises.push(snippetService.getSnippets())

            Promise.all(promises)
                .then(response => {
                    const favArray = response[0].data.favSnippets
                    const snippets = response[1].data

                    const snippetsData = snippets.map(snippet => {
                        return {
                            isFav: favArray.includes(snippet._id),
                            ...snippet
                        }
                    })
                    setSnippets(snippetsData)
                })
                .catch(err => console.log(err))
        }
        else {
            snippetService
                .getSnippets()
                .then(({ data }) => {
                    const snippetsData = data.map(snippet => {
                        return {
                            isFav: false,
                            ...snippet
                        }
                    })
                    setSnippets(snippetsData)
                })
                .catch(err => console.log(err))
        }

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