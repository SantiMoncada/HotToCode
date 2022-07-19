import { useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'
import { Row, Col, Card, Button, } from "react-bootstrap"
import CodeStyle from './../CodeStyle'
import './SnippetCard.css'

import jsIcon from "./../../assets/LengIcons/nodejs-plain.svg"

const SnippetCard = ({ title, content, language, owner }) => {

    const { user } = useContext(AuthContext)

    return (
        <Card className="SnippetCard"  >
            <Card.Header>
                <Row>
                    <Col xs={2} style={{ padding: 0 }}>
                        <img src={owner.avatar} alt={`profile pciture of ${owner.username}`}></img>
                    </Col>
                    <Col xs={9}>
                        <p>{owner.username}</p>
                        <p>{title}</p>
                    </Col>
                    <Col xs={1} style={{ padding: 0 }} >
                        <img src={jsIcon} alt={`Icon of ${language}`} />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body style={{ padding: 0 }} >
                <Card.Text>
                    <CodeStyle code={content}></CodeStyle>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SnippetCard