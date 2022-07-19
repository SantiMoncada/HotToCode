import { useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'
import './SnippetCard.css'
import { Row, Col, Card, Button, } from "react-bootstrap"

const SnippetCard = ({ title, content, language, owner }) => {

    const { user } = useContext(AuthContext)

    return (
        <Card className="SnippetCard">
            <Card.Header>
                <Row>
                    <Col xs={6}>
                        <img src={owner.avatar} alt={`profile pciture of ${owner.username}`}></img>
                    </Col>
                    <Col xs={10}>
                        <p>{owner.username}</p>
                        <p>{title}</p>
                    </Col>
                    <Col xs={1}>
                        <p>{language}</p>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <pre>{content}</pre>
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default SnippetCard