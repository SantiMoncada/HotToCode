import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import UserProfileEditForm from "../UserProfileEditForm"
import { useState } from 'react'
import './userprofile.css'

const UserProfile = ({ loadUser, userData }) => {
    const [formOpen, setFormOpen] = useState(false)

    const formOpenHandler = () => {
        setFormOpen(state => !state)
    }

    if (userData) {
        return (
            <Container>
                <Row>
                    <Col className='avatar'>
                        <img src={userData.avatar} alt={`avatar of ${userData.username}`} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {userData.username}
                    </Col>
                </Row>
                <Card.Text>
                    {userData.bio}
                </Card.Text>
                <Row>
                    {formOpen ?
                        <UserProfileEditForm formOpenHandler={formOpenHandler} loadUser={loadUser} userData={userData} />
                        :
                        <Button variant="primary" onClick={formOpenHandler} >Edit</Button>
                    }
                </Row>
            </Container>
        )
    } else {
        <p>Loading...</p>
    }
}

export default UserProfile