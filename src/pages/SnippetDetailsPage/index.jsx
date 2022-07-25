import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Container, Row, Col } from "react-bootstrap"

import SnippetCard from './../../components/SnippetCard'
import CommentForm from "../../components/CommentForm"
import CommentList from "../../components/CommentList"
import snippetService from "../../services/snippets.services"
import commentService from "../../services/commets.services"
import Loader from "../../components/Loader"
import './SnippetDetailsPage.css'

const SnippetDetailsPage = () => {

    const [snippet, setSnippet] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [comment, setComment] = useState([])

    const { snippet_id } = useParams()


    useEffect(() => {
        loadSnippet()
        loadComment()
    }, [])

    const loadSnippet = () => {
        snippetService
            .getOneSnippet(snippet_id)
            .then(({ data }) => {
                setIsLoading(false)
                setSnippet(data)
            })
            .catch(err => console.log(err))

    }

    const loadComment = () => {
        commentService
            .getComment(snippet_id)
            .then(({ data }) => {
                setComment(data)
            })
            .catch(err => console.log(err))

    }

    return (
        <Container>
            <Row className="snippetDetails">
                <Col sm={6}>
                    {isLoading ?
                        <Loader />
                        :
                        <>
                            <SnippetCard  {...snippet} />
                            {/* edit delete snippets*/}
                            <CommentForm snippet_id={snippet_id} />
                            <CommentList commentsData={comment} />
                            {console.log('snippet debuggin ---- ', comment)}
                        </>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default SnippetDetailsPage