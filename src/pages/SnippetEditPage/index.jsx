import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import SnippetCodeEditor from './../../components/SnippetCodeEditor'
import LanguageSelector from './../../components/LanguageSelector'
import snippetService from "../../services/snippets.services"
import Loader from "../../components/Loader"


const SnippetEditPage = () => {

    let navigate = useNavigate()

    const [code, setCode] = useState('')
    const [len, setLen] = useState('JS')
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const { snippet_id } = useParams()

    useEffect(() => {
        snippetService
            .getOneSnippet(snippet_id)
            .then(({ data }) => {
                setCode(data.content)
                setLen(data.language)
                setTitle(data.title)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])


    const handleChangeTitle = e => {
        setTitle(e.target.value)

    }

    const handleSubmmit = e => {
        e.preventDefault()
        const newSnippet = {
            title,
            language: len,
            content: code,
        }
        console.log("editing->", snippet_id, newSnippet)
        snippetService.editSnippet(snippet_id, newSnippet)
            .then(({ data }) => {
                navigate(`/snippetDetails/${data._id}`)
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    return (

        <Container>
            <br></br>
            {isLoading ?
                <Loader />
                :
                <Row>

                    <Col md={{ offset: 3, span: 6 }}>

                        <Form onSubmit={handleSubmmit}>
                            <br></br>
                            <LanguageSelector len={len} setLen={setLen} />
                            <br></br>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Control type="text" placeholder="Enter snippet title" value={title} onChange={handleChangeTitle} />
                            </Form.Group>

                            <SnippetCodeEditor len={len} code={code} setCode={setCode} />
                            <br></br>
                            <div className="d-grid">
                                <Button variant="primary" type='submmit' size="lg">
                                    Save Snippet
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>

            }

        </Container>
    )
}

export default SnippetEditPage