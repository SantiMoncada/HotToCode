import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../contexts/auth.context'
import { MessageContext } from "../../contexts/userMessage.context";
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import SnippetCodeEditor from './../../components/SnippetCodeEditor'
import LanguageSelector from './../../components/LanguageSelector'
import snippetService from "../../services/snippets.services"
import socket from '../../config/socket-config'

import ModalLink from "../../components/ModalLink"
import QRCode from "qrcode"

const SnippetFormPage = () => {

    const { user, socketId, setSocketId } = useContext(AuthContext)
    const { setShowMessage } = useContext(MessageContext)

    let navigate = useNavigate()

    const [modalShow, setModalShow] = useState(false)
    const [qrScr, setQrSrc] = useState("")

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

        socket.on('receiveCode', (payload) => {
            setLen(() => payload.len)
            setTitle(() => payload.title)
            setCode(() => payload.code)
        })

        socket.connect();

    }, [])


    useEffect(() => {
        if (guestId) {
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

    useEffect(() => {
        QRCode.toDataURL(`${window.location.origin}/liveCodeGuest/${socketId}`).then(setQrSrc)
    }, [socketId])

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

    const shareHandler = () => {
        navigator.clipboard.writeText(`${window.location.origin}/liveCodeGuest/${socketId}`)
        setShowMessage({ show: true, title: 'Copied to clipboard', text: `Copied the link ${window.location.origin}/liveCodeGuest/${socketId} to clipboard` })
        setModalShow(true)
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
                            <Button variant="outline-success" type='submmit' size="lg">
                                Save Snippet
                            </Button>
                        </div>
                        <br></br>
                        <div className="d-grid">
                            <Button variant="outline-info" size="lg" onClick={shareHandler}>
                                Share Link
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            {
                socketId &&
                <ModalLink
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    linkShare={`${window.location.origin}/liveCodeGuest/${socketId}`}
                    qrCodeData={<img style={{ width: "75%" }} src={qrScr} />}
                />
            }
        </Container>
    )
}

export default SnippetFormPage