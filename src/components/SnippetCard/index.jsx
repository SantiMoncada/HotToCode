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

import { MdFavoriteBorder, MdFavorite, MdShare, MdOutlineModeComment, MdMode, MdOutlineDeleteForever } from 'react-icons/md'
import { TbGitFork } from 'react-icons/tb'
import { useState } from "react";
import { useEffect } from "react";
import snippetService from "../../services/snippets.services";

import links from "../../utils/lenIconsSvgLinks"

const { jsIcon, cIcon, pythonIcon, rustIcon, cssIcon } = links

const SnippetCard = ({ title, content, language, owner, _id, fireFinalActions }) => {


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
            border = 'danger'
            break

        case 'PYTHON':
            icon = pythonIcon
            len = 'py'
            border = 'warning'
            break
        case 'CSS':
            icon = cssIcon
            len = 'css'
            border = 'info'
            break
        case 'RUST':
            icon = rustIcon
            len = 'rust'
            border = 'dark'
            break
        default:
            border = 'ligth'

    }

    const profileHandler = () => {
        navigate(`/user/${owner._id}`)
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

    const editHandler = () => {
        navigate(`/editSnippet/${_id}`)
    }

    const deleteHandler = () => {

        snippetService
            .deleteSnippet(_id)
            .then(() => {
                if (fireFinalActions) {
                    fireFinalActions()
                }
                // navigate(`/user/${user._id}`)
            })
            .catch(err => {
                setShowMessage({ show: true, title: 'Error deliting comment', text: 'You can not delete this commet' })
                console.log(err)
            })
    }

    return (
        <Card border={border} className="SnippetCard" bg={'Secondary'} >
            <Card.Header style={{ backgroundColor: 'white' }}>
                <Row onClick={profileHandler} style={{ cursor: ' pointer ' }}>
                    <Col xs={2} style={{ padding: 0 }}>
                        <div className="cardAvatar" >
                            <img src={owner.avatar} alt={`profile pciture of ${owner.username}`} ></img>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <p>@{owner.username}</p>
                        <hr />
                        <p>{title}</p>
                    </Col>
                    <Col xs={1} style={{ padding: 0, display: 'flex', justifyContent: 'center' }} >
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
                    {user && user._id === owner._id &&
                        <>
                            <MdMode onClick={editHandler} className="actionButton edit" />
                            <MdOutlineDeleteForever className="actionButton delete" onClick={(deleteHandler)} />
                        </>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

export default SnippetCard