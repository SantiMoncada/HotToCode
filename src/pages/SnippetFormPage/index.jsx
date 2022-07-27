import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../contexts/auth.context'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import SnippetCodeEditor from './../../components/SnippetCodeEditor'
import LanguageSelector from './../../components/LanguageSelector'
import snippetService from "../../services/snippets.services"
import socket from '../../config/socket-config'

const SnippetFormPage = () => {

    const { user, socketId, setSocketId } = useContext(AuthContext)
    let navigate = useNavigate()


    const [receivingCode, setReceivingCode] = useState(false)

    const [remoteCode, setRemoteCode] = useState('')
    const [remoteLen, setRemoteLen] = useState('JS')
    const [remoteTitle, setRemoteTitle] = useState('')

    const [code, setCode] = useState('')
    const [len, setLen] = useState('JS')
    const [title, setTitle] = useState('')

    const [guestId, setGuestId] = useState(null)

    useEffect(() => {
        socket.auth = { username: user.username };

        socket.on('me', (payload) => {
            setSocketId(payload)
        })

        socket.on('receiveGuestId', (payload) => {

            console.log('hooked to ', payload.sender)
            setGuestId(payload.sender)

        })



        socket.connect();

    }, [])

    useEffect(() => {
        if (guestId) {
            socket.off('receiveGuestId')

            socket.on('receiveCode', (payload) => {

                console.log(payload.sender, guestId)
                if (payload.sender === guestId) {
                    setLen(payload.len)
                    setTitle(payload.title)
                    setCode(payload.code)

                    setRemoteCode(payload.code)
                    setRemoteLen(payload.len)
                    setRemoteTitle(payload.title)
                }
            })
        }
    }, [guestId])


    useEffect(() => {
        if (guestId && remoteCode !== code || remoteTitle !== title || remoteLen !== len) {
            socket.emit("sendCode", {
                len,
                title,
                code,
                sender: socketId,
                addressee: guestId
            })
        }
    }, [code, len, title])

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

        snippetService.createSnippet(newSnippet)
            .then(({ data }) => {
                socket.disconnect()
                setSocketId(null)

                navigate(`/snippetDetails/${data._id}`)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        console.log({ code, len, title })
    }

    return (
        <Container>

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
            <p>{`${window.location.origin}/liveCodeGuest/${socketId}`}</p>
        </Container>
    )
}

export default SnippetFormPage