import { useState } from "react"
import snippetService from "../../services/snippets.services"
import { Form, Button } from "react-bootstrap"

const SnippetForm = () => {

    const [snippetData, setSnippetData] = useState({
        title: '',
        content: '',
        language: ''
    })

    const handleChange = e => {
        const { value, name } = e.target
        setSnippetData({ ...snippetData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        snippetService
            .createSnippet(snippetData)
            .then((response) => {
            })
            .catch(err => console.log(err))
    }

    const { title, content, language } = snippetData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={handleChange} name="title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Content">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} value={content} onChange={handleChange} name="content" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="language">
                <Form.Label>Language</Form.Label>
                <Form.Control type="text" value={language} onChange={handleChange} name="language" />
            </Form.Group>
            <div className="d-grid">
                <Button variant="dark" type="submit">New Snippet</Button>
            </div>
        </Form>
    )
}

export default SnippetForm