import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from '../../contexts/auth.context'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import SnippetCodeEditor from './../../components/SnippetCodeEditor'
import LanguageSelector from './../../components/LanguageSelector'
import snippetService from "../../services/snippets.services"
import socket from '../../config/socket-config'

const SnippetFormPage = () => {

    const { owner_socket } = useParams()
    let navigate = useNavigate()

    const [remoteCode, setRemoteCode] = useState('')
    const [remoteLen, setRemoteLen] = useState('JS')
    const [remoteTitle, setRemoteTitle] = useState('')

    const [code, setCode] = useState('')
    const [len, setLen] = useState('JS')
    const [title, setTitle] = useState('')

    const [socketId, setSocketId] = useState(null)

    useEffect(() => {
        socket.auth = { username: 'guest' };

        socket.on('me', (payload) => {
            setSocketId(payload)
            socket.emit('sendGuestId', {
                sender: payload,
                addressee: owner_socket
            })
        })

        socket.on('receiveCode', (payload) => {
            setCode(payload.code)
            setLen(payload.len)
            setTitle(payload.title)

            setRemoteCode(payload.code)
            setRemoteLen(payload.len)
            setRemoteTitle(payload.title)
        })

        socket.connect();

    }, [])


    useEffect(() => {
        if (remoteCode !== code || remoteTitle !== title || remoteLen !== len) {
            socket.emit("sendCode", {
                code,
                len,
                title,
                sender: socketId,
                addressee: owner_socket

            })
        }
    }, [code, len, title])

    const handleChangeTitle = e => {
        setTitle(e.target.value)

    }

    return (
        <Container>
            <Row>

                <Col lg={{ offset: 3, span: 6 }}>

                    <Form>
                        <br></br>
                        <LanguageSelector len={len} setLen={setLen} />
                        <br></br>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Control type="text" placeholder="Enter snippet title" value={title} onChange={handleChangeTitle} />
                        </Form.Group>

                        <SnippetCodeEditor len={len} code={code} setCode={setCode} />
                        <br></br>
                    </Form>
                </Col>
            </Row>

        </Container>
    )
}

export default SnippetFormPage