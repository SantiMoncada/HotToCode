import { useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap"


const CreateSnippetPage = () => {

    const navigate = useNavigate()

    return (
        <Container>
            <h1>NEW SNIPPET</h1>
            <SnippetForm />
        </Container>
    )
}

export default CreateSnippetPage