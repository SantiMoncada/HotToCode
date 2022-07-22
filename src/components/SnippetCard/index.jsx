import { useContext } from "react"
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


const SnippetCard = ({ title, content, language, owner, _id }) => {

    const { user } = useContext(AuthContext)

    let icon
    let len
    let border = 'ligth'
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

    }

    const likeHandler = (snippet_id) => {
        //TODO if state of fav remove or add
        userService.favSnippet(snippet_id)
            .then(({ data }) => {
                alert(JSON.stringify(data))
            })
            .catch(err => alert(err))

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
                    <MdOutlineModeComment className="actionButton comment" />
                    <TbGitFork className="actionButton fork" />
                    <MdFavoriteBorder onClick={() => likeHandler(_id)} className="actionButton fav" />
                    {/* <MdFavorite /> */}
                    <MdShare className="actionButton share" />
                </div>
            </Card.Body>
        </Card>
    )
}

export default SnippetCard