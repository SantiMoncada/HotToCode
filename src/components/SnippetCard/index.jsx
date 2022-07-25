import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/auth.context'
import { UserContext } from "../../contexts/user.context";
import { MessageContext } from "../../contexts/userMessage.context";

import userService from "../../services/user.services"
import SnippetService from "../../services/snippets.services"

import { Row, Col, Card, Button, Alert, } from "react-bootstrap"
import CodeStyle from './../CodeStyle'
import './SnippetCard.css'

import jsIcon from "./../../assets/LengIcons/nodejs-plain.svg"
import cIcon from "./../../assets/LengIcons/c-plain.svg"
import pythonIcon from "./../../assets/LengIcons/python-plain.svg"

import { MdFavoriteBorder, MdFavorite, MdShare, MdOutlineModeComment } from 'react-icons/md'
import { TbGitFork } from 'react-icons/tb'
import { useState } from "react";
import { useEffect } from "react";
import snippetService from "../../services/snippets.services";


const SnippetCard = ({ title, content, language, owner, _id }) => {


    const [isFavLocal, setIsFavLocal] = useState(false)

    const { user } = useContext(AuthContext)
    const { favSnippets, UpdateUserData, isLoading } = useContext(UserContext)

    const { setShowMessage } = useContext(MessageContext)

    let navigate = useNavigate();


    useEffect(() => {
        setIsFavLocal(favSnippets.includes(_id))
    }, [favSnippets, user])

    let icon, len, border

    switch (language) {
        case 'JS':
            icon = jsIcon
            len = 'jsx'
            border = 'success'
            break

        case 'C':
            icon = cIcon
            len = 'c'
            border = 'info'
            break

        case 'PYTHON':
            icon = pythonIcon
            len = 'py'
            border = 'warning'
            break

        default:
            border = 'ligth'

    }

    const likeHandler = () => {

        if (!user) {
            setShowMessage({ show: true, title: 'You are not loged in', text: 'You must be logged in to add favorites' })
            return
        }

        if (isFavLocal === undefined) {
            return
        }

        if (isFavLocal) {
            setShowMessage({ show: true, title: 'Like removed', text: 'You removed the post from your favorites' })
            setIsFavLocal(false)
            userService
                .rmFavSnippet(_id)
                .catch(err => console.log(err))

        } else {
            setShowMessage({ show: true, title: 'Liked a post', text: 'You added the post to your favorites' })
            setIsFavLocal(true)
            userService.favSnippet(_id)
                .catch(err => console.log(err))
        }

    }


    const commentHandler = () => {
        navigate(`/snippetDetails/${_id}`)
    }

    const shareHandler = () => {
        navigator.clipboard.writeText(`${window.location.origin}/snippetDetails/${_id}`)
        setShowMessage({ show: true, title: 'Copied to clipboard', text: `Copied the link ${window.location.origin}/snippetDetails/${_id} to clipboard` })
    }

    const forkHandler = () => {
        !user && navigate(`/login`)

        SnippetService.getSnippets({ user: user._id })
            .then(({ data }) => {
                const isYourSnippet = data.some(snippet => snippet._id === _id)

                if (isYourSnippet) {
                    setShowMessage({ show: true, title: 'Can not Fork', text: 'You can not fork your own snippet' })
                    throw 'you own the snippet'
                }

                const forkedSnippet = {
                    content,
                    language,
                    title
                }
                return snippetService.createSnippet(forkedSnippet)
            })
            .then(({ data }) => {
                //TODO navigate to Edit details
                navigate(`/snippetDetails/${data._id}`)
            })
            .catch(err => console.warn(err))
    }

    return (
        <Card border={border} className="SnippetCard" bg={'Secondary'} >
            <Card.Header style={{ backgroundColor: 'white' }}>
                <Row>
                    <Col xs={2} style={{ padding: 0 }}>
                        <div className="cardAvatar">
                            <img src={owner.avatar} alt={`profile pciture of ${owner.username}`} ></img>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <p>@{owner.username}</p>
                        <hr />
                        <p>{title}</p>
                    </Col>
                    <Col xs={1} style={{ padding: 0 }} >
                        <div className="cardIcon">
                            <img src={icon} alt={`Icon of ${language}`} />
                        </div>

                    </Col>
                </Row>
            </Card.Header>
            <Card.Body style={{ padding: 0 }} >

                <CodeStyle className={'codeInCard'} code={content} language={len}></CodeStyle>

                <div className="actionButtons">
                    <MdOutlineModeComment onClick={commentHandler} className="actionButton comment" />

                    <TbGitFork onClick={forkHandler} className="actionButton fork" />
                    {
                        isFavLocal
                            ?
                            <MdFavorite onClick={likeHandler} className="actionButton fav" />
                            :
                            <MdFavoriteBorder onClick={likeHandler} className="actionButton fav" />
                    }

                    <MdShare onClick={shareHandler} className="actionButton share" />
                </div>
            </Card.Body>
        </Card>
    )
}

export default SnippetCard