import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/auth.context'

import userService from "../../services/user.services"

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


const SnippetCard = ({ title, content, language, owner, _id, isFav }) => {


    const [isFavLocal, setIsFavLocal] = useState(isFav)

    const { user } = useContext(AuthContext)
    let navigate = useNavigate();

    useEffect(() => {
        setIsFavLocal(isFav)
    }, [isFav, user])

    let icon
    let len
    let border
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

        !user && navigate(`/login`)

        if (isFavLocal === undefined) {
            return
        }

        if (isFavLocal) {
            userService.rmFavSnippet(_id)
                .then(() => {
                    setIsFavLocal(false)
                })
                .catch(err => console.log(err))
        } else {
            userService.favSnippet(_id)
                .then(() => {
                    setIsFavLocal(true)
                })
                .catch(err => console.log(err))
        }

    }


    const commentHandler = () => {
        navigate(`/snippetDetails/${_id}`)
    }

    const shareHandler = () => {
        alert('copied to clipboard')
        navigator.clipboard.writeText(`${window.location.href}/snippetDetails/${_id}`)
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

                    <TbGitFork className="actionButton fork" />
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