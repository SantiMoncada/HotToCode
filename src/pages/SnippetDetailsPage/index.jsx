import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { UserContext } from "../../contexts/user.context";
import { Container, Row, Col } from "react-bootstrap"

import { MessageContext } from "./../../contexts/userMessage.context"

import SnippetCard from './../../components/SnippetCard'
import CommentForm from "../../components/CommentForm"
import CommentList from "../../components/CommentList"
import snippetService from "../../services/snippets.services"
import commentService from "../../services/commets.services"
import Loader from "../../components/Loader"
import './SnippetDetailsPage.css'

const SnippetDetailsPage = () => {

    const { snippet_id } = useParams()
    const navigate = useNavigate()
    const { UpdateUserData } = useContext(UserContext)

    const [snippet, setSnippet] = useState()
    const [comments, setComments] = useState([])

    const [isLoadingSnippet, setIsLoadingSnippet] = useState(true)
    const [isLoadingComments, setIsLoadingComments] = useState(true)

    const { setShowMessage } = useContext(MessageContext)



    useEffect(() => {
        UpdateUserData()
        loadSnippet()
        loadComments()
    }, [])

    const loadSnippet = () => {
        snippetService
            .getOneSnippet(snippet_id)
            .then(({ data }) => {
                setSnippet(data)
                setIsLoadingSnippet(false)
            })
            .catch(err => {
                setShowMessage({ show: true, title: 'Error loading comment', text: 'There was an error loading snippet content' })
                setIsLoadingSnippet(false)
                console.log(err)
            })

    }


    const loadComments = () => {
        commentService
            .getComment(snippet_id)
            .then(({ data }) => {
                setComments(data)
                setIsLoadingComments(false)
            })
            .catch(err => {
                setShowMessage({ show: true, title: 'Error loading comment', text: 'There was an error loading comment content' })
                setIsLoadingComments(false)
                console.log(err)
            })

    }


    const deleteSnippetFinalActions = () => {
        navigate(`/user/${snippet.owner._id}`)
    }

    const deleteComentFinalActions = () => {
        loadComments()
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xl={8}>
                    <br></br>

                    {isLoadingSnippet ?
                        <Loader />
                        :
                        snippet ?
                            <>
                                <SnippetCard  {...snippet} fireFinalActions={deleteSnippetFinalActions} />
                            </>
                            :
                            <></>
                    }
                    <br></br>
                    {isLoadingComments
                        ?
                        <Loader />
                        : snippet ?
                            <CommentForm snippet_id={snippet_id} loadComments={loadComments} />
                            :
                            <></>
                    }
                    <br></br>
                    <CommentList commentsData={comments} fireFinalActions={deleteComentFinalActions} loadComments={loadComments} />
                </Col>
            </Row>
        </Container>
    )
}

export default SnippetDetailsPage