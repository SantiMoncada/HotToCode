import { useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'
import { Row, Col, Card, Button, } from "react-bootstrap"
import CodeStyle from './../CodeStyle'
import './SnippetCard.css'

import jsIcon from "./../../assets/LengIcons/nodejs-plain.svg"
import cIcon from "./../../assets/LengIcons/c-plain.svg"
import pythonIcon from "./../../assets/LengIcons/python-plain.svg"

import { MdFavoriteBorder, MdFavorite, MdIosShare } from 'react-icons/md'
import { TbGitFork } from 'react-icons/tb'

const SnippetCard = ({ title, content, language, owner }) => {

    const { user } = useContext(AuthContext)

    let icon;
    switch (language) {
        case 'JS':
            icon = jsIcon;
            break;
        case 'C':
            icon = cIcon;
            break;
        case 'PYTHON':
            icon = pythonIcon
            break;
        default:

    }

    return (
        <Card className="SnippetCard"  >
            <Card.Header>
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
                <Card.Text>

                    <CodeStyle className={'codeInCard'} code={content}></CodeStyle>

                </Card.Text>
                <div className="actionButtons">
                    <MdFavoriteBorder />
                    {/* <MdFavorite /> */}
                    <MdIosShare />
                    <TbGitFork />
                </div>
            </Card.Body>
        </Card>
    )
}

export default SnippetCard