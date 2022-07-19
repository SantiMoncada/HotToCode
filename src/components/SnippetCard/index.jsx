import { useContext } from "react"
import { AuthContext } from '../../contexts/auth.context'
import { Card, Button, } from "react-bootstrap"

const SnippetCard = ({ title, content, snippet_id, owner }) => {

    const { user } = useContext(AuthContext)

    return (
        <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {content}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default SnippetCard