import { useState } from "react"
import snippetService from "../../services/snippets.services"



const SnippetForm = () => {

    const [snippetData, setSnippetData] = useState({
        title: '',
        content: ''
    })

    const handleChange = e => {
        const { value, name } = e.target
        setSnippetData({ ...snippetData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        snippetService
            .createSnippet(snippetData)
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

export default SnippetForm