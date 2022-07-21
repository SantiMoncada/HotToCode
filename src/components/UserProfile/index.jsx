import { Card, Row, Col, Container } from 'react-bootstrap'
import UserProfileEditForm from "../UserProfileEditForm"

const UserProfile = ({ userData }) => {

    if (userData) {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={{ span: 2, offset: 5 }}>
                                <Card.Img src={userData?.avatar} alt={`avatar of ${userData?.username}`} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {userData?.username}
                            </Col>
                            <Row>
                                <UserProfileEditForm userData={userData} />
                            </Row>
                        </Row>
                        <Card.Text>
                            {userData?.bio}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        )
    } else {
        <p>No user data</p>
    }
}

export default UserProfile