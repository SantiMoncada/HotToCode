import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import UserProfileEditForm from "../UserProfileEditForm"
import { useState } from 'react'
import './userprofile.css'
import Loader from './../Loader'
const UserProfile = ({ loadUser, userData }) => {
    const [formOpen, setFormOpen] = useState(false)

    const formOpenHandler = () => {
        setFormOpen(state => !state)
    }


    return (
        <>
            {userData ?
                <Container>
                    <figure className='avatar'>
                        <img src={userData.avatar} alt={`avatar of ${userData.username}`} />
                    </figure>
                    {!formOpen ?
                        <>
                            <h3>@{userData.username}</h3>
                            <p>{userData.bio}</p>
                            <div className="d-grid ">
                                <Button variant="outline-secondary" onClick={formOpenHandler} >Edit</Button>
                            </div>
                        </>
                        :
                        <UserProfileEditForm formOpenHandler={formOpenHandler} loadUser={loadUser} userData={userData} />
                    }
                    <br />
                </Container>
                :
                <Loader />
            }

        </>
    )

}

export default UserProfile