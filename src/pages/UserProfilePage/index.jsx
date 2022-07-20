import { Container, Row, Col } from "react-bootstrap"
import UserProfile from "../../components/UserProfile"

const UserProfilePage = () => {



    return (
        <Container>
            <Row>
                <Col>
                    <UserProfile />
                </Col>
                <Col></Col>
            </Row>
        </Container>

    )
}

export default UserProfilePage