import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth.context"
import { Card, Row, Col } from 'react-bootstrap'

const UserProfile = () => {



    const { user } = useContext(AuthContext)

    console.log(user)
    return (
        <Card>

            <Row>
                <Col>
                    <img src={user?.avatar} />
                    <p>{user?.username}</p>
                </Col>
            </Row>

        </Card>
    )
}

export default UserProfile