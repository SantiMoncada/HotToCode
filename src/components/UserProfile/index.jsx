import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Card, Row, Col, Container } from 'react-bootstrap'


const UserProfile = ({ userData }) => {

    const { user } = useContext(AuthContext)

    console.log('----data en profile----', userData)

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={{ span: 2, offset: 5 }}>
                            <Card.Img src={userData.avatar} alt={`avatar of ${userData.username}`} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {userData.username}
                        </Col>
                        <Col>
                            {user.email}
                        </Col>
                    </Row>
                    <Card.Text>
                        {userData.bio}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default UserProfile